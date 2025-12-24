#!/usr/bin/env python3
"""
Bing Search Automation Tool
Automatically performs Bing searches with randomized queries
Supports both Desktop and Mobile modes
"""

import time
import random
import sys
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, WebDriverException

# Color codes for terminal output
class Colors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKCYAN = '\033[96m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'

# Randomized search queries
SEARCH_QUERIES = [
    # Technology
    "artificial intelligence trends", "machine learning applications", "cloud computing",
    "cybersecurity best practices", "blockchain technology", "quantum computing",
    "5G network technology", "internet of things", "edge computing", "data science",
    
    # Science
    "space exploration", "climate change solutions", "renewable energy", 
    "medical breakthroughs", "genetics research", "ocean conservation",
    "sustainable technology", "green energy", "biodiversity", "astronomy news",
    
    # General Knowledge
    "world history", "geography facts", "cultural traditions", "language learning",
    "educational resources", "scientific discoveries", "innovations",
    "environmental protection", "wildlife conservation", "ancient civilizations",
    
    # Current Topics
    "tech news", "science updates", "innovation stories", "research findings",
    "technological advances", "scientific progress", "development trends",
    "future technology", "emerging markets", "global trends",
    
    # Additional variety
    "best practices", "how to guides", "tips and tricks", "tutorials",
    "reviews and recommendations", "comparison guides", "latest updates",
    "industry insights", "expert opinions", "case studies"
]

