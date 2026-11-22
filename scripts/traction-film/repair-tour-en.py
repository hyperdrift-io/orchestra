"""Replace the former domain in the recorded English closing button while keeping its evidence and chapter timings."""

import io, subprocess, sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

original, out, work = map(Path, sys.argv[1:])
work.mkdir(parents=True, exist_ok=True)
for name in ("film.mp4", "film-720.mp4"):
    src = original / name
    hdr = subprocess.check_output(
        [
            "ffmpeg",
            "-v",
            "error",
            "-ss",
            "139.5",
            "-i",
            str(src),
            "-frames:v",
            "1",
            "-f",
            "image2pipe",
            "-vcodec",
            "png",
            "-",
        ]
    )
    base = Image.open(io.BytesIO(hdr)).convert("RGB")
    w, h = base.size
    k = w / 1920
    bounds = tuple(round(z * k) for z in (540, 705, 1380, 820))
    blank = base.crop(bounds)
    png = work / (name + "-clear.png")
    blank.save(png)
    layer = Image.new("RGBA", blank.size)
    d = ImageDraw.Draw(layer)
    box = tuple(round(z * k) for z in (57, 28, 783, 84))
    d.rounded_rectangle(box, radius=round(28 * k), fill="#e6ac5d")
    font = ImageFont.truetype(
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf", round(25 * k)
    )
    d.text(
        ((bounds[2] - bounds[0]) * 0.5, (box[1] + box[3]) * 0.5),
        "See it on your app   ·   hyperdrift.io/traction",
        font=font,
        anchor="mm",
        fill="#211a10",
    )
    new = work / (name + "-button.png")
    layer.save(new)
    overlays = f"[0:v][1:v]overlay={bounds[0]}:{bounds[1]}:shortest=1:enable='gte(t,140.0)'[clean];[2:v]format=rgba,fade=t=in:st=140.5:d=0.4:alpha=1[door];[clean][door]overlay={bounds[0]}:{bounds[1]}:shortest=1[v]"
    subprocess.run(
        [
            "ffmpeg",
            "-v",
            "error",
            "-y",
            "-i",
            str(src),
            "-loop",
            "1",
            "-framerate",
            "30",
            "-i",
            str(png),
            "-loop",
            "1",
            "-framerate",
            "30",
            "-i",
            str(new),
            "-filter_complex",
            overlays,
            "-map",
            "[v]",
            "-c:v",
            "libx264",
            "-threads",
            "4",
            "-preset",
            "fast",
            "-crf",
            "20",
            "-pix_fmt",
            "yuv420p",
            "-movflags",
            "faststart",
            "-frames:v",
            "4411",
            str(out / name),
        ],
        check=True,
    )
