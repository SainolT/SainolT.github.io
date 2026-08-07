# -*- coding: utf-8 -*-
"""SainolT 站点图标 · 童话缝线徽章（C 方案细化）
产出：favicon 多尺寸 / apple-touch-icon / og-image 分享图
"""
import math
import random
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

random.seed(7)

OUT = Path(__file__).resolve().parent.parent / "public"
OUT.mkdir(exist_ok=True)

CREAM = (246, 240, 228, 255)
CREAM_D = (236, 227, 210, 255)
TERRA = (193, 126, 91, 255)
DEEP = (166, 98, 63, 255)
APR = (217, 166, 121, 255)
SAGE = (168, 164, 135, 255)
INK = (62, 49, 40, 255)

FDIR = Path(r"C:\Windows\Fonts")


def font(names, size):
    for n in names:
        p = FDIR / n
        if p.exists():
            return ImageFont.truetype(str(p), size)
    return ImageFont.load_default()


F_S = lambda s: font(["georgiaz.ttf", "georgiai.ttf", "georgia.ttf"], s)
F_CJK = lambda s: font(["simkai.ttf", "STKAITI.TTF", "msyh.ttc"], s)
F_CJK_B = lambda s: font(["msyhbd.ttc", "msyh.ttc", "simkai.ttf"], s)


def sparkle(draw, cx, cy, r, color):
    w = max(1.5, r * 0.26)
    draw.polygon(
        [(cx, cy - r), (cx + w, cy), (cx, cy + r), (cx - w, cy)], fill=color
    )


def dashed_rounded_ring(draw, box, radius, color, width, dash=20, gap=13, jitter=0.0):
    """规则虚线缝线：每条边/每个拐角独立均分，且每段从拐角处起针"""
    x0, y0, x1, y1 = box
    segs = [
        ("line", (x0 + radius, y0), (x1 - radius, y0)),
        ("arc", (x1 - radius, y0 + radius), radius, -90, 0),
        ("line", (x1, y0 + radius), (x1, y1 - radius)),
        ("arc", (x1 - radius, y1 - radius), radius, 0, 90),
        ("line", (x1 - radius, y1), (x0 + radius, y1)),
        ("arc", (x0 + radius, y1 - radius), radius, 90, 180),
        ("line", (x0, y1 - radius), (x0, y0 + radius)),
        ("arc", (x0 + radius, y0 + radius), radius, 180, 270),
    ]
    period = dash + gap

    def stitch(path):
        cum = [0.0]
        for i in range(1, len(path)):
            cum.append(
                cum[-1] + math.hypot(path[i][0] - path[i - 1][0], path[i][1] - path[i - 1][1])
            )
        L = cum[-1]
        if L <= 0:
            return
        n = max(1, round(L / period))
        g = (L - n * dash) / n  # 均分后的间距，段首必为一段完整虚线

        def point_at(dist):
            lo, hi = 0, len(cum) - 1
            while lo < hi:
                mid = (lo + hi) // 2
                if cum[mid] < dist:
                    lo = mid + 1
                else:
                    hi = mid
            i = max(1, lo)
            seg = cum[i] - cum[i - 1]
            t = 0.0 if seg == 0 else (dist - cum[i - 1]) / seg
            p0, p1 = path[i - 1], path[i]
            return (p0[0] + (p1[0] - p0[0]) * t, p0[1] + (p1[1] - p0[1]) * t)

        for k in range(n):
            d0 = k * (dash + g)
            steps = max(2, int(dash / 3))
            pts = [point_at(min(d0 + dash * j / steps, L)) for j in range(steps + 1)]
            draw.line(pts, fill=color, width=width, joint="curve")

    for s in segs:
        if s[0] == "line":
            (_, (ax, ay), (bx, by)) = s
            ln = math.hypot(bx - ax, by - ay)
            m = max(2, int(ln / 2))
            path = [
                (ax + (bx - ax) * i / (m - 1), ay + (by - ay) * i / (m - 1))
                for i in range(m)
            ]
        else:
            (_, (cx, cy), r, a0, a1) = s
            sweep = math.radians(a1 - a0)
            m = max(4, int(abs(sweep) * r / 2))
            path = [
                (
                    cx + r * math.cos(math.radians(a0) + sweep * i / (m - 1)),
                    cy + r * math.sin(math.radians(a0) + sweep * i / (m - 1)),
                )
                for i in range(m)
            ]
        stitch(path)