class BingSearchAutomation:
    """Main class for Bing search automation"""
    
    def __init__(self, mode='desktop', num_searches=None, min_delay=3, max_delay=8):
        """
        Initialize the automation tool
        
        Args:
            mode: 'desktop' or 'mobile'
            num_searches: Number of searches to perform (default: 30 for desktop, 20 for mobile)
            min_delay: Minimum delay between searches in seconds
            max_delay: Maximum delay between searches in seconds
        """
        self.mode = mode.lower()
        self.min_delay = min_delay
        self.max_delay = max_delay
        
        # Set default number of searches based on mode
        if num_searches is None:
            self.num_searches = 30 if self.mode == 'desktop' else 20
        else:
            self.num_searches = num_searches
        
        self.driver = None
        self.searches_completed = 0
    
    def setup_driver(self):
        """Setup Chrome WebDriver with appropriate options"""
        chrome_options = Options()
        
        # Basic options for stability
        chrome_options.add_argument('--no-sandbox')
        chrome_options.add_argument('--disable-dev-shm-usage')
        chrome_options.add_argument('--disable-blink-features=AutomationControlled')
        chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])
        chrome_options.add_experimental_option('useAutomationExtension', False)
        
        # Mobile mode configuration
        if self.mode == 'mobile':
            mobile_emulation = {
                "deviceMetrics": {"width": 375, "height": 812, "pixelRatio": 3.0},
                "userAgent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Mobile/15E148 Safari/604.1"
            }
            chrome_options.add_experimental_option("mobileEmulation", mobile_emulation)
        
        try:
            self.driver = webdriver.Chrome(options=chrome_options)
            self.driver.execute_cdp_cmd('Network.setUserAgentOverride', {
                "userAgent": self.driver.execute_script("return navigator.userAgent").replace('Headless', '')
            })
            print(f"{Colors.OKGREEN}✓ WebDriver initialized successfully in {self.mode.upper()} mode{Colors.ENDC}")
            return True
        except WebDriverException as e:
            print(f"{Colors.FAIL}✗ Failed to initialize WebDriver: {e}{Colors.ENDC}")
            return False
    
    def perform_search(self, query):
        """
        Perform a single Bing search
        
        Args:
            query: Search query string
            
        Returns:
            True if successful, False otherwise
        """
        try:
            # Navigate to Bing
            self.driver.get('https://www.bing.com')
            
            # Wait for search box to be available
            wait = WebDriverWait(self.driver, 10)
            search_box = wait.until(
                EC.presence_of_element_located((By.NAME, 'q'))
            )
            
            # Clear and enter search query
            search_box.clear()
            search_box.send_keys(query)
            
            # Submit search
            search_box.send_keys(Keys.RETURN)
            
            # Wait for results to load
            time.sleep(random.uniform(1, 2))
            
            return True
        except TimeoutException:
            print(f"{Colors.WARNING}⚠ Timeout waiting for search box{Colors.ENDC}")
            return False
        except Exception as e:
            print(f"{Colors.WARNING}⚠ Error during search: {e}{Colors.ENDC}")
            return False
    
    def run(self):
        """Execute the automation process"""
        print(f"\n{Colors.HEADER}{Colors.BOLD}╔══════════════════════════════════════════════════╗{Colors.ENDC}")
        print(f"{Colors.HEADER}{Colors.BOLD}║   BING SEARCH AUTOMATION TOOL                    ║{Colors.ENDC}")
        print(f"{Colors.HEADER}{Colors.BOLD}╚══════════════════════════════════════════════════╝{Colors.ENDC}\n")
        
        print(f"{Colors.OKCYAN}📋 Configuration:{Colors.ENDC}")
        print(f"   🖥️  Mode: {Colors.BOLD}{self.mode.upper()}{Colors.ENDC}")
        print(f"   🔢 Target Searches: {Colors.BOLD}{self.num_searches}{Colors.ENDC}")
        print(f"   ⏱️  Delay Range: {Colors.BOLD}{self.min_delay}-{self.max_delay} seconds{Colors.ENDC}\n")
        
        # Setup WebDriver
        if not self.setup_driver():
            return False
        
        try:
            print(f"{Colors.OKBLUE}🚀 Starting search automation...{Colors.ENDC}\n")
            
            # Get a shuffled list of queries
            available_queries = SEARCH_QUERIES.copy()
            random.shuffle(available_queries)
            
            # Ensure we have enough queries
            while len(available_queries) < self.num_searches:
                available_queries.extend(SEARCH_QUERIES)
                random.shuffle(available_queries)
            
            start_time = time.time()
            
            for i in range(self.num_searches):
                query = available_queries[i]
                
                # Progress indicator
                progress = (i + 1) / self.num_searches * 100
                bar_length = 30
                filled_length = int(bar_length * (i + 1) // self.num_searches)
                bar = '█' * filled_length + '░' * (bar_length - filled_length)
                
                print(f"{Colors.OKCYAN}[{i+1}/{self.num_searches}] {bar} {progress:.1f}%{Colors.ENDC}")
                print(f"   🔍 Searching: {Colors.BOLD}{query}{Colors.ENDC}")
                
                # Perform search
                success = self.perform_search(query)
                
                if success:
                    self.searches_completed += 1
                    print(f"   {Colors.OKGREEN}✓ Search completed{Colors.ENDC}")
                else:
                    print(f"   {Colors.WARNING}⚠ Search failed{Colors.ENDC}")
                
                # Random delay before next search (except for last search)
                if i < self.num_searches - 1:
                    delay = random.uniform(self.min_delay, self.max_delay)
                    print(f"   ⏳ Waiting {delay:.1f} seconds...\n")
                    time.sleep(delay)
            
            elapsed_time = time.time() - start_time
            
            # Summary
            print(f"\n{Colors.OKGREEN}{Colors.BOLD}╔══════════════════════════════════════════════════╗{Colors.ENDC}")
            print(f"{Colors.OKGREEN}{Colors.BOLD}║   AUTOMATION COMPLETE                            ║{Colors.ENDC}")
            print(f"{Colors.OKGREEN}{Colors.BOLD}╚══════════════════════════════════════════════════╝{Colors.ENDC}\n")
            
            print(f"{Colors.OKCYAN}📊 Statistics:{Colors.ENDC}")
            print(f"   ✅ Completed: {Colors.BOLD}{self.searches_completed}/{self.num_searches}{Colors.ENDC}")
            print(f"   ⏱️  Total Time: {Colors.BOLD}{elapsed_time:.1f} seconds{Colors.ENDC}")
            print(f"   ⚡ Avg Time/Search: {Colors.BOLD}{elapsed_time/self.num_searches:.1f} seconds{Colors.ENDC}\n")
            
            return True
            
        except KeyboardInterrupt:
            print(f"\n\n{Colors.WARNING}⚠ Process interrupted by user{Colors.ENDC}")
            return False
        except Exception as e:
            print(f"\n{Colors.FAIL}✗ Error during automation: {e}{Colors.ENDC}")
            return False
        finally:
            if self.driver:
                self.driver.quit()
                print(f"{Colors.OKGREEN}✓ Browser closed{Colors.ENDC}\n")

def show_menu():
    """Display configuration menu and get user choices"""
    print(f"\n{Colors.HEADER}{Colors.BOLD}╔══════════════════════════════════════════════════╗{Colors.ENDC}")
    print(f"{Colors.HEADER}{Colors.BOLD}║   BING SEARCH AUTOMATION - CONTROL PANEL         ║{Colors.ENDC}")
    print(f"{Colors.HEADER}{Colors.BOLD}╚══════════════════════════════════════════════════╝{Colors.ENDC}\n")
    
    print(f"{Colors.OKCYAN}Please configure your automation settings:{Colors.ENDC}\n")
    
    # Mode selection
    print(f"{Colors.BOLD}1. Select Mode:{Colors.ENDC}")
    print(f"   {Colors.OKBLUE}[1]{Colors.ENDC} 🖥️  Desktop Mode (default: 30 searches)")
    print(f"   {Colors.OKBLUE}[2]{Colors.ENDC} 📱 Mobile Mode (default: 20 searches)")
    
    while True:
        mode_choice = input(f"\n{Colors.OKCYAN}Choose mode (1 or 2) [1]: {Colors.ENDC}").strip()
        if mode_choice == '' or mode_choice == '1':
            mode = 'desktop'
            default_searches = 30
            break
        elif mode_choice == '2':
            mode = 'mobile'
            default_searches = 20
            break
        else:
            print(f"{Colors.WARNING}Invalid choice. Please enter 1 or 2.{Colors.ENDC}")
    
    # Number of searches
    print(f"\n{Colors.BOLD}2. Number of Searches:{Colors.ENDC}")
    while True:
        num_input = input(f"{Colors.OKCYAN}Enter number of searches [{default_searches}]: {Colors.ENDC}").strip()
        if num_input == '':
            num_searches = default_searches
            break
        try:
            num_searches = int(num_input)
            if num_searches <= 0:
                print(f"{Colors.WARNING}Please enter a positive number.{Colors.ENDC}")
            elif num_searches > 100:
                print(f"{Colors.WARNING}Warning: Large numbers may take a long time.{Colors.ENDC}")
                confirm = input(f"{Colors.OKCYAN}Continue? (y/n) [n]: {Colors.ENDC}").strip().lower()
                if confirm == 'y':
                    break
            else:
                break
        except ValueError:
            print(f"{Colors.WARNING}Invalid input. Please enter a number.{Colors.ENDC}")
    
    # Delay configuration
    print(f"\n{Colors.BOLD}3. Delay Between Searches:{Colors.ENDC}")
    print(f"   {Colors.OKBLUE}[1]{Colors.ENDC} ⏱️  Default (3-8 seconds)")
    print(f"   {Colors.OKBLUE}[2]{Colors.ENDC} ⚡ Fast (1-3 seconds)")
    print(f"   {Colors.OKBLUE}[3]{Colors.ENDC} 🐌 Slow (5-12 seconds)")
    print(f"   {Colors.OKBLUE}[4]{Colors.ENDC} 🎛️  Custom")
    
    while True:
        delay_choice = input(f"\n{Colors.OKCYAN}Choose delay option (1-4) [1]: {Colors.ENDC}").strip()
        if delay_choice == '' or delay_choice == '1':
            min_delay, max_delay = 3, 8
            break
        elif delay_choice == '2':
            min_delay, max_delay = 1, 3
            break
        elif delay_choice == '3':
            min_delay, max_delay = 5, 12
            break
        elif delay_choice == '4':
            try:
                min_delay = float(input(f"{Colors.OKCYAN}Minimum delay (seconds): {Colors.ENDC}"))
                max_delay = float(input(f"{Colors.OKCYAN}Maximum delay (seconds): {Colors.ENDC}"))
                if min_delay < 0 or max_delay < 0 or min_delay > max_delay:
                    print(f"{Colors.WARNING}Invalid delay values.{Colors.ENDC}")
                    continue
                break
            except ValueError:
                print(f"{Colors.WARNING}Invalid input. Please enter numbers.{Colors.ENDC}")
        else:
            print(f"{Colors.WARNING}Invalid choice. Please enter 1-4.{Colors.ENDC}")
    
    # Confirmation
    print(f"\n{Colors.HEADER}═══════════════════════════════════════════════════{Colors.ENDC}")
    print(f"{Colors.BOLD}Summary:{Colors.ENDC}")
    print(f"  Mode: {Colors.BOLD}{mode.upper()}{Colors.ENDC}")
    print(f"  Searches: {Colors.BOLD}{num_searches}{Colors.ENDC}")
    print(f"  Delay: {Colors.BOLD}{min_delay}-{max_delay} seconds{Colors.ENDC}")
    print(f"{Colors.HEADER}═══════════════════════════════════════════════════{Colors.ENDC}\n")
    
    confirm = input(f"{Colors.OKCYAN}Start automation? (y/n) [y]: {Colors.ENDC}").strip().lower()
    if confirm == '' or confirm == 'y':
        return mode, num_searches, min_delay, max_delay
    else:
        print(f"\n{Colors.WARNING}Automation cancelled.{Colors.ENDC}\n")
        return None, None, None, None

def main():
    """Main entry point"""
    try:
        # Show menu and get configuration
        mode, num_searches, min_delay, max_delay = show_menu()
        
        if mode is None:
            return
        
        # Create and run automation
        automation = BingSearchAutomation(
            mode=mode,
            num_searches=num_searches,
            min_delay=min_delay,
            max_delay=max_delay
        )
        
        automation.run()
        
    except KeyboardInterrupt:
        print(f"\n\n{Colors.WARNING}Program terminated by user.{Colors.ENDC}\n")
    except Exception as e:
        print(f"\n{Colors.FAIL}Error: {e}{Colors.ENDC}\n")

if __name__ == "__main__":
    main()
