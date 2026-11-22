"""Produce the narrated French walkthrough from a real browser capture and fictional local fixture."""

import io, json, subprocess, sys, textwrap
from pathlib import Path
import soundfile as sf
from kokoro_onnx import Kokoro
from PIL import Image, ImageOps, ImageDraw, ImageFont

captured, tools, work = map(Path, sys.argv[1:])
here = Path(__file__).resolve().parent
public = here.parent.parent / "public"
data = json.loads((public / "assets/traction-tour.fr.json").read_text())
scenes = data["chapters"]
end = 78
work.mkdir(exist_ok=True, parents=True)
voice = Kokoro(str(tools / "kokoro.onnx"), str(tools / "voices.bin"))
# Actual spoken cues are shared with the accessible chapter player.
cues = [(0.5, "Un outil de réservation pour artisans. Qui pourrait en avoir besoin ?")]
for stage in scenes:
    cues.extend((s["at"], s["text"]) for s in stage["says"])
cues.append((71.7, data["end"]["line"]))


def stamp(t):
    ms = round(t * 1000)
    return f"00:{ms // 60000:02d}:{ms // 1000 % 60:02d}.{ms % 1000:03d}"


tracks = []
vtt = ["WEBVTT", ""]
for i, (at, line) in enumerate(cues):
    wave = work / f"voice-{i}.wav"
    if not wave.exists():
        pcm, sr = voice.create(line, voice="ff_siwis", lang="fr-fr", speed=1.02)
        sf.write(wave, pcm, sr)
    dur = sf.info(wave).duration
    if at + dur > (cues[i + 1][0] if i + 1 < len(cues) else end):
        raise ValueError(("Overlapping narration", at, line, dur))
    tracks.append(wave)
    vtt.extend([f"{stamp(at)} --> {stamp(at + dur)}", line, ""])
(public / "assets/traction-tour.fr.vtt").write_text("\n".join(vtt).rstrip() + "\n")
# The tour is speech only. Place the native 24 kHz French recordings in a fixed-length timeline.
import numpy as np

rate = 24000
sound = np.zeros(end * rate, dtype=np.float32)
for (at, _), track in zip(cues, tracks):
    data_wave, native_rate = sf.read(track, dtype="float32")
    if native_rate != rate:
        raise ValueError(("Unexpected recording rate", native_rate))
    offset = round(at * rate)
    sound[offset : offset + len(data_wave)] = data_wave
sf.write(work / "voice.wav", sound, rate)


def font(name, size):
    return ImageFont.truetype(
        "/System/Library/Fonts/Supplemental/" + name + ".ttf", size
    )


title = font("Georgia", 44)
small = font("Arial Bold", 17)
body = font("Arial", 25)
big = font("Georgia", 74)
gold = "#efc081"
dim = "#c3bfba"
# Build native 16:9 scenes. Each chapter opens on the moving application, then holds a readable close-up of its actual interface.
captures = {
    "read": ("read", None),
    "customers": ("customers", None),
    "email": ("email", None),
    "plan": ("plan", (0, 64, 950, 447)),
    "market": ("market", (0, 0, 1240, 460)),
    "market-move": ("market-move", None),
}
sync = json.loads((captured / "marks.json").read_text())
raw = next(captured.glob("*.webm"))
dur = lambda p: float(
    subprocess.check_output(
        [
            "ffprobe",
            "-v",
            "error",
            "-show_entries",
            "format=duration",
            "-of",
            "csv=p=0",
            str(p),
        ]
    )
)
offset = max(
    0, dur(raw) - max(sync.values()) - 0.9
)  # video begins with browser creation before the first navigation


def base():
    return Image.new("RGB", (1280, 720), "#111510")


def footer(canvas, note):
    draw = ImageDraw.Draw(canvas)
    draw.line((48, 660, 1232, 660), fill="#5e584b")
    draw.text((48, 680), note, font=small, fill=dim)
    draw.text((1232, 680), "TRACTION", font=small, fill=gold, anchor="ra")


def card(title_text, second, button):
    canvas = base()
    d = ImageDraw.Draw(canvas)
    d.text((72, 92), "TRACTION", fill=gold, font=font("Arial Bold", 31))
    d.multiline_text(
        (70, 193),
        "\n".join(textwrap.wrap(title_text, 29)),
        font=big,
        spacing=1,
        fill="#faf2e5",
    )
    d.multiline_text(
        (74, 429), "\n".join(textwrap.wrap(second, 74)), font=body, spacing=8, fill=dim
    )
    if button:
        d.text((74, 524), button, font=font("Arial Bold", 30), fill=gold)
    footer(
        canvas,
        "Démonstration enregistrée · application, entreprises et données fictives",
    )
    return canvas


