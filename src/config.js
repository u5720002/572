/**
 * Anti-Detect Browser Configuration
 */

class AntiDetectConfig {
  constructor(config = {}) {
    this.headless = config.headless !== undefined ? config.headless : false;
    this.userAgent = config.userAgent || null;
    this.proxy = config.proxy || null;
    this.windowSize = config.windowSize || { width: 1920, height: 1080 };
    this.timezone = config.timezone || null;
    this.geolocation = config.geolocation || null;
    this.protectWebRTC = config.protectWebRTC !== undefined ? config.protectWebRTC : true;
    this.canvasNoise = config.canvasNoise !== undefined ? config.canvasNoise : true;
    this.webGLNoise = config.webGLNoise !== undefined ? config.webGLNoise : true;
    this.audioNoise = config.audioNoise !== undefined ? config.audioNoise : true;
  }

  /**
   * Create a config from a profile name
   */
  static fromProfile(profileName) {
    const profiles = {
      default: {
        headless: false,
        protectWebRTC: true,
        canvasNoise: true,
        webGLNoise: true,
        audioNoise: true
      },
      stealth: {
        headless: true,
        protectWebRTC: true,
        canvasNoise: true,
        webGLNoise: true,
        audioNoise: true,
        windowSize: { width: 1366, height: 768 }
      },
      performance: {
        headless: true,
        protectWebRTC: false,
        canvasNoise: false,
        webGLNoise: false,
        audioNoise: false
      }
    };

    const profile = profiles[profileName] || profiles.default;
    return new AntiDetectConfig(profile);
  }
}

module.exports = AntiDetectConfig;
