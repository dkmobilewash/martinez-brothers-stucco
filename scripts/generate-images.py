"""
Generates brand assets and PLACEHOLDER photos into public/images.

Brand assets come from brand/logo-source.png (the owner's logo).
The "photos" are procedurally generated stucco-texture placeholders because
real project photography has not been supplied yet.
TODO: replace placeholders in public/images/{hero,services,locations,blog}
with real, optimized photos (keep the same file names and widths).

Run: python3 scripts/generate-images.py
"""
import math
import random
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageChops

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "images"
LOGO_SRC = ROOT / "brand" / "logo-source.png"

WIDTHS = [640, 1024, 1400]

SERVICES = [
    "stucco-installation", "stucco-replacement", "residential-stucco", "commercial-stucco",
    "stucco-remodeling", "stucco-repairs", "eifs-synthetic-stucco", "stucco-painting",
]
LOCATIONS = [
    "albuquerque", "rio-rancho", "corrales", "las-lunas",
    "los-ranchos-de-albuquerque", "northeast-heights",
]

# Warm desert stucco tones
PALETTE = [
    (214, 184, 150), (196, 154, 112), (226, 204, 176), (184, 140, 104),
    (205, 170, 132), (232, 216, 192), (176, 128, 92), (219, 192, 160),
]


def trim_white(img: Image.Image) -> Image.Image:
    bg = Image.new(img.mode, img.size, (255, 255, 255))
    diff = ImageChops.difference(img, bg).convert("L").point(lambda p: 255 if p > 18 else 0)
    bbox = diff.getbbox()
    return img.crop(bbox) if bbox else img


def white_to_alpha(img: Image.Image) -> Image.Image:
    rgba = img.convert("RGBA")
    px = rgba.load()
    w, h = rgba.size
    for y in range(h):
        for x in range(w):
            r, g, b, _ = px[x, y]
            m = min(r, g, b)
            if m > 235:
                a = int(max(0, 255 - (m - 235) * 12.75))
                px[x, y] = (r, g, b, a)
    return rgba


