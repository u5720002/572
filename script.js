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
            <div class="redeem-code-note">✔️Verify For Complete Code👉Are You Real🟢</div>
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
