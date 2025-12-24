#!/usr/bin/env python3
"""
Advanced Example - Anti-Detect Browser (Python)
Demonstrates advanced features and testing
"""

import sys
import os
import time

# Add src directory to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'src'))

from anti_detect_browser import AntiDetectBrowser


def main():
    print('Anti-Detect Browser - Advanced Example (Python)')
    print('=' * 50)
    
    # Create browser instance with advanced config
    config = {
        'headless': False,
        # 'proxy': 'http://proxy-server:port',  # Uncomment to use proxy
        'window_size': {'width': 1366, 'height': 768},
    }
    
    browser = AntiDetectBrowser(config)
    
    try:
        print('Launching browser with advanced anti-detection features...')
        driver = browser.launch(headless=False)
        
        # Test 1: Check bot detection
        print('\n[Test 1] Checking bot detection...')
        browser.goto('https://bot.sannysoft.com/')
        time.sleep(5)
        
        # Test 2: Check fingerprint
        print('\n[Test 2] Checking browser fingerprint...')
        browser.goto('https://browserleaks.com/canvas')
        time.sleep(5)
        
        # Test 3: Check WebRTC
        print('\n[Test 3] Checking WebRTC leaks...')
        browser.goto('https://browserleaks.com/webrtc')
        time.sleep(5)
        
        # Test 4: Check user agent
        print('\n[Test 4] Checking user agent...')
        browser.goto('https://www.whatismybrowser.com/detect/what-is-my-user-agent')
        time.sleep(5)
        
        print('\nAll tests completed. Check the pages for results.')
        print('Waiting 20 seconds before closing...')
        time.sleep(20)
        
        print('Closing browser...')
        browser.close()
        print('Done!')
        
    except KeyboardInterrupt:
        print('\nInterrupted by user.')
        browser.close()
    except Exception as error:
        print(f'Error: {error}')
        browser.close()


if __name__ == '__main__':
    main()