def brand_assets() -> None:
    src = Image.open(LOGO_SRC).convert("RGB")
    logo = trim_white(src)
    logo_alpha = white_to_alpha(logo)
    for w in (320, 640):
        h = round(logo.height * w / logo.width)
        logo_alpha.resize((w, h), Image.LANCZOS).save(OUT / f"logo-{w}.webp", "WEBP", quality=90)
    logo_alpha.resize((640, round(logo.height * 640 / logo.width)), Image.LANCZOS).save(OUT / "logo.png")
    print("logo", logo.size)

    # Emblem = left circular mark of the logo
    emblem = trim_white(logo.crop((0, 0, int(logo.height * 1.06), logo.height)))
    side = max(emblem.size)
    sq = Image.new("RGB", (side, side), (255, 255, 255))
    sq.paste(emblem, ((side - emblem.width) // 2, (side - emblem.height) // 2))
    sq_alpha = white_to_alpha(sq)
    sq_alpha.resize((160, 160), Image.LANCZOS).save(OUT / "emblem-160.webp", "WEBP", quality=90)

    pub = ROOT / "public"
    padded = Image.new("RGB", (int(side * 1.1), int(side * 1.1)), (255, 255, 255))
    padded.paste(sq, ((padded.width - side) // 2, (padded.height - side) // 2))
    padded.resize((180, 180), Image.LANCZOS).save(pub / "apple-touch-icon.png")
    padded.resize((512, 512), Image.LANCZOS).save(pub / "icon-512.png")
    padded.resize((192, 192), Image.LANCZOS).save(pub / "icon-192.png")
    padded.resize((48, 48), Image.LANCZOS).save(pub / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
    padded.resize((32, 32), Image.LANCZOS).save(pub / "favicon-32.png")

    # Open Graph image 1200x630
    og = Image.new("RGB", (1200, 630), (255, 255, 255))
    d = ImageDraw.Draw(og)
    d.rectangle([0, 580, 1200, 630], fill=(160, 78, 47))
    lw = 1040
    lh = round(logo.height * lw / logo.width)
    og.paste(logo.resize((lw, lh), Image.LANCZOS), ((1200 - lw) // 2, (580 - lh) // 2))
    og.save(OUT / "og-image.jpg", "JPEG", quality=88, optimize=True)


def stucco_texture(w: int, h: int, seed: int) -> Image.Image:
    rnd = random.Random(seed)
    base = PALETTE[seed % len(PALETTE)]
    accent = PALETTE[(seed * 3 + 1) % len(PALETTE)]
    # vertical light gradient (sun from upper left)
    img = Image.new("RGB", (w, h))
    d = ImageDraw.Draw(img)
    for y in range(h):
        t = y / max(1, h - 1)
        c = tuple(int(base[i] * (1.08 - 0.22 * t) + accent[i] * 0.0) for i in range(3))
        d.line([(0, y), (w, y)], fill=tuple(min(255, v) for v in c))
    # coarse aggregate noise
    noise = Image.effect_noise((w, h), 48).convert("L")
    noise = noise.filter(ImageFilter.GaussianBlur(1.1))
    fine = Image.effect_noise((w, h), 30).convert("L")
    tex = ImageChops.blend(noise, fine, 0.5)
    emb = tex.filter(ImageFilter.EMBOSS).filter(ImageFilter.GaussianBlur(0.6))
    emb_rgb = Image.merge("RGB", (emb, emb, emb))
    img = ImageChops.overlay(img, emb_rgb)
    # trowel swirls for a hand-applied look
    swirl = Image.new("L", (w, h), 128)
    sd = ImageDraw.Draw(swirl)
    for _ in range(int(w * h / 9000)):
        cx, cy = rnd.randint(0, w), rnd.randint(0, h)
        r = rnd.randint(30, 140)
        a0 = rnd.randint(0, 360)
        shade = rnd.choice([110, 118, 138, 146])
        sd.arc([cx - r, cy - r // 2, cx + r, cy + r // 2], a0, a0 + rnd.randint(40, 140), fill=shade, width=rnd.randint(6, 18))
    swirl = swirl.filter(ImageFilter.GaussianBlur(5))
    img = ImageChops.overlay(img, Image.merge("RGB", (swirl, swirl, swirl)))
    # a parapet-style horizontal shadow band and a "canale" accent to suggest architecture
    shade = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    shd = ImageDraw.Draw(shade)
    band_y = int(h * (0.12 + 0.1 * (seed % 3)))
    shd.rectangle([0, band_y, w, band_y + max(6, h // 60)], fill=(60, 35, 20, 70))
    shd.rectangle([0, 0, w, band_y], fill=(140, 190, 230, 120))  # sky strip
    img = Image.alpha_composite(img.convert("RGBA"), shade.filter(ImageFilter.GaussianBlur(2))).convert("RGB")
    # soft vignette
    vig = Image.new("L", (w, h), 0)
    vd = ImageDraw.Draw(vig)
    vd.ellipse([-w * 0.25, -h * 0.25, w * 1.25, h * 1.25], fill=255)
    vig = vig.filter(ImageFilter.GaussianBlur(min(w, h) / 6))
    dark = Image.new("RGB", (w, h), (60, 40, 28))
    return Image.composite(img, dark, vig)


def responsive(name: str, seed: int, ratio: float = 9 / 16) -> None:
    master = stucco_texture(1400, round(1400 * ratio), seed)
    for w in WIDTHS:
        h = round(w * ratio)
        master.resize((w, h), Image.LANCZOS).save(OUT / f"{name}-{w}.webp", "WEBP", quality=72, method=6)


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for sub in ("hero", "services", "locations", "blog", "projects"):
        (OUT / sub).mkdir(exist_ok=True)
    brand_assets()
    responsive("hero/home", 1, 9 / 16)
    responsive("hero/about", 5, 9 / 16)
    for i, s in enumerate(SERVICES):
        responsive(f"services/{s}", 10 + i, 2 / 3)
    for i, s in enumerate(LOCATIONS):
        responsive(f"locations/{s}", 30 + i, 2 / 3)
    import re
    blog_src = (ROOT / "src" / "data" / "blog.ts").read_text()
    for i, s in enumerate(re.findall(r"^\s*slug: '([^']+)'", blog_src, re.M)):
        responsive(f"blog/{s}", 50 + i, 2 / 3)
    for i in range(1, 7):
        responsive(f"projects/placeholder-{i}", 70 + i, 3 / 4)
    print("done")


if __name__ == "__main__":
    main()
