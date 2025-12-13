#!/usr/bin/env python3
"""
Wallet Hunter - Educational cryptocurrency wallet generator and checker
This tool generates random cryptocurrency wallets and checks their balances.
For educational purposes only.
"""

import hashlib
import secrets
import requests
import time
import json
from datetime import datetime
from typing import Optional, Tuple

class BitcoinWallet:
    """Bitcoin wallet generator and checker"""
    
    # Base58 alphabet for Bitcoin addresses
    BASE58_ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
    
    @staticmethod
    def generate_private_key() -> str:
        """Generate a random 256-bit private key"""
        return secrets.token_hex(32)
    
    @staticmethod
    def private_key_to_wif(private_key_hex: str, compressed: bool = True) -> str:
        """Convert private key to Wallet Import Format (WIF)"""
        # Add prefix for mainnet
        extended = '80' + private_key_hex
        if compressed:
            extended += '01'
        
        # Calculate checksum
        first_hash = hashlib.sha256(bytes.fromhex(extended)).digest()
        second_hash = hashlib.sha256(first_hash).digest()
        checksum = second_hash[:4].hex()
        
        # Combine and encode
        final_key = extended + checksum
        return BitcoinWallet._base58_encode(bytes.fromhex(final_key))
    
    @staticmethod
    def _base58_encode(data: bytes) -> str:
        """Encode bytes to base58"""
        num = int.from_bytes(data, 'big')
        encoded = ''
        
        while num > 0:
            num, remainder = divmod(num, 58)
            encoded = BitcoinWallet.BASE58_ALPHABET[remainder] + encoded
        
        # Add '1' for each leading zero byte
        for byte in data:
            if byte == 0:
                encoded = '1' + encoded
            else:
                break
        
        return encoded
    
    @staticmethod
    def private_key_to_public_key(private_key_hex: str) -> str:
        """
        Convert private key to public key using secp256k1
        Note: This is a simplified version. For production use, use proper libraries.
        """
        try:
            from ecdsa import SigningKey, SECP256k1
            sk = SigningKey.from_string(bytes.fromhex(private_key_hex), curve=SECP256k1)
            vk = sk.get_verifying_key()
            return '04' + vk.to_string().hex()
        except ImportError:
            # Fallback if ecdsa is not available
            return None
    
    @staticmethod
    def public_key_to_address(public_key_hex: str) -> str:
        """Convert public key to Bitcoin address"""
        if not public_key_hex:
            return None
            
        # SHA256 hash
        sha256_hash = hashlib.sha256(bytes.fromhex(public_key_hex)).digest()
        
        # RIPEMD160 hash
        ripemd160 = hashlib.new('ripemd160')
        ripemd160.update(sha256_hash)
        hashed_public_key = ripemd160.digest()
        
        # Add network byte (0x00 for mainnet)
        network_hash = b'\x00' + hashed_public_key
        
        # Calculate checksum
        checksum = hashlib.sha256(hashlib.sha256(network_hash).digest()).digest()[:4]
        
        # Create address
        binary_address = network_hash + checksum
        address = BitcoinWallet._base58_encode(binary_address)
        
        return address
    
    @staticmethod
    def check_balance(address: str) -> Optional[float]:
        """Check balance of a Bitcoin address using blockchain.info API"""
        try:
            url = f"https://blockchain.info/q/addressbalance/{address}"
            response = requests.get(url, timeout=10)
            if response.status_code == 200:
                # Balance is in satoshis, convert to BTC
                balance_satoshi = int(response.text)
                return balance_satoshi / 100000000
            return None
        except Exception as e:
            print(f"Error checking balance: {e}")
            return None


class EthereumWallet:
    """Ethereum wallet generator and checker"""
    
    @staticmethod
    def generate_private_key() -> str:
        """Generate a random 256-bit private key"""
        return secrets.token_hex(32)
    
    @staticmethod
    def private_key_to_address(private_key_hex: str) -> str:
        """Convert private key to Ethereum address"""
        try:
            from ecdsa import SigningKey, SECP256k1
            
            sk = SigningKey.from_string(bytes.fromhex(private_key_hex), curve=SECP256k1)
            vk = sk.get_verifying_key()
            public_key = vk.to_string()
            
            # Try using hashlib.sha3_256 (available in Python 3.6+)
            # Note: Ethereum uses Keccak-256, not SHA3-256
            # We'll use Crypto.Hash.keccak instead
            try:
                from Crypto.Hash import keccak
                k = keccak.new(digest_bits=256)
                k.update(public_key)
                address = '0x' + k.hexdigest()[-40:]
                return address
            except ImportError:
                # Fallback: simplified address generation (not real Ethereum)
                import hashlib
                hash_obj = hashlib.sha256(public_key)
                address = '0x' + hash_obj.hexdigest()[-40:]
                return address
                
        except ImportError:
            return None
    
    @staticmethod
    def check_balance(address: str) -> Optional[float]:
        """Check balance of an Ethereum address using etherscan API"""
        try:
            # Using public API (rate limited)
            url = f"https://api.etherscan.io/api?module=account&action=balance&address={address}&tag=latest"
            response = requests.get(url, timeout=10)
            if response.status_code == 200:
                data = response.json()
                if data.get('status') == '1':
                    # Balance is in wei, convert to ETH
                    balance_wei = int(data.get('result', 0))
                    return balance_wei / 1e18
            return None
        except Exception as e:
            print(f"Error checking balance: {e}")
            return None


