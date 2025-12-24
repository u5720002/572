/**
 * Basic Example - Anti-Detect Browser
 * Demonstrates basic usage of the anti-detect browser
 */

const AntiDetectBrowser = require('../src/index');

async function main() {
  console.log('Anti-Detect Browser - Basic Example');
  console.log('='.repeat(50));

  // Create browser instance with default config
  const browser = new AntiDetectBrowser({
    headless: false,
    protectWebRTC: true,
    canvasNoise: true,
    webGLNoise: true
  });

  try {
    console.log('Launching browser with anti-detection features...');
    await browser.launch();

    console.log('Navigating to test page...');
    await browser.goto('https://bot.sannysoft.com/');

    console.log('\nBrowser is running. Check the page for detection results.');
    console.log('The page should show that automation is NOT detected.');
    console.log('\nWaiting 30 seconds before closing...');

    // Wait for 30 seconds
    await new Promise(resolve => setTimeout(resolve, 30000));

    console.log('Closing browser...');
    await browser.close();
    console.log('Done!');

  } catch (error) {
    console.error('Error:', error);
    await browser.close();
  }
}

main();
