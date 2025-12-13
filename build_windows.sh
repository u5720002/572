#!/bin/bash
# Wallet Hunter - Windows Executable Build Script (Linux/Mac cross-compile)
# This script creates a standalone Windows .exe file using Wine

echo "========================================"
echo "Wallet Hunter - Windows Build Script"
echo "========================================"
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "ERROR: Python 3 is not installed"
    exit 1
fi

echo "[1/4] Installing dependencies..."
pip install -r requirements-build.txt
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install dependencies"
    exit 1
fi

echo ""
echo "[2/4] Creating executable..."
pyinstaller --onefile \
    --windowed \
    --name "WalletHunter" \
    --add-data "wallet_hunter.py:." \
    wallet_hunter_gui.py

if [ $? -ne 0 ]; then
    echo "ERROR: Failed to create executable"
    exit 1
fi

echo ""
echo "[3/4] Cleaning up..."
rm -rf build
rm -rf __pycache__
rm -f WalletHunter.spec

echo ""
echo "[4/4] Build complete!"
echo ""
echo "========================================"
echo "SUCCESS!"
echo "========================================"
echo ""
echo "Your executable is ready:"
echo "Location: dist/WalletHunter"
echo ""
echo "Note: On Linux/Mac, this creates a native executable."
echo "To create a Windows .exe, run this script on Windows or use Wine."
echo ""
