let browserLaunched = false;

// Get DOM elements
const launchBtn = document.getElementById('launch-btn');
const closeBtn = document.getElementById('close-btn');
const navigateBtn = document.getElementById('navigate-btn');
const statusDiv = document.getElementById('status');
const urlInput = document.getElementById('url');
const profileSelect = document.getElementById('profile-select');
const quickLinks = document.querySelectorAll('.btn-link[data-url]');

// Helper function to update status
function updateStatus(message, type = 'info') {
  statusDiv.textContent = message;
  statusDiv.className = 'status';
  if (type !== 'info') {
    statusDiv.classList.add(type);
  }
}

// Helper function to get configuration from form
function getConfig() {
  const config = {
    headless: document.getElementById('headless').checked,
    protectWebRTC: document.getElementById('protect-webrtc').checked,
    canvasNoise: document.getElementById('canvas-noise').checked,
    webGLNoise: true,
    audioNoise: true
  };

  const proxy = document.getElementById('proxy').value.trim();
  if (proxy) {
    config.proxy = proxy;
  }

  const timezone = document.getElementById('timezone').value.trim();
  if (timezone) {
    config.timezone = timezone;
  }

  const latitude = document.getElementById('latitude').value.trim();
  const longitude = document.getElementById('longitude').value.trim();
  if (latitude && longitude) {
    config.geolocation = {
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      accuracy: 100
    };
  }

  return config;
}

// Launch browser
launchBtn.addEventListener('click', async () => {
  updateStatus('Launching browser...', 'warning');
  launchBtn.disabled = true;

  try {
    const config = getConfig();
    const result = await window.electronAPI.launchBrowser(config);

    if (result.success) {
      browserLaunched = true;
      updateStatus(result.message, 'success');
      launchBtn.disabled = true;
      closeBtn.disabled = false;
      navigateBtn.disabled = false;
    } else {
      updateStatus(`Error: ${result.message}`, 'error');
      launchBtn.disabled = false;
    }
  } catch (error) {
    updateStatus(`Error: ${error.message}`, 'error');
    launchBtn.disabled = false;
  }
});

// Close browser
closeBtn.addEventListener('click', async () => {
  updateStatus('Closing browser...', 'warning');

  try {
    const result = await window.electronAPI.closeBrowser();

    if (result.success) {
      browserLaunched = false;
      updateStatus('Browser closed. Ready to launch again.', 'info');
      launchBtn.disabled = false;
      closeBtn.disabled = true;
      navigateBtn.disabled = true;
    } else {
      updateStatus(`Error: ${result.message}`, 'error');
    }
  } catch (error) {
    updateStatus(`Error: ${error.message}`, 'error');
  }
});

// Navigate to URL
navigateBtn.addEventListener('click', async () => {
  const url = urlInput.value.trim();
  
  if (!url) {
    updateStatus('Please enter a URL', 'error');
    return;
  }

  updateStatus(`Navigating to ${url}...`, 'warning');

  try {
    const result = await window.electronAPI.navigateTo(url);

    if (result.success) {
      updateStatus(result.message, 'success');
    } else {
      updateStatus(`Error: ${result.message}`, 'error');
    }
  } catch (error) {
    updateStatus(`Error: ${error.message}`, 'error');
  }
});

// Quick links
quickLinks.forEach(link => {
  link.addEventListener('click', () => {
    const url = link.getAttribute('data-url');
    urlInput.value = url;
    
    if (browserLaunched) {
      navigateBtn.click();
    }
  });
});

// Enter key in URL input
urlInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && !navigateBtn.disabled) {
    navigateBtn.click();
  }
});

// Load profiles on startup
window.addEventListener('DOMContentLoaded', async () => {
  try {
    const result = await window.electronAPI.getProfiles();
    if (result.success) {
      console.log('Profiles loaded:', result.data);
    }
  } catch (error) {
    console.error('Failed to load profiles:', error);
  }
});
