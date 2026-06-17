9-Grid Instagram Campaign
Generate a fully planned, on-brand 9-post Instagram grid — tile-by-tile plan first, then parallel generation, then stitched into one 3×3 preview image.
Step 1: Read Brand Context
Load generateImage skill via skills_load — follow its prompt-craft guidance for all generation steps.
Read the brand codex via asset_card_read. Extract:
Color palette (primary, secondary, accent, neutrals)
Typography (headline font, body font, hierarchy rules)
Art direction rules (lighting style, shadow treatment, tone)
Grid system rules if present
Then read each persona/character asset card listed in the brand codex sub-assets. Extract per persona:
Physical description (hair, skin tone, features, age)
Style/wardrobe signature
Energy/attitude
Reference image asset IDs
Also read the hero product asset card. Extract:
Product label identity details
Product image asset IDs
Do this silently. Do not summarize to the user.
Step 2: Gather Campaign Brief
If the user has already provided a brief in the same message — proceed directly to Step 3.
If no brief provided, ask (one message, all at once):
Three quick things:1) Theme / moment — what's this grid about? (e.g. launch, season, food pairing, cultural moment)
2) Copy — any specific phrases you want, or should I write everything?
3) Persona — any preference, or should I decide based on the brief?
Wait for response before continuing.
Step 3: Plan the 9 Tiles
Design the full grid plan. Follow these system rules:
Grid system rules:
9 tiles in 3×3 layout — each tile is 4:5 aspect ratio
Color rhythm: no two identical background tones side by side (horizontally or vertically)
Content balance: mix of ~4 lifestyle photos, ~2–3 typographic/graphic tiles, ~1–2 product-only tiles
Tile roles (assign one per tile): HERO STATEMENT · FOOD MOMENT · TYPO PUNCH · PRODUCT HERO · MAIN POST · LIFESTYLE CHAOS · GRAPHIC PLAY · DETAIL/MACRO · CTA/TAGLINE
Persona assignment: assign personas to lifestyle/food tiles based on brief energy
Copy: write all copy in brand voice — bold, confident, short
Build order: generate anchor lifestyle tile (tile 5) first, then photos, then graphic tiles
Present the plan as a table with columns: Tile · Role · Persona · Visual · Copy · Color
Then state the color rhythm check and content balance check.
⏸ Pause — Ask: "Looks good? I'll generate all 9 once you confirm."
Wait for approval before generating.
Step 4: Generate All 9 Tiles
Load generateImage skill via skills_load — follow its 5-block prompt structure exactly.
Generate all 9 tiles in parallel using image_generate. For each tile:
Prompt structure (follow for every tile):
Per tile type:
Lifestyle/food photos — editorial, warm amber-golden light, single hard key light, near-black graphic shadows, no cold tones, no grey shadows, no extra limbs
Graphic/typographic tiles — flat solid background color, bold condensed headline font, product bottle small and sharp with hard shadow, no gradients or textures
Product hero — studio lighting, hard diagonal shadow, clean background
Macro/detail — near-black background, warm translucent sauce glow, high contrast
Pass relevant persona reference image IDs and product image IDs as referenceAssetIds for each tile (lifestyle and food tiles need persona refs + product ref; graphic tiles need product ref only; macro tiles need product ref only).
Track each tile's returned assetId — needed for stitching.
Step 5: Stitch Into Grid
Stage all 9 tile assets into the sandbox via sandbox_stage_files (tile 1 → /workspace/t1.jpg through tile 9 → /workspace/t9.jpg).
Run bash with the following Python script:
Set outputs to export /workspace/grid.jpg.
Upload the stitched grid via sandbox_upload_assets. Return the grid image inline using Markdown.
Step 6: Deliver
Display the stitched grid image.
Below it, present the tile map:
Row 1: Tile 1 · Tile 2 · Tile 3
Row 2: Tile 4 · Tile 5 · Tile 6
Row 3: Tile 7 · Tile 8 · Tile 9
Suggest next steps: refine specific tiles, swap copy, generate individual tiles at higher resolution.
Error Handling
Brand codex not found: Ask user to confirm the active brand workspace before proceeding
Tile generation fails: Note which tile failed, continue with remaining tiles, flag for retry at end
Stitch script fails: Check that all 9 asset IDs were successfully retrieved before staging; retry missing tiles
Persona card not found: Use brand codex description text only, omit reference image IDs for that tile
Execution Rules
Complete Step 1 (brand read) silently before any user interaction
Never generate before Step 3 plan is approved
Generate all 9 tiles in parallel in Step 4 — do NOT generate sequentially
Never hardcode colors, fonts, or copy — always derive from brand codex read in Step 1
Never hardcode asset IDs — always extract from asset card reads
Follow generateImage skill prompt-craft rules for every tile