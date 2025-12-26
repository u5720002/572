#!/usr/bin/env python3
"""
YouTube Short Video AI Generator
Creates a 3-minute AI-generated video suitable for YouTube Shorts
"""

import os
import sys
from pathlib import Path
from datetime import datetime

try:
    from moviepy import (
        VideoClip, 
        TextClip, 
        CompositeVideoClip,
        concatenate_videoclips
    )
    from PIL import Image, ImageDraw, ImageFont
    import numpy as np
except ImportError as e:
    print(f"Error: Required libraries not installed: {e}")
    print("Please install dependencies: pip install -r requirements.txt")
    sys.exit(1)


class YouTubeShortGenerator:
    """AI-powered YouTube Short video generator"""
    
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
        
    def generate_background(self, t):
        """
        Generate animated background frame
        
        Args:
            t (float): Time in seconds
            
        Returns:
            numpy.ndarray: RGB frame
        """
        # Create gradient background that changes over time
        frame = np.zeros((self.height, self.width, 3), dtype=np.uint8)
        
        # Dynamic color gradient
        for y in range(self.height):
            # Colors shift based on time
            r = int(128 + 127 * np.sin(2 * np.pi * t / 10 + y / self.height))
            g = int(128 + 127 * np.sin(2 * np.pi * t / 15 + y / self.height + 2))
            b = int(128 + 127 * np.sin(2 * np.pi * t / 20 + y / self.height + 4))
            frame[y, :] = [r, g, b]
            
        return frame
    
    def create_text_overlay(self, text, position='center', fontsize=70, color='white'):
        """
        Create text overlay for video
        
        Args:
            text (str): Text to display
            position (str): Text position ('center', 'top', 'bottom')
            fontsize (int): Font size
            color (str): Text color
            
        Returns:
            TextClip: MoviePy TextClip object
        """
        try:
            txt_clip = TextClip(
                text=text,
                font_size=fontsize,
                color=color,
                size=(self.width - 100, None),
                method='caption',
                text_align='center',
                horizontal_align='center'
            )
            
            # Position the text
            if position == 'center':
                txt_clip = txt_clip.with_position('center')
            elif position == 'top':
                txt_clip = txt_clip.with_position(('center', 100))
            elif position == 'bottom':
                txt_clip = txt_clip.with_position(('center', self.height - 300))
            
            return txt_clip
        except Exception as e:
            print(f"Warning: Could not create text clip: {e}")
            # Fallback to simple text
            return None
    
    def generate_video_content(self):
        """
        Generate the main video content with AI-like animations
        
        Returns:
            VideoClip: The generated video clip
        """
        print("Generating AI-powered video content...")
        
        # Create animated background
        background = VideoClip(
            frame_function=self.generate_background,
            duration=self.duration
        ).with_fps(self.fps)
        
        clips = [background]
        
        # Add text overlays at different timestamps
        segments = [
            {
                'text': 'AI Generated\nYouTube Short',
                'start': 0,
                'duration': 5,
                'position': 'center',
                'fontsize': 80
            },
            {
                'text': 'Welcome to the Future\nof Content Creation',
                'start': 5,
                'duration': 8,
                'position': 'center',
                'fontsize': 60
            },
            {
                'text': 'Powered by AI\n✨',
                'start': 13,
                'duration': 7,
                'position': 'center',
                'fontsize': 70
            },
            {
                'text': 'Creating Engaging\nVideo Content',
                'start': 20,
                'duration': 160,
                'position': 'top',
                'fontsize': 50
            }
        ]
        
        for segment in segments:
            try:
                txt_clip = self.create_text_overlay(
                    segment['text'],
                    position=segment['position'],
                    fontsize=segment['fontsize']
                )
                
                if txt_clip:
                    txt_clip = txt_clip.with_start(segment['start'])
                    txt_clip = txt_clip.with_duration(segment['duration'])
                    clips.append(txt_clip)
            except Exception as e:
                print(f"Warning: Could not add text segment: {e}")
        
        # Composite all clips
        final_video = CompositeVideoClip(clips, size=(self.width, self.height))
        
        return final_video
    
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
        
        # Generate video content
        video = self.generate_video_content()
        
        # Write video file
        print(f"Writing video to: {output_path}")
        video.write_videofile(
            str(output_path),
            fps=self.fps,
            codec='libx264',
            audio=False,
            preset='medium',
            threads=4
        )
        
        print(f"✅ Video generated successfully: {output_path}")
        print(f"📊 File size: {output_path.stat().st_size / (1024*1024):.2f} MB")
        
        return str(output_path)


def main():
    """Main entry point"""
    print("=" * 60)
    print("YouTube Short Video AI Generator")
    print("=" * 60)
    print()
    
    # Create generator with 3-minute duration
    generator = YouTubeShortGenerator(duration=180)
    
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