class WalletHunter:
    """Main Wallet Hunter class"""
    
    def __init__(self, output_file: str = 'found_wallets.txt'):
        self.output_file = output_file
        self.checked_count = 0
        self.found_count = 0
        self.start_time = datetime.now()
    
    def log_wallet(self, wallet_type: str, private_key: str, address: str, balance: float):
        """Log a wallet with balance to file"""
        timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        log_entry = f"""
{'='*60}
Found at: {timestamp}
Type: {wallet_type}
Address: {address}
Private Key: {private_key}
Balance: {balance}
{'='*60}
"""
        with open(self.output_file, 'a') as f:
            f.write(log_entry)
        
        print(f"\n🎉 FOUND! {wallet_type} wallet with balance: {balance}")
        print(f"Address: {address}")
        self.found_count += 1
    
    def print_stats(self):
        """Print current statistics"""
        elapsed = (datetime.now() - self.start_time).total_seconds()
        rate = self.checked_count / elapsed if elapsed > 0 else 0
        
        print(f"\rChecked: {self.checked_count} | Found: {self.found_count} | Rate: {rate:.2f}/s", end='', flush=True)
    
    def hunt_bitcoin(self, check_balance: bool = True, delay: float = 1.0):
        """Hunt for Bitcoin wallets"""
        print("Starting Bitcoin wallet hunter...")
        print("Press Ctrl+C to stop\n")
        
        try:
            while True:
                # Generate wallet
                private_key = BitcoinWallet.generate_private_key()
                public_key = BitcoinWallet.private_key_to_public_key(private_key)
                
                if public_key:
                    address = BitcoinWallet.public_key_to_address(public_key)
                    
                    if address:
                        self.checked_count += 1
                        
                        # Check balance if enabled
                        if check_balance:
                            balance = BitcoinWallet.check_balance(address)
                            if balance is not None and balance > 0:
                                wif = BitcoinWallet.private_key_to_wif(private_key)
                                self.log_wallet('Bitcoin', wif, address, balance)
                            
                            # Rate limiting to avoid API abuse
                            time.sleep(delay)
                        
                        # Print stats every 10 wallets
                        if self.checked_count % 10 == 0:
                            self.print_stats()
                else:
                    print("\nWarning: ecdsa library not available. Please install with: pip install ecdsa")
                    break
                    
        except KeyboardInterrupt:
            print("\n\nStopping...")
            self.print_final_stats()
    
    def hunt_ethereum(self, check_balance: bool = True, delay: float = 1.0):
        """Hunt for Ethereum wallets"""
        print("Starting Ethereum wallet hunter...")
        print("Press Ctrl+C to stop\n")
        
        try:
            while True:
                # Generate wallet
                private_key = EthereumWallet.generate_private_key()
                address = EthereumWallet.private_key_to_address(private_key)
                
                if address:
                    self.checked_count += 1
                    
                    # Check balance if enabled
                    if check_balance:
                        balance = EthereumWallet.check_balance(address)
                        if balance is not None and balance > 0:
                            self.log_wallet('Ethereum', private_key, address, balance)
                        
                        # Rate limiting to avoid API abuse
                        time.sleep(delay)
                    
                    # Print stats every 10 wallets
                    if self.checked_count % 10 == 0:
                        self.print_stats()
                else:
                    print("\nWarning: Required libraries not available.")
                    print("Install with: pip install ecdsa pycryptodome")
                    break
                    
        except KeyboardInterrupt:
            print("\n\nStopping...")
            self.print_final_stats()
    
    def print_final_stats(self):
        """Print final statistics"""
        elapsed = (datetime.now() - self.start_time).total_seconds()
        print(f"\n{'='*60}")
        print(f"Final Statistics:")
        print(f"Total Checked: {self.checked_count}")
        print(f"Total Found: {self.found_count}")
        print(f"Time Elapsed: {elapsed:.2f} seconds")
        if elapsed > 0:
            print(f"Average Rate: {self.checked_count/elapsed:.2f} wallets/second")
        else:
            print(f"Average Rate: N/A (insufficient time)")
        print(f"{'='*60}")


def main():
    """Main entry point"""
    import argparse
    
    parser = argparse.ArgumentParser(
        description='Wallet Hunter - Educational cryptocurrency wallet generator and checker',
        epilog='For educational purposes only. Use responsibly.'
    )
    parser.add_argument(
        '--type',
        choices=['bitcoin', 'ethereum', 'btc', 'eth'],
        default='bitcoin',
        help='Type of cryptocurrency wallet to hunt (default: bitcoin)'
    )
    parser.add_argument(
        '--no-balance-check',
        action='store_true',
        help='Disable balance checking (just generate wallets)'
    )
    parser.add_argument(
        '--delay',
        type=float,
        default=1.0,
        help='Delay between API calls in seconds (default: 1.0)'
    )
    parser.add_argument(
        '--output',
        default='found_wallets.txt',
        help='Output file for found wallets (default: found_wallets.txt)'
    )
    
    args = parser.parse_args()
    
    # Create hunter
    hunter = WalletHunter(output_file=args.output)
    
    # Determine wallet type
    wallet_type = args.type.lower()
    check_balance = not args.no_balance_check
    
    print(f"""
{'='*60}
Wallet Hunter
{'='*60}
Wallet Type: {wallet_type.upper()}
Balance Check: {'Enabled' if check_balance else 'Disabled'}
Output File: {args.output}
Delay: {args.delay}s
{'='*60}

⚠️  EDUCATIONAL USE ONLY ⚠️
This tool is for educational purposes to demonstrate
blockchain concepts. Finding wallets with balance is
extremely unlikely due to the vast address space.
{'='*60}
""")
    
    # Start hunting
    if wallet_type in ['bitcoin', 'btc']:
        hunter.hunt_bitcoin(check_balance=check_balance, delay=args.delay)
    elif wallet_type in ['ethereum', 'eth']:
        hunter.hunt_ethereum(check_balance=check_balance, delay=args.delay)


if __name__ == '__main__':
    main()
