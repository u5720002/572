// ==UserScript==
// @name         Auto Search
// @namespace    https://github.com/u5720002/572
// @version      1.0.0
// @description  Automatically search selected text with customizable search engines
// @author       u5720002
// @match        *://*/*
// @grant        GM_registerMenuCommand
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_openInTab
// @run-at       document-end
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        searchEngines: {
            google: {
                name: 'Google',
                url: 'https://www.google.com/search?q=',
                enabled: true
            },
            bing: {
                name: 'Bing',
                url: 'https://www.bing.com/search?q=',
                enabled: true
            },
            duckduckgo: {
                name: 'DuckDuckGo',
                url: 'https://duckduckgo.com/?q=',
                enabled: true
            },
            wikipedia: {
                name: 'Wikipedia',
                url: 'https://en.wikipedia.org/wiki/Special:Search?search=',
                enabled: true
            },
            github: {
                name: 'GitHub',
                url: 'https://github.com/search?q=',
                enabled: true
            }
        },
        defaultEngine: 'google',
        showPopup: true,
        useCtrlShift: true, // Ctrl+Shift+S for quick search
        openInNewTab: true,
        popupZIndex: 999999, // Z-index for popup to appear above other elements
        selectionDelay: 100 // Delay in ms before showing popup after selection
    };

    // Load saved configuration
    function loadConfig() {
        const savedConfig = GM_getValue('autoSearchConfig', null);
        if (savedConfig) {
            return Object.assign({}, CONFIG, JSON.parse(savedConfig));
        }
        return CONFIG;
    }

    // Save configuration
    function saveConfig(config) {
        GM_setValue('autoSearchConfig', JSON.stringify(config));
    }

    let config = loadConfig();

    // Create search popup
    function createSearchPopup() {
        const popup = document.createElement('div');
        popup.id = 'auto-search-popup';
        popup.style.cssText = `
            position: fixed;
            background: #ffffff;
            border: 2px solid #4285f4;
            border-radius: 8px;
            padding: 10px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: ${config.popupZIndex};
            display: none;
            font-family: Arial, sans-serif;
            min-width: 200px;
        `;

        const title = document.createElement('div');
        title.textContent = 'Search with:';
        title.style.cssText = `
            font-weight: bold;
            margin-bottom: 8px;
            color: #333;
            font-size: 14px;
        `;
        popup.appendChild(title);

        const buttonContainer = document.createElement('div');
        buttonContainer.style.cssText = 'display: flex; flex-direction: column; gap: 5px;';

        Object.entries(config.searchEngines).forEach(([key, engine]) => {
            if (engine.enabled) {
                const button = document.createElement('button');
                button.textContent = engine.name;
                button.style.cssText = `
                    padding: 8px 12px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    background: #f8f9fa;
                    cursor: pointer;
                    font-size: 13px;
                    transition: all 0.2s;
                `;
                button.onmouseover = () => {
                    button.style.background = '#e8f0fe';
                    button.style.borderColor = '#4285f4';
                };
                button.onmouseout = () => {
                    button.style.background = '#f8f9fa';
                    button.style.borderColor = '#ddd';
                };
                button.onclick = () => {
                    const selectedText = getSelectedText();
                    if (selectedText) {
                        performSearch(engine.url, selectedText);
                        hidePopup();
                    }
                };
                buttonContainer.appendChild(button);
            }
        });

        popup.appendChild(buttonContainer);

        const closeButton = document.createElement('button');
        closeButton.textContent = '✕';
        closeButton.style.cssText = `
            position: absolute;
            top: 5px;
            right: 5px;
            border: none;
            background: transparent;
            cursor: pointer;
            font-size: 16px;
            color: #666;
            padding: 2px 6px;
        `;
        closeButton.onclick = hidePopup;
        popup.appendChild(closeButton);

        document.body.appendChild(popup);
        return popup;
    }

    let popup = null;

    // Get selected text
    function getSelectedText() {
        return window.getSelection().toString().trim();
    }

    // Perform search
    function performSearch(baseUrl, query) {
        const url = baseUrl + encodeURIComponent(query);
        if (config.openInNewTab) {
            GM_openInTab(url, { active: true });
        } else {
            window.open(url, '_blank');
        }
    }

    // Show popup at cursor position
    function showPopup(x, y) {
        if (!popup) {
            popup = createSearchPopup();
        }

        popup.style.display = 'block';
        
        // Position popup near cursor
        const popupWidth = popup.offsetWidth;
        const popupHeight = popup.offsetHeight;
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        let left = x + 10;
        let top = y + 10;

        // Adjust if popup would go off-screen
        if (left + popupWidth > viewportWidth) {
            left = x - popupWidth - 10;
        }
        if (top + popupHeight > viewportHeight) {
            top = y - popupHeight - 10;
        }

        popup.style.left = left + 'px';
        popup.style.top = top + 'px';
    }

    // Hide popup
    function hidePopup() {
        if (popup) {
            popup.style.display = 'none';
        }
    }

    // Handle text selection
    let selectionTimeout;
    document.addEventListener('mouseup', (e) => {
        clearTimeout(selectionTimeout);
        selectionTimeout = setTimeout(() => {
            const selectedText = getSelectedText();
            if (selectedText && selectedText.length > 0 && config.showPopup) {
                showPopup(e.pageX, e.pageY);
            } else {
                hidePopup();
            }
        }, config.selectionDelay);
    });

    // Handle keyboard shortcut (Ctrl+Shift+S or Cmd+Shift+S on Mac)
    document.addEventListener('keydown', (e) => {
        if (config.useCtrlShift && ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'S')) {
            e.preventDefault();
            const selectedText = getSelectedText();
            if (selectedText) {
                const defaultEngine = config.searchEngines[config.defaultEngine];
                if (defaultEngine && defaultEngine.enabled) {
                    performSearch(defaultEngine.url, selectedText);
                }
            }
        }
    });

    // Hide popup when clicking elsewhere
    document.addEventListener('click', (e) => {
        if (popup && !popup.contains(e.target)) {
            hidePopup();
        }
    });

    // Register menu commands for configuration
    GM_registerMenuCommand('Set Default Search Engine', () => {
        const engines = Object.entries(config.searchEngines)
            .filter(([_, engine]) => engine.enabled)
            .map(([key, engine]) => `${key}: ${engine.name}`)
            .join('\n');
        
        const choice = prompt(
            `Current default: ${config.defaultEngine}\n\nAvailable engines:\n${engines}\n\nEnter the key of your preferred default engine:`,
            config.defaultEngine
        );
        
        if (choice && config.searchEngines[choice]) {
            config.defaultEngine = choice;
            saveConfig(config);
            alert(`Default search engine set to: ${config.searchEngines[choice].name}`);
        }
    });

    GM_registerMenuCommand('Toggle Search Popup', () => {
        config.showPopup = !config.showPopup;
        saveConfig(config);
        alert(`Search popup ${config.showPopup ? 'enabled' : 'disabled'}`);
    });

    GM_registerMenuCommand('Toggle Keyboard Shortcut', () => {
        config.useCtrlShift = !config.useCtrlShift;
        saveConfig(config);
        alert(`Keyboard shortcut (Ctrl+Shift+S) ${config.useCtrlShift ? 'enabled' : 'disabled'}`);
    });

    console.log('Auto Search userscript loaded successfully!');
})();
