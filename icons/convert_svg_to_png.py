#!/usr/bin/env python3
"""
Convert SVG icons to PNG format for Chrome Web Store submission.
Uses cairosvg for high-quality rasterization.
"""
import sys
import os

try:
    import cairosvg
except ImportError:
    print("Error: cairosvg not installed. Installing...")
    os.system("pip3 install --user cairosvg 2>&1 | tail -5")
    import cairosvg

def convert_svg_to_png(svg_path, png_path, width=None, height=None):
    """Convert SVG file to PNG with optional size specification."""
    try:
        cairosvg.svg2png(
            url=svg_path,
            write_to=png_path,
            output_width=width,
            output_height=height
        )
        print(f"✅ Converted {svg_path} → {png_path}")
        return True
    except Exception as e:
        print(f"❌ Failed to convert {svg_path}: {e}")
        return False

def main():
    # Get the directory where this script is located
    script_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Define icon conversions
    conversions = [
        ("icon-16.svg", "icon-16.png", 16, 16),
        ("icon-48.svg", "icon-48.png", 48, 48),
        ("icon-128.svg", "icon-128.png", 128, 128),
    ]
    
    print("Converting SVG icons to PNG format...")
    print("-" * 50)
    
    success_count = 0
    for svg_name, png_name, width, height in conversions:
        svg_path = os.path.join(script_dir, svg_name)
        png_path = os.path.join(script_dir, png_name)
        
        if not os.path.exists(svg_path):
            print(f"⚠️  Skipping {svg_name} (file not found)")
            continue
        
        if convert_svg_to_png(svg_path, png_path, width, height):
            success_count += 1
            # Get file size
            size = os.path.getsize(png_path)
            print(f"   Size: {size:,} bytes")
    
    print("-" * 50)
    print(f"\n✨ Conversion complete: {success_count}/{len(conversions)} icons converted")
    
    if success_count == len(conversions):
        print("\n✅ All icons converted successfully!")
        print("\nNext steps:")
        print("1. Verify PNG files look correct")
        print("2. Update manifest.json if needed")
        print("3. Commit to GitHub: git add icons/*.png && git commit -m 'feat: add PNG icon exports'")
        return 0
    else:
        print("\n⚠️  Some icons failed to convert. Check errors above.")
        return 1

if __name__ == "__main__":
    sys.exit(main())
