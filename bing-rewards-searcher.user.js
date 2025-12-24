// ==UserScript==
// @name         Bing Rewards Auto Searcher
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Automated Bing search script for earning Microsoft Rewards points
// @author       You
// @match        https://www.bing.com/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    // Default Configuration
    const DEFAULT_CONFIG = {
        desktopSearches: 30,
        mobileSearches: 20,
        minDelay: 3000,
        maxDelay: 8000,
        autoStart: false
    };

    // Load configuration
    function getConfig() {
        return {
            desktopSearches: GM_getValue('desktopSearches', DEFAULT_CONFIG.desktopSearches),
            mobileSearches: GM_getValue('mobileSearches', DEFAULT_CONFIG.mobileSearches),
            minDelay: GM_getValue('minDelay', DEFAULT_CONFIG.minDelay),
            maxDelay: GM_getValue('maxDelay', DEFAULT_CONFIG.maxDelay),
            autoStart: GM_getValue('autoStart', DEFAULT_CONFIG.autoStart)
        };
    }

    // Save configuration
    function saveConfig(config) {
        GM_setValue('desktopSearches', config.desktopSearches);
        GM_setValue('mobileSearches', config.mobileSearches);
        GM_setValue('minDelay', config.minDelay);
        GM_setValue('maxDelay', config.maxDelay);
        GM_setValue('autoStart', config.autoStart);
    }

    // Random search queries for variety
    const searchQueries = [
        'weather today', 'news headlines', 'recipe ideas', 'technology news',
        'sports scores', 'movie reviews', 'book recommendations', 'travel destinations',
        'health tips', 'fitness exercises', 'cooking techniques', 'gardening tips',
        'science facts', 'history events', 'art galleries', 'music genres',
        'programming languages', 'digital marketing', 'photography tips', 'home decor',
        'fashion trends', 'automotive news', 'stock market', 'cryptocurrency',
        'climate change', 'renewable energy', 'space exploration', 'artificial intelligence',
        'machine learning', 'data science', 'cybersecurity', 'video games',
        'board games', 'pets care', 'wildlife conservation', 'ocean life',
        'mountain hiking', 'yoga benefits', 'meditation techniques', 'mental health',
        'productivity tips', 'time management', 'business ideas', 'entrepreneurship',
        'investment strategies', 'personal finance', 'budget planning', 'tax tips',
        'legal advice', 'real estate', 'interior design', 'architecture',
        'sustainable living', 'zero waste', 'organic food', 'nutrition facts'
    ];

    // Generate random query
    function getRandomQuery() {
        const baseQuery = searchQueries[Math.floor(Math.random() * searchQueries.length)];
        const randomNum = Math.floor(Math.random() * 10000);
        return `${baseQuery} ${randomNum}`;
    }

    // Get random delay
    function getRandomDelay(config) {
        return Math.floor(Math.random() * (config.maxDelay - config.minDelay + 1)) + config.minDelay;
    }

    // Detect if mobile mode
    function isMobileMode() {
        return window.innerWidth <= 768 || /Mobile|Android|iPhone/i.test(navigator.userAgent);
    }

    // Search state
    let searchState = {
        isRunning: false,
        currentSearch: 0,
        totalSearches: 0,
        timeoutId: null,
        countdownIntervalId: null
    };

    // Load search state from storage
    function loadSearchState() {
        const savedState = GM_getValue('searchState', null);
        if (savedState) {
            try {
                const parsed = JSON.parse(savedState);
                searchState.isRunning = parsed.isRunning || false;
                searchState.currentSearch = parsed.currentSearch || 0;
                searchState.totalSearches = parsed.totalSearches || 0;
            } catch (e) {
                // Invalid saved state, ignore
            }
        }
    }

    // Save search state to storage
    function saveSearchState() {
        GM_setValue('searchState', JSON.stringify({
            isRunning: searchState.isRunning,
            currentSearch: searchState.currentSearch,
            totalSearches: searchState.totalSearches
        }));
    }

    // Create UI Control Panel
    function createControlPanel() {
        // Remove existing panel if any
        const existingPanel = document.getElementById('bing-rewards-panel');
        if (existingPanel) {
            existingPanel.remove();
        }

        const panel = document.createElement('div');
        panel.id = 'bing-rewards-panel';
        panel.innerHTML = `
            <div id="br-panel-header">
                <span>🎯 Bing Rewards Searcher</span>
                <button id="br-minimize">−</button>
            </div>
            <div id="br-panel-content">
                <div id="br-status">
                    <div>Mode: <span id="br-mode">${isMobileMode() ? '📱 Mobile' : '🖥️ Desktop'}</span></div>
                    <div>Status: <span id="br-running-status">Idle</span></div>
                </div>
                <div id="br-progress">
                    <div>Progress: <span id="br-progress-text">0 / 0</span></div>
                    <div id="br-progress-bar-container">
                        <div id="br-progress-bar"></div>
                    </div>
                </div>
                <div id="br-controls">
                    <button id="br-start" class="br-btn br-btn-primary">Start Searches</button>
                    <button id="br-stop" class="br-btn br-btn-danger" disabled>Stop</button>
                    <button id="br-settings" class="br-btn br-btn-secondary">⚙️ Settings</button>
                </div>
                <div id="br-next-search" style="display: none;">
                    Next search in: <span id="br-countdown">0</span>s
                </div>
            </div>
        `;

        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            #bing-rewards-panel {
                position: fixed;
                top: 20px;
                right: 20px;
                width: 320px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                border-radius: 12px;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
                z-index: 999999;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                color: white;
                overflow: hidden;
                transition: all 0.3s ease;
            }
            #bing-rewards-panel.minimized #br-panel-content {
                display: none;
            }
            #br-panel-header {
                padding: 15px;
                background: rgba(0, 0, 0, 0.2);
                display: flex;
                justify-content: space-between;
                align-items: center;
                cursor: move;
                font-weight: bold;
                font-size: 16px;
            }
            #br-minimize {
                background: rgba(255, 255, 255, 0.2);
                border: none;
                color: white;
                width: 28px;
                height: 28px;
                border-radius: 6px;
                cursor: pointer;
                font-size: 18px;
                font-weight: bold;
                transition: background 0.2s;
            }
            #br-minimize:hover {
                background: rgba(255, 255, 255, 0.3);
            }
            #br-panel-content {
                padding: 15px;
            }
            #br-status, #br-progress {
                margin-bottom: 15px;
                background: rgba(255, 255, 255, 0.1);
                padding: 12px;
                border-radius: 8px;
            }
            #br-status div, #br-progress > div {
                margin-bottom: 8px;
                font-size: 14px;
            }
            #br-status div:last-child, #br-progress > div:last-child {
                margin-bottom: 0;
            }
            #br-progress-bar-container {
                width: 100%;
                height: 8px;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 4px;
                overflow: hidden;
                margin-top: 8px;
            }
            #br-progress-bar {
                height: 100%;
                background: linear-gradient(90deg, #4ade80, #22c55e);
                width: 0%;
                transition: width 0.3s ease;
                border-radius: 4px;
            }
            #br-controls {
                display: flex;
                gap: 8px;
                flex-wrap: wrap;
            }
            .br-btn {
                flex: 1;
                min-width: 80px;
                padding: 10px 15px;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                font-size: 13px;
                font-weight: 600;
                transition: all 0.2s;
                text-align: center;
            }
            .br-btn:disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }
            .br-btn-primary {
                background: linear-gradient(135deg, #10b981, #059669);
                color: white;
            }
            .br-btn-primary:hover:not(:disabled) {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
            }
            .br-btn-danger {
                background: linear-gradient(135deg, #ef4444, #dc2626);
                color: white;
            }
            .br-btn-danger:hover:not(:disabled) {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
            }
            .br-btn-secondary {
                background: rgba(255, 255, 255, 0.2);
                color: white;
            }
            .br-btn-secondary:hover:not(:disabled) {
                background: rgba(255, 255, 255, 0.3);
            }
            #br-next-search {
                margin-top: 12px;
                padding: 10px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 6px;
                text-align: center;
                font-size: 13px;
            }
            #br-countdown {
                font-weight: bold;
                font-size: 16px;
            }
            #br-mode {
                font-weight: bold;
            }
            #br-running-status {
                font-weight: bold;
            }
            .br-pulse {
                animation: pulse 2s ease-in-out infinite;
            }
            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.6; }
            }
        `;

        document.head.appendChild(style);
        document.body.appendChild(panel);

        // Make panel draggable
        makeDraggable(panel);

        // Setup event listeners
        setupEventListeners();
    }

    // Make panel draggable
    function makeDraggable(element) {
        const header = element.querySelector('#br-panel-header');
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

        header.onmousedown = dragMouseDown;

        function dragMouseDown(e) {
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            element.style.top = (element.offsetTop - pos2) + "px";
            element.style.left = (element.offsetLeft - pos1) + "px";
            element.style.right = "auto";
        }

        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }

    // Setup event listeners
    function setupEventListeners() {
        document.getElementById('br-minimize').addEventListener('click', () => {
            const panel = document.getElementById('bing-rewards-panel');
            panel.classList.toggle('minimized');
            const btn = document.getElementById('br-minimize');
            btn.textContent = panel.classList.contains('minimized') ? '+' : '−';
        });

        document.getElementById('br-start').addEventListener('click', startSearches);
        document.getElementById('br-stop').addEventListener('click', stopSearches);
        document.getElementById('br-settings').addEventListener('click', showSettings);
    }

    // Update UI
    function updateUI() {
        const progressText = document.getElementById('br-progress-text');
        const progressBar = document.getElementById('br-progress-bar');
        const statusText = document.getElementById('br-running-status');
        const startBtn = document.getElementById('br-start');
        const stopBtn = document.getElementById('br-stop');

        if (progressText) {
            progressText.textContent = `${searchState.currentSearch} / ${searchState.totalSearches}`;
        }
        if (progressBar) {
            const percentage = searchState.totalSearches > 0 ? 
                (searchState.currentSearch / searchState.totalSearches) * 100 : 0;
            progressBar.style.width = `${percentage}%`;
        }
        if (statusText) {
            if (searchState.isRunning) {
                statusText.textContent = '🔄 Running';
                statusText.classList.add('br-pulse');
            } else {
                statusText.textContent = searchState.currentSearch >= searchState.totalSearches && searchState.totalSearches > 0 ? 
                    '✅ Completed' : 'Idle';
                statusText.classList.remove('br-pulse');
            }
        }
        if (startBtn) {
            startBtn.disabled = searchState.isRunning;
        }
        if (stopBtn) {
            stopBtn.disabled = !searchState.isRunning;
        }
    }

    // Start searches
    function startSearches() {
        const config = getConfig();
        searchState.isRunning = true;
        searchState.currentSearch = 0;
        searchState.totalSearches = isMobileMode() ? config.mobileSearches : config.desktopSearches;

        saveSearchState();
        updateUI();
        performNextSearch();
    }

    // Stop searches
    function stopSearches() {
        searchState.isRunning = false;
        searchState.currentSearch = 0;
        searchState.totalSearches = 0;
        
        if (searchState.timeoutId) {
            clearTimeout(searchState.timeoutId);
            searchState.timeoutId = null;
        }
        if (searchState.countdownIntervalId) {
            clearInterval(searchState.countdownIntervalId);
            searchState.countdownIntervalId = null;
        }
        
        const nextSearchDiv = document.getElementById('br-next-search');
        if (nextSearchDiv) {
            nextSearchDiv.style.display = 'none';
        }
        
        saveSearchState();
        updateUI();
    }

    // Perform next search
    function performNextSearch() {
        if (!searchState.isRunning || searchState.currentSearch >= searchState.totalSearches) {
            searchState.isRunning = false;
            searchState.currentSearch = 0;
            searchState.totalSearches = 0;
            saveSearchState();
            updateUI();
            const nextSearchDiv = document.getElementById('br-next-search');
            if (nextSearchDiv) {
                nextSearchDiv.style.display = 'none';
            }
            return;
        }

        const config = getConfig();
        const query = getRandomQuery();
        const delay = getRandomDelay(config);

        // Show countdown
        const nextSearchDiv = document.getElementById('br-next-search');
        const countdownSpan = document.getElementById('br-countdown');
        
        if (searchState.currentSearch > 0) {
            if (nextSearchDiv) nextSearchDiv.style.display = 'block';
            
            let secondsLeft = Math.ceil(delay / 1000);
            if (countdownSpan) countdownSpan.textContent = secondsLeft;

            // Clear previous interval if any
            if (searchState.countdownIntervalId) {
                clearInterval(searchState.countdownIntervalId);
            }

            searchState.countdownIntervalId = setInterval(() => {
                secondsLeft--;
                if (countdownSpan) countdownSpan.textContent = secondsLeft;
                if (secondsLeft <= 0) {
                    clearInterval(searchState.countdownIntervalId);
                    searchState.countdownIntervalId = null;
                }
            }, 1000);
        }

        // Perform search after delay
        searchState.timeoutId = setTimeout(() => {
            searchState.currentSearch++;
            saveSearchState();
            updateUI();

            // Perform the search
            const searchUrl = `https://www.bing.com/search?q=${encodeURIComponent(query)}`;
            window.location.href = searchUrl;
        }, searchState.currentSearch === 0 ? 0 : delay);
    }

    // Show settings dialog
    function showSettings() {
        // Remove existing modal if any
        const existingModal = document.getElementById('br-settings-modal');
        if (existingModal) {
            existingModal.remove();
        }
        const existingStyle = document.getElementById('br-settings-style');
        if (existingStyle) {
            existingStyle.remove();
        }

        const config = getConfig();

        const modal = document.createElement('div');
        modal.id = 'br-settings-modal';
        modal.innerHTML = `
            <div id="br-settings-content">
                <h2>⚙️ Settings</h2>
                <div class="br-setting-group">
                    <label>Desktop Searches:</label>
                    <input type="number" id="br-desktop-searches" value="${config.desktopSearches}" min="1" max="100">
                </div>
                <div class="br-setting-group">
                    <label>Mobile Searches:</label>
                    <input type="number" id="br-mobile-searches" value="${config.mobileSearches}" min="1" max="100">
                </div>
                <div class="br-setting-group">
                    <label>Min Delay (ms):</label>
                    <input type="number" id="br-min-delay" value="${config.minDelay}" min="1000" max="30000" step="1000">
                </div>
                <div class="br-setting-group">
                    <label>Max Delay (ms):</label>
                    <input type="number" id="br-max-delay" value="${config.maxDelay}" min="1000" max="30000" step="1000">
                </div>
                <div class="br-setting-buttons">
                    <button id="br-save-settings" class="br-btn br-btn-primary">Save</button>
                    <button id="br-cancel-settings" class="br-btn br-btn-secondary">Cancel</button>
                    <button id="br-reset-settings" class="br-btn br-btn-danger">Reset to Defaults</button>
                </div>
            </div>
        `;

        const modalStyle = document.createElement('style');
        modalStyle.id = 'br-settings-style';
        modalStyle.textContent = `
            #br-settings-modal {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.7);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000000;
            }
            #br-settings-content {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                padding: 30px;
                border-radius: 12px;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
                color: white;
                min-width: 400px;
            }
            #br-settings-content h2 {
                margin: 0 0 20px 0;
                font-size: 24px;
            }
            .br-setting-group {
                margin-bottom: 20px;
            }
            .br-setting-group label {
                display: block;
                margin-bottom: 8px;
                font-weight: 600;
                font-size: 14px;
            }
            .br-setting-group input {
                width: 100%;
                padding: 10px;
                border: none;
                border-radius: 6px;
                font-size: 14px;
                box-sizing: border-box;
            }
            .br-setting-buttons {
                display: flex;
                gap: 10px;
                margin-top: 25px;
            }
            .br-setting-buttons .br-btn {
                flex: 1;
            }
        `;

        document.head.appendChild(modalStyle);
        document.body.appendChild(modal);

        // Cleanup function
        function closeModal() {
            modal.remove();
            modalStyle.remove();
        }

        // Event listeners for settings
        document.getElementById('br-save-settings').addEventListener('click', () => {
            const desktopSearches = parseInt(document.getElementById('br-desktop-searches').value);
            const mobileSearches = parseInt(document.getElementById('br-mobile-searches').value);
            const minDelay = parseInt(document.getElementById('br-min-delay').value);
            const maxDelay = parseInt(document.getElementById('br-max-delay').value);

            // Validate inputs
            if (isNaN(desktopSearches) || desktopSearches < 1 || desktopSearches > 100) {
                alert('Desktop searches must be between 1 and 100');
                return;
            }
            if (isNaN(mobileSearches) || mobileSearches < 1 || mobileSearches > 100) {
                alert('Mobile searches must be between 1 and 100');
                return;
            }
            if (isNaN(minDelay) || minDelay < 1000 || minDelay > 30000) {
                alert('Min delay must be between 1000 and 30000 milliseconds');
                return;
            }
            if (isNaN(maxDelay) || maxDelay < 1000 || maxDelay > 30000) {
                alert('Max delay must be between 1000 and 30000 milliseconds');
                return;
            }
            if (minDelay > maxDelay) {
                alert('Min delay cannot be greater than max delay');
                return;
            }

            const newConfig = {
                desktopSearches: desktopSearches,
                mobileSearches: mobileSearches,
                minDelay: minDelay,
                maxDelay: maxDelay,
                autoStart: config.autoStart
            };
            saveConfig(newConfig);
            closeModal();
        });

        document.getElementById('br-cancel-settings').addEventListener('click', closeModal);

        document.getElementById('br-reset-settings').addEventListener('click', () => {
            document.getElementById('br-desktop-searches').value = DEFAULT_CONFIG.desktopSearches;
            document.getElementById('br-mobile-searches').value = DEFAULT_CONFIG.mobileSearches;
            document.getElementById('br-min-delay').value = DEFAULT_CONFIG.minDelay;
            document.getElementById('br-max-delay').value = DEFAULT_CONFIG.maxDelay;
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Register menu commands
    GM_registerMenuCommand('Start Searches', startSearches);
    GM_registerMenuCommand('Stop Searches', stopSearches);
    GM_registerMenuCommand('Settings', showSettings);

    // Initialize
    function init() {
        // Load saved search state
        loadSearchState();

        // Wait for page to load
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                setTimeout(createControlPanel, 1000);
            });
        } else {
            setTimeout(createControlPanel, 1000);
        }

        // Continue search if in progress
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('q') && searchState.isRunning) {
            setTimeout(() => {
                performNextSearch();
            }, 1500);
        }
    }

    // Start the script
    init();
})();
