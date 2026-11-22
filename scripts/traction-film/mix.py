"""Mix the local-language voice stems with the original score and time the captions to the words."""

import json, subprocess, sys
from pathlib import Path

lang, original, work = sys.argv[1:]
original, work = Path(original), Path(work)
here = Path(__file__).resolve().parent
times = json.loads((here / "timeline.json").read_text())
fr = json.loads((here / "fr-voice.json").read_text())
captions = []
command = ["ffmpeg", "-hide_banner", "-loglevel", "error", "-y"]
filters = []
voices = []


def stamp(t):
    ms = round(t * 1000)
    return f"{ms // 3600000:02d}:{ms // 60000 % 60:02d}:{ms // 1000 % 60:02d}.{ms % 1000:03d}"


for i, (key, at) in enumerate(times.items()):
    source = (
        (work / "voice" / f"{key}.wav")
        if lang == "fr"
        else (original / "audio/brian" / ("v15.wav" if key == "v13" else f"{key}.wav"))
    )
    dur = float(
        subprocess.check_output(
            [
                "ffprobe",
                "-v",
                "error",
                "-show_entries",
                "format=duration",
                "-of",
                "csv=p=0",
                str(source),
            ]
        )
    )
    next_at = (list(times.values()) + [76.0])[i + 1]
    tempo = max(1, dur / (next_at - at - 0.12))
    command += ["-i", str(source)]
    filters += [
        f"[{i}:a]aformat=sample_rates=48000:channel_layouts=stereo,atempo={tempo:.5f},loudnorm=I=-16:TP=-2:LRA=7,adelay={int(at * 1000)}|{int(at * 1000)}[v{i}]"
    ]
    voices.append(f"[v{i}]")
    if lang == "fr":
        captions.append(
            f"{stamp(at)} --> {stamp(at + dur / tempo)}\n{fr[key].replace('H D O S', 'HD OS')}\n"
        )
n = len(times)
command += ["-i", str(original / "audio/score/b140-3.wav")]
filters += [
    "".join(voices)
    + f"amix=inputs={n}:normalize=0,apad=whole_dur=76,asplit=2[vo][key]",
    f"[{n}:a]aformat=sample_rates=48000:channel_layouts=stereo,volume=-3dB,apad=whole_dur=76[mus]",
    "[mus][key]sidechaincompress=threshold=0.035:ratio=5:attack=25:release=380:makeup=1[duck]",
    "[vo][duck]amix=inputs=2:normalize=0,alimiter=limit=0.89,atrim=0:76[out]",
]
subprocess.run(
    command
    + [
        "-filter_complex",
        ";".join(filters),
        "-map",
        "[out]",
        "-ar",
        "48000",
        "-ac",
        "2",
        str(work / "mix.wav"),
    ],
    check=True,
)
if lang == "fr":
    (work / "hero.vtt").write_text("WEBVTT\n\n" + "\n".join(captions))
else:
    old = (original / "growth-team-film.en.vtt").read_text()
    (work / "hero.vtt").write_text(
        old.replace("01:01.923", "01:02.080").replace(
            "Then embed your app on Orchestra OS.",
            "One team, from your next customer to your next release.",
        )
    )
