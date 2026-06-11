from __future__ import annotations

import subprocess
import sys
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))

import cloudinary_url  # noqa: E402


class CloudinaryUrlTests(unittest.TestCase):
    def test_public_id_encoding(self):
        self.assertIn("folder/my%20image.jpg", cloudinary_url.build_url("folder/my image.jpg"))

    def test_rejects_unsafe_path(self):
        with self.assertRaises(ValueError):
            cloudinary_url.build_url("folder/../secret")

    def test_transform_and_dimensions(self):
        url = cloudinary_url.build_url("hero", width=1200, height=800, crop="fill")
        self.assertIn("c_fill,h_800,w_1200", url)
        self.assertTrue(url.endswith("/f_auto/q_auto/hero"))

    def test_rejects_non_positive_dimensions(self):
        with self.assertRaises(ValueError):
            cloudinary_url.build_url("hero", width=0)

    def run_html(self, *args: str) -> str:
        return subprocess.check_output(
            [sys.executable, str(ROOT / "scripts/cloudinary_url.py"), "folder/hero.jpg", "--output", "html", *args],
            text=True,
        )

    def test_hero_markup(self):
        markup = self.run_html("--hero", "--width", "1200", "--height", "800", "--widths", "800,400,800")
        self.assertIn('loading="eager"', markup)
        self.assertIn('fetchpriority="high"', markup)
        self.assertIn('decoding="sync"', markup)
        self.assertEqual(markup.count(" 800w"), 1)

    def test_below_fold_markup(self):
        markup = self.run_html("--width", "800", "--height", "600")
        self.assertIn('loading="lazy"', markup)
        self.assertIn('fetchpriority="auto"', markup)
        self.assertIn('decoding="async"', markup)
        self.assertNotIn('fetchpriority="high"', markup)


if __name__ == "__main__":
    unittest.main()
