from __future__ import annotations

import os
import sys
import unittest
from pathlib import Path
from unittest.mock import patch

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))

import notion_fetch  # noqa: E402
import notion_update  # noqa: E402


class NotionHelperTests(unittest.TestCase):
    def test_token_fallback(self):
        with patch.dict(os.environ, {"NOTION_API_KEY": "fallback"}, clear=True):
            self.assertEqual(notion_fetch.notion_token(), "fallback")
            self.assertEqual(notion_update.notion_token(), "fallback")

    def test_property_flattening(self):
        page = {
            "id": "1",
            "properties": {
                "Name": {"type": "title", "title": [{"plain_text": "Hero"}]},
                "Status": {"type": "status", "status": {"name": "Ready"}},
                "Tags": {"type": "multi_select", "multi_select": [{"name": "Home"}]},
            },
        }
        row = notion_fetch.flatten_page(page)
        self.assertEqual(row["properties"]["Name"], "Hero")
        self.assertEqual(row["properties"]["Status"], "Ready")
        self.assertEqual(row["properties"]["Tags"], ["Home"])

    def test_pending_filter(self):
        row = {"properties": {"Desired": "Change copy", "Changes Applied": False}}
        self.assertTrue(notion_fetch.is_pending(row, ["Desired"], "Changes Applied"))
        row["properties"]["Changes Applied"] = True
        self.assertFalse(notion_fetch.is_pending(row, ["Desired"], "Changes Applied"))

    def test_missing_schema_is_not_pending(self):
        self.assertFalse(notion_fetch.is_pending({"properties": {}}, ["Desired"], "Changes Applied"))

    def test_pagination_shape(self):
        responses = [
            {"results": [{"id": "1"}], "has_more": True, "next_cursor": "next"},
            {"results": [{"id": "2"}], "has_more": False, "next_cursor": None},
        ]
        requests = []

        def requester(url, token, payload):
            requests.append((url, token, payload))
            return responses[len(requests) - 1]

        pages = notion_fetch.query_data_source("source-id", "token", requester)
        self.assertEqual([page["id"] for page in pages], ["1", "2"])
        self.assertNotIn("start_cursor", requests[0][2])
        self.assertEqual(requests[1][2]["start_cursor"], "next")

    def test_inaccessible_data_source_is_blocking(self):
        def requester(url, token, payload):
            raise RuntimeError("Notion HTTP 404: object_not_found")

        with self.assertRaisesRegex(RuntimeError, "object_not_found"):
            notion_fetch.query_data_source("missing", "token", requester)

    def test_missing_pagination_cursor_is_blocking(self):
        def requester(url, token, payload):
            return {"results": [], "has_more": True, "next_cursor": None}

        with self.assertRaisesRegex(RuntimeError, "without next_cursor"):
            notion_fetch.query_data_source("source-id", "token", requester)


if __name__ == "__main__":
    unittest.main()
