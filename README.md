# 572 - 3 Minute Short Video

This repository contains a Python script to generate a 3-minute short video with animated content.

## Video File

The generated video `short_video_3min.mp4` is a 3-minute (180 seconds) video featuring:
- Dynamic gradient backgrounds that change over time
- Animated shapes (rotating circles, pulsing squares)
- Text overlays showing elapsed time and progress
- Scene markers every 30 seconds
- Resolution: 1280x720 (HD)
- Frame rate: 30 FPS

## Requirements

- Python 3.x
- OpenCV (cv2)
- NumPy

## Installation

Install the required Python packages:

```bash
pip install opencv-python numpy
```

## Usage

To generate a new video, run:

```bash
python3 create_video.py
```

This will create a file called `short_video_3min.mp4` in the current directory.

## Video Specifications

- **Duration**: 180 seconds (3 minutes)
- **Resolution**: 1280x720 pixels
- **Frame Rate**: 30 FPS
- **Total Frames**: 5,400
- **Format**: MP4 (H.264)
- **File Size**: ~26 MB

## Customization

You can modify the following parameters in `create_video.py`:

- `DURATION_SECONDS`: Change the video duration
- `WIDTH` and `HEIGHT`: Adjust the resolution
- `FPS`: Modify the frame rate
- Animation functions: Customize the visual effects
