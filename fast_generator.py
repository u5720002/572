#!/usr/bin/env python3
"""
Fast YouTube Short Video AI Generator
Creates a 3-minute video with simpler, faster generation
"""

import sys
from pathlib import Path
from datetime import datetime

try:
    from moviepy import ColorClip, TextClip, CompositeVideoClip, concatenate_videoclips
except ImportError as e:
    print(f"Error: Required libraries not installed: {e}")
    print("Please install dependencies: pip install -r requirements.txt")
    sys.exit(1)


class FastYouTubeShortGenerator:
    """Fast AI-powered YouTube Short video generator"""
    
    def __init__(self, duration=180):
        """
        Initialize the video generator
        
        Args:
            duration (int): Video duration in seconds (default: 180 = 3 minutes)
        """
        self.duration = duration
        self.fps = 30
        self.width = 1080
        self.height = 1920  # Vertical format for YouTube Shorts
        self.output_dir = Path("output")
        self.output_dir.mkdir(exist_ok=True)
        
    def create_text_clip(self, text, duration, fontsize=70, color='white', bg_color=None):
        """
        Create a text clip
        
        Args:
            text (str): Text to display
            duration (float): Duration in seconds
            fontsize (int): Font size
            color (str): Text color
            bg_color (tuple): Background RGB color
            
        Returns:
            CompositeVideoClip: Video clip with text
        """
        # Create colored background
        if bg_color is None:
            bg_color = (50, 100, 150)
        
        background = ColorClip(
            size=(self.width, self.height),
            color=bg_color,
            duration=duration
        )
        
        # Add text overlay
        try:
            txt = TextClip(
                text=text,
                font_size=fontsize,
                color=color,
                size=(self.width - 200, None),
                method='caption',
                text_align='center',
                horizontal_align='center',
                vertical_align='center'
            ).with_duration(duration).with_position('center')
            
            return CompositeVideoClip([background, txt], size=(self.width, self.height))
        except Exception as e:
            print(f"Warning: Could not create text overlay: {e}")
            return background
    
    def generate(self, output_filename=None):
        """
        Generate and save the YouTube Short video
        
        Args:
            output_filename (str): Output filename (optional)
            
        Returns:
            str: Path to the generated video file
        """
        if output_filename is None:
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            output_filename = f"youtube_short_{timestamp}.mp4"
        
        output_path = self.output_dir / output_filename
        
        print(f"Starting video generation...")
        print(f"Duration: {self.duration} seconds ({self.duration/60:.1f} minutes)")
        print(f"Resolution: {self.width}x{self.height} (YouTube Shorts format)")
        print()
        
        # Create video segments
        print("Generating video segments...")
        clips = []
        
        # Opening segment (5 seconds)
        clips.append(self.create_text_clip(
            "AI Generated\nYouTube Short",
            duration=5,
            fontsize=80,
            bg_color=(30, 60, 120)
        ))
        
        # Segment 2 (8 seconds)
        clips.append(self.create_text_clip(
            "Welcome to the Future\nof Content Creation",
            duration=8,
            fontsize=65,
            bg_color=(60, 30, 120)
        ))
        
        # Segment 3 (7 seconds)
        clips.append(self.create_text_clip(
            "Powered by AI ✨",
            duration=7,
            fontsize=75,
            bg_color=(120, 30, 90)
        ))
        
        # Calculate remaining time for main content
        remaining_time = self.duration - 20
        
        if remaining_time > 0:
            # Main content segment
            clips.append(self.create_text_clip(
                "Creating Engaging\nVideo Content\nAutomatically",
                duration=remaining_time,
                fontsize=60,
                bg_color=(40, 100, 80)
            ))
        
        print(f"Concatenating {len(clips)} segments...")
        final_video = concatenate_videoclips(clips, method="compose")
        
        # Write video file
        print(f"Writing video to: {output_path}")
        final_video.write_videofile(
            str(output_path),
            fps=self.fps,
            codec='libx264',
            audio=False,
            preset='ultrafast',  # Faster encoding
            threads=4
        )
        
        print(f"✅ Video generated successfully: {output_path}")
        file_size = output_path.stat().st_size / (1024*1024)
        print(f"📊 File size: {file_size:.2f} MB")
        
        return str(output_path)


def main():
    """Main entry point"""
    print("=" * 60)
    print("Fast YouTube Short Video AI Generator")
    print("=" * 60)
    print()
    
    # Create generator with 3-minute duration
    generator = FastYouTubeShortGenerator(duration=180)
    
    # Generate the video
    output_file = generator.generate()
    
    print()
    print("=" * 60)
    print("Generation Complete!")
    print("=" * 60)
    print(f"Your YouTube Short is ready: {output_file}")
    print()
    print("📱 Video Specifications:")
    print("   - Duration: 3 minutes (180 seconds)")
    print("   - Format: MP4 (H.264)")
    print("   - Resolution: 1080x1920 (9:16 vertical)")
    print("   - FPS: 30")
    print()
    print("🎬 Ready to upload to YouTube Shorts!")


if __name__ == "__main__":
    main()
