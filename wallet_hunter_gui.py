#!/usr/bin/env python3
"""
Wallet Hunter GUI - Windows Application
Educational cryptocurrency wallet generator with graphical interface
"""

import tkinter as tk
from tkinter import ttk, scrolledtext, messagebox, filedialog
import threading
import queue
from datetime import datetime
from wallet_hunter import BitcoinWallet, EthereumWallet

class WalletHunterGUI:
    def __init__(self, root):
        self.root = root
        self.root.title("Wallet Hunter - Educational Crypto Wallet Generator")
        self.root.geometry("900x700")
        self.root.resizable(True, True)
        
        # State variables
        self.is_running = False
        self.checked_count = 0
        self.found_count = 0
        self.start_time = None
        self.output_file = "found_wallets.txt"
        self.update_queue = queue.Queue()
        
        # Create UI
        self.create_widgets()
        
        # Start update loop
        self.update_stats_loop()
        
    def create_widgets(self):
        # Title
        title_frame = tk.Frame(self.root, bg="#2c3e50", height=60)
        title_frame.pack(fill=tk.X, padx=0, pady=0)
        title_frame.pack_propagate(False)
        
        title_label = tk.Label(
            title_frame,
            text="🔐 Wallet Hunter",
            font=("Arial", 20, "bold"),
            bg="#2c3e50",
            fg="white"
        )
        title_label.pack(pady=10)
        
        # Warning banner
        warning_frame = tk.Frame(self.root, bg="#e74c3c", height=50)
        warning_frame.pack(fill=tk.X, padx=0, pady=0)
        warning_frame.pack_propagate(False)
        
        warning_label = tk.Label(
            warning_frame,
            text="⚠️ EDUCATIONAL USE ONLY - Finding wallets with balance is astronomically unlikely (1 in 2^256) ⚠️",
            font=("Arial", 10, "bold"),
            bg="#e74c3c",
            fg="white",
            wraplength=850
        )
        warning_label.pack(pady=12)
        
        # Configuration frame
        config_frame = tk.LabelFrame(self.root, text="Configuration", font=("Arial", 12, "bold"), padx=10, pady=10)
        config_frame.pack(fill=tk.X, padx=20, pady=10)
        
        # Wallet type selection
        tk.Label(config_frame, text="Wallet Type:", font=("Arial", 10)).grid(row=0, column=0, sticky=tk.W, pady=5)
        self.wallet_type_var = tk.StringVar(value="Bitcoin")
        wallet_type_combo = ttk.Combobox(
            config_frame,
            textvariable=self.wallet_type_var,
            values=["Bitcoin", "Ethereum"],
            state="readonly",
            width=15
        )
        wallet_type_combo.grid(row=0, column=1, sticky=tk.W, pady=5, padx=5)
        
        # Balance checking
        tk.Label(config_frame, text="Balance Checking:", font=("Arial", 10)).grid(row=0, column=2, sticky=tk.W, pady=5, padx=(20, 0))
        self.check_balance_var = tk.BooleanVar(value=False)
        balance_check = tk.Checkbutton(config_frame, text="Enable (slower)", variable=self.check_balance_var)
        balance_check.grid(row=0, column=3, sticky=tk.W, pady=5)
        
        # API Delay
        tk.Label(config_frame, text="API Delay (seconds):", font=("Arial", 10)).grid(row=1, column=0, sticky=tk.W, pady=5)
        self.delay_var = tk.StringVar(value="1.0")
        delay_entry = tk.Entry(config_frame, textvariable=self.delay_var, width=10)
        delay_entry.grid(row=1, column=1, sticky=tk.W, pady=5, padx=5)
        
        # Output file
        tk.Label(config_frame, text="Output File:", font=("Arial", 10)).grid(row=1, column=2, sticky=tk.W, pady=5, padx=(20, 0))
        self.output_file_var = tk.StringVar(value="found_wallets.txt")
        output_entry = tk.Entry(config_frame, textvariable=self.output_file_var, width=20)
        output_entry.grid(row=1, column=3, sticky=tk.W, pady=5, padx=5)
        
        # Control buttons
        control_frame = tk.Frame(self.root, padx=10, pady=10)
        control_frame.pack(fill=tk.X, padx=20)
        
        self.start_button = tk.Button(
            control_frame,
            text="▶ Start Hunting",
            command=self.start_hunting,
            bg="#27ae60",
            fg="white",
            font=("Arial", 12, "bold"),
            width=15,
            height=2
        )
        self.start_button.pack(side=tk.LEFT, padx=5)
        
        self.stop_button = tk.Button(
            control_frame,
            text="⏹ Stop",
            command=self.stop_hunting,
            bg="#e74c3c",
            fg="white",
            font=("Arial", 12, "bold"),
            width=15,
            height=2,
            state=tk.DISABLED
        )
        self.stop_button.pack(side=tk.LEFT, padx=5)
        
        clear_button = tk.Button(
            control_frame,
            text="🗑 Clear Log",
            command=self.clear_log,
            bg="#95a5a6",
            fg="white",
            font=("Arial", 12, "bold"),
            width=15,
            height=2
        )
        clear_button.pack(side=tk.LEFT, padx=5)
        
        # Statistics frame
        stats_frame = tk.LabelFrame(self.root, text="Statistics", font=("Arial", 12, "bold"), padx=10, pady=10)
        stats_frame.pack(fill=tk.X, padx=20, pady=10)
        
        stats_grid = tk.Frame(stats_frame)
        stats_grid.pack()
        
        # Checked count
        tk.Label(stats_grid, text="Wallets Checked:", font=("Arial", 10, "bold")).grid(row=0, column=0, sticky=tk.W, pady=2)
        self.checked_label = tk.Label(stats_grid, text="0", font=("Arial", 10), fg="#3498db")
        self.checked_label.grid(row=0, column=1, sticky=tk.W, pady=2, padx=10)
        
        # Found count
        tk.Label(stats_grid, text="Wallets Found:", font=("Arial", 10, "bold")).grid(row=0, column=2, sticky=tk.W, pady=2, padx=(20, 0))
        self.found_label = tk.Label(stats_grid, text="0", font=("Arial", 10), fg="#e74c3c")
        self.found_label.grid(row=0, column=3, sticky=tk.W, pady=2, padx=10)
        
        # Rate
        tk.Label(stats_grid, text="Generation Rate:", font=("Arial", 10, "bold")).grid(row=1, column=0, sticky=tk.W, pady=2)
        self.rate_label = tk.Label(stats_grid, text="0.00 wallets/sec", font=("Arial", 10), fg="#27ae60")
        self.rate_label.grid(row=1, column=1, sticky=tk.W, pady=2, padx=10)
        
        # Elapsed time
        tk.Label(stats_grid, text="Time Elapsed:", font=("Arial", 10, "bold")).grid(row=1, column=2, sticky=tk.W, pady=2, padx=(20, 0))
        self.time_label = tk.Label(stats_grid, text="0s", font=("Arial", 10), fg="#9b59b6")
        self.time_label.grid(row=1, column=3, sticky=tk.W, pady=2, padx=10)
        
        # Log frame
        log_frame = tk.LabelFrame(self.root, text="Activity Log", font=("Arial", 12, "bold"), padx=10, pady=10)
        log_frame.pack(fill=tk.BOTH, expand=True, padx=20, pady=10)
        
        self.log_text = scrolledtext.ScrolledText(
            log_frame,
            width=80,
            height=15,
            font=("Consolas", 9),
            bg="#ecf0f1",
            fg="#2c3e50"
        )
        self.log_text.pack(fill=tk.BOTH, expand=True)
        
        # Info label
        info_label = tk.Label(
            self.root,
            text="💡 Tip: Disable balance checking for maximum speed (~1,800 wallets/sec)",
            font=("Arial", 9),
            fg="#7f8c8d"
        )
        info_label.pack(pady=5)
        
        # Initial log message
        self.log("Welcome to Wallet Hunter - Educational Crypto Wallet Generator")
        self.log("This tool demonstrates cryptocurrency security through address space analysis")
        self.log("Probability of finding a used wallet: ~8.6 × 10⁻⁷⁸ (astronomically small)")
        self.log("-" * 80)
        
    def log(self, message):
        """Add message to log"""
        timestamp = datetime.now().strftime("%H:%M:%S")
        self.log_text.insert(tk.END, f"[{timestamp}] {message}\n")
        self.log_text.see(tk.END)
        
    def clear_log(self):
        """Clear the log"""
        self.log_text.delete(1.0, tk.END)
        self.log("Log cleared")
        
    def start_hunting(self):
        """Start wallet hunting"""
        if self.is_running:
            return
            
        self.is_running = True
        self.checked_count = 0
        self.found_count = 0
        self.start_time = datetime.now()
        
        self.start_button.config(state=tk.DISABLED)
        self.stop_button.config(state=tk.NORMAL)
        
        # Get configuration
        wallet_type = self.wallet_type_var.get()
        check_balance = self.check_balance_var.get()
        
        try:
            delay = float(self.delay_var.get())
        except ValueError:
            delay = 1.0
            
        self.output_file = self.output_file_var.get()
        
        self.log("-" * 80)
        self.log(f"🚀 Starting {wallet_type} wallet hunter...")
        self.log(f"   Balance checking: {'Enabled' if check_balance else 'Disabled'}")
        self.log(f"   API delay: {delay}s")
        self.log(f"   Output file: {self.output_file}")
        self.log("-" * 80)
        
        # Start worker thread
        thread = threading.Thread(
            target=self.hunt_worker,
            args=(wallet_type, check_balance, delay),
            daemon=True
        )
        thread.start()
        
    def stop_hunting(self):
        """Stop wallet hunting"""
        if not self.is_running:
            return
            
        self.is_running = False
        self.start_button.config(state=tk.NORMAL)
        self.stop_button.config(state=tk.DISABLED)
        
        elapsed = (datetime.now() - self.start_time).total_seconds()
        self.log("-" * 80)
        self.log("⏹ Stopped hunting")
        self.log(f"   Total checked: {self.checked_count}")
        self.log(f"   Total found: {self.found_count}")
        self.log(f"   Time elapsed: {elapsed:.2f}s")
        if elapsed > 0:
            self.log(f"   Average rate: {self.checked_count/elapsed:.2f} wallets/sec")
        self.log("-" * 80)
        
    def hunt_worker(self, wallet_type, check_balance, delay):
        """
        Worker thread for wallet generation and balance checking.
        
        This method runs in a separate thread to prevent UI blocking.
        It continuously generates wallets and checks balances until stopped.
        
        Args:
            wallet_type (str): Either "Bitcoin" or "Ethereum"
            check_balance (bool): Whether to check wallet balances via API
            delay (float): Seconds to wait between API calls
            
        Thread Communication:
            - Updates self.checked_count directly (thread-safe counter)
            - Sends messages to update_queue for UI updates
            - Checks self.is_running flag to know when to stop
            
        Queue Messages:
            - ("checked", count): Wallet count update
            - ("found", dict): Wallet with balance found
            - ("error", str): Error occurred
            
        Exceptions:
            All exceptions are caught and sent to the queue as error messages
            to prevent thread crashes and inform the user.
        """
        import time
        
        try:
            while self.is_running:
                if wallet_type == "Bitcoin":
                    # Generate Bitcoin wallet
                    private_key = BitcoinWallet.generate_private_key()
                    public_key = BitcoinWallet.private_key_to_public_key(private_key)
                    
                    if public_key:
                        address = BitcoinWallet.public_key_to_address(public_key)
                        self.checked_count += 1
                        
                        # Update queue
                        self.update_queue.put(("checked", self.checked_count))
                        
                        # Check balance if enabled
                        if check_balance and address:
                            balance = BitcoinWallet.check_balance(address)
                            if balance is not None and balance > 0:
                                wif = BitcoinWallet.private_key_to_wif(private_key)
                                self.found_wallet(wallet_type, wif, address, balance)
                            time.sleep(delay)
                    else:
                        self.update_queue.put(("error", "Bitcoin: ecdsa library not available"))
                        break
                        
                elif wallet_type == "Ethereum":
                    # Generate Ethereum wallet
                    private_key = EthereumWallet.generate_private_key()
                    address = EthereumWallet.private_key_to_address(private_key)
                    
                    if address:
                        self.checked_count += 1
                        
                        # Update queue
                        self.update_queue.put(("checked", self.checked_count))
                        
                        # Check balance if enabled
                        if check_balance:
                            balance = EthereumWallet.check_balance(address)
                            if balance is not None and balance > 0:
                                self.found_wallet(wallet_type, private_key, address, balance)
                            time.sleep(delay)
                    else:
                        self.update_queue.put(("error", "Ethereum: Required libraries not available"))
                        break
                        
        except Exception as e:
            self.update_queue.put(("error", str(e)))
            
    def found_wallet(self, wallet_type, private_key, address, balance):
        """Handle found wallet"""
        self.found_count += 1
        self.update_queue.put(("found", {
            "type": wallet_type,
            "private_key": private_key,
            "address": address,
            "balance": balance
        }))
        
        # Save to file
        try:
            timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            with open(self.output_file, 'a') as f:
                f.write(f"\n{'='*60}\n")
                f.write(f"Found at: {timestamp}\n")
                f.write(f"Type: {wallet_type}\n")
                f.write(f"Address: {address}\n")
                f.write(f"Private Key: {private_key}\n")
                f.write(f"Balance: {balance}\n")
                f.write(f"{'='*60}\n")
        except Exception as e:
            self.update_queue.put(("error", f"Failed to save wallet: {e}"))
            
    def update_stats_loop(self):
        """Update statistics from queue"""
        try:
            while True:
                msg_type, data = self.update_queue.get_nowait()
                
                if msg_type == "checked":
                    self.checked_label.config(text=str(data))
                    
                elif msg_type == "found":
                    self.found_label.config(text=str(self.found_count))
                    self.log(f"🎉 FOUND! {data['type']} wallet with balance: {data['balance']}")
                    self.log(f"   Address: {data['address']}")
                    self.log(f"   Private Key: {data['private_key']}")
                    messagebox.showinfo(
                        "Wallet Found!",
                        f"Found {data['type']} wallet!\n\n"
                        f"Address: {data['address']}\n"
                        f"Balance: {data['balance']}\n\n"
                        f"Details saved to {self.output_file}"
                    )
                    
                elif msg_type == "error":
                    self.log(f"❌ Error: {data}")
                    self.stop_hunting()
                    
        except queue.Empty:
            pass
            
        # Update time and rate
        if self.is_running and self.start_time:
            elapsed = (datetime.now() - self.start_time).total_seconds()
            self.time_label.config(text=f"{elapsed:.1f}s")
            
            if elapsed > 0:
                rate = self.checked_count / elapsed
                self.rate_label.config(text=f"{rate:.2f} wallets/sec")
                
        # Schedule next update
        self.root.after(100, self.update_stats_loop)


def main():
    """Main entry point"""
    root = tk.Tk()
    app = WalletHunterGUI(root)
    
    # Set icon if available
    try:
        # You can add an icon file later
        # root.iconbitmap('icon.ico')
        pass
    except (FileNotFoundError, tk.TclError):
        # Icon file not found or invalid, continue without icon
        pass
        
    root.mainloop()


if __name__ == '__main__':
    main()
