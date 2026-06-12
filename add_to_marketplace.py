import json
import os

marketplace_file = "/Users/vMac/03_agents/hairsolutionsco-ai-toolkit/.claude-plugin/marketplace.json"

with open(marketplace_file, "r") as f:
    data = json.load(f)

# check if seo-tools already exists
if not any(p["name"] == "seo-tools" for p in data.get("plugins", [])):
    new_plugin = {
      "name": "seo-tools",
      "source": "./plugins/seo-tools",
      "description": "SEO and Google Search Console tools for Hair Solutions Co.",
      "version": "0.1.0",
      "author": {
        "name": "Hair Solutions Co."
      }
    }
    data.setdefault("plugins", []).append(new_plugin)

    with open(marketplace_file, "w") as f:
        json.dump(data, f, indent=2)
    print("Added seo-tools to marketplace.json")
else:
    print("seo-tools already exists in marketplace.json")
