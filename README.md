# YouTube Short Video AI Generator

An AI-powered tool to automatically generate 3-minute YouTube Short videos with dynamic animations and text overlays.

## Features

- 🎬 Generates 3-minute (180 seconds) videos optimized for YouTube Shorts
- 📱 Vertical format (1080x1920 - 9:16 aspect ratio)
- 🎨 AI-powered dynamic gradient backgrounds
- ✨ Animated text overlays
- 🎥 Professional MP4 output (H.264 codec)
- ⚡ Fast generation with configurable settings

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

### Basic Usage

Generate a 3-minute YouTube Short video:

```bash
python youtube_short_generator.py
```

This will create an MP4 video file in the `output/` directory with:
- Duration: 180 seconds (3 minutes)
- Resolution: 1080x1920 (vertical format for YouTube Shorts)
- Frame rate: 30 FPS
- Format: MP4 with H.264 codec

### Customization

You can customize the generator by modifying the `YouTubeShortGenerator` class:

```python
from youtube_short_generator import YouTubeShortGenerator

# Create a generator with custom duration (in seconds)
generator = YouTubeShortGenerator(duration=180)

# Generate the video
output_file = generator.generate(output_filename="my_video.mp4")
```

## Output

The generated video will be saved in the `output/` directory with:
- Filename format: `youtube_short_YYYYMMDD_HHMMSS.mp4`
- Ready to upload directly to YouTube Shorts
- Professional quality with smooth animations

## Video Specifications

- **Duration:** 3 minutes (180 seconds)
- **Resolution:** 1080x1920 pixels
- **Aspect Ratio:** 9:16 (vertical/portrait)
- **Frame Rate:** 30 FPS
- **Video Codec:** H.264
- **Container:** MP4
- **Background:** AI-generated dynamic gradient animation
- **Text:** Customizable overlays with timing control

## How It Works

1. **Background Generation**: Creates a dynamic gradient background that smoothly animates using sine waves and time-based color shifts
2. **Text Overlays**: Adds professionally timed text segments throughout the video
3. **Composition**: Combines all elements into a single video file
4. **Export**: Renders the final video in YouTube Shorts-compatible format

## Examples

The generator creates videos with:
- Dynamic, colorful backgrounds that change over time
- Professional text animations
- Smooth transitions between segments
- AI-powered content generation

## Troubleshooting

### "MoviePy not installed" error
```bash
pip install moviepy numpy Pillow
```

### "FFmpeg not found" error
Install FFmpeg using your system's package manager (see Requirements section)

### Text rendering issues
The script includes fallback handling for text rendering. If you see warnings about fonts, the video will still generate successfully.

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
