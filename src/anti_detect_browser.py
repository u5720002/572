"""
Anti-Detect Browser - Python Implementation
Provides browser automation with anti-detection features using undetected-chromedriver
"""

import undetected_chromedriver as uc
from selenium.webdriver.chrome.options import Options
from selenium_stealth import stealth
from fake_useragent import UserAgent
import random
import json


class AntiDetectBrowser:
    """
    Anti-detection browser wrapper for Selenium/ChromeDriver
    """
    
    def __init__(self, config=None):
        """
        Initialize the anti-detect browser
        
        Args:
            config (dict): Configuration dictionary with options
        """
        self.config = config or {}
        self.driver = None
        self.user_agent = UserAgent()
        
    def launch(self, headless=False, proxy=None):
        """
        Launch the browser with anti-detection features
        
        Args:
            headless (bool): Run browser in headless mode
            proxy (str): Proxy server address (e.g., 'host:port')
        
        Returns:
            WebDriver: The configured browser instance
        """
        options = uc.ChromeOptions()
        
        # Basic anti-detection arguments
        options.add_argument('--disable-blink-features=AutomationControlled')
        options.add_argument('--disable-dev-shm-usage')
        options.add_argument('--no-sandbox')
        options.add_argument('--disable-setuid-sandbox')
        options.add_argument('--disable-web-security')
        options.add_argument('--disable-features=IsolateOrigins,site-per-process')
        options.add_argument('--disable-accelerated-2d-canvas')
        options.add_argument('--no-first-run')
        options.add_argument('--no-zygote')
        options.add_argument('--disable-gpu')
        
        # Window size
        window_size = self.config.get('window_size', {'width': 1920, 'height': 1080})
        options.add_argument(f'--window-size={window_size["width"]},{window_size["height"]}')
        
        # Proxy configuration
        if proxy or self.config.get('proxy'):
            proxy_address = proxy or self.config.get('proxy')
            options.add_argument(f'--proxy-server={proxy_address}')
        
        # User agent
        user_agent = self.config.get('user_agent') or self.user_agent.random
        options.add_argument(f'user-agent={user_agent}')
        
        # Language
        options.add_argument('--lang=en-US,en')
        options.add_experimental_option('prefs', {
            'intl.accept_languages': 'en-US,en'
        })
        
        # Exclude automation flags
        options.add_experimental_option("excludeSwitches", ["enable-automation"])
        options.add_experimental_option('useAutomationExtension', False)
        
        if headless or self.config.get('headless'):
            options.add_argument('--headless=new')
        
        # Launch undetected chrome
        self.driver = uc.Chrome(options=options, version_main=None)
        
        # Apply selenium-stealth
        stealth(
            self.driver,
            languages=["en-US", "en"],
            vendor="Google Inc.",
            platform="Win32",
            webgl_vendor="Intel Inc.",
            renderer="Intel Iris OpenGL Engine",
            fix_hairline=True,
        )
        
        # Additional anti-detection scripts
        self._apply_anti_detection_scripts()
        
        return self.driver
    
    def _apply_anti_detection_scripts(self):
        """
        Apply JavaScript-based anti-detection techniques
        """
        if not self.driver:
            return
        
        # Canvas fingerprinting protection
        canvas_script = """
        const originalToDataURL = HTMLCanvasElement.prototype.toDataURL;
        HTMLCanvasElement.prototype.toDataURL = function() {
            const context = this.getContext('2d');
            if (context) {
                const imageData = context.getImageData(0, 0, this.width, this.height);
                const noise = Math.random() * 0.0001;
                for (let i = 0; i < imageData.data.length; i += 4) {
                    imageData.data[i] += Math.floor(noise * 255);
                    imageData.data[i + 1] += Math.floor(noise * 255);
                    imageData.data[i + 2] += Math.floor(noise * 255);
                }
                context.putImageData(imageData, 0, 0);
            }
            return originalToDataURL.apply(this, arguments);
        };
        """
        
        # WebRTC leak protection
        webrtc_script = """
        const originalSetLocalDescription = RTCPeerConnection.prototype.setLocalDescription;
        RTCPeerConnection.prototype.setLocalDescription = function(...args) {
            if (args[0] && args[0].sdp) {
                args[0].sdp = args[0].sdp.replace(/([0-9]{1,3}(\.[0-9]{1,3}){3})/g, '0.0.0.0');
            }
            return originalSetLocalDescription.apply(this, args);
        };
        """
        
        # Battery API blocking
        battery_script = """
        if (navigator.getBattery) {
            navigator.getBattery = () => Promise.reject(new Error('Battery API is disabled'));
        }
        """
        
        # Hardware spoofing
        hardware_script = """
        Object.defineProperty(navigator, 'hardwareConcurrency', {
            get: () => 8
        });
        Object.defineProperty(navigator, 'deviceMemory', {
            get: () => 8
        });
        """
        
        # Execute all scripts
        scripts = [canvas_script, webrtc_script, battery_script, hardware_script]
        for script in scripts:
            try:
                self.driver.execute_cdp_cmd('Page.addScriptToEvaluateOnNewDocument', {
                    'source': script
                })
            except Exception as e:
                print(f"Warning: Could not apply script: {e}")
    
    def goto(self, url, wait_time=5):
        """
        Navigate to a URL
        
        Args:
            url (str): The URL to navigate to
            wait_time (int): Implicit wait time in seconds
        
        Returns:
            bool: True if navigation was successful
        """
        if not self.driver:
            raise Exception("Browser not launched. Call launch() first.")
        
        try:
            self.driver.implicitly_wait(wait_time)
            self.driver.get(url)
            return True
        except Exception as e:
            print(f"Error navigating to {url}: {e}")
            return False
    
    def close(self):
        """
        Close the browser
        """
        if self.driver:
            self.driver.quit()
            self.driver = None
    
    def get_driver(self):
        """
        Get the WebDriver instance
        
        Returns:
            WebDriver: The browser driver instance
        """
        return self.driver
    
    def take_screenshot(self, filename='screenshot.png'):
        """
        Take a screenshot of the current page
        
        Args:
            filename (str): The filename to save the screenshot
        
        Returns:
            bool: True if screenshot was saved successfully
        """
        if not self.driver:
            return False
        
        try:
            self.driver.save_screenshot(filename)
            return True
        except Exception as e:
            print(f"Error taking screenshot: {e}")
            return False


def create_browser_profile(profile_type='default'):
    """
    Create a browser configuration profile
    
    Args:
        profile_type (str): Type of profile (default, stealth, performance)
    
    Returns:
        dict: Configuration dictionary
    """
    profiles = {
        'default': {
            'headless': False,
            'window_size': {'width': 1920, 'height': 1080},
        },
        'stealth': {
            'headless': True,
            'window_size': {'width': 1366, 'height': 768},
        },
        'performance': {
            'headless': True,
            'window_size': {'width': 1280, 'height': 720},
        }
    }
    
    return profiles.get(profile_type, profiles['default'])


if __name__ == '__main__':
    # Example usage
    print("Anti-Detect Browser - Python Implementation")
    print("=" * 50)
    
    # Create browser instance
    config = create_browser_profile('default')
    browser = AntiDetectBrowser(config)
    
    print("Launching browser with anti-detection features...")
    driver = browser.launch(headless=False)
    
    print("Navigating to test page...")
    browser.goto('https://www.google.com')
    
    print("Browser is ready. Press Ctrl+C to close.")
    
    try:
        import time
        time.sleep(30)  # Keep browser open for 30 seconds
    except KeyboardInterrupt:
        pass
    
    print("Closing browser...")
    browser.close()
    print("Done!")
