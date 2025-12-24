#!/usr/bin/env python3
"""
Demo script for Bing Search Automation Tool
Demonstrates the features without running actual browser automation
"""

import time
import random
from bing_search_automation import Colors, SEARCH_QUERIES

def demo_progress_bar():
    """Demonstrate the progress bar feature"""
    print(f"\n{Colors.HEADER}{Colors.BOLD}╔══════════════════════════════════════════════════╗{Colors.ENDC}")
    print(f"{Colors.HEADER}{Colors.BOLD}║   BING SEARCH AUTOMATION - DEMO                  ║{Colors.ENDC}")
    print(f"{Colors.HEADER}{Colors.BOLD}╚══════════════════════════════════════════════════╝{Colors.ENDC}\n")
    
    print(f"{Colors.OKCYAN}📋 Demo Configuration:{Colors.ENDC}")
    print(f"   🖥️  Mode: {Colors.BOLD}DESKTOP{Colors.ENDC}")
    print(f"   🔢 Demo Searches: {Colors.BOLD}10{Colors.ENDC}")
    print(f"   ⏱️  Delay Range: {Colors.BOLD}1-2 seconds (demo speed){Colors.ENDC}\n")
    
    print(f"{Colors.OKBLUE}🚀 Starting demo automation...{Colors.ENDC}\n")
    
    num_searches = 10
    available_queries = SEARCH_QUERIES.copy()
    random.shuffle(available_queries)
    
    start_time = time.time()
    
    for i in range(num_searches):
        query = available_queries[i]
        
        # Progress indicator
        progress = (i + 1) / num_searches * 100
        bar_length = 30
        filled_length = int(bar_length * (i + 1) // num_searches)
        bar = '█' * filled_length + '░' * (bar_length - filled_length)
        
        print(f"{Colors.OKCYAN}[{i+1}/{num_searches}] {bar} {progress:.1f}%{Colors.ENDC}")
        print(f"   🔍 Searching: {Colors.BOLD}{query}{Colors.ENDC}")
        
        # Simulate search
        time.sleep(0.5)
        
        print(f"   {Colors.OKGREEN}✓ Search completed{Colors.ENDC}")
        
        # Random delay before next search (except for last search)
        if i < num_searches - 1:
            delay = random.uniform(1, 2)
            print(f"   ⏳ Waiting {delay:.1f} seconds...\n")
            time.sleep(delay)
    
    elapsed_time = time.time() - start_time
    
    # Summary
    print(f"\n{Colors.OKGREEN}{Colors.BOLD}╔══════════════════════════════════════════════════╗{Colors.ENDC}")
    print(f"{Colors.OKGREEN}{Colors.BOLD}║   DEMO COMPLETE                                  ║{Colors.ENDC}")
    print(f"{Colors.OKGREEN}{Colors.BOLD}╚══════════════════════════════════════════════════╝{Colors.ENDC}\n")
    
    print(f"{Colors.OKCYAN}📊 Statistics:{Colors.ENDC}")
    print(f"   ✅ Completed: {Colors.BOLD}{num_searches}/{num_searches}{Colors.ENDC}")
    print(f"   ⏱️  Total Time: {Colors.BOLD}{elapsed_time:.1f} seconds{Colors.ENDC}")
    print(f"   ⚡ Avg Time/Search: {Colors.BOLD}{elapsed_time/num_searches:.1f} seconds{Colors.ENDC}\n")

def show_features():
    """Display all features"""
    print(f"\n{Colors.HEADER}{Colors.BOLD}═══════════════════════════════════════════════════{Colors.ENDC}")
    print(f"{Colors.HEADER}{Colors.BOLD}  BING SEARCH AUTOMATION - FEATURES{Colors.ENDC}")
    print(f"{Colors.HEADER}{Colors.BOLD}═══════════════════════════════════════════════════{Colors.ENDC}\n")
    
    features = [
        ("🔄", "Automatic Bing searches with randomized queries"),
        ("🖥️", "Desktop mode support (default: 30 searches)"),
        ("📱", "Mobile mode support (default: 20 searches)"),
        ("⏱️", "Random delays between searches (3-8 seconds)"),
        ("🎛️", "Configurable settings via menu"),
        ("📊", "Real-time progress tracking"),
        ("🎨", "Clean UI control panel"),
        ("🔒", "Safe and non-intrusive"),
    ]
    
    for emoji, feature in features:
        print(f"   {emoji}  {Colors.OKCYAN}{feature}{Colors.ENDC}")
    
    print(f"\n{Colors.OKGREEN}Total queries available: {Colors.BOLD}{len(SEARCH_QUERIES)}{Colors.ENDC}")
    print(f"{Colors.OKGREEN}Sample queries:{Colors.ENDC}")
    for query in random.sample(SEARCH_QUERIES, min(5, len(SEARCH_QUERIES))):
        print(f"   • {query}")

def main():
    """Main demo entry point"""
    show_features()
    
    print(f"\n{Colors.OKCYAN}Would you like to see a progress bar demo? (y/n): {Colors.ENDC}", end='')
    choice = input().strip().lower()
    
    if choice == 'y':
        demo_progress_bar()
    
    print(f"\n{Colors.OKBLUE}To run the actual automation, use:{Colors.ENDC}")
    print(f"   {Colors.BOLD}python bing_search_automation.py{Colors.ENDC}\n")

if __name__ == "__main__":
    main()
