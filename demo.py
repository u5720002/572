#!/usr/bin/env python3
"""
Quick demo script for YouTube Short Video AI Generator
Creates a minimal demonstration video
"""

from youtube_short_generator import YouTubeShortGenerator

if __name__ == "__main__":
    print("=" * 60)
    print("YouTube Short Video AI Generator - Demo")
    print("=" * 60)
    print()
    print("Note: This is a demonstration script that creates a")
    print("short 5-second video for testing purposes.")
    print()
    print("For the full 3-minute YouTube Short, run:")
    print("  python youtube_short_generator.py")
    print()
    print("=" * 60)
    print()
    
    # Create a 5-second demo video for quick testing
    generator = YouTubeShortGenerator(duration=5)
    output_file = generator.generate(output_filename="demo_short.mp4")
    
    print()
    print("=" * 60)
    print("Demo video created successfully!")
    print(f"Output: {output_file}")
    print("=" * 60)
