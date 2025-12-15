// ==UserScript==
// @name         Microsoft Rewards Auto Search
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Automatically perform searches on Bing to earn Microsoft Rewards points
// @author       u5720002
// @match        https://www.bing.com/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        SEARCH_COUNT: 30, // Number of searches to perform
        MIN_DELAY: 3000,  // Minimum delay between searches (ms)
        MAX_DELAY: 6000,  // Maximum delay between searches (ms)
        STORAGE_KEY: 'msRewardsAutoSearch'
    };

    // Random search terms pool
    const SEARCH_TERMS = [
        'weather today', 'news headlines', 'technology updates', 'sports scores',
        'movie reviews', 'recipe ideas', 'travel destinations', 'health tips',
        'science news', 'history facts', 'art gallery', 'music trends',
        'book recommendations', 'fitness routines', 'cooking techniques', 'photography tips',
        'gardening advice', 'stock market', 'cryptocurrency news', 'space exploration',
        'wildlife documentary', 'environmental news', 'fashion trends', 'gaming news',
        'celebrity updates', 'automotive reviews', 'home improvement', 'education resources',
        'language learning', 'productivity tools', 'meditation techniques', 'yoga poses',
        'economic analysis', 'political news', 'cultural events', 'food trends',
        'architecture designs', 'interior decorating', 'pet care tips', 'personal finance',
        'career advice', 'social media trends', 'marketing strategies', 'startup ideas',
        'innovation technology', 'artificial intelligence', 'machine learning', 'cloud computing',
        'cybersecurity tips', 'data science', 'web development', 'mobile apps'
    ];

    // Get random delay
    function getRandomDelay() {
        return Math.floor(Math.random() * (CONFIG.MAX_DELAY - CONFIG.MIN_DELAY)) + CONFIG.MIN_DELAY;
    }

    // Get random search term
    function getRandomSearchTerm() {
        const randomIndex = Math.floor(Math.random() * SEARCH_TERMS.length);
        const term = SEARCH_TERMS[randomIndex];
        // Add random number to make searches unique
        const uniqueId = Math.floor(Math.random() * 10000);
        return `${term} ${uniqueId}`;
    }

    // Get search state from localStorage
    function getSearchState() {
        const state = localStorage.getItem(CONFIG.STORAGE_KEY);
        return state ? JSON.parse(state) : { count: 0, lastRun: null };
    }

    // Save search state to localStorage
    function saveSearchState(state) {
        localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(state));
    }

    // Check if we should run today
    function shouldRunToday() {
        const state = getSearchState();
        const today = new Date().toDateString();
        
        if (state.lastRun !== today) {
            // Reset count for new day
            saveSearchState({ count: 0, lastRun: today });
            return true;
        }
        
        return state.count < CONFIG.SEARCH_COUNT;
    }

    // Perform a single search
    function performSearch(searchTerm) {
        window.location.href = `https://www.bing.com/search?q=${encodeURIComponent(searchTerm)}`;
    }

    // Update search count
    function updateSearchCount() {
        const state = getSearchState();
        state.count += 1;
        saveSearchState(state);
    }

    // Create control panel UI
    function createControlPanel() {
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
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            z-index: 10000;
            font-family: Arial, sans-serif;
            min-width: 250px;
        `;

        const state = getSearchState();
        const progress = Math.min(state.count, CONFIG.SEARCH_COUNT);
        const percentage = (progress / CONFIG.SEARCH_COUNT * 100).toFixed(0);

        panel.innerHTML = `
            <div style="margin-bottom: 10px; font-weight: bold; font-size: 14px;">
                🎁 MS Rewards Auto Search
            </div>
            <div style="margin-bottom: 10px; font-size: 12px;">
                Progress: ${progress}/${CONFIG.SEARCH_COUNT} (${percentage}%)
            </div>
            <div style="background: rgba(255,255,255,0.3); height: 8px; border-radius: 4px; overflow: hidden; margin-bottom: 10px;">
                <div style="background: #4ade80; height: 100%; width: ${percentage}%"></div>
            </div>
            <button id="ms-rewards-start" style="
                background: white;
                color: #667eea;
                border: none;
                padding: 8px 16px;
                border-radius: 5px;
                cursor: pointer;
                font-weight: bold;
                width: 100%;
                margin-bottom: 5px;
            ">Start Auto Search</button>
            <button id="ms-rewards-reset" style="
                background: rgba(255,255,255,0.2);
                color: white;
                border: 1px solid white;
                padding: 8px 16px;
                border-radius: 5px;
                cursor: pointer;
                width: 100%;
                font-size: 11px;
            ">Reset Counter</button>
        `;

        document.body.appendChild(panel);

        // Add event listeners
        document.getElementById('ms-rewards-start').addEventListener('click', startAutoSearch);
        document.getElementById('ms-rewards-reset').addEventListener('click', resetCounter);
    }

    // Start auto search
    function startAutoSearch() {
        if (!shouldRunToday()) {
            alert('You have completed all searches for today!');
            return;
        }

        const state = getSearchState();
        if (state.count >= CONFIG.SEARCH_COUNT) {
            alert('Daily search limit reached!');
            return;
        }

        // Start searching
        const searchTerm = getRandomSearchTerm();
        updateSearchCount();
        
        const delay = getRandomDelay();
        setTimeout(() => {
            performSearch(searchTerm);
        }, delay);
    }

    // Reset counter
    function resetCounter() {
        if (confirm('Are you sure you want to reset the search counter?')) {
            saveSearchState({ count: 0, lastRun: null });
            location.reload();
        }
    }

    // Auto-continue if we're in the middle of a search session
    function autoContinue() {
        const urlParams = new URLSearchParams(window.location.search);
        const hasQuery = urlParams.get('q');
        
        if (hasQuery && shouldRunToday()) {
            const state = getSearchState();
            console.log(`MS Rewards Auto Search: ${state.count}/${CONFIG.SEARCH_COUNT} completed`);
            
            if (state.count < CONFIG.SEARCH_COUNT) {
                const delay = getRandomDelay();
                console.log(`Next search in ${delay/1000} seconds...`);
                
                setTimeout(() => {
                    const searchTerm = getRandomSearchTerm();
                    updateSearchCount();
                    performSearch(searchTerm);
                }, delay);
            } else {
                console.log('MS Rewards Auto Search: All searches completed for today!');
                alert('🎉 All searches completed for today!');
            }
        }
    }

    // Initialize
    function init() {
        // Wait for page to fully load
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }

        // Create control panel
        createControlPanel();

        // Auto-continue if in progress
        setTimeout(autoContinue, 2000);
    }

    // Start the script
    init();
})();
