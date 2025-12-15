// ==UserScript==
// @name         Microsoft Rewards Auto Search
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Automatically perform Bing searches for Microsoft Rewards on both desktop and mobile
// @author       You
// @match        https://www.bing.com/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        desktopSearches: 30,
        mobileSearches: 20,
        delayBetweenSearches: 3000, // 3 seconds between searches
        randomDelayVariation: 2000, // Add up to 2 seconds random variation
        queryUniquenessRange: 10000, // Random number range for making queries unique
        resumeTimeoutMs: 5 * 60 * 1000, // Resume search within 5 minutes
    };

    // Random search queries pool
    const searchQueries = [
        'weather today', 'news headlines', 'stock market', 'sports scores',
        'recipe ideas', 'movie reviews', 'technology news', 'health tips',
        'travel destinations', 'best restaurants', 'fitness routines', 'book recommendations',
        'science articles', 'history facts', 'art exhibitions', 'music concerts',
        'gaming news', 'fashion trends', 'home decor', 'gardening tips',
        'car reviews', 'cryptocurrency', 'investment advice', 'educational courses',
        'job opportunities', 'real estate', 'pet care', 'cooking techniques',
        'photography tips', 'DIY projects', 'environmental news', 'space exploration',
        'artificial intelligence', 'programming tutorials', 'business strategies', 'marketing tips',
        'social media trends', 'celebrity news', 'political updates', 'economic forecast',
        'mental health', 'nutrition facts', 'exercise benefits', 'meditation techniques',
        'language learning', 'study tips', 'career advice', 'productivity hacks',
        'budget planning', 'saving money', 'home improvement', 'interior design',
        'outdoor activities', 'hiking trails', 'camping gear', 'fishing spots',
        'wine tasting', 'coffee brewing', 'tea varieties', 'dessert recipes',
        'breakfast ideas', 'lunch options', 'dinner recipes', 'snack suggestions',
        'healthy eating', 'weight loss', 'muscle building', 'yoga poses',
        'running tips', 'cycling routes', 'swimming techniques', 'sports equipment',
        'video games', 'board games', 'puzzles', 'trivia questions',
        'movie streaming', 'tv shows', 'documentaries', 'comedy specials',
        'music streaming', 'podcast recommendations', 'audiobooks', 'radio stations',
        'online shopping', 'product reviews', 'discount codes', 'sale events',
        'travel booking', 'hotel deals', 'flight tickets', 'vacation packages',
        'car rental', 'public transport', 'ride sharing', 'taxi services',
        'restaurant reservations', 'food delivery', 'grocery shopping', 'meal planning',
        'time management', 'goal setting', 'habit building', 'self improvement',
        'stress relief', 'relaxation techniques', 'sleep better', 'morning routine',
        'evening routine', 'weekend activities', 'holiday planning', 'gift ideas'
    ];

    // Utility function to get a random query
    function getRandomQuery() {
        const randomIndex = Math.floor(Math.random() * searchQueries.length);
        return searchQueries[randomIndex] + ' ' + Math.floor(Math.random() * CONFIG.queryUniquenessRange);
    }

    // Utility function to get random delay
    function getRandomDelay() {
        return CONFIG.delayBetweenSearches + Math.floor(Math.random() * CONFIG.randomDelayVariation);
    }

    // Check if mobile user agent
    function isMobileUserAgent() {
        return /Mobile|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    }

    // Create UI panel
    function createUI() {
        const panel = document.createElement('div');
        panel.id = 'ms-rewards-panel';
        panel.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            border-radius: 10px;
            z-index: 10000;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
            min-width: 280px;
        `;

        panel.innerHTML = `
            <h3 style="margin: 0 0 15px 0; font-size: 18px; text-align: center;">🎁 MS Rewards Auto Search</h3>
            <div style="background: rgba(255,255,255,0.1); padding: 10px; border-radius: 5px; margin-bottom: 10px;">
                <div style="margin-bottom: 8px;">
                    <strong>Mode:</strong> <span id="search-mode">${isMobileUserAgent() ? 'Mobile' : 'Desktop'}</span>
                </div>
                <div style="margin-bottom: 8px;">
                    <strong>Progress:</strong> <span id="search-progress">0</span> / <span id="search-total">0</span>
                </div>
                <div style="margin-bottom: 8px;">
                    <strong>Status:</strong> <span id="search-status">Ready</span>
                </div>
            </div>
            <div style="margin-bottom: 10px;">
                <div style="background: rgba(255,255,255,0.2); height: 10px; border-radius: 5px; overflow: hidden;">
                    <div id="progress-bar" style="background: #4CAF50; height: 100%; width: 0%; transition: width 0.3s;"></div>
                </div>
            </div>
            <button id="start-desktop" style="width: 100%; padding: 10px; margin-bottom: 8px; background: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 14px; font-weight: bold;">
                🖥️ Start Desktop (${CONFIG.desktopSearches})
            </button>
            <button id="start-mobile" style="width: 100%; padding: 10px; margin-bottom: 8px; background: #2196F3; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 14px; font-weight: bold;">
                📱 Start Mobile (${CONFIG.mobileSearches})
            </button>
            <button id="start-both" style="width: 100%; padding: 10px; margin-bottom: 8px; background: #FF9800; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 14px; font-weight: bold;">
                🚀 Start Both (${CONFIG.desktopSearches + CONFIG.mobileSearches})
            </button>
            <button id="stop-search" style="width: 100%; padding: 10px; background: #f44336; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 14px; font-weight: bold;" disabled>
                ⏸️ Stop
            </button>
        `;

        document.body.appendChild(panel);

        // Add button hover effects
        const buttons = panel.querySelectorAll('button');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                if (!button.disabled) {
                    button.style.opacity = '0.8';
                }
            });
            button.addEventListener('mouseleave', () => {
                button.style.opacity = '1';
            });
        });

        return panel;
    }

    // Update UI
    function updateUI(current, total, status) {
        document.getElementById('search-progress').textContent = current;
        document.getElementById('search-total').textContent = total;
        document.getElementById('search-status').textContent = status;
        const percentage = (current / total) * 100;
        document.getElementById('progress-bar').style.width = percentage + '%';
    }

    // Perform search
    function performSearch(query) {
        const searchBox = document.querySelector('input[name="q"]') || document.getElementById('sb_form_q');
        if (searchBox) {
            searchBox.value = query;
            searchBox.form.submit();
        } else {
            // Navigate directly
            window.location.href = `https://www.bing.com/search?q=${encodeURIComponent(query)}`;
        }
    }

    // Search automation
    let searchInterval = null;
    let currentSearch = 0;
    let totalSearches = 0;
    let isRunning = false;

    function startSearches(count, mode) {
        if (isRunning) {
            alert('Search is already running!');
            return;
        }

        isRunning = true;
        currentSearch = 0;
        totalSearches = count;

        // Enable/disable buttons
        document.getElementById('start-desktop').disabled = true;
        document.getElementById('start-mobile').disabled = true;
        document.getElementById('start-both').disabled = true;
        document.getElementById('stop-search').disabled = false;

        updateUI(0, totalSearches, `Running ${mode}...`);

        // Store search state
        localStorage.setItem('msRewardsSearchState', JSON.stringify({
            current: currentSearch,
            total: totalSearches,
            mode: mode,
            timestamp: Date.now()
        }));

        // Perform first search immediately
        setTimeout(() => {
            executeNextSearch(mode);
        }, 1000);
    }

    function executeNextSearch(mode) {
        if (!isRunning || currentSearch >= totalSearches) {
            stopSearches(true);
            return;
        }

        currentSearch++;
        const query = getRandomQuery();
        updateUI(currentSearch, totalSearches, `Searching: ${query.substring(0, 30)}...`);

        // Update localStorage
        localStorage.setItem('msRewardsSearchState', JSON.stringify({
            current: currentSearch,
            total: totalSearches,
            mode: mode,
            timestamp: Date.now()
        }));

        performSearch(query);

        // Schedule next search
        if (currentSearch < totalSearches) {
            searchInterval = setTimeout(() => {
                executeNextSearch(mode);
            }, getRandomDelay());
        }
    }

    function stopSearches(completed = false) {
        isRunning = false;
        if (searchInterval) {
            clearTimeout(searchInterval);
            searchInterval = null;
        }

        // Enable buttons
        document.getElementById('start-desktop').disabled = false;
        document.getElementById('start-mobile').disabled = false;
        document.getElementById('start-both').disabled = false;
        document.getElementById('stop-search').disabled = true;

        if (completed) {
            updateUI(totalSearches, totalSearches, '✅ Completed!');
            localStorage.removeItem('msRewardsSearchState');
            setTimeout(() => {
                updateUI(0, 0, 'Ready');
            }, 3000);
        } else {
            updateUI(currentSearch, totalSearches, '⏸️ Stopped');
        }
    }

    // Resume search if it was in progress
    function resumeSearchIfNeeded() {
        const state = localStorage.getItem('msRewardsSearchState');
        if (state) {
            try {
                const { current, total, mode, timestamp } = JSON.parse(state);
                // Resume if within the configured timeout period
                if (Date.now() - timestamp < CONFIG.resumeTimeoutMs && current < total) {
                    currentSearch = current;
                    totalSearches = total;
                    isRunning = true;

                    document.getElementById('start-desktop').disabled = true;
                    document.getElementById('start-mobile').disabled = true;
                    document.getElementById('start-both').disabled = true;
                    document.getElementById('stop-search').disabled = false;

                    updateUI(currentSearch, totalSearches, `Resuming ${mode}...`);

                    setTimeout(() => {
                        executeNextSearch(mode);
                    }, getRandomDelay());
                } else {
                    localStorage.removeItem('msRewardsSearchState');
                }
            } catch (e) {
                localStorage.removeItem('msRewardsSearchState');
            }
        }
    }

    // Initialize
    function init() {
        // Wait for page to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }

        // Create UI
        const panel = createUI();

        // Add event listeners
        document.getElementById('start-desktop').addEventListener('click', () => {
            startSearches(CONFIG.desktopSearches, 'Desktop');
        });

        document.getElementById('start-mobile').addEventListener('click', () => {
            startSearches(CONFIG.mobileSearches, 'Mobile');
        });

        document.getElementById('start-both').addEventListener('click', () => {
            startSearches(CONFIG.desktopSearches + CONFIG.mobileSearches, 'Both');
        });

        document.getElementById('stop-search').addEventListener('click', () => {
            stopSearches(false);
        });

        // Resume search if needed
        resumeSearchIfNeeded();
    }

    // Start the script
    init();
})();
