#!/usr/bin/env python3
"""
cloudinary_url.py — build Hair Solutions Co. Cloudinary delivery URLs.

Cloud name: dtmizxj1n  ·  Delivery host: https://res.cloudinary.com/dtmizxj1n
Always injects f_auto,q_auto,dpr_auto. Can emit a srcset across a width list.
No API key required for delivery-URL construction.

Usage:
    python3 cloudinary_url.py --public-id products/mens-lace-system-7/hero \
        --transform t_hsc_hero --widths 768,1280,1600,2200 --srcset

    python3 cloudinary_url.py --public-id pages/about/studio-bench \
        --transform "c_fill,g_auto,ar_4:5"            # raw transform, single URL
"""
import argparse

CLOUD = "dtmizxj1n"
HOST = f"https://res.cloudinary.com/{CLOUD}"
ALWAYS = ["f_auto", "q_auto", "dpr_auto"]

# Convenience aliases for the named transforms (also valid as bare named transforms).
NAMED = {
    "hero": "t_hsc_hero",
    "card": "t_hsc_card",
    "thumb": "t_hsc_thumb",
    "macro": "t_hsc_macro_4x5",
}


def build_transform(transform: str, width: int | None) -> str:
    """Combine the (named or raw) transform with the always-on params and an optional width."""
    transform = NAMED.get(transform, transform)  # map shorthand -> t_hsc_*
    parts = []
    if transform:
        parts.append(transform)
    parts.extend(ALWAYS)
    if width:
        parts.append(f"w_{width}")
    return ",".join(parts)


def url_for(public_id: str, transform: str, width: int | None = None,
            resource: str = "image") -> str:
    public_id = public_id.lstrip("/")
    return f"{HOST}/{resource}/upload/{build_transform(transform, width)}/{public_id}"


def main():
    ap = argparse.ArgumentParser(description="Build a Cloudinary delivery URL.")
    ap.add_argument("--public-id", required=True,
                    help="e.g. products/mens-lace-system-7/hero")
    ap.add_argument("--transform", default="",
                    help="Named transform (t_hsc_hero|card|thumb|macro_4x5), shorthand "
                         "(hero|card|thumb|macro), or a raw param string (c_fill,g_auto,ar_4:5).")
    ap.add_argument("--widths", default="",
                    help="Comma-separated widths for a srcset, e.g. 768,1280,1600,2200")
    ap.add_argument("--srcset", action="store_true",
                    help="Emit a srcset (requires --widths).")
    ap.add_argument("--resource", default="image", choices=["image", "video"])
    args = ap.parse_args()

    widths = [int(w) for w in args.widths.split(",") if w.strip()] if args.widths else []

    if args.srcset and widths:
        lines = [f"{url_for(args.public_id, args.transform, w, args.resource)} {w}w"
                 for w in widths]
        print("srcset:")
        print(",\n".join(lines))
        # A sensible default src = largest width.
        print("\nsrc:")
        print(url_for(args.public_id, args.transform, max(widths), args.resource))
    elif widths:
        for w in widths:
            print(url_for(args.public_id, args.transform, w, args.resource))
    else:
        print(url_for(args.public_id, args.transform, None, args.resource))


if __name__ == "__main__":
    main()
