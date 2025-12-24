#!/bin/bash
# Build script for creating standalone executables

set -e

echo "=========================================="
echo "Anti-Detect Browser - Build Script"
echo "=========================================="

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

echo ""
echo "Select build option:"
echo "1) Build Electron Desktop App (Cross-platform)"
echo "2) Build Python Executable (PyInstaller)"
echo "3) Build Both"
read -p "Enter choice [1-3]: " choice

case $choice in
    1|3)
        echo ""
        echo "Building Electron Desktop App..."
        echo "=================================="
        
        if ! command_exists npm; then
            echo "Error: npm is not installed"
            exit 1
        fi
        
        cd desktop-app
        
        # Install dependencies if needed
        if [ ! -d "node_modules" ]; then
            echo "Installing Node.js dependencies..."
            npm install
        fi
        
        # Build for all platforms
        echo "Building for Windows..."
        npm run build:win
        
        echo "Building for macOS..."
        npm run build:mac
        
        echo "Building for Linux..."
        npm run build:linux
        
        echo "✓ Electron app built successfully!"
        echo "Output: desktop-app/dist/"
        
        cd ..
        
        if [ "$choice" = "1" ]; then
            exit 0
        fi
        ;;
esac

case $choice in
    2|3)
        echo ""
        echo "Building Python Executable..."
        echo "=============================="
        
        if ! command_exists python3; then
            echo "Error: python3 is not installed"
            exit 1
        fi
        
        # Install PyInstaller if not available
        if ! python3 -c "import PyInstaller" 2>/dev/null; then
            echo "Installing PyInstaller..."
            pip3 install pyinstaller
        fi
        
        # Install dependencies
        echo "Installing Python dependencies..."
        pip3 install -r requirements.txt
        
        cd desktop-app
        
        # Build executable
        echo "Building executable with PyInstaller..."
        pyinstaller anti_detect_browser.spec --clean
        
        echo "✓ Python executable built successfully!"
        echo "Output: desktop-app/dist/"
        
        cd ..
        ;;
esac

echo ""
echo "=========================================="
echo "Build completed successfully!"
echo "=========================================="
echo ""
echo "Distribution files are in the 'desktop-app/dist/' directory"
echo ""
