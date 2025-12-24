/**
 * Anti-Detect Browser - Main Module
 * Provides browser automation with anti-detection features
 */

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const UserAgent = require('user-agents');
const AntiDetectConfig = require('./config');
const FingerprintSpoofer = require('./fingerprint-spoofer');

// Add stealth plugin
puppeteer.use(StealthPlugin());

class AntiDetectBrowser {
  constructor(config = {}) {
    this.config = new AntiDetectConfig(config);
    this.browser = null;
    this.page = null;
    this.fingerprintSpoofer = new FingerprintSpoofer();
  }

  /**
   * Launch browser with anti-detection features
   */
  async launch() {
    const userAgent = new UserAgent();
    
    const launchOptions = {
      headless: this.config.headless,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-blink-features=AutomationControlled',
        '--disable-web-security',
        '--disable-features=IsolateOrigins,site-per-process',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu',
        `--window-size=${this.config.windowSize.width},${this.config.windowSize.height}`
      ],
      ignoreDefaultArgs: ['--enable-automation'],
      defaultViewport: {
        width: this.config.windowSize.width,
        height: this.config.windowSize.height
      }
    };

    // Add proxy if configured
    if (this.config.proxy) {
      launchOptions.args.push(`--proxy-server=${this.config.proxy}`);
    }

    this.browser = await puppeteer.launch(launchOptions);
    this.page = await this.browser.newPage();

    // Set user agent
    await this.page.setUserAgent(
      this.config.userAgent || userAgent.toString()
    );

    // Apply anti-detection patches
    await this.applyAntiDetectionPatches();

    // Apply fingerprint spoofing
    await this.fingerprintSpoofer.apply(this.page, this.config);

    return { browser: this.browser, page: this.page };
  }

  /**
   * Apply various anti-detection patches to the page
   */
  async applyAntiDetectionPatches() {
    // Override navigator properties
    await this.page.evaluateOnNewDocument(() => {
      // Remove webdriver flag
      Object.defineProperty(navigator, 'webdriver', {
        get: () => undefined
      });

      // Mock plugins
      Object.defineProperty(navigator, 'plugins', {
        get: () => [
          {
            0: { type: "application/x-google-chrome-pdf", suffixes: "pdf", description: "Portable Document Format" },
            description: "Portable Document Format",
            filename: "internal-pdf-viewer",
            length: 1,
            name: "Chrome PDF Plugin"
          },
          {
            0: { type: "application/pdf", suffixes: "pdf", description: "Portable Document Format" },
            description: "Portable Document Format",
            filename: "mhjfbmdgcfjbbpaeojofohoefgiehjai",
            length: 1,
            name: "Chrome PDF Viewer"
          },
          {
            0: { type: "application/x-nacl", suffixes: "", description: "Native Client Executable" },
            1: { type: "application/x-pnacl", suffixes: "", description: "Portable Native Client Executable" },
            description: "",
            filename: "internal-nacl-plugin",
            length: 2,
            name: "Native Client"
          }
        ]
      });

      // Mock languages
      Object.defineProperty(navigator, 'languages', {
        get: () => ['en-US', 'en']
      });

      // Override permissions
      const originalQuery = window.navigator.permissions.query;
      window.navigator.permissions.query = (parameters) => (
        parameters.name === 'notifications' ?
          Promise.resolve({ state: Notification.permission }) :
          originalQuery(parameters)
      );

      // Mock chrome runtime
      window.chrome = {
        runtime: {}
      };
    });

    // WebRTC leak protection
    if (this.config.protectWebRTC) {
      await this.page.evaluateOnNewDocument(() => {
        const getOrig = RTCPeerConnection.prototype.setLocalDescription;
        RTCPeerConnection.prototype.setLocalDescription = function(...args) {
          if (args[0] && args[0].sdp) {
            args[0].sdp = args[0].sdp.replace(/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g, '0.0.0.0');
          }
          return getOrig.apply(this, args);
        };
      });
    }

    // Timezone spoofing
    if (this.config.timezone) {
      await this.page.emulateTimezone(this.config.timezone);
    }

    // Geolocation spoofing
    if (this.config.geolocation) {
      await this.page.setGeolocation(this.config.geolocation);
    }
  }

  /**
   * Navigate to a URL
   */
  async goto(url, options = {}) {
    if (!this.page) {
      throw new Error('Browser not launched. Call launch() first.');
    }
    return await this.page.goto(url, {
      waitUntil: 'networkidle2',
      ...options
    });
  }

  /**
   * Close the browser
   */
  async close() {
    if (this.browser) {
      await this.browser.close();
    }
  }

  /**
   * Get the current page
   */
  getPage() {
    return this.page;
  }

  /**
   * Get the browser instance
   */
  getBrowser() {
    return this.browser;
  }
}

module.exports = AntiDetectBrowser;
