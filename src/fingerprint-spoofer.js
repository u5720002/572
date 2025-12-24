/**
 * Fingerprint Spoofer
 * Spoofs various browser fingerprinting techniques
 */

class FingerprintSpoofer {
  constructor() {
    this.canvasNoise = this.generateCanvasNoise();
    this.webglNoise = this.generateWebGLNoise();
  }

  /**
   * Generate random canvas noise
   */
  generateCanvasNoise() {
    return Math.random() * 0.0001;
  }

  /**
   * Generate random WebGL noise
   */
  generateWebGLNoise() {
    return Math.random() * 0.001;
  }

  /**
   * Apply fingerprint spoofing to a page
   */
  async apply(page, config) {
    const canvasNoise = this.canvasNoise;
    const webglNoise = this.webglNoise;

    await page.evaluateOnNewDocument((config, canvasNoise, webglNoise) => {
      // Canvas fingerprinting protection
      if (config.canvasNoise) {
        const originalToDataURL = HTMLCanvasElement.prototype.toDataURL;
        const originalToBlob = HTMLCanvasElement.prototype.toBlob;
        const originalGetImageData = CanvasRenderingContext2D.prototype.getImageData;

        // Override toDataURL
        HTMLCanvasElement.prototype.toDataURL = function() {
          const context = this.getContext('2d');
          if (context) {
            const imageData = context.getImageData(0, 0, this.width, this.height);
            for (let i = 0; i < imageData.data.length; i += 4) {
              imageData.data[i] += Math.floor(canvasNoise * 255);
              imageData.data[i + 1] += Math.floor(canvasNoise * 255);
              imageData.data[i + 2] += Math.floor(canvasNoise * 255);
            }
            context.putImageData(imageData, 0, 0);
          }
          return originalToDataURL.apply(this, arguments);
        };

        // Override getImageData
        CanvasRenderingContext2D.prototype.getImageData = function() {
          const imageData = originalGetImageData.apply(this, arguments);
          for (let i = 0; i < imageData.data.length; i += 4) {
            imageData.data[i] += Math.floor(canvasNoise * 255);
            imageData.data[i + 1] += Math.floor(canvasNoise * 255);
            imageData.data[i + 2] += Math.floor(canvasNoise * 255);
          }
          return imageData;
        };
      }

      // WebGL fingerprinting protection
      if (config.webGLNoise) {
        const getParameter = WebGLRenderingContext.prototype.getParameter;
        WebGLRenderingContext.prototype.getParameter = function(parameter) {
          if (parameter === 37445) {
            return 'Intel Inc.';
          }
          if (parameter === 37446) {
            return 'Intel Iris OpenGL Engine';
          }
          return getParameter.apply(this, arguments);
        };
      }

      // Audio fingerprinting protection
      if (config.audioNoise) {
        const audioContext = window.AudioContext || window.webkitAudioContext;
        if (audioContext) {
          const originalCreateOscillator = audioContext.prototype.createOscillator;
          audioContext.prototype.createOscillator = function() {
            const oscillator = originalCreateOscillator.apply(this, arguments);
            const originalStart = oscillator.start;
            oscillator.start = function() {
              oscillator.frequency.value += Math.random() * 0.001;
              return originalStart.apply(this, arguments);
            };
            return oscillator;
          };
        }
      }

      // Font fingerprinting protection
      const originalOffsetWidth = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetWidth');
      const originalOffsetHeight = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetHeight');
      
      Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
        get: function() {
          const width = originalOffsetWidth.get.call(this);
          return width + Math.floor(Math.random() * 2);
        }
      });

      Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
        get: function() {
          const height = originalOffsetHeight.get.call(this);
          return height + Math.floor(Math.random() * 2);
        }
      });

      // Screen resolution spoofing
      Object.defineProperty(screen, 'width', {
        get: () => 1920
      });
      Object.defineProperty(screen, 'height', {
        get: () => 1080
      });
      Object.defineProperty(screen, 'availWidth', {
        get: () => 1920
      });
      Object.defineProperty(screen, 'availHeight', {
        get: () => 1040
      });

      // Hardware concurrency spoofing
      Object.defineProperty(navigator, 'hardwareConcurrency', {
        get: () => 8
      });

      // Device memory spoofing
      Object.defineProperty(navigator, 'deviceMemory', {
        get: () => 8
      });

      // Battery API blocking
      if (navigator.getBattery) {
        navigator.getBattery = () => Promise.reject(new Error('Battery API is disabled'));
      }

    }, config, canvasNoise, webglNoise);
  }
}

module.exports = FingerprintSpoofer;
