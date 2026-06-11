#!/usr/bin/env python3
"""Build secret-free Cloudinary delivery URLs and responsive markup."""

from __future__ import annotations

import argparse
import html
import json
import os
import re
from urllib.parse import quote

DEFAULT_CLOUD = "dtmizxj1n"
SAFE_TRANSFORM = re.compile(r"^[A-Za-z0-9_!:$,./-]+$")


def clean_public_id(value: str) -> str:
    value = value.strip().lstrip("/")
    if not value or ".." in value.split("/"):
        raise ValueError("public ID must be non-empty and cannot contain '..'")
    return "/".join(quote(part, safe="@:_-.,") for part in value.split("/"))


def clean_transform(value: str) -> str:
    value = value.strip().strip("/")
    if not value or not SAFE_TRANSFORM.fullmatch(value):
        raise ValueError(f"unsafe transformation: {value!r}")
    return value


def build_url(
    public_id: str,
    cloud_name: str = DEFAULT_CLOUD,
    transforms: list[str] | None = None,
    width: int | None = None,
    height: int | None = None,
    crop: str = "limit",
    dpr_auto: bool = False,
) -> str:
    if not re.fullmatch(r"[A-Za-z0-9_-]+", cloud_name):
        raise ValueError("invalid cloud name")
    if width is not None and width <= 0:
        raise ValueError("width must be positive")
    if height is not None and height <= 0:
        raise ValueError("height must be positive")
    parts: list[str] = []
    if width or height:
        if crop not in {"limit", "fill", "fit", "scale", "thumb", "crop"}:
            raise ValueError("unsupported crop mode")
        resize = [f"c_{crop}"]
        if height:
            resize.append(f"h_{height}")
        if width:
            resize.append(f"w_{width}")
        parts.append(",".join(resize))
    parts.extend(clean_transform(item) for item in (transforms or []))
    if dpr_auto:
        parts.append("dpr_auto")
    parts.extend(["f_auto", "q_auto"])
    path = "/".join(parts)
    return (
        f"https://res.cloudinary.com/{cloud_name}/image/upload/"
        f"{path}/{clean_public_id(public_id)}"
    )


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("public_id")
    parser.add_argument("--cloud-name", default=os.getenv("CLOUDINARY_CLOUD_NAME", DEFAULT_CLOUD))
    parser.add_argument("--transform", action="append", default=[])
    parser.add_argument("--named-transform")
    parser.add_argument("--width", type=int)
    parser.add_argument("--height", type=int)
    parser.add_argument("--widths", help="comma-separated responsive widths")
    parser.add_argument("--crop", default="limit")
    parser.add_argument("--dpr-auto", action="store_true")
    parser.add_argument("--output", choices=("url", "json", "html"), default="url")
    parser.add_argument("--alt", default="")
    parser.add_argument("--sizes", default="100vw")
    parser.add_argument("--hero", action="store_true")
    args = parser.parse_args()

    transforms = list(args.transform)
    if args.named_transform:
        transforms.insert(0, f"t_{args.named_transform}")
    widths = [int(v.strip()) for v in args.widths.split(",")] if args.widths else []
    if any(width <= 0 for width in widths):
        parser.error("responsive widths must be positive")
    widths = sorted(set(widths))
    url = build_url(
        args.public_id, args.cloud_name, transforms, args.width, args.height,
        args.crop, args.dpr_auto
    )
    srcset = [
        f"{build_url(args.public_id, args.cloud_name, transforms, width, args.height, args.crop, args.dpr_auto)} {width}w"
        for width in widths
    ]
    data = {"url": url, "srcset": srcset}
    if args.output == "json":
        print(json.dumps(data, indent=2))
    elif args.output == "html":
        attrs = [
            f'src="{html.escape(url, quote=True)}"',
            f'alt="{html.escape(args.alt, quote=True)}"',
            f'sizes="{html.escape(args.sizes, quote=True)}"',
            'loading="eager"' if args.hero else 'loading="lazy"',
            'fetchpriority="high"' if args.hero else 'fetchpriority="auto"',
            'decoding="sync"' if args.hero else 'decoding="async"',
        ]
        if srcset:
            attrs.append(f'srcset="{html.escape(", ".join(srcset), quote=True)}"')
        if args.width:
            attrs.append(f'width="{args.width}"')
        if args.height:
            attrs.append(f'height="{args.height}"')
        print("<img " + " ".join(attrs) + ">")
    else:
        print(url)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
