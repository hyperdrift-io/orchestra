"""Voice the approved French lines locally using Kokoro v1, French voice ff_siwis."""

import json, sys
from pathlib import Path
import soundfile as sf
from kokoro_onnx import Kokoro

tools, out = map(Path, sys.argv[1:])
out.mkdir(exist_ok=True, parents=True)
model = Kokoro(str(tools / "kokoro.onnx"), str(tools / "voices.bin"))
for key, line in json.loads(
    Path(__file__).with_name("fr-voice.json").read_text()
).items():
    y, rate = model.create(line, voice="ff_siwis", lang="fr-fr", speed=1.02)
    sf.write(out / (key + ".wav"), y, rate)
    print(key, round(len(y) / rate, 2), flush=True)
