#!/usr/bin/env python3
"""
Standalone Anti-Detect Browser Application
This is the main entry point for the packaged Python application
"""

import sys
import os
import tkinter as tk
from tkinter import ttk, scrolledtext, messagebox
import threading

# Add src directory to path
if getattr(sys, 'frozen', False):
    # Running as compiled executable
    application_path = sys._MEIPASS
else:
    # Running as script
    application_path = os.path.dirname(os.path.abspath(__file__))

sys.path.insert(0, os.path.join(application_path, '..', 'src'))

from anti_detect_browser import AntiDetectBrowser, create_browser_profile


class AntiDetectBrowserGUI:
    def __init__(self, root):
        self.root = root
        self.root.title("Anti-Detect Browser")
        self.root.geometry("700x600")
        self.browser = None
        self.browser_launched = False
        
        # Configure style
        style = ttk.Style()
        style.theme_use('clam')
        
        self.create_widgets()
        
    def create_widgets(self):
        # Main notebook for tabs
        notebook = ttk.Notebook(self.root)
        notebook.pack(fill='both', expand=True, padx=10, pady=10)
        
        # Configuration tab
        config_frame = ttk.Frame(notebook)
        notebook.add(config_frame, text='Configuration')
        self.create_config_tab(config_frame)
        
        # Navigation tab
        nav_frame = ttk.Frame(notebook)
        notebook.add(nav_frame, text='Navigation')
        self.create_navigation_tab(nav_frame)
        
        # Status frame at bottom
        status_frame = ttk.LabelFrame(self.root, text="Status", padding=10)
        status_frame.pack(fill='x', padx=10, pady=(0, 10))
        
        self.status_text = scrolledtext.ScrolledText(status_frame, height=5, state='disabled')
        self.status_text.pack(fill='both', expand=True)
        
        self.log_status("Ready to launch browser")
        
    def create_config_tab(self, parent):
        # Profile selection
        ttk.Label(parent, text="Profile:").grid(row=0, column=0, sticky='w', padx=5, pady=5)
        self.profile_var = tk.StringVar(value="default")
        profile_combo = ttk.Combobox(parent, textvariable=self.profile_var, 
                                     values=["default", "stealth", "performance"], state='readonly')
        profile_combo.grid(row=0, column=1, sticky='ew', padx=5, pady=5)
        
        # Headless mode
        self.headless_var = tk.BooleanVar(value=False)
        ttk.Checkbutton(parent, text="Headless Mode", variable=self.headless_var).grid(
            row=1, column=0, columnspan=2, sticky='w', padx=5, pady=5)
        
        # Proxy
        ttk.Label(parent, text="Proxy (optional):").grid(row=2, column=0, sticky='w', padx=5, pady=5)
        self.proxy_var = tk.StringVar()
        ttk.Entry(parent, textvariable=self.proxy_var).grid(row=2, column=1, sticky='ew', padx=5, pady=5)
        
        # Window size
        ttk.Label(parent, text="Window Size:").grid(row=3, column=0, sticky='w', padx=5, pady=5)
        size_frame = ttk.Frame(parent)
        size_frame.grid(row=3, column=1, sticky='ew', padx=5, pady=5)
        
        self.width_var = tk.StringVar(value="1366")
        self.height_var = tk.StringVar(value="768")
        ttk.Entry(size_frame, textvariable=self.width_var, width=10).pack(side='left', padx=2)
        ttk.Label(size_frame, text="x").pack(side='left')
        ttk.Entry(size_frame, textvariable=self.height_var, width=10).pack(side='left', padx=2)
        
        # Launch button
        button_frame = ttk.Frame(parent)
        button_frame.grid(row=4, column=0, columnspan=2, pady=20)
        
        self.launch_btn = ttk.Button(button_frame, text="Launch Browser", command=self.launch_browser)
        self.launch_btn.pack(side='left', padx=5)
        
        self.close_btn = ttk.Button(button_frame, text="Close Browser", command=self.close_browser, state='disabled')
        self.close_btn.pack(side='left', padx=5)
        
        parent.columnconfigure(1, weight=1)
        
    def create_navigation_tab(self, parent):
        # URL entry
        ttk.Label(parent, text="URL:").grid(row=0, column=0, sticky='w', padx=5, pady=5)
        self.url_var = tk.StringVar(value="https://bot.sannysoft.com/")
        url_entry = ttk.Entry(parent, textvariable=self.url_var)
        url_entry.grid(row=0, column=1, sticky='ew', padx=5, pady=5)
        
        self.navigate_btn = ttk.Button(parent, text="Navigate", command=self.navigate_to_url, state='disabled')
        self.navigate_btn.grid(row=0, column=2, padx=5, pady=5)
        
        # Quick links
        quick_frame = ttk.LabelFrame(parent, text="Quick Test Links", padding=10)
        quick_frame.grid(row=1, column=0, columnspan=3, sticky='ew', padx=5, pady=10)
        
        links = [
            ("Bot Detection Test", "https://bot.sannysoft.com/"),
            ("Canvas Fingerprint", "https://browserleaks.com/canvas"),
            ("WebRTC Leak Test", "https://browserleaks.com/webrtc"),
            ("User Agent Check", "https://www.whatismybrowser.com/")
        ]
        
        for i, (text, url) in enumerate(links):
            btn = ttk.Button(quick_frame, text=text, 
                           command=lambda u=url: self.set_and_navigate(u))
            btn.grid(row=i, column=0, sticky='ew', padx=5, pady=2)
        
        parent.columnconfigure(1, weight=1)
        
    def log_status(self, message):
        self.status_text.config(state='normal')
        self.status_text.insert('end', f"{message}\n")
        self.status_text.see('end')
        self.status_text.config(state='disabled')
        
    def launch_browser(self):
        def launch():
            try:
                self.log_status("Launching browser...")
                self.launch_btn.config(state='disabled')
                
                # Get configuration
                config = create_browser_profile(self.profile_var.get())
                
                # Update with user settings
                config['headless'] = self.headless_var.get()
                if self.proxy_var.get():
                    config['proxy'] = self.proxy_var.get()
                    
                try:
                    width = int(self.width_var.get())
                    height = int(self.height_var.get())
                    config['window_size'] = {'width': width, 'height': height}
                except ValueError:
                    pass
                
                self.browser = AntiDetectBrowser(config)
                self.browser.launch(headless=config['headless'])
                
                self.browser_launched = True
                self.log_status("✓ Browser launched successfully!")
                self.root.after(0, lambda: self.close_btn.config(state='normal'))
                self.root.after(0, lambda: self.navigate_btn.config(state='normal'))
                
            except Exception as e:
                self.log_status(f"✗ Error: {str(e)}")
                self.root.after(0, lambda: self.launch_btn.config(state='normal'))
        
        thread = threading.Thread(target=launch, daemon=True)
        thread.start()
        
    def close_browser(self):
        def close():
            try:
                self.log_status("Closing browser...")
                if self.browser:
                    self.browser.close()
                    self.browser = None
                    
                self.browser_launched = False
                self.log_status("✓ Browser closed")
                self.root.after(0, lambda: self.launch_btn.config(state='normal'))
                self.root.after(0, lambda: self.close_btn.config(state='disabled'))
                self.root.after(0, lambda: self.navigate_btn.config(state='disabled'))
                
            except Exception as e:
                self.log_status(f"✗ Error: {str(e)}")
        
        thread = threading.Thread(target=close, daemon=True)
        thread.start()
        
    def navigate_to_url(self):
        if not self.browser_launched:
            messagebox.showwarning("Warning", "Please launch the browser first")
            return
            
        def navigate():
            try:
                url = self.url_var.get()
                self.log_status(f"Navigating to {url}...")
                self.browser.goto(url)
                self.log_status(f"✓ Navigated to {url}")
            except Exception as e:
                self.log_status(f"✗ Error: {str(e)}")
        
        thread = threading.Thread(target=navigate, daemon=True)
        thread.start()
        
    def set_and_navigate(self, url):
        self.url_var.set(url)
        if self.browser_launched:
            self.navigate_to_url()


def main():
    root = tk.Tk()
    app = AntiDetectBrowserGUI(root)
    root.mainloop()


if __name__ == '__main__':
    main()
