#!/usr/bin/env python3
"""
Test script for Wallet Hunter
"""

import sys
from wallet_hunter import BitcoinWallet, EthereumWallet

def test_bitcoin_wallet():
    """Test Bitcoin wallet generation"""
    print("Testing Bitcoin wallet generation...")
    
    # Generate a wallet
    private_key = BitcoinWallet.generate_private_key()
    print(f"  Private key: {private_key}")
    assert len(private_key) == 64, "Private key should be 64 hex characters"
    
    # Convert to WIF
    wif = BitcoinWallet.private_key_to_wif(private_key)
    print(f"  WIF: {wif}")
    assert wif.startswith('5') or wif.startswith('K') or wif.startswith('L'), "WIF should start with 5, K, or L"
    
    # Generate public key
    public_key = BitcoinWallet.private_key_to_public_key(private_key)
    print(f"  Public key: {public_key}")
    assert public_key.startswith('04'), "Uncompressed public key should start with 04"
    
    # Generate address
    address = BitcoinWallet.public_key_to_address(public_key)
    print(f"  Address: {address}")
    assert address.startswith('1'), "Bitcoin address should start with 1"
    assert len(address) >= 26 and len(address) <= 35, "Bitcoin address should be 26-35 characters"
    
    print("✅ Bitcoin wallet generation test passed!\n")
    return True

def test_ethereum_wallet():
    """Test Ethereum wallet generation"""
    print("Testing Ethereum wallet generation...")
    
    # Generate a wallet
    private_key = EthereumWallet.generate_private_key()
    print(f"  Private key: {private_key}")
    assert len(private_key) == 64, "Private key should be 64 hex characters"
    
    # Generate address
    address = EthereumWallet.private_key_to_address(private_key)
    print(f"  Address: {address}")
    assert address.startswith('0x'), "Ethereum address should start with 0x"
    assert len(address) == 42, "Ethereum address should be 42 characters (0x + 40 hex chars)"
    
    print("✅ Ethereum wallet generation test passed!\n")
    return True

def main():
    """Run all tests"""
    print("="*60)
    print("Wallet Hunter - Test Suite")
    print("="*60 + "\n")
    
    tests_passed = 0
    tests_failed = 0
    
    try:
        if test_bitcoin_wallet():
            tests_passed += 1
    except Exception as e:
        print(f"❌ Bitcoin test failed: {e}\n")
        tests_failed += 1
    
    try:
        if test_ethereum_wallet():
            tests_passed += 1
    except Exception as e:
        print(f"❌ Ethereum test failed: {e}\n")
        tests_failed += 1
    
    print("="*60)
    print(f"Tests Results: {tests_passed} passed, {tests_failed} failed")
    print("="*60)
    
    return 0 if tests_failed == 0 else 1

if __name__ == '__main__':
    sys.exit(main())
