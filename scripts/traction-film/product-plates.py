"""Compose the captured interface at a readable scale, without altering its contents."""

from pathlib import Path
import sys
from PIL import Image, ImageOps

captures = Path(sys.argv[1])
# These crops pick out each control in the actual browser recording.
regions = {
    "read": None,
    "customers": None,
    "email": None,
    "plan": (4, 63, 935, 437),
    "market": (0, 0, 1210, 435),
    "analytics": (13, 50, 628, 349),
    "approve": (0, 168, 395, 465),
}
for name, box in regions.items():
    image = Image.open(captures / (name + ".png")).convert("RGB")
    if box:
        image = image.crop(box)
    canvas = Image.new("RGB", (1640, 701), "#0c1623")
    fitted = ImageOps.contain(image, (1584, 655), Image.Resampling.LANCZOS)
    canvas.paste(fitted, ((1640 - fitted.width) // 2, (701 - fitted.height) // 2))
    canvas.save(captures / (name + "-hero.png"))
