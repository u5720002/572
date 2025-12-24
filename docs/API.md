# API Documentation

## Anti-Detect Browser API Reference

### JavaScript API

#### Class: AntiDetectBrowser

Main class for creating and managing anti-detect browser instances.

##### Constructor

```javascript
new AntiDetectBrowser(config)
```

**Parameters:**
- `config` (Object): Configuration object (see Configuration Options)

**Example:**
```javascript
const browser = new AntiDetectBrowser({
  headless: false,
  protectWebRTC: true
});
```

##### Methods

###### `launch()`

Launches the browser with anti-detection features.

**Returns:** Promise<{browser, page}>

**Example:**
```javascript
const { browser, page } = await browser.launch();
```

###### `goto(url, options)`

Navigates to a URL.

**Parameters:**
- `url` (string): The URL to navigate to
- `options` (Object, optional): Navigation options

**Returns:** Promise<Response>

**Example:**
```javascript
await browser.goto('https://example.com');
```

###### `close()`

Closes the browser.

**Returns:** Promise<void>

**Example:**
```javascript
await browser.close();
```

###### `getPage()`

Returns the current page instance.

**Returns:** Page

###### `getBrowser()`

Returns the browser instance.

**Returns:** Browser

#### Class: AntiDetectConfig

Configuration management class.

##### Static Methods

###### `fromProfile(profileName)`

Creates a configuration from a predefined profile.

**Parameters:**
- `profileName` (string): Profile name ('default', 'stealth', 'performance')

**Returns:** AntiDetectConfig

**Example:**
```javascript
const config = AntiDetectConfig.fromProfile('stealth');
const browser = new AntiDetectBrowser(config);
```

#### Class: FingerprintSpoofer

Handles browser fingerprint spoofing.

##### Methods

###### `apply(page, config)`

Applies fingerprint spoofing to a page.

**Parameters:**
- `page` (Page): Puppeteer page instance
- `config` (Object): Configuration object

**Returns:** Promise<void>

### Python API

#### Class: AntiDetectBrowser

Main class for creating and managing anti-detect browser instances.

##### Constructor

```python
AntiDetectBrowser(config=None)
```

**Parameters:**
- `config` (dict): Configuration dictionary

**Example:**
```python
browser = AntiDetectBrowser({
    'headless': False,
    'window_size': {'width': 1920, 'height': 1080}
})
```

##### Methods

###### `launch(headless=False, proxy=None)`

Launches the browser with anti-detection features.

**Parameters:**
- `headless` (bool): Run in headless mode
- `proxy` (str): Proxy server address

**Returns:** WebDriver instance

**Example:**
```python
driver = browser.launch(headless=False)
```

###### `goto(url, wait_time=5)`

Navigates to a URL.

**Parameters:**
- `url` (str): The URL to navigate to
- `wait_time` (int): Implicit wait time in seconds

**Returns:** bool (True if successful)

**Example:**
```python
browser.goto('https://example.com')
```

###### `close()`

Closes the browser.

**Example:**
```python
browser.close()
```

###### `get_driver()`

Returns the WebDriver instance.

**Returns:** WebDriver

###### `take_screenshot(filename='screenshot.png')`

Takes a screenshot of the current page.

**Parameters:**
- `filename` (str): Filename to save the screenshot

**Returns:** bool (True if successful)

**Example:**
```python
browser.take_screenshot('test.png')
```

#### Function: create_browser_profile

Creates a browser configuration profile.

```python
create_browser_profile(profile_type='default')
```

**Parameters:**
- `profile_type` (str): Profile type ('default', 'stealth', 'performance')

**Returns:** dict

**Example:**
```python
config = create_browser_profile('stealth')
browser = AntiDetectBrowser(config)
```

## Configuration Options

### JavaScript Configuration Object

```javascript
{
  headless: false,              // Run in headless mode
  userAgent: null,              // Custom user agent
  proxy: null,                  // Proxy server (e.g., 'http://host:port')
  windowSize: {                 // Window dimensions
    width: 1920,
    height: 1080
  },
  timezone: null,               // Timezone (e.g., 'America/New_York')
  geolocation: {                // Geolocation coordinates
    latitude: 40.7128,
    longitude: -74.0060,
    accuracy: 100
  },
  protectWebRTC: true,          // Enable WebRTC protection
  canvasNoise: true,            // Enable canvas fingerprint protection
  webGLNoise: true,             // Enable WebGL fingerprint protection
  audioNoise: true              // Enable audio fingerprint protection
}
```

### Python Configuration Dictionary

```python
{
    'headless': False,
    'user_agent': None,
    'proxy': None,
    'window_size': {
        'width': 1920,
        'height': 1080
    }
}
```

## Events and Handlers

### JavaScript Page Events

You can listen to page events using the standard Puppeteer API:

```javascript
const { page } = await browser.launch();

page.on('console', msg => console.log('PAGE LOG:', msg.text()));
page.on('dialog', dialog => dialog.accept());
page.on('request', request => console.log('Request:', request.url()));
```

### Python Driver Methods

Use standard Selenium methods with the driver:

```python
driver = browser.get_driver()

# Find elements
element = driver.find_element('id', 'my-id')

# Execute JavaScript
result = driver.execute_script('return document.title')

# Take screenshot
driver.save_screenshot('screenshot.png')
```

## Error Handling

### JavaScript

```javascript
try {
  await browser.launch();
  await browser.goto('https://example.com');
} catch (error) {
  console.error('Error:', error);
} finally {
  await browser.close();
}
```

### Python

```python
try:
    browser.launch()
    browser.goto('https://example.com')
except Exception as error:
    print(f'Error: {error}')
finally:
    browser.close()
```

## Best Practices

1. **Always close the browser** after use to free resources
2. **Use try-catch/finally** blocks for error handling
3. **Configure timeouts** appropriately for your use case
4. **Rotate user agents** for better anonymity
5. **Use proxies** when making multiple requests
6. **Test detection** on bot detection websites before production use
7. **Keep dependencies updated** for latest anti-detection techniques

## Advanced Usage

### Custom User Agent Rotation

```javascript
const userAgents = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64)...',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)...',
  // Add more user agents
];

const randomUA = userAgents[Math.floor(Math.random() * userAgents.length)];

const browser = new AntiDetectBrowser({
  userAgent: randomUA
});
```

### Profile Management

```javascript
const fs = require('fs');
const profiles = JSON.parse(fs.readFileSync('./config/profiles.json'));

const browser = new AntiDetectBrowser(profiles.profiles.stealth.config);
```

### Multiple Browser Instances

```javascript
const browsers = [];

for (let i = 0; i < 5; i++) {
  const browser = new AntiDetectBrowser({ headless: true });
  await browser.launch();
  browsers.push(browser);
}

// Use browsers...

// Close all
await Promise.all(browsers.map(b => b.close()));
```
