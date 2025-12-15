// ==UserScript==
// @name         Microsoft Rewards Auto Search
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Automate Bing searches to earn Microsoft Rewards points
// @author       u5720002
// @match        https://www.bing.com/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_addStyle
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        searchCount: GM_getValue('searchCount', 30),
        delayMin: GM_getValue('delayMin', 3000),
        delayMax: GM_getValue('delayMax', 8000),
        randomWords: [
            'technology', 'science', 'news', 'weather', 'sports', 'entertainment',
            'health', 'finance', 'travel', 'food', 'gaming', 'movies', 'music',
            'books', 'history', 'geography', 'animals', 'nature', 'space',
            'programming', 'artificial intelligence', 'machine learning', 'data science',
            'cryptocurrency', 'blockchain', 'cloud computing', 'cybersecurity',
            'internet of things', 'virtual reality', 'augmented reality', 'robotics',
            'renewable energy', 'climate change', 'sustainability', 'education',
            'psychology', 'philosophy', 'art', 'photography', 'architecture',
            'mathematics', 'physics', 'chemistry', 'biology', 'astronomy',
            'medicine', 'fitness', 'nutrition', 'cooking', 'fashion', 'design',
            'automobile', 'aviation', 'marine', 'economics', 'politics'
        ]
    };

    let isRunning = false;
    let searchesCompleted = 0;

    // Add custom styles
    GM_addStyle(`
        #rewards-auto-search-panel {
            position: fixed;
            top: 10px;
            right: 10px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border: none;
            border-radius: 12px;
            padding: 20px;
            z-index: 10000;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            min-width: 280px;
            color: white;
        }
        #rewards-auto-search-panel h3 {
            margin: 0 0 15px 0;
            font-size: 18px;
            font-weight: 600;
            color: white;
        }
        #rewards-auto-search-panel button {
            background: white;
            color: #667eea;
            border: none;
            padding: 10px 20px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 600;
            width: 100%;
            margin-bottom: 10px;
            transition: all 0.3s ease;
        }
        #rewards-auto-search-panel button:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }
        #rewards-auto-search-panel button:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
        }
        #rewards-auto-search-panel .status {
            margin-top: 10px;
            font-size: 13px;
            padding: 10px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 6px;
            text-align: center;
        }
        #rewards-auto-search-panel .progress {
            margin-top: 10px;
            height: 8px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 4px;
            overflow: hidden;
        }
        #rewards-auto-search-panel .progress-bar {
            height: 100%;
            background: white;
            width: 0%;
            transition: width 0.3s ease;
            border-radius: 4px;
        }
        #rewards-auto-search-panel .settings {
            margin-top: 15px;
            padding-top: 15px;
            border-top: 1px solid rgba(255, 255, 255, 0.2);
        }
        #rewards-auto-search-panel .settings label {
            display: block;
            margin-bottom: 8px;
            font-size: 12px;
            color: rgba(255, 255, 255, 0.9);
        }
        #rewards-auto-search-panel .settings input {
            width: 100%;
            padding: 8px;
            border: none;
            border-radius: 6px;
            margin-bottom: 10px;
            font-size: 13px;
            box-sizing: border-box;
        }
    `);

    // Create UI panel
    function createPanel() {
        const panel = document.createElement('div');
        panel.id = 'rewards-auto-search-panel';
        panel.innerHTML = `
            <h3>🎁 Rewards Auto Search</h3>
            <button id="start-search-btn">Start Searching</button>
            <button id="stop-search-btn" disabled>Stop</button>
            <div class="progress">
                <div class="progress-bar" id="search-progress"></div>
            </div>
            <div class="status" id="search-status">Ready to start</div>
            <div class="settings">
                <label>Number of searches:</label>
                <input type="number" id="search-count-input" value="${CONFIG.searchCount}" min="1" max="100">
                <label>Min delay (ms):</label>
                <input type="number" id="delay-min-input" value="${CONFIG.delayMin}" min="1000" max="30000" step="100">
                <label>Max delay (ms):</label>
                <input type="number" id="delay-max-input" value="${CONFIG.delayMax}" min="1000" max="30000" step="100">
            </div>
        `;
        document.body.appendChild(panel);

        // Attach event listeners
        document.getElementById('start-search-btn').addEventListener('click', startSearching);
        document.getElementById('stop-search-btn').addEventListener('click', stopSearching);
        document.getElementById('search-count-input').addEventListener('change', updateSettings);
        document.getElementById('delay-min-input').addEventListener('change', updateSettings);
        document.getElementById('delay-max-input').addEventListener('change', updateSettings);
    }

    // Update settings
    function updateSettings() {
        const searchCount = parseInt(document.getElementById('search-count-input').value);
        const delayMin = parseInt(document.getElementById('delay-min-input').value);
        const delayMax = parseInt(document.getElementById('delay-max-input').value);

        if (searchCount > 0 && searchCount <= 100) {
            CONFIG.searchCount = searchCount;
            GM_setValue('searchCount', searchCount);
        }
        if (delayMin >= 1000 && delayMin <= 30000) {
            CONFIG.delayMin = delayMin;
            GM_setValue('delayMin', delayMin);
        }
        if (delayMax >= 1000 && delayMax <= 30000) {
            CONFIG.delayMax = delayMax;
            GM_setValue('delayMax', delayMax);
        }
    }

    // Generate random search query
    function generateSearchQuery() {
        const word1 = CONFIG.randomWords[Math.floor(Math.random() * CONFIG.randomWords.length)];
        const word2 = CONFIG.randomWords[Math.floor(Math.random() * CONFIG.randomWords.length)];
        const timestamp = Date.now();
        
        // Combine words with random number for uniqueness
        const queries = [
            `${word1} ${word2}`,
            `${word1} ${Math.floor(Math.random() * 1000)}`,
            `${word2} news`,
            `what is ${word1}`,
            `${word1} vs ${word2}`,
            `best ${word1} ${timestamp % 100}`,
            `how to ${word1}`,
            `${word1} guide`
        ];
        
        return queries[Math.floor(Math.random() * queries.length)];
    }

    // Perform a search
    function performSearch(query) {
        const searchUrl = `https://www.bing.com/search?q=${encodeURIComponent(query)}`;
        window.location.href = searchUrl;
    }

    // Update UI status
    function updateStatus(message) {
        const statusElement = document.getElementById('search-status');
        if (statusElement) {
            statusElement.textContent = message;
        }
    }

    // Update progress bar
    function updateProgress() {
        const progressBar = document.getElementById('search-progress');
        if (progressBar) {
            const percentage = (searchesCompleted / CONFIG.searchCount) * 100;
            progressBar.style.width = percentage + '%';
        }
    }

    // Get random delay
    function getRandomDelay() {
        return Math.floor(Math.random() * (CONFIG.delayMax - CONFIG.delayMin + 1)) + CONFIG.delayMin;
    }

    // Start searching
    function startSearching() {
        if (isRunning) return;

        isRunning = true;
        searchesCompleted = 0;
        
        document.getElementById('start-search-btn').disabled = true;
        document.getElementById('stop-search-btn').disabled = false;
        
        updateStatus('Starting searches...');
        updateProgress();
        
        // Save state
        GM_setValue('isRunning', true);
        GM_setValue('searchesCompleted', searchesCompleted);
        GM_setValue('targetSearches', CONFIG.searchCount);
        
        // Start first search after a short delay
        setTimeout(continueSearching, 2000);
    }

    // Continue searching
    function continueSearching() {
        if (!isRunning || searchesCompleted >= CONFIG.searchCount) {
            stopSearching();
            return;
        }

        searchesCompleted++;
        GM_setValue('searchesCompleted', searchesCompleted);
        
        updateStatus(`Search ${searchesCompleted} of ${CONFIG.searchCount}...`);
        updateProgress();
        
        const query = generateSearchQuery();
        const delay = getRandomDelay();
        
        console.log(`[Rewards Auto Search] Performing search ${searchesCompleted}: "${query}" (next in ${delay}ms)`);
        
        if (searchesCompleted < CONFIG.searchCount) {
            // Schedule next search
            GM_setValue('nextSearchTime', Date.now() + delay);
            setTimeout(() => {
                performSearch(query);
            }, delay);
        } else {
            performSearch(query);
        }
    }

    // Stop searching
    function stopSearching() {
        isRunning = false;
        
        document.getElementById('start-search-btn').disabled = false;
        document.getElementById('stop-search-btn').disabled = true;
        
        GM_setValue('isRunning', false);
        
        if (searchesCompleted >= CONFIG.searchCount) {
            updateStatus(`✅ Completed ${searchesCompleted} searches!`);
            updateProgress();
        } else {
            updateStatus(`⏸️ Stopped at ${searchesCompleted} searches`);
        }
    }

    // Resume searching if interrupted
    function checkAndResume() {
        const wasRunning = GM_getValue('isRunning', false);
        const savedSearchesCompleted = GM_getValue('searchesCompleted', 0);
        const targetSearches = GM_getValue('targetSearches', CONFIG.searchCount);
        const nextSearchTime = GM_getValue('nextSearchTime', 0);

        if (wasRunning && savedSearchesCompleted < targetSearches) {
            searchesCompleted = savedSearchesCompleted;
            isRunning = true;
            
            document.getElementById('start-search-btn').disabled = true;
            document.getElementById('stop-search-btn').disabled = false;
            
            updateProgress();
            
            const now = Date.now();
            const timeUntilNext = Math.max(0, nextSearchTime - now);
            
            updateStatus(`Resuming... (${searchesCompleted}/${targetSearches})`);
            
            setTimeout(continueSearching, timeUntilNext);
        }
    }

    // Initialize
    function init() {
        // Create the control panel
        createPanel();
        
        // Check if we need to resume
        setTimeout(checkAndResume, 1000);
    }

    // Wait for page to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
