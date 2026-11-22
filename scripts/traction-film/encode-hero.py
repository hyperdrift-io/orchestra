"""Encode the bilingual hero. Preserve the English master's original footage before the updated HD OS scene."""

import subprocess, sys
from pathlib import Path

lang, work, original, dest = sys.argv[1:]
work, original, dest = map(Path, (work, original, dest))
cmd = ["ffmpeg", "-hide_banner", "-loglevel", "error", "-y"]
if lang == "fr":
    cmd += [
        "-framerate",
        "15",
        "-i",
        str(work / "frames/%05d.jpg"),
        "-i",
        str(work / "mix.wav"),
        "-map",
        "0:v",
        "-map",
        "1:a",
        "-vf",
        "fps=30",
    ]
else:
    cmd += [
        "-i",
        str(original / "growth-team-film-1080p-web.mp4"),
        "-framerate",
        "15",
        "-start_number",
        "884",
        "-i",
        str(work / "frames/%05d.jpg"),
        "-i",
        str(work / "mix.wav"),
        "-filter_complex",
        "[0:v]trim=end_frame=1768,setpts=PTS-STARTPTS,setsar=1[a];[1:v]scale=1920:1080:flags=lanczos,fps=30,setsar=1[b];[a][b]concat=n=2:v=1:a=0[v]",
        "-map",
        "[v]",
        "-map",
        "2:a",
    ]
cmd += [
    "-threads",
    "4",
    "-c:v",
    "libx264",
    "-preset",
    "fast",
    "-crf",
    "21",
    "-pix_fmt",
    "yuv420p",
    "-c:a",
    "aac",
    "-b:a",
    "160k",
    "-metadata:s:a:0",
    "language=" + ("fra" if lang == "fr" else "eng"),
    "-movflags",
    "+faststart",
    "-t",
    "76",
    str(dest),
]
subprocess.run(cmd, check=True)