def plate(stage, section):
    source, region = captures[section]
    image = Image.open(captured / (source + ".png")).convert("RGB")
    if region:
        image = image.crop(region)
    canvas = base()
    draw = ImageDraw.Draw(canvas)
    draw.text((48, 28), stage["name"].upper(), font=small, fill=gold)
    draw.text((47, 57), stage["title"], font=title, fill="#faf2e5")
    fitted = ImageOps.contain(image, (1184, 486), Image.Resampling.LANCZOS)
    draw.rounded_rectangle(
        (47, 127, 1233, 636), radius=14, fill="#0c1723", outline="#494137", width=2
    )
    canvas.paste(fitted, ((1280 - fitted.width) // 2, 127 + (508 - fitted.height) // 2))
    footer(canvas, data["labels"][stage["label"]])
    return canvas


def image_segment(file, duration, out):
    subprocess.run(
        [
            "ffmpeg",
            "-v",
            "error",
            "-y",
            "-framerate",
            "25",
            "-loop",
            "1",
            "-i",
            str(file),
            "-t",
            str(duration),
            "-c:v",
            "libx264",
            "-threads",
            "3",
            "-preset",
            "veryfast",
            "-crf",
            "18",
            "-pix_fmt",
            "yuv420p",
            str(out),
        ],
        check=True,
    )


sequence = []


def hold(image, duration):
    idx = len(sequence)
    file = work / f"plate-{idx:02}.png"
    image.save(file)
    dest = work / f"clip-{idx:02}.mp4"
    image_segment(file, duration, dest)
    sequence.append(dest)


hold(
    card(
        "Qui pourrait utiliser cet outil de réservation ?",
        data["opening"]["line"],
        None,
    ),
    5,
)
for i, stage in enumerate(scenes):
    name = stage["id"]
    dur_scene = (
        scenes[i + 1]["start"] if i + 1 < len(scenes) else data["close"]
    ) - stage["start"]
    # The moving insert shows the transition to this exact view, under the same chapter heading as the close-up.
    panel = plate(stage, name)
    paste = ImageDraw.Draw(panel)
    paste.rounded_rectangle(
        (47, 127, 1233, 636), radius=14, fill="#0c1723", outline="#494137", width=2
    )
    bg = work / f"{name}-background.png"
    panel.save(bg)
    clip = work / f"clip-{len(sequence):02}.mp4"
    duration = 2.0
    begin = max(0.0, sync[name] + offset - 1.1)
    subprocess.run(
        [
            "ffmpeg",
            "-v",
            "error",
            "-y",
            "-loop",
            "1",
            "-framerate",
            "25",
            "-i",
            str(bg),
            "-ss",
            str(begin),
            "-t",
            str(duration),
            "-i",
            str(raw),
            "-filter_complex",
            "[1:v]crop=iw:trunc(ih*.887/2)*2:0:0,scale=-2:500,setsar=1[v];[0:v][v]overlay=(main_w-overlay_w)/2:131,fps=25,format=yuv420p[o]",
            "-map",
            "[o]",
            "-t",
            str(duration),
            "-c:v",
            "libx264",
            "-threads",
            "3",
            "-preset",
            "veryfast",
            "-crf",
            "18",
            str(clip),
        ],
        check=True,
    )
    sequence.append(clip)
    if name == "market":
        hold(plate(stage, name), 5.4)
        hold(plate(stage, "market-move"), dur_scene - duration - 5.4)
    else:
        hold(plate(stage, name), dur_scene - duration)
hold(
    card(data["end"]["title"], data["end"]["line"], "hyperdrift.io/fr/traction"),
    end - data["close"],
)
listing = work / "clips.txt"
listing.write_text("".join(f"file '{p.resolve()}'\n" for p in sequence))
movie = public / "traction/tour/film.fr.mp4"
subprocess.run(
    [
        "ffmpeg",
        "-v",
        "error",
        "-y",
        "-f",
        "concat",
        "-safe",
        "0",
        "-i",
        str(listing),
        "-i",
        str(work / "voice.wav"),
        "-map",
        "0:v",
        "-map",
        "1:a",
        "-c:v",
        "copy",
        "-c:a",
        "aac",
        "-b:a",
        "144k",
        "-metadata:s:a:0",
        "language=fra",
        "-movflags",
        "+faststart",
        "-t",
        str(end),
        str(movie),
    ],
    check=True,
)
poster = plate(scenes[0], "read")
poster.save(public / "traction/tour/film.fr.jpg", quality=92)
