@echo off
REM Build script for Windows

echo ==========================================
echo Anti-Detect Browser - Build Script (Windows)
echo ==========================================

echo.
echo Select build option:
echo 1) Build Electron Desktop App
echo 2) Build Python Executable (PyInstaller)
echo 3) Build Both
set /p choice="Enter choice [1-3]: "

if "%choice%"=="1" goto electron
if "%choice%"=="3" goto electron
if "%choice%"=="2" goto python
goto end

:electron
echo.
echo Building Electron Desktop App...
echo ==================================

where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Error: npm is not installed
    exit /b 1
)

cd desktop-app

if not exist "node_modules" (
    echo Installing Node.js dependencies...
    call npm install
)

echo Building for Windows...
call npm run build:win

echo.
echo Electron app built successfully!
echo Output: desktop-app\dist\

cd ..

if "%choice%"=="1" goto end

:python
echo.
echo Building Python Executable...
echo ==============================

where python >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Error: python is not installed
    exit /b 1
)

python -c "import PyInstaller" 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Installing PyInstaller...
    pip install pyinstaller
)

echo Installing Python dependencies...
pip install -r requirements.txt

cd desktop-app

echo Building executable with PyInstaller...
pyinstaller anti_detect_browser.spec --clean

echo.
echo Python executable built successfully!
echo Output: desktop-app\dist\

cd ..

:end
echo.
echo ==========================================
echo Build completed successfully!
echo ==========================================
echo.
echo Distribution files are in the 'desktop-app\dist\' directory
echo.
pause
