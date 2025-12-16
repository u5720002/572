function claimGiftCard(type, amount) {
    const modal = document.getElementById('modal');
    const modalMessage = document.getElementById('modal-message');
    
    modalMessage.innerHTML = `You've claimed a <strong>$${amount} ${type}</strong> gift card!<br>Check your email for redemption details.`;
    
    modal.style.display = 'block';
    
    // Add animation to the button
    const cards = document.querySelectorAll('.gift-card');
    cards.forEach(card => {
        if (card.dataset.type === type && card.dataset.amount == amount) {
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
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 50);
        }, index * 100);
    });
});
