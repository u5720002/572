const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  launchBrowser: (config) => ipcRenderer.invoke('launch-browser', config),
  navigateTo: (url) => ipcRenderer.invoke('navigate-to', url),
  closeBrowser: () => ipcRenderer.invoke('close-browser'),
  getProfiles: () => ipcRenderer.invoke('get-profiles')
});
