# AgentHost Mini - Icon Assets

## Source File

**icon.svg** - Vector source file (128x128 base size)

This is the master icon design featuring:
- Purple gradient background (#667eea to #764ba2)
- White magnifying glass representing research
- AI sparkle/star in the center representing AI-powered intelligence
- Clean, modern, professional design

## Required PNG Exports

For Chrome Web Store submission, the following PNG files are required:

### Sizes Needed
- **icon-16.png** - 16x16px (extension toolbar)
- **icon-48.png** - 48x48px (extension management page)
- **icon-128.png** - 128x128px (Chrome Web Store listing)

## How to Generate PNGs

### Option 1: Online Converter (Easiest - 2 minutes)
1. Go to https://svgtopng.com/ or https://cloudconvert.com/svg-to-png
2. Upload `icon.svg`
3. Set size to 128x128 → Download as `icon-128.png`
4. Repeat for 48x48 → `icon-48.png`
5. Repeat for 16x16 → `icon-16.png`
6. Place all PNG files in `/icons/` directory

### Option 2: ImageMagick (CLI)
```bash
cd icons
convert icon.svg -resize 16x16 icon-16.png
convert icon.svg -resize 48x48 icon-48.png
convert icon.svg -resize 128x128 icon-128.png
```

### Option 3: Inkscape (CLI)
```bash
cd icons
inkscape icon.svg --export-filename=icon-16.png -w 16 -h 16
inkscape icon.svg --export-filename=icon-48.png -w 48 -h 48
inkscape icon.svg --export-filename=icon-128.png -w 128 -h 128
```

### Option 4: rsvg-convert (CLI)
```bash
cd icons
rsvg-convert -w 16 -h 16 icon.svg -o icon-16.png
rsvg-convert -w 48 -h 48 icon.svg -o icon-48.png
rsvg-convert -w 128 -h 128 icon.svg -o icon-128.png
```

### Option 5: Python Script (Included - Used for Current PNGs)
```bash
cd icons
# Create virtual environment (first time only)
uv venv .venv
source .venv/bin/activate
uv pip install cairosvg

# Run conversion script
python3 convert_svg_to_png.py
```

This script automatically converts all three icon sizes and is the method used to generate the current PNG files.

## After Generating PNGs

1. Verify all 3 PNG files are in `/icons/` directory
2. Check that they look crisp at their respective sizes
3. Update `manifest.json` to reference the PNG files (if needed)
4. Commit all files to Git
5. Use `icon-128.png` for Chrome Web Store promotional images

## Current Status

- ✅ SVG source file created with professional design
- ✅ PNG exports completed (icon-16.png, icon-48.png, icon-128.png)
- ✅ Manifest updated to reference PNG files
- ✅ Conversion script included (convert_svg_to_png.py)

## Design Notes

The icon design balances several requirements:
- **Recognizable** - Magnifying glass is universally understood for search/research
- **Modern** - Gradient background and clean lines
- **Brand-aligned** - Uses AgentHost brand colors
- **Scalable** - Vector design ensures quality at all sizes
- **Distinctive** - AI sparkle differentiates from generic search icons

The white-on-gradient approach ensures high contrast and readability even at 16x16 pixels.

---

**Created by:** Forge AI Agent  
**Date:** 2026-02-20  
**License:** MIT (same as project)
