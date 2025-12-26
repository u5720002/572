# YouTube Short Video AI Generator

An AI-powered tool to automatically generate 3-minute YouTube Short videos with dynamic animations and text overlays.

## Features

- 🎬 Generates 3-minute (180 seconds) videos optimized for YouTube Shorts
- 📱 Vertical format (1080x1920 - 9:16 aspect ratio)
- 🎨 AI-powered dynamic gradient backgrounds and animations
- ✨ Animated text overlays with professional timing
- 🎥 Professional MP4 output (H.264 codec)
- ⚡ Two generation modes: Standard (animated) and Fast (optimized)

## Requirements

- Python 3.7 or higher
- FFmpeg (required by MoviePy)

### Installing FFmpeg

**Ubuntu/Debian:**
```bash
sudo apt-get update
sudo apt-get install ffmpeg
```

**macOS:**
```bash
brew install ffmpeg
```

**Windows:**
Download from [ffmpeg.org](https://ffmpeg.org/download.html) and add to PATH

## Installation

1. Clone this repository:
```bash
git clone https://github.com/u5720002/572.git
cd 572
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

## Usage

### Option 1: Fast Generator (Recommended)

Generate a 3-minute YouTube Short video quickly:

```bash
python fast_generator.py
```

This uses an optimized approach with colored backgrounds and text overlays for faster generation.

### Option 2: Standard Generator (Advanced Animations)

Generate a 3-minute video with advanced frame-by-frame animations:

```bash
python youtube_short_generator.py
```

This creates more complex animations but takes longer to render.

### Demo Mode

Test the generator quickly with a 5-second demo:

```bash
python demo.py
```

### Output

All videos are saved in the `output/` directory with:
- Filename format: `youtube_short_YYYYMMDD_HHMMSS.mp4`
- Duration: 180 seconds (3 minutes)
- Resolution: 1080x1920 (vertical format for YouTube Shorts)
- Frame rate: 30 FPS
- Format: MP4 with H.264 codec
- Ready to upload directly to YouTube Shorts

## Video Specifications

- **Duration:** 3 minutes (180 seconds)
- **Resolution:** 1080x1920 pixels
- **Aspect Ratio:** 9:16 (vertical/portrait)
- **Frame Rate:** 30 FPS
- **Video Codec:** H.264
- **Container:** MP4
- **Background:** AI-generated dynamic animations
- **Text:** Customizable overlays with timing control

## Customization

You can customize the generators by modifying the classes:

```python
from fast_generator import FastYouTubeShortGenerator

# Create a generator with custom duration
generator = FastYouTubeShortGenerator(duration=120)  # 2 minutes

# Generate the video
output_file = generator.generate(output_filename="my_custom_video.mp4")
```

## How It Works

### Fast Generator
1. **Background Generation**: Creates solid color backgrounds for each segment
2. **Text Overlays**: Adds professionally timed text segments
3. **Composition**: Concatenates segments into a single video
4. **Export**: Renders quickly using optimized encoding settings

### Standard Generator
1. **Background Generation**: Creates frame-by-frame dynamic gradient animations using mathematical functions
2. **Text Overlays**: Adds professionally timed text segments throughout the video
3. **Composition**: Combines all elements into a single composite video
4. **Export**: Renders the final video in YouTube Shorts-compatible format

## Examples

The generators create videos with:
- Dynamic, colorful backgrounds that change over time
- Professional text animations and transitions
- Smooth segment transitions
- AI-powered content generation patterns

## Troubleshooting

### "MoviePy not installed" error
```bash
pip install moviepy numpy Pillow
```

### "FFmpeg not found" error
Install FFmpeg using your system's package manager (see Requirements section)

### Text rendering issues
The scripts include fallback handling for text rendering. If you see warnings about fonts, the video will still generate successfully.

### Video generation is slow
Use the Fast Generator (`fast_generator.py`) for quicker results. The standard generator creates more complex animations but requires more processing time.

## File Structure

```
.
├── youtube_short_generator.py  # Standard generator with advanced animations
├── fast_generator.py           # Fast generator with optimized rendering
├── demo.py                     # Quick 5-second demo script
├── requirements.txt            # Python dependencies
├── README.md                   # This file
└── output/                     # Generated videos (created automatically)
```

## License

MIT License - feel free to use and modify for your projects!

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## Future Enhancements

- Audio generation with text-to-speech
- More animation styles and transitions
- Custom branding and logos
- Multiple theme templates
- Real AI-powered content generation (GPT integration)
- Advanced video effects and filters
- Image and video asset integration
- Background music support