def make_badge(size=512):
    """童话缝线徽章：奶油纸贴纸 + 陶土徽章 + 缝线环 + S + 月亮星星"""
    S = size
    img = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)

    m = S * 0.05  # 奶油贴纸外框
    d.rounded_rectangle([m, m, S - m, S - m], radius=S * 0.21, fill=CREAM)
    d.rounded_rectangle(
        [m, m, S - m, S - m], radius=S * 0.21, outline=CREAM_D, width=max(2, S // 170)
    )

    bx0, by0, bx1, by1 = S * 0.125, S * 0.115, S * 0.875, S * 0.875
    rad = S * 0.17
    depth = S * 0.028
    # 底部厚度（深陶土）
    d.rounded_rectangle([bx0, by0 + depth, bx1, by1 + depth], radius=rad, fill=DEEP)
    # 徽章主体
    d.rounded_rectangle([bx0, by0, bx1, by1], radius=rad, fill=TERRA)

    # 缝线环
    inset = S * 0.055
    dashed_rounded_ring(
        d,
        (bx0 + inset, by0 + inset, bx1 - inset, by1 - inset),
        radius=rad * 0.62,
        color=CREAM,
        width=max(3, S // 110),
        dash=int(S * 0.045),
        gap=int(S * 0.028),
    )

    # 字母 S（带柔和投影）
    f = F_S(int(S * 0.46))
    tmp = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    td = ImageDraw.Draw(tmp)
    bb = td.textbbox((0, 0), "S", font=f)
    tw, th = bb[2] - bb[0], bb[3] - bb[1]
    tx = (S - tw) / 2 - bb[0]
    ty = (by0 + by1 - th) / 2 - bb[1] - S * 0.01
    td.text((tx + S * 0.012, ty + S * 0.014), "S", font=f, fill=(120, 60, 35, 110))
    tmp = tmp.filter(ImageFilter.GaussianBlur(S * 0.006))
    img.alpha_composite(tmp)
    d = ImageDraw.Draw(img)
    d.text((tx, ty), "S", font=f, fill=CREAM)

    # 童话元素：弯月与星光全部收进缝线环内部，不遮挡缝线
    mx, my, mr = S * 0.70, S * 0.28, S * 0.07
    d.ellipse([mx - mr, my - mr, mx + mr, my + mr], fill=APR)
    off = mr * 0.55
    d.ellipse(
        [mx - mr + off, my - mr - off * 0.7, mx + mr + off, my + mr - off * 0.7],
        fill=TERRA,
    )
    sparkle(d, S * 0.60, S * 0.245, S * 0.03, CREAM)
    sparkle(d, S * 0.775, S * 0.375, S * 0.022, CREAM)
    sparkle(d, S * 0.225, S * 0.775, S * 0.034, SAGE)
    sparkle(d, S * 0.285, S * 0.705, S * 0.019, CREAM)

    return img


def make_apple_touch(size=180):
    img = Image.new("RGBA", (size, size), CREAM)
    badge = make_badge(512).resize((int(size * 0.94), int(size * 0.94)), Image.LANCZOS)
    img.alpha_composite(badge, ((size - badge.width) // 2, (size - badge.height) // 2))
    return img.convert("RGB")


RABBIT_COLORS = {"B": "#E8C9A0", "P": "#C17E5B", "K": "#3E3128"}
RABBIT_MAP = [
    "..BB....BB..",
    "..BP....PB..",
    "..BB....BB..",
    ".BBBBBBBBBB.",
    "BBBBBBBBBBBB",
    "BBKBBBBBBKBB",
    "BBBBBPPBBBBB",
    "BBBBBPPBBBBB",
    ".BBBBBBBBBB.",
    "..BBBBBBBB..",
]


def hex_rgba(h):
    h = h.lstrip("#")
    return tuple(int(h[i : i + 2], 16) for i in (0, 2, 4)) + (255,)


def draw_pixel_animal(base, cmap, amap, cell, ox, oy, sticker=True):
    d = ImageDraw.Draw(base)
    pad = max(2, cell // 5)
    for r, row in enumerate(amap):
        for c, ch in enumerate(row):
            if ch == "." or ch not in cmap:
                continue
            x0, y0 = ox + c * cell, oy + r * cell
            if sticker:
                d.rounded_rectangle(
                    [x0 - pad, y0 - pad, x0 + cell + pad, y0 + cell + pad],
                    radius=pad + 1,
                    fill=CREAM,
                )
            d.rounded_rectangle(
                [x0, y0, x0 + cell - 1, y0 + cell - 1],
                radius=max(1, cell // 5),
                fill=hex_rgba(cmap[ch]),
            )


def make_og():
    W, H = 1200, 630
    img = Image.new("RGB", (W, H), CREAM[:3])
    d = ImageDraw.Draw(img)

    # 纸质噪点纹理
    noise = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    nd = ImageDraw.Draw(noise)
    for _ in range(2600):
        x, y = random.randint(0, W - 1), random.randint(0, H - 1)
        a = random.randint(4, 14)
        nd.point((x, y), fill=(120, 90, 60, a))
    img.paste(Image.alpha_composite(img.convert("RGBA"), noise).convert("RGB"), (0, 0))
    d = ImageDraw.Draw(img)

    # 背景散落的星光小点
    for _ in range(26):
        x, y = random.randint(20, W - 20), random.randint(20, H - 20)
        c = random.choice([SAGE, APR, CREAM_D])
        sparkle(d, x, y, random.randint(3, 7), c)

    # 徽章（轻微旋转 + 纸胶带）
    badge = make_badge(512).resize((330, 330), Image.LANCZOS).rotate(
        4, expand=True, resample=Image.BICUBIC
    )
    bx, by = 105, 150
    shadow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    sd = ImageDraw.Draw(shadow)
    sd.rounded_rectangle(
        [bx + 10, by + 14, bx + badge.width + 4, by + badge.height + 8],
        radius=70,
        fill=(90, 60, 40, 60),
    )
    shadow = shadow.filter(ImageFilter.GaussianBlur(10))
    img.paste(Image.alpha_composite(img.convert("RGBA"), shadow).convert("RGB"), (0, 0))
    img.paste(badge, (bx, by), badge)
    d = ImageDraw.Draw(img)
    # 纸胶带
    tape = Image.new("RGBA", (150, 42), APR[:3] + (150,))
    tape1 = tape.rotate(-32, expand=True, resample=Image.BICUBIC)
    tape2 = tape.rotate(38, expand=True, resample=Image.BICUBIC)
    img.paste(tape1, (bx - 30, by - 18), tape1)
    img.paste(tape2, (bx + badge.width - 70, by - 22), tape2)
    d = ImageDraw.Draw(img)

    # 右侧文字区（极简：名字 + 职业）
    tx = 540
    d.text((tx, 230), "SainolT", font=F_S(112), fill=INK[:3])
    d.text((tx + 6, 380), "games and ideas", font=F_S(46), fill=TERRA[:3])

    # 右下角：弯月 + 星光呼应徽章
    mcx, mcy, mr = tx + 500, 510, 34
    d.ellipse([mcx - mr, mcy - mr, mcx + mr, mcy + mr], fill=APR[:3])
    off = mr * 0.55
    d.ellipse(
        [mcx - mr + off, mcy - mr - off * 0.7, mcx + mr + off, mcy + mr - off * 0.7],
        fill=CREAM[:3],
    )
    sparkle(d, mcx - 70, mcy - 26, 9, SAGE)
    sparkle(d, mcx + 52, mcy + 34, 7, APR)
    sparkle(d, mcx + 74, mcy - 40, 5, SAGE)

    return img


def main():
    badge = make_badge(512)
    badge.save(OUT / "icon-512.png")
    badge.resize((192, 192), Image.LANCZOS).save(OUT / "icon-192.png")
    badge.resize((32, 32), Image.LANCZOS).save(OUT / "favicon-32.png")
    badge.resize((16, 16), Image.LANCZOS).save(OUT / "favicon-16.png")
    badge.save(OUT / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
    make_apple_touch(180).save(OUT / "apple-touch-icon.png")
    make_og().save(OUT / "og-image.png")

    # 预览拼图：徽章 + 16/32 小图 + OG 缩略
    sheet = Image.new("RGB", (1200, 700), CREAM[:3])
    sheet.paste(badge.resize((300, 300), Image.LANCZOS), (30, 30))
    sheet.paste(badge.resize((64, 64), Image.LANCZOS), (30, 350))
    sheet.paste(badge.resize((32, 32), Image.LANCZOS), (110, 366))
    sheet.paste(badge.resize((16, 16), Image.LANCZOS), (158, 374))
    og = Image.open(OUT / "og-image.png").resize((760, 399), Image.LANCZOS)
    sheet.paste(og, (380, 30))
    sheet.save(Path(__file__).resolve().parent / "preview-sheet.png")
    print("done ->", OUT)


if __name__ == "__main__":
    main()
