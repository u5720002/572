// ==UserScript==
// @name         Microsoft Rewards Auto Search
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Automatically perform Bing searches to earn Microsoft Rewards points
// @author       You
// @match        https://www.bing.com/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        DESKTOP_SEARCHES: 30,  // Number of desktop searches needed
        MOBILE_SEARCHES: 20,   // Number of mobile searches needed
        MIN_DELAY: 3000,       // Minimum delay between searches (ms)
        MAX_DELAY: 8000,       // Maximum delay between searches (ms)
        STORAGE_KEY: 'msRewardsAutoSearch'
    };

    // Random search terms pool
    const SEARCH_TERMS = [
        'technology news', 'weather forecast', 'healthy recipes', 'travel destinations',
        'movie reviews', 'sports scores', 'stock market', 'climate change',
        'artificial intelligence', 'space exploration', 'renewable energy', 'electric cars',
        'quantum computing', 'machine learning', 'cryptocurrency', 'blockchain',
        'virtual reality', 'augmented reality', 'robotics', 'biotechnology',
        'sustainable living', 'fitness tips', 'mental health', 'productivity hacks',
        'programming languages', 'web development', 'mobile apps', 'cloud computing',
        'cybersecurity', 'data science', 'business strategy', 'entrepreneurship',
        'economic trends', 'political news', 'world events', 'scientific discoveries',
        'historical facts', 'geography trivia', 'cultural traditions', 'language learning',
        'book recommendations', 'music genres', 'art history', 'photography tips',
        'gardening advice', 'home improvement', 'interior design', 'fashion trends',
        'cooking techniques', 'wine tasting', 'coffee brewing', 'tea varieties',
        'pet care', 'wildlife conservation', 'ocean life', 'mountain climbing',
        'camping tips', 'hiking trails', 'national parks', 'adventure sports'
    ];

    // Get random search term
    function getRandomSearchTerm() {
        const randomIndex = Math.floor(Math.random() * SEARCH_TERMS.length);
        const timestamp = Date.now();
        return `${SEARCH_TERMS[randomIndex]} ${timestamp}`;
    }

    // Get random delay
    function getRandomDelay() {
        return Math.floor(Math.random() * (CONFIG.MAX_DELAY - CONFIG.MIN_DELAY + 1)) + CONFIG.MIN_DELAY;
    }

    // Get today's date as string
    function getTodayString() {
        return new Date().toDateString();
    }

    // Load state from localStorage
    function loadState() {
        try {
            const stored = localStorage.getItem(CONFIG.STORAGE_KEY);
            if (stored) {
                const state = JSON.parse(stored);
                // Reset if it's a new day
                if (state.date !== getTodayString()) {
                    return { date: getTodayString(), desktopCount: 0, mobileCount: 0 };
                }
                return state;
            }
        } catch (e) {
            console.error('Error loading state:', e);
        }
        return { date: getTodayString(), desktopCount: 0, mobileCount: 0 };
    }

    // Save state to localStorage
    function saveState(state) {
        try {
            localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(state));
        } catch (e) {
            console.error('Error saving state:', e);
        }
    }

    // Check if user agent is mobile
    function isMobileUserAgent() {
        return /Mobile|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    }

    // Perform a search
    function performSearch(searchTerm) {
        const searchUrl = `https://www.bing.com/search?q=${encodeURIComponent(searchTerm)}`;
        window.location.href = searchUrl;
    }

    // Add control panel to page
    function createControlPanel(state) {
        const panel = document.createElement('div');
        panel.id = 'ms-rewards-panel';
        panel.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 15px;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            z-index: 10000;
            font-family: Arial, sans-serif;
            min-width: 250px;
        `;

        const isMobile = isMobileUserAgent();
        const currentCount = isMobile ? state.mobileCount : state.desktopCount;
        const targetCount = isMobile ? CONFIG.MOBILE_SEARCHES : CONFIG.DESKTOP_SEARCHES;
        const searchType = isMobile ? 'Mobile' : 'Desktop';

        panel.innerHTML = `
            <h3 style="margin: 0 0 10px 0; font-size: 16px;">MS Rewards Auto Search</h3>
            <div style="font-size: 14px; margin-bottom: 10px;">
                <strong>${searchType} Searches:</strong> ${currentCount}/${targetCount}
            </div>
            <div style="font-size: 12px; margin-bottom: 10px; opacity: 0.9;">
                Status: <span id="status-text">${currentCount >= targetCount ? 'Completed ✓' : 'Running...'}</span>
            </div>
            <button id="start-btn" style="
                background: white;
                color: #667eea;
                border: none;
                padding: 8px 15px;
                border-radius: 5px;
                cursor: pointer;
                font-weight: bold;
                margin-right: 5px;
            ">${currentCount >= targetCount ? 'Restart' : 'Start'}</button>
            <button id="stop-btn" style="
                background: rgba(255, 255, 255, 0.2);
                color: white;
                border: 1px solid white;
                padding: 8px 15px;
                border-radius: 5px;
                cursor: pointer;
                font-weight: bold;
            ">Stop</button>
        `;

        document.body.appendChild(panel);

        // Add event listeners
        document.getElementById('start-btn').addEventListener('click', () => {
            startAutoSearch(true);
        });

        document.getElementById('stop-btn').addEventListener('click', () => {
            stopAutoSearch();
        });

        return panel;
    }

    // Module-level variable for timeout ID
    let currentTimeoutId = null;

    // Start automatic searching
    function startAutoSearch(reset = false) {
        let state = loadState();
        
        if (reset) {
            const isMobile = isMobileUserAgent();
            if (isMobile) {
                state.mobileCount = 0;
            } else {
                state.desktopCount = 0;
            }
            saveState(state);
        }

        const isMobile = isMobileUserAgent();
        const currentCount = isMobile ? state.mobileCount : state.desktopCount;
        const targetCount = isMobile ? CONFIG.MOBILE_SEARCHES : CONFIG.DESKTOP_SEARCHES;

        if (currentCount >= targetCount) {
            console.log('Daily searches completed!');
            updateStatus('Completed ✓');
            return;
        }

        // Increment count
        if (isMobile) {
            state.mobileCount++;
        } else {
            state.desktopCount++;
        }
        saveState(state);

        // Update status
        updateStatus(`Searching... (${isMobile ? state.mobileCount : state.desktopCount}/${targetCount})`);

        // Schedule next search
        const delay = getRandomDelay();
        currentTimeoutId = setTimeout(() => {
            const searchTerm = getRandomSearchTerm();
            performSearch(searchTerm);
        }, delay);
    }

    // Stop automatic searching
    function stopAutoSearch() {
        if (currentTimeoutId) {
            clearTimeout(currentTimeoutId);
            currentTimeoutId = null;
        }
        updateStatus('Stopped');
    }

    // Update status text
    function updateStatus(text) {
        const statusElement = document.getElementById('status-text');
        if (statusElement) {
            statusElement.textContent = text;
        }
    }

    // Initialize script
    function init() {
        // Wait for page to load
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }

        const state = loadState();
        createControlPanel(state);

        // Check if we should auto-start
        const urlParams = new URLSearchParams(window.location.search);
        const autoStart = urlParams.get('auto');
        
        if (autoStart === '1') {
            // Remove auto parameter from URL
            const newUrl = window.location.href.replace(/[?&]auto=1/, '');
            window.history.replaceState({}, document.title, newUrl);
            
            // Continue searching
            setTimeout(() => {
                startAutoSearch();
            }, 1000);
        }
    }

    // Run initialization
    init();
})();
