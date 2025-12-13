@echo off
REM Wallet Hunter - Windows Executable Build Script
REM This script creates a standalone Windows .exe file

echo ========================================
echo Wallet Hunter - Windows Build Script
echo ========================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python from https://www.python.org/
    pause
    exit /b 1
)

echo [1/4] Installing dependencies...
pip install -r requirements-build.txt
if errorlevel 1 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo [2/4] Creating executable...
pyinstaller --onefile ^
    --windowed ^
    --name "WalletHunter" ^
    --icon=NONE ^
    --add-data "wallet_hunter.py;." ^
    wallet_hunter_gui.py

if errorlevel 1 (
    echo ERROR: Failed to create executable
    pause
    exit /b 1
)

echo.
echo [3/4] Cleaning up...
if exist build rmdir /s /q build
if exist __pycache__ rmdir /s /q __pycache__
if exist WalletHunter.spec del WalletHunter.spec

echo.
echo [4/4] Build complete!
echo.
echo ========================================
echo SUCCESS!
echo ========================================
echo.
echo Your Windows executable is ready:
echo Location: dist\WalletHunter.exe
echo.
echo You can now run WalletHunter.exe on any Windows computer
echo without needing to install Python or any dependencies.
echo.
pause
