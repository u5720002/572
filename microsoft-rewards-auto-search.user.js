// ==UserScript==
// @name         Microsoft Rewards Auto Search
// @namespace    https://github.com/u5720002/572
// @version      1.0.0
// @description  Automatically perform Bing searches to earn Microsoft Rewards points
// @author       u5720002
// @match        https://www.bing.com/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// @run-at       document-idle
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        DESKTOP_SEARCHES: GM_getValue('desktopSearches', 30),
        MOBILE_SEARCHES: GM_getValue('mobileSearches', 20),
        MIN_DELAY: GM_getValue('minDelay', 3000),  // 3 seconds
        MAX_DELAY: GM_getValue('maxDelay', 8000),  // 8 seconds
        AUTO_START: GM_getValue('autoStart', false),
        USE_MOBILE_MODE: GM_getValue('useMobileMode', false)
    };

    // Word list for generating random search queries
    const SEARCH_WORDS = [
        'technology', 'science', 'nature', 'history', 'geography',
        'mathematics', 'physics', 'chemistry', 'biology', 'astronomy',
        'literature', 'philosophy', 'psychology', 'sociology', 'economics',
        'politics', 'culture', 'art', 'music', 'sports',
        'health', 'medicine', 'nutrition', 'fitness', 'wellness',
        'travel', 'adventure', 'exploration', 'discovery', 'innovation',
        'education', 'learning', 'knowledge', 'wisdom', 'intelligence',
        'creativity', 'imagination', 'inspiration', 'motivation', 'success',
        'business', 'finance', 'investment', 'marketing', 'entrepreneurship',
        'technology', 'computer', 'software', 'hardware', 'internet',
        'programming', 'coding', 'development', 'engineering', 'design',
        'architecture', 'construction', 'building', 'infrastructure', 'transportation',
        'environment', 'ecology', 'sustainability', 'conservation', 'climate',
        'energy', 'renewable', 'solar', 'wind', 'electric',
        'food', 'cooking', 'recipe', 'restaurant', 'cuisine',
        'fashion', 'style', 'clothing', 'accessories', 'beauty',
        'entertainment', 'movies', 'television', 'streaming', 'gaming',
        'social', 'media', 'network', 'communication', 'connection',
        'animal', 'wildlife', 'pets', 'domestic', 'exotic',
        'ocean', 'sea', 'marine', 'aquatic', 'underwater',
        'space', 'universe', 'galaxy', 'planet', 'stars',
        'weather', 'climate', 'temperature', 'season', 'forecast',
        'language', 'translation', 'linguistics', 'grammar', 'vocabulary',
        'country', 'city', 'landmark', 'monument', 'heritage',
        'festival', 'celebration', 'holiday', 'tradition', 'custom'
    ];

    // State
    let isRunning = false;
    let searchCount = 0;
    let totalSearches = CONFIG.USE_MOBILE_MODE ? CONFIG.MOBILE_SEARCHES : CONFIG.DESKTOP_SEARCHES;

    // Utility Functions
    function getRandomDelay() {
        return Math.floor(Math.random() * (CONFIG.MAX_DELAY - CONFIG.MIN_DELAY + 1)) + CONFIG.MIN_DELAY;
    }

    function generateRandomQuery() {
        const numWords = Math.floor(Math.random() * 3) + 1; // 1-3 words
        const words = [];
        for (let i = 0; i < numWords; i++) {
            const randomIndex = Math.floor(Math.random() * SEARCH_WORDS.length);
            words.push(SEARCH_WORDS[randomIndex]);
        }
        // Add random number or year to make queries more unique
        if (Math.random() > 0.5) {
            words.push(Math.floor(Math.random() * 100) + 1920);
        }
        return words.join(' ');
    }

    function createControlPanel() {
        const panel = document.createElement('div');
        panel.id = 'rewards-auto-search-panel';
        panel.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            background: #fff;
            border: 2px solid #0067b8;
            border-radius: 8px;
            padding: 15px;
            z-index: 10000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            min-width: 250px;
        `;

        panel.innerHTML = `
            <div style="margin-bottom: 10px;">
                <h3 style="margin: 0 0 10px 0; color: #0067b8; font-size: 16px;">
                    🎁 Rewards Auto Search
                </h3>
            </div>
            <div style="margin-bottom: 10px;">
                <div style="margin-bottom: 5px; font-size: 13px;">
                    <strong>Mode:</strong> <span id="search-mode">${CONFIG.USE_MOBILE_MODE ? 'Mobile' : 'Desktop'}</span>
                </div>
                <div style="margin-bottom: 5px; font-size: 13px;">
                    <strong>Progress:</strong> <span id="search-progress">0/${totalSearches}</span>
                </div>
                <div style="margin-bottom: 10px;">
                    <div style="width: 100%; height: 8px; background: #e0e0e0; border-radius: 4px; overflow: hidden;">
                        <div id="search-progress-bar" style="width: 0%; height: 100%; background: #0067b8; transition: width 0.3s;"></div>
                    </div>
                </div>
            </div>
            <div style="display: flex; gap: 8px;">
                <button id="start-search-btn" style="
                    flex: 1;
                    padding: 8px 12px;
                    background: #0067b8;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 13px;
                    font-weight: 500;
                ">Start</button>
                <button id="stop-search-btn" style="
                    flex: 1;
                    padding: 8px 12px;
                    background: #d13438;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 13px;
                    font-weight: 500;
                    display: none;
                ">Stop</button>
            </div>
            <button id="close-panel-btn" style="
                position: absolute;
                top: 8px;
                right: 8px;
                background: none;
                border: none;
                font-size: 18px;
                cursor: pointer;
                color: #666;
                line-height: 1;
                padding: 0;
                width: 24px;
                height: 24px;
            ">×</button>
        `;

        document.body.appendChild(panel);

        // Event listeners
        document.getElementById('start-search-btn').addEventListener('click', startSearching);
        document.getElementById('stop-search-btn').addEventListener('click', stopSearching);
        document.getElementById('close-panel-btn').addEventListener('click', () => {
            panel.style.display = 'none';
        });

        return panel;
    }

    function updateProgress() {
        const progressText = document.getElementById('search-progress');
        const progressBar = document.getElementById('search-progress-bar');
        
        if (progressText) {
            progressText.textContent = `${searchCount}/${totalSearches}`;
        }
        
        if (progressBar) {
            const percentage = (searchCount / totalSearches) * 100;
            progressBar.style.width = `${percentage}%`;
        }
    }

    function performSearch() {
        if (!isRunning || searchCount >= totalSearches) {
            stopSearching();
            return;
        }

        const query = generateRandomQuery();
        searchCount++;
        
        // Update progress
        updateProgress();

        // Perform search by updating URL
        const searchUrl = `https://www.bing.com/search?q=${encodeURIComponent(query)}&form=QBLH`;
        
        // Navigate to search URL
        window.location.href = searchUrl;
    }

    function startSearching() {
        if (isRunning) return;

        isRunning = true;
        searchCount = 0;
        
        const startBtn = document.getElementById('start-search-btn');
        const stopBtn = document.getElementById('stop-search-btn');
        
        if (startBtn) startBtn.style.display = 'none';
        if (stopBtn) stopBtn.style.display = 'block';

        updateProgress();

        // Wait before starting first search
        setTimeout(() => {
            performNextSearch();
        }, 2000);
    }

    function performNextSearch() {
        if (!isRunning || searchCount >= totalSearches) {
            stopSearching();
            return;
        }

        performSearch();

        // Schedule next search with random delay
        if (searchCount < totalSearches) {
            const delay = getRandomDelay();
            setTimeout(performNextSearch, delay);
        }
    }

    function stopSearching() {
        isRunning = false;
        
        const startBtn = document.getElementById('start-search-btn');
        const stopBtn = document.getElementById('stop-search-btn');
        
        if (startBtn) startBtn.style.display = 'block';
        if (stopBtn) stopBtn.style.display = 'none';

        if (searchCount >= totalSearches) {
            alert(`✅ Completed ${searchCount} searches! Check your Microsoft Rewards dashboard.`);
        }
    }

    // Register menu commands for configuration
    GM_registerMenuCommand('Configure Desktop Searches', () => {
        const value = prompt('Number of desktop searches (default: 30):', CONFIG.DESKTOP_SEARCHES);
        if (value !== null) {
            const num = parseInt(value);
            if (!isNaN(num) && num > 0) {
                GM_setValue('desktopSearches', num);
                CONFIG.DESKTOP_SEARCHES = num;
                alert('Desktop searches updated! Please reload the page.');
            }
        }
    });

    GM_registerMenuCommand('Configure Mobile Searches', () => {
        const value = prompt('Number of mobile searches (default: 20):', CONFIG.MOBILE_SEARCHES);
        if (value !== null) {
            const num = parseInt(value);
            if (!isNaN(num) && num > 0) {
                GM_setValue('mobileSearches', num);
                CONFIG.MOBILE_SEARCHES = num;
                alert('Mobile searches updated! Please reload the page.');
            }
        }
    });

    GM_registerMenuCommand('Configure Min Delay (ms)', () => {
        const value = prompt('Minimum delay between searches in milliseconds (default: 3000):', CONFIG.MIN_DELAY);
        if (value !== null) {
            const num = parseInt(value);
            if (!isNaN(num) && num >= 1000) {
                GM_setValue('minDelay', num);
                CONFIG.MIN_DELAY = num;
                alert('Minimum delay updated!');
            }
        }
    });

    GM_registerMenuCommand('Configure Max Delay (ms)', () => {
        const value = prompt('Maximum delay between searches in milliseconds (default: 8000):', CONFIG.MAX_DELAY);
        if (value !== null) {
            const num = parseInt(value);
            if (!isNaN(num) && num >= CONFIG.MIN_DELAY) {
                GM_setValue('maxDelay', num);
                CONFIG.MAX_DELAY = num;
                alert('Maximum delay updated!');
            }
        }
    });

    GM_registerMenuCommand('Toggle Mobile Mode', () => {
        CONFIG.USE_MOBILE_MODE = !CONFIG.USE_MOBILE_MODE;
        GM_setValue('useMobileMode', CONFIG.USE_MOBILE_MODE);
        alert(`Mobile mode ${CONFIG.USE_MOBILE_MODE ? 'enabled' : 'disabled'}! Please reload the page.`);
    });

    GM_registerMenuCommand('Toggle Auto Start', () => {
        CONFIG.AUTO_START = !CONFIG.AUTO_START;
        GM_setValue('autoStart', CONFIG.AUTO_START);
        alert(`Auto start ${CONFIG.AUTO_START ? 'enabled' : 'disabled'}! Will take effect on next page load.`);
    });

    // Initialize
    function init() {
        // Only run on Bing homepage or search pages
        if (!window.location.hostname.includes('bing.com')) {
            return;
        }

        // Create control panel
        const panel = createControlPanel();

        // Auto start if enabled
        if (CONFIG.AUTO_START) {
            setTimeout(() => {
                startSearching();
            }, 2000);
        }
    }

    // Start when page is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
