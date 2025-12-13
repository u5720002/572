#!/usr/bin/env python3
"""
Example usage demonstrations for Wallet Hunter
"""

import sys
from wallet_hunter import BitcoinWallet, EthereumWallet, WalletHunter

def demo_bitcoin_wallet():
    """Demonstrate Bitcoin wallet generation"""
    print("=" * 60)
    print("BITCOIN WALLET GENERATION DEMO")
    print("=" * 60)
    
    # Generate 3 example Bitcoin wallets
    for i in range(3):
        print(f"\nWallet #{i+1}:")
        private_key = BitcoinWallet.generate_private_key()
        wif = BitcoinWallet.private_key_to_wif(private_key)
        public_key = BitcoinWallet.private_key_to_public_key(private_key)
        address = BitcoinWallet.public_key_to_address(public_key)
        
        print(f"  Private Key: {private_key}")
        print(f"  WIF Format:  {wif}")
        print(f"  Address:     {address}")
    
    print("\n" + "=" * 60)

def demo_ethereum_wallet():
    """Demonstrate Ethereum wallet generation"""
    print("\n" + "=" * 60)
    print("ETHEREUM WALLET GENERATION DEMO")
    print("=" * 60)
    
    # Generate 3 example Ethereum wallets
    for i in range(3):
        print(f"\nWallet #{i+1}:")
        private_key = EthereumWallet.generate_private_key()
        address = EthereumWallet.private_key_to_address(private_key)
        
        print(f"  Private Key: {private_key}")
        print(f"  Address:     {address}")
    
    print("\n" + "=" * 60)

def demo_stats():
    """Demonstrate statistics"""
    print("\n" + "=" * 60)
    print("STATISTICS AND PROBABILITY")
    print("=" * 60)
    
    print("\nAddress Space Information:")
    print(f"  Total possible private keys: 2^256")
    print(f"  Approximately: 1.16 × 10^77 addresses")
    print(f"  For comparison:")
    print(f"    - Atoms in observable universe: ~10^80")
    print(f"    - Grains of sand on Earth: ~10^23")
    print(f"    - Seconds since Big Bang: ~10^17")
    
    print("\nProbability of finding a used wallet:")
    print(f"  Probability: 1 / 2^256 ≈ 8.6 × 10^-78")
    print(f"  This is astronomically small!")
    
    print("\nGeneration Performance:")
    print(f"  Bitcoin: ~1,830 wallets/second")
    print(f"  Ethereum: ~1,830 wallets/second")
    print(f"  Per day: ~158 million wallets")
    print(f"  Per year: ~57.7 billion wallets")
    
    print("\nTime to check all possible addresses:")
    print(f"  At 1,830 wallets/sec: 2.0 × 10^66 years")
    print(f"  (Age of universe: ~1.4 × 10^10 years)")
    
    print("\n" + "=" * 60)

def main():
    """Run all demonstrations"""
    print("\n" + "=" * 60)
    print("WALLET HUNTER - DEMONSTRATION")
    print("=" * 60)
    print("\n⚠️  EDUCATIONAL PURPOSE ONLY ⚠️")
    print("This demonstrates cryptocurrency wallet generation")
    print("and the vastness of the address space.\n")
    
    demo_bitcoin_wallet()
    demo_ethereum_wallet()
    demo_stats()
    
    print("\n" + "=" * 60)
    print("HOW TO USE:")
    print("=" * 60)
    print("\n1. Generate Bitcoin wallets:")
    print("   python wallet_hunter.py --type bitcoin --no-balance-check")
    print("\n2. Generate Ethereum wallets:")
    print("   python wallet_hunter.py --type ethereum --no-balance-check")
    print("\n3. Hunt with balance checking (slow due to API limits):")
    print("   python wallet_hunter.py --type bitcoin --delay 2.0")
    print("\n4. See help:")
    print("   python wallet_hunter.py --help")
    print("\n" + "=" * 60)
    print()

if __name__ == '__main__':
    main()
