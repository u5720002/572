// ==UserScript==
// @name         Microsoft Rewards Auto Search - 500 Tabs
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  One-click automation to open 500 tabs with 500 unique searches for Microsoft Rewards
// @author       u5720002
// @match        https://www.bing.com/*
// @match        https://bing.com/*
// @match        https://www.microsoft.com/*
// @match        https://rewards.microsoft.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=microsoft.com
// @grant        GM_openInTab
// @grant        GM_addStyle
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    // Configuration
    const NUM_SEARCHES = 500;
    const DELAY_BETWEEN_TABS = 100; // milliseconds between opening each tab
    
    // Random search query generator
    const searchTopics = [
        'weather', 'news', 'sports', 'technology', 'science', 'history', 'geography',
        'movies', 'music', 'books', 'recipes', 'health', 'fitness', 'travel', 'fashion',
        'art', 'photography', 'gaming', 'education', 'business', 'finance', 'politics',
        'environment', 'space', 'animals', 'nature', 'food', 'cars', 'architecture',
        'programming', 'math', 'physics', 'chemistry', 'biology', 'psychology', 'philosophy'
    ];
    
    const searchModifiers = [
        'best', 'top', 'latest', 'new', 'how to', 'what is', 'why', 'when', 'where',
        'guide', 'tutorial', 'review', 'comparison', 'tips', 'tricks', 'facts', 'history of',
        'future of', 'benefits of', 'advantages', 'disadvantages', 'pros and cons'
    ];
    
    // Generate recent years dynamically
    const currentYear = new Date().getFullYear();
    const searchYears = [
        currentYear.toString(),
        (currentYear - 1).toString(),
        (currentYear - 2).toString(),
        (currentYear + 1).toString() // Include next year for forward-looking searches
    ];
    
    // Generate a random search query
    function generateRandomQuery() {
        const topic = searchTopics[Math.floor(Math.random() * searchTopics.length)];
        const modifier = searchModifiers[Math.floor(Math.random() * searchModifiers.length)];
        const randomNum = Math.floor(Math.random() * 10000);
        
        // Randomly decide which format to use
        const format = Math.floor(Math.random() * 5);
        
        switch(format) {
            case 0:
                return `${modifier} ${topic}`;
            case 1:
                return `${topic} ${modifier}`;
            case 2:
                const year = searchYears[Math.floor(Math.random() * searchYears.length)];
                return `${modifier} ${topic} ${year}`;
            case 3:
                return `${topic} ${randomNum}`;
            case 4:
                return `${modifier} ${topic} ${randomNum}`;
            default:
                return `${topic} ${modifier}`;
        }
    }
    
    // Generate unique queries
    function generateUniqueQueries(count) {
        const queries = new Set();
        let attempts = 0;
        const maxAttempts = count * 3; // Prevent infinite loop
        
        while(queries.size < count && attempts < maxAttempts) {
            queries.add(generateRandomQuery());
            attempts++;
        }
        
        // If we couldn't generate enough unique queries, add more natural fallback queries
        while(queries.size < count) {
            const topic1 = searchTopics[Math.floor(Math.random() * searchTopics.length)];
            const topic2 = searchTopics[Math.floor(Math.random() * searchTopics.length)];
            const modifier = searchModifiers[Math.floor(Math.random() * searchModifiers.length)];
            queries.add(`${modifier} ${topic1} and ${topic2}`);
        }
        
        return Array.from(queries);
    }
    
    // Open searches in tabs
    function openSearches() {
        const queries = generateUniqueQueries(NUM_SEARCHES);
        let count = 0;
        
        console.log(`Starting to open ${NUM_SEARCHES} search tabs...`);
        
        const interval = setInterval(() => {
            if (count >= NUM_SEARCHES) {
                clearInterval(interval);
                console.log('All search tabs opened!');
                alert(`Successfully opened ${NUM_SEARCHES} search tabs!`);
                return;
            }
            
            const query = queries[count];
            const searchUrl = `https://www.bing.com/search?q=${encodeURIComponent(query)}`;
            
            // Try to use GM_openInTab if available, otherwise use window.open
            try {
                if (typeof GM_openInTab !== 'undefined') {
                    GM_openInTab(searchUrl, { active: false, insert: true });
                } else {
                    window.open(searchUrl, '_blank');
                }
            } catch (error) {
                console.error(`Failed to open tab ${count + 1}:`, error);
                // Continue with next tab even if one fails
            }
            
            count++;
            
            // Update button text with progress (with null check)
            if (button && button.textContent !== undefined) {
                button.textContent = `Opening... ${count}/${NUM_SEARCHES}`;
            }
        }, DELAY_BETWEEN_TABS);
    }
    
    // Add custom styles
    GM_addStyle(`
        #msRewardsAutoButton {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 10000;
            padding: 15px 30px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 50px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
            transition: all 0.3s ease;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        #msRewardsAutoButton:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
            background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
        }
        
        #msRewardsAutoButton:active {
            transform: translateY(0px);
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }
        
        #msRewardsAutoButton:disabled {
            background: #cccccc;
            cursor: not-allowed;
            transform: none;
        }
    `);
    
    // Create and add the button
    let button = null;
    
    function createButton() {
        button = document.createElement('button');
        button.id = 'msRewardsAutoButton';
        button.textContent = `🚀 Start ${NUM_SEARCHES} Searches`;
        button.title = `Click to open ${NUM_SEARCHES} search tabs for Microsoft Rewards`;
        
        button.addEventListener('click', function() {
            if (confirm(`This will open ${NUM_SEARCHES} tabs. Are you sure?\n\nNote: This may slow down your browser temporarily.`)) {
                button.disabled = true;
                openSearches();
                
                // Re-enable button after all tabs are opened
                setTimeout(() => {
                    button.disabled = false;
                    button.textContent = `🚀 Start ${NUM_SEARCHES} Searches`;
                }, NUM_SEARCHES * DELAY_BETWEEN_TABS + 2000);
            }
        });
        
        document.body.appendChild(button);
    }
    
    // Wait for page to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createButton);
    } else {
        createButton();
    }
    
    console.log('Microsoft Rewards Auto Search userscript loaded!');
})();
