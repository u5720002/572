function generateRedeemCode() {
    // Generate a random 16-character redeem code
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 16; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    // Format as XXXX-XXXX-XXXX-XXXX
    return code.match(/.{1,4}/g).join('-');
}

function claimGiftCard(type, amount) {
    const modal = document.getElementById('modal');
    const modalMessage = document.getElementById('modal-message');
    
    // Generate redeem code
    const redeemCode = generateRedeemCode();
    const halfLength = Math.ceil(redeemCode.length / 2);
    const visiblePart = redeemCode.substring(0, halfLength);
    const hiddenPart = redeemCode.substring(halfLength);
    
    // Create obscured version of hidden part
    const obscuredPart = hiddenPart.replace(/[A-Z0-9]/g, '●');
    
    modalMessage.innerHTML = `
        You've claimed a <strong>$${amount} ${type}</strong> gift card!<br><br>
        <div class="redeem-code-container">
            <div class="redeem-code-label">Your Redeem Code:</div>
            <div class="redeem-code">
                <span class="code-visible">${visiblePart}</span><span class="code-hidden">${obscuredPart}</span>
            </div>
            <div class="redeem-code-note">🔥Human Verify For Complete Code🎁</div>
        </div>
    `;
    
    modal.style.display = 'block';
    
    // Add animation to the button
    const cards = document.querySelectorAll('.gift-card');
    cards.forEach(card => {
        if (card.dataset.type === type && parseInt(card.dataset.amount) === amount) {
            const button = card.querySelector('.claim-btn');
            button.textContent = 'Claimed! ✓';
            button.style.background = '#4CAF50';
            button.disabled = true;
            button.style.cursor = 'not-allowed';
        }
    });
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// Add some dynamic effects on page load
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.gift-card');
    
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    // Initialize countdown timer (24 hours from now)
    startCountdown();
    
    // Initialize live activity feed
    initLiveActivity();
});

function startCountdown() {
    // Set countdown to 24 hours from now
    const endTime = new Date().getTime() + (24 * 60 * 60 * 1000);
    
    function updateTimer() {
        const now = new Date().getTime();
        const distance = endTime - now;
        
        if (distance < 0) {
            // Timer expired
            document.querySelectorAll('.countdown').forEach(timer => {
                timer.textContent = 'EXPIRED';
            });
            return;
        }
        
        // Calculate time remaining
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Format and display
        const timeString = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        
        document.querySelectorAll('.countdown').forEach(timer => {
            timer.textContent = timeString;
        });
    }
    
    // Update immediately and then every second
    updateTimer();
    setInterval(updateTimer, 1000);
}

function initLiveActivity() {
    const activityFeed = document.getElementById('activity-feed');
    const totalClaimsElement = document.getElementById('total-claims');
    let totalClaims = 2847391;
    
    const names = [
        'Sarah M.', 'John D.', 'Emma W.', 'Michael B.', 'Jessica L.',
        'David K.', 'Ashley R.', 'Chris P.', 'Amanda T.', 'James S.',
        'Maria G.', 'Robert H.', 'Lisa C.', 'Daniel F.', 'Jennifer A.',
        'Kevin N.', 'Michelle Y.', 'Brian Z.', 'Laura V.', 'Mark Q.'
    ];
    
    const cards = [
        { name: 'Visa', amount: 250, icon: '💎' },
        { name: 'Chime', amount: 200, icon: '🏦' },
        { name: 'Venmo', amount: 90, icon: '💸' },
        { name: 'CashApp', amount: 70, icon: '💵' },
        { name: 'Steam', amount: 70, icon: '🎮' },
        { name: 'Walmart', amount: 50, icon: '🛒' },
        { name: 'Apple Pay', amount: 50, icon: '🍎' },
        { name: 'PayPal', amount: 49, icon: '💳' },
        { name: 'Amazon', amount: 30, icon: '📦' },
        { name: 'Google Pay', amount: 20, icon: '🔍' }
    ];
    
    function getRandomName() {
        return names[Math.floor(Math.random() * names.length)];
    }
    
    function getRandomCard() {
        return cards[Math.floor(Math.random() * cards.length)];
    }
    
    function getTimeAgo() {
        const seconds = Math.floor(Math.random() * 60);
        if (seconds < 10) return 'Just now';
        if (seconds < 60) return `${seconds}s ago`;
        return '1m ago';
    }
    
    function addActivity() {
        const card = getRandomCard();
        const name = getRandomName();
        const timeAgo = getTimeAgo();
        
        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';
        activityItem.innerHTML = `
            <span class="activity-icon">${card.icon}</span>
            <span class="activity-user">${name}</span>
            <span>claimed</span>
            <span class="activity-card">$${card.amount} ${card.name}</span>
            <span class="activity-time">${timeAgo}</span>
        `;
        
        // Add to the top of the feed
        activityFeed.insertBefore(activityItem, activityFeed.firstChild);
        
        // Keep only the last 8 items
        while (activityFeed.children.length > 8) {
            activityFeed.removeChild(activityFeed.lastChild);
        }
        
        // Update total claims counter
        totalClaims += Math.floor(Math.random() * 5) + 1;
        totalClaimsElement.textContent = totalClaims.toLocaleString();
    }
    
    // Add initial activities
    for (let i = 0; i < 5; i++) {
        setTimeout(() => addActivity(), i * 200);
    }
    
    // Add new activity every 3-5 seconds
    setInterval(() => {
        addActivity();
    }, Math.random() * 2000 + 3000);
}
