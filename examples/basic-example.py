#!/usr/bin/env python3
"""
Basic Example - Anti-Detect Browser (Python)
Demonstrates basic usage of the anti-detect browser
"""

import sys
import os
import time

# Add src directory to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'src'))

from anti_detect_browser import AntiDetectBrowser, create_browser_profile


def main():
    print('Anti-Detect Browser - Basic Example (Python)')
    print('=' * 50)
    
    # Create browser instance with default config
    config = create_browser_profile('default')
    browser = AntiDetectBrowser(config)
    
    try:
        print('Launching browser with anti-detection features...')
        driver = browser.launch(headless=False)
        
        print('Navigating to test page...')
        browser.goto('https://bot.sannysoft.com/')
        
        print('\nBrowser is running. Check the page for detection results.')
        print('The page should show that automation is NOT detected.')
        print('\nWaiting 30 seconds before closing...')
        
        # Wait for 30 seconds
        time.sleep(30)
        
        print('Taking screenshot...')
        browser.take_screenshot('bot-detection-test.png')
        print('Screenshot saved as bot-detection-test.png')
        
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
