const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

// Add parent directory to require path to access src modules
const parentSrcPath = path.join(__dirname, '..', 'src');
const AntiDetectBrowser = require(path.join(parentSrcPath, 'index.js'));

let mainWindow;
let browserInstance = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    },
    icon: path.join(__dirname, 'icon.png')
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open DevTools in development
  // mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function () {
    if (browserInstance) {
      browserInstance.close();
    }
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

// IPC Handlers
ipcMain.handle('launch-browser', async (event, config) => {
  try {
    if (browserInstance) {
      await browserInstance.close();
    }

    browserInstance = new AntiDetectBrowser(config);
    await browserInstance.launch();
    
    return { success: true, message: 'Browser launched successfully' };
  } catch (error) {
    return { success: false, message: error.message };
  }
});

ipcMain.handle('navigate-to', async (event, url) => {
  try {
    if (!browserInstance) {
      return { success: false, message: 'Browser not launched' };
    }
    
    await browserInstance.goto(url);
    return { success: true, message: `Navigated to ${url}` };
  } catch (error) {
    return { success: false, message: error.message };
  }
});

ipcMain.handle('close-browser', async () => {
  try {
    if (browserInstance) {
      await browserInstance.close();
      browserInstance = null;
    }
    return { success: true, message: 'Browser closed' };
  } catch (error) {
    return { success: false, message: error.message };
  }
});

ipcMain.handle('get-profiles', async () => {
  try {
    const fs = require('fs');
    const profilesPath = path.join(__dirname, '..', 'config', 'profiles.json');
    const profiles = JSON.parse(fs.readFileSync(profilesPath, 'utf8'));
    return { success: true, data: profiles };
  } catch (error) {
    return { success: false, message: error.message };
  }
});
