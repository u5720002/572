/**
 * Advanced Example - Anti-Detect Browser
 * Demonstrates advanced features like proxy, geolocation, and timezone spoofing
 */

const AntiDetectBrowser = require('../src/index');

async function main() {
  console.log('Anti-Detect Browser - Advanced Example');
  console.log('='.repeat(50));

  // Create browser instance with advanced config
  const browser = new AntiDetectBrowser({
    headless: false,
    // proxy: 'http://proxy-server:port', // Uncomment to use proxy
    timezone: 'America/New_York',
    geolocation: {
      latitude: 40.7128,
      longitude: -74.0060,
      accuracy: 100
    },
    windowSize: {
      width: 1366,
      height: 768
    },
    protectWebRTC: true,
    canvasNoise: true,
    webGLNoise: true,
    audioNoise: true
  });

  try {
    console.log('Launching browser with advanced anti-detection features...');
    const { page } = await browser.launch();

    // Test 1: Check bot detection
    console.log('\n[Test 1] Checking bot detection...');
    await browser.goto('https://bot.sannysoft.com/');
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Test 2: Check fingerprint
    console.log('\n[Test 2] Checking browser fingerprint...');
    await browser.goto('https://browserleaks.com/canvas');
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Test 3: Check WebRTC
    console.log('\n[Test 3] Checking WebRTC leaks...');
    await browser.goto('https://browserleaks.com/webrtc');
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Test 4: Check geolocation
    console.log('\n[Test 4] Checking geolocation...');
    await browser.goto('https://browserleaks.com/geo');
    await new Promise(resolve => setTimeout(resolve, 5000));

    console.log('\nAll tests completed. Check the pages for results.');
    console.log('Waiting 20 seconds before closing...');
    await new Promise(resolve => setTimeout(resolve, 20000));

    console.log('Closing browser...');
    await browser.close();
    console.log('Done!');

  } catch (error) {
    console.error('Error:', error);
    await browser.close();
  }
}

main();
