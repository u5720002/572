#!/usr/bin/env python3
"""
Script to create a 3-minute short video with animated content.
This generates a video with colorful animations, text overlays, and transitions.
"""

import cv2
import numpy as np
from datetime import datetime

# Video parameters
DURATION_SECONDS = 180  # 3 minutes
FPS = 30
WIDTH = 1280
HEIGHT = 720
OUTPUT_FILE = "short_video_3min.mp4"

# Calculate total frames
TOTAL_FRAMES = DURATION_SECONDS * FPS

print(f"Creating a {DURATION_SECONDS}-second video...")
print(f"Resolution: {WIDTH}x{HEIGHT}")
print(f"FPS: {FPS}")
print(f"Total frames: {TOTAL_FRAMES}")

# Initialize video writer
fourcc = cv2.VideoWriter_fourcc(*'mp4v')
out = cv2.VideoWriter(OUTPUT_FILE, fourcc, FPS, (WIDTH, HEIGHT))

def draw_gradient_background(frame_num, total_frames):
    """Create a gradient background that changes over time"""
    # Create a frame with gradient
    img = np.zeros((HEIGHT, WIDTH, 3), dtype=np.uint8)
    
    # Calculate color shift based on frame number
    hue_shift = int((frame_num / total_frames) * 180)
    
    for y in range(HEIGHT):
        # Create gradient from top to bottom
        ratio = y / HEIGHT
        
        # Top color (changes with time)
        color_top = np.array([hue_shift, 255, 200], dtype=np.uint8)
        # Bottom color
        color_bottom = np.array([(hue_shift + 90) % 180, 255, 100], dtype=np.uint8)
        
        # Interpolate between colors
        color = (1 - ratio) * color_top + ratio * color_bottom
        img[y, :] = color.astype(np.uint8)
    
    # Convert from HSV to BGR
    img = cv2.cvtColor(img, cv2.COLOR_HSV2BGR)
    return img

def draw_animated_shapes(img, frame_num, total_frames):
    """Draw animated shapes on the frame"""
    # Calculate animation progress
    progress = frame_num / total_frames
    
    # Rotating circle
    center_x = int(WIDTH // 2 + np.cos(progress * 4 * np.pi) * 200)
    center_y = int(HEIGHT // 2 + np.sin(progress * 4 * np.pi) * 100)
    radius = int(50 + 30 * np.sin(progress * 8 * np.pi))
    cv2.circle(img, (center_x, center_y), radius, (255, 255, 255), -1)
    
    # Pulsing squares
    for i in range(4):
        angle = (progress * 2 * np.pi) + (i * np.pi / 2)
        x = int(WIDTH // 2 + np.cos(angle) * 300)
        y = int(HEIGHT // 2 + np.sin(angle) * 200)
        size = int(40 + 20 * np.sin(progress * 10 * np.pi + i))
        
        cv2.rectangle(img, 
                     (x - size, y - size), 
                     (x + size, y + size), 
                     (200, 200, 255), 
                     -1)
    
    return img

def draw_text_overlay(img, frame_num, total_frames):
    """Add text overlay with information"""
    elapsed = frame_num / FPS
    remaining = DURATION_SECONDS - elapsed
    
    # Title text
    title = "3-Minute Short Video"
    font = cv2.FONT_HERSHEY_SIMPLEX
    cv2.putText(img, title, (WIDTH // 2 - 250, 80), 
                font, 1.5, (255, 255, 255), 3)
    
    # Time information
    time_text = f"Time: {int(elapsed)}s / {DURATION_SECONDS}s"
    cv2.putText(img, time_text, (50, HEIGHT - 50), 
                font, 1, (255, 255, 255), 2)
    
    # Progress bar
    bar_width = WIDTH - 100
    bar_height = 20
    bar_x = 50
    bar_y = HEIGHT - 100
    
    # Background bar
    cv2.rectangle(img, (bar_x, bar_y), 
                 (bar_x + bar_width, bar_y + bar_height), 
                 (100, 100, 100), -1)
    
    # Progress bar
    progress_width = int((frame_num / total_frames) * bar_width)
    cv2.rectangle(img, (bar_x, bar_y), 
                 (bar_x + progress_width, bar_y + bar_height), 
                 (0, 255, 0), -1)
    
    return img

def draw_scene_marker(img, frame_num, total_frames):
    """Add scene markers every 30 seconds"""
    elapsed = frame_num / FPS
    scene_num = int(elapsed // 30) + 1
    
    if scene_num <= 6:  # 6 scenes in 3 minutes
        scene_text = f"Scene {scene_num}/6"
        cv2.putText(img, scene_text, (WIDTH - 250, 80), 
                   cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2)
    
    return img

# Generate video frames
print("Generating frames...")
for frame_num in range(TOTAL_FRAMES):
    # Create background
    frame = draw_gradient_background(frame_num, TOTAL_FRAMES)
    
    # Add animated shapes
    frame = draw_animated_shapes(frame, frame_num, TOTAL_FRAMES)
    
    # Add text overlays
    frame = draw_text_overlay(frame, frame_num, TOTAL_FRAMES)
    frame = draw_scene_marker(frame, frame_num, TOTAL_FRAMES)
    
    # Write frame to video
    out.write(frame)
    
    # Progress indicator
    if frame_num % (FPS * 10) == 0:  # Every 10 seconds
        print(f"Progress: {frame_num}/{TOTAL_FRAMES} frames ({int(100*frame_num/TOTAL_FRAMES)}%)")

# Release video writer
out.release()

print(f"\n✓ Video created successfully: {OUTPUT_FILE}")
print(f"Duration: {DURATION_SECONDS} seconds ({DURATION_SECONDS // 60} minutes)")
print(f"Resolution: {WIDTH}x{HEIGHT}")
print(f"FPS: {FPS}")
