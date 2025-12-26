// AI Video Generator - Main Script
class VideoGenerator {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.mediaRecorder = null;
        this.recordedChunks = [];
        this.videoBlob = null;
        
        this.initializeElements();
        this.attachEventListeners();
    }

    initializeElements() {
        this.generateBtn = document.getElementById('generateBtn');
        this.btnText = document.getElementById('btnText');
        this.btnLoader = document.getElementById('btnLoader');
        this.previewArea = document.getElementById('previewArea');
        this.videoInfo = document.getElementById('videoInfo');
        this.videoDetails = document.getElementById('videoDetails');
        this.downloadSection = document.getElementById('downloadSection');
        this.downloadBtn = document.getElementById('downloadBtn');
        this.shareBtn = document.getElementById('shareBtn');
    }

    attachEventListeners() {
        this.generateBtn.addEventListener('click', () => this.generateVideo());
        this.downloadBtn.addEventListener('click', () => this.downloadVideo());
        this.shareBtn.addEventListener('click', () => this.shareVideo());
    }

    async generateVideo() {
        const topic = document.getElementById('videoTopic').value.trim();
        const style = document.getElementById('videoStyle').value;
        const duration = parseInt(document.getElementById('videoDuration').value);
        const musicStyle = document.getElementById('musicStyle').value;
        const voiceOver = document.getElementById('voiceOver').value;

        if (!topic) {
            this.showStatus('Please enter a video topic', 'error');
            return;
        }

        // Disable button and show loading
        this.generateBtn.disabled = true;
        this.btnText.style.display = 'none';
        this.btnLoader.style.display = 'block';

        try {
            // Show progress
            this.showStatus('Initializing AI video generation...', 'info');
            await this.delay(1000);

            // Create canvas for video generation
            this.createCanvas();

            // Generate video frames based on style
            await this.generateVideoFrames(topic, style, duration);

            // Show completion status
            this.showStatus('Video generated successfully!', 'success');

            // Display video info
            this.displayVideoInfo(duration, style, musicStyle, voiceOver);

            // Show download section
            this.downloadSection.style.display = 'flex';
            this.downloadSection.classList.add('fade-in');

        } catch (error) {
            console.error('Error generating video:', error);
            this.showStatus('Error generating video. Please try again.', 'error');
        } finally {
            // Re-enable button
            this.generateBtn.disabled = false;
            this.btnText.style.display = 'block';
            this.btnLoader.style.display = 'none';
        }
    }

    createCanvas() {
        // Create canvas for 9:16 aspect ratio (YouTube Shorts)
        this.canvas = document.createElement('canvas');
        this.canvas.width = 1080;
        this.canvas.height = 1920;
        this.ctx = this.canvas.getContext('2d');
        
        // Clear preview area
        this.previewArea.innerHTML = '';
        this.previewArea.appendChild(this.canvas);
    }

    async generateVideoFrames(topic, style, duration) {
        const fps = 30;
        const totalFrames = duration * fps;
        const frameInterval = 1000 / fps;

        this.showStatus(`Generating ${duration} seconds of video content...`, 'info');

        // Setup for recording
        const stream = this.canvas.captureStream(fps);
        this.recordedChunks = [];
        
        this.mediaRecorder = new MediaRecorder(stream, {
            mimeType: 'video/webm;codecs=vp9',
            videoBitsPerSecond: 5000000
        });

        this.mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                this.recordedChunks.push(event.data);
            }
        };

        // Start recording
        this.mediaRecorder.start();

        // Generate frames based on style
        switch (style) {
            case 'animated':
                await this.generateAnimatedFrames(topic, totalFrames, frameInterval);
                break;
            case 'slideshow':
                await this.generateSlideshowFrames(topic, totalFrames, frameInterval);
                break;
            case 'text-animation':
                await this.generateTextAnimationFrames(topic, totalFrames, frameInterval);
                break;
            case 'ai-generated':
                await this.generateAIFrames(topic, totalFrames, frameInterval);
                break;
            default:
                await this.generateAnimatedFrames(topic, totalFrames, frameInterval);
        }

        // Stop recording and create video blob
        return new Promise((resolve) => {
            this.mediaRecorder.onstop = () => {
                this.videoBlob = new Blob(this.recordedChunks, { type: 'video/webm' });
                
                // Create video element for preview
                const video = document.createElement('video');
                video.src = URL.createObjectURL(this.videoBlob);
                video.controls = true;
                video.style.width = '100%';
                video.style.borderRadius = '8px';
                
                this.previewArea.innerHTML = '';
                this.previewArea.appendChild(video);
                
                resolve();
            };
            
            this.mediaRecorder.stop();
        });
    }

    async generateAnimatedFrames(topic, totalFrames, frameInterval) {
        const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe'];
        
        for (let frame = 0; frame < totalFrames; frame++) {
            const progress = frame / totalFrames;
            
            // Background gradient
            const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
            gradient.addColorStop(0, colors[Math.floor(progress * colors.length) % colors.length]);
            gradient.addColorStop(1, colors[Math.floor(progress * colors.length + 1) % colors.length]);
            
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            
            // Animated circles
            const numCircles = 10;
            for (let i = 0; i < numCircles; i++) {
                const x = (this.canvas.width / 2) + Math.cos(progress * Math.PI * 2 + i) * 300;
                const y = (this.canvas.height / 2) + Math.sin(progress * Math.PI * 2 + i) * 400;
                const radius = 50 + Math.sin(progress * Math.PI * 4 + i) * 30;
                
                this.ctx.fillStyle = `rgba(255, 255, 255, 0.2)`;
                this.ctx.beginPath();
                this.ctx.arc(x, y, radius, 0, Math.PI * 2);
                this.ctx.fill();
            }
            
            // Title text
            this.ctx.fillStyle = 'white';
            this.ctx.font = 'bold 80px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            
            const titleY = 400 + Math.sin(progress * Math.PI * 2) * 50;
            this.ctx.fillText(topic.slice(0, 20), this.canvas.width / 2, titleY);
            
            // Subtitle with animation
            this.ctx.font = '40px Arial';
            const subtitleY = titleY + 100;
            this.ctx.fillText('AI Generated Video', this.canvas.width / 2, subtitleY);
            
            // Progress indicator
            const barWidth = 600;
            const barHeight = 10;
            const barX = (this.canvas.width - barWidth) / 2;
            const barY = this.canvas.height - 200;
            
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
            this.ctx.fillRect(barX, barY, barWidth, barHeight);
            
            this.ctx.fillStyle = 'white';
            this.ctx.fillRect(barX, barY, barWidth * progress, barHeight);
            
            // Update status periodically
            if (frame % 90 === 0) {
                this.showStatus(`Rendering: ${Math.floor(progress * 100)}%`, 'info');
            }
            
            await this.delay(frameInterval);
        }
    }

    async generateSlideshowFrames(topic, totalFrames, frameInterval) {
        const slides = [
            { title: topic, subtitle: 'Introduction', color: '#667eea' },
            { title: 'Key Point 1', subtitle: 'Important Information', color: '#764ba2' },
            { title: 'Key Point 2', subtitle: 'Additional Details', color: '#f093fb' },
            { title: 'Conclusion', subtitle: 'Thank You!', color: '#4facfe' }
        ];
        
        const framesPerSlide = Math.floor(totalFrames / slides.length);
        
        for (let frame = 0; frame < totalFrames; frame++) {
            const slideIndex = Math.min(Math.floor(frame / framesPerSlide), slides.length - 1);
            const slide = slides[slideIndex];
            const slideProgress = (frame % framesPerSlide) / framesPerSlide;
            
            // Background
            this.ctx.fillStyle = slide.color;
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            
            // Slide content with fade-in effect
            const opacity = Math.min(slideProgress * 3, 1);
            
            this.ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
            this.ctx.font = 'bold 90px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(slide.title, this.canvas.width / 2, this.canvas.height / 2 - 100);
            
            this.ctx.font = '50px Arial';
            this.ctx.fillText(slide.subtitle, this.canvas.width / 2, this.canvas.height / 2 + 100);
            
            // Slide number
            this.ctx.font = '30px Arial';
            this.ctx.fillText(`${slideIndex + 1} / ${slides.length}`, this.canvas.width / 2, this.canvas.height - 100);
            
            if (frame % 90 === 0) {
                this.showStatus(`Rendering slides: ${Math.floor((frame / totalFrames) * 100)}%`, 'info');
            }
            
            await this.delay(frameInterval);
        }
    }

    async generateTextAnimationFrames(topic, totalFrames, frameInterval) {
        const words = topic.split(' ');
        
        for (let frame = 0; frame < totalFrames; frame++) {
            const progress = frame / totalFrames;
            
            // Dynamic background
            const hue = Math.floor(progress * 360);
            this.ctx.fillStyle = `hsl(${hue}, 70%, 50%)`;
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            
            // Text animation
            this.ctx.fillStyle = 'white';
            this.ctx.font = 'bold 70px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            
            const wordsToShow = Math.ceil(progress * words.length * 3) % (words.length + 1);
            const displayText = words.slice(0, Math.min(wordsToShow, words.length)).join(' ');
            
            // Word wrap for long text
            const maxWidth = this.canvas.width - 100;
            const lineHeight = 90;
            const startY = this.canvas.height / 2;
            
            this.wrapText(this.ctx, displayText, this.canvas.width / 2, startY, maxWidth, lineHeight);
            
            // Animated border
            this.ctx.strokeStyle = 'white';
            this.ctx.lineWidth = 10;
            const padding = 50;
            const borderSize = 400 + Math.sin(progress * Math.PI * 4) * 50;
            this.ctx.strokeRect(
                this.canvas.width / 2 - borderSize,
                this.canvas.height / 2 - borderSize / 2,
                borderSize * 2,
                borderSize
            );
            
            if (frame % 90 === 0) {
                this.showStatus(`Animating text: ${Math.floor(progress * 100)}%`, 'info');
            }
            
            await this.delay(frameInterval);
        }
    }

    async generateAIFrames(topic, totalFrames, frameInterval) {
        // Simulated AI-generated scene with particles and effects
        const particles = [];
        const numParticles = 100;
        
        // Initialize particles
        for (let i = 0; i < numParticles; i++) {
            particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 5,
                vy: (Math.random() - 0.5) * 5,
                size: Math.random() * 5 + 2,
                color: `hsl(${Math.random() * 360}, 70%, 60%)`
            });
        }
        
        for (let frame = 0; frame < totalFrames; frame++) {
            const progress = frame / totalFrames;
            
            // Dark background
            this.ctx.fillStyle = 'rgba(10, 10, 30, 0.3)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            
            // Update and draw particles
            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                
                // Wrap around edges
                if (p.x < 0) p.x = this.canvas.width;
                if (p.x > this.canvas.width) p.x = 0;
                if (p.y < 0) p.y = this.canvas.height;
                if (p.y > this.canvas.height) p.y = 0;
                
                // Draw particle
                this.ctx.fillStyle = p.color;
                this.ctx.beginPath();
                this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                this.ctx.fill();
            });
            
            // Connect nearby particles
            this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
            this.ctx.lineWidth = 1;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    
                    if (dist < 150) {
                        this.ctx.beginPath();
                        this.ctx.moveTo(particles[i].x, particles[i].y);
                        this.ctx.lineTo(particles[j].x, particles[j].y);
                        this.ctx.stroke();
                    }
                }
            }
            
            // Central text
            this.ctx.fillStyle = 'white';
            this.ctx.font = 'bold 80px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            
            const scale = 1 + Math.sin(progress * Math.PI * 4) * 0.1;
            this.ctx.save();
            this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
            this.ctx.scale(scale, scale);
            this.ctx.fillText(topic.slice(0, 15), 0, 0);
            this.ctx.restore();
            
            if (frame % 90 === 0) {
                this.showStatus(`Generating AI visuals: ${Math.floor(progress * 100)}%`, 'info');
            }
            
            await this.delay(frameInterval);
        }
    }

    wrapText(ctx, text, x, y, maxWidth, lineHeight) {
        const words = text.split(' ');
        let line = '';
        let currentY = y;

        for (let n = 0; n < words.length; n++) {
            const testLine = line + words[n] + ' ';
            const metrics = ctx.measureText(testLine);
            const testWidth = metrics.width;

            if (testWidth > maxWidth && n > 0) {
                ctx.fillText(line, x, currentY);
                line = words[n] + ' ';
                currentY += lineHeight;
            } else {
                line = testLine;
            }
        }
        ctx.fillText(line, x, currentY);
    }

    displayVideoInfo(duration, style, musicStyle, voiceOver) {
        this.videoInfo.style.display = 'block';
        this.videoInfo.classList.add('fade-in');
        
        const formatBytes = (bytes) => {
            return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
        };
        
        this.videoDetails.innerHTML = `
            <div class="detail-item">
                <span>Duration:</span>
                <strong>${duration} seconds (${Math.floor(duration / 60)}:${(duration % 60).toString().padStart(2, '0')})</strong>
            </div>
            <div class="detail-item">
                <span>Style:</span>
                <strong>${style}</strong>
            </div>
            <div class="detail-item">
                <span>Resolution:</span>
                <strong>1080x1920 (9:16)</strong>
            </div>
            <div class="detail-item">
                <span>Format:</span>
                <strong>WebM (VP9)</strong>
            </div>
            <div class="detail-item">
                <span>Music:</span>
                <strong>${musicStyle === 'none' ? 'No music' : musicStyle}</strong>
            </div>
            <div class="detail-item">
                <span>Voice Over:</span>
                <strong>${voiceOver === 'none' ? 'No voice over' : voiceOver}</strong>
            </div>
            <div class="detail-item">
                <span>File Size:</span>
                <strong>${this.videoBlob ? formatBytes(this.videoBlob.size) : 'Calculating...'}</strong>
            </div>
            <div class="detail-item">
                <span>Status:</span>
                <strong style="color: #4caf50;">✓ Ready for Download</strong>
            </div>
        `;
    }

    downloadVideo() {
        if (!this.videoBlob) {
            this.showStatus('No video available to download', 'error');
            return;
        }

        const url = URL.createObjectURL(this.videoBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `youtube-short-${Date.now()}.webm`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        this.showStatus('Video download started!', 'success');
    }

    shareVideo() {
        if (!this.videoBlob) {
            this.showStatus('No video available to share', 'error');
            return;
        }

        const url = URL.createObjectURL(this.videoBlob);
        
        // Try to use Web Share API if available
        if (navigator.share) {
            const file = new File([this.videoBlob], 'youtube-short.webm', { type: 'video/webm' });
            navigator.share({
                title: 'AI Generated YouTube Short',
                text: 'Check out this AI-generated video!',
                files: [file]
            }).then(() => {
                this.showStatus('Video shared successfully!', 'success');
            }).catch(() => {
                this.copyToClipboard(url);
            });
        } else {
            this.copyToClipboard(url);
        }
    }

    copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            this.showStatus('Video URL copied to clipboard!', 'success');
        }).catch(() => {
            this.showStatus('Unable to copy URL. Please try downloading instead.', 'error');
        });
    }

    showStatus(message, type = 'info') {
        // Remove existing status message
        const existingStatus = document.querySelector('.status-message');
        if (existingStatus) {
            existingStatus.remove();
        }

        // Create new status message
        const statusDiv = document.createElement('div');
        statusDiv.className = `status-message ${type}`;
        statusDiv.textContent = message;

        // Insert after generate button
        this.generateBtn.parentNode.insertBefore(statusDiv, this.generateBtn.nextSibling);

        // Auto-remove success/error messages after 5 seconds
        if (type === 'success' || type === 'error') {
            setTimeout(() => {
                statusDiv.remove();
            }, 5000);
        }
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new VideoGenerator();
    console.log('AI Video Generator initialized successfully');
});
