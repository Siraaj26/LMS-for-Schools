// Simple Rewards System
let totalPoints = 1000;
let redeemedRewards = [];
let currentReward = null;

function updatePoints() {
    document.getElementById('totalPoints').textContent = totalPoints;
}

function redeemReward(button) {
    const item = button.closest('.reward-item');
    const cost = parseInt(item.dataset.cost);
    const name = item.dataset.name;
    const description = item.dataset.description;
    const icon = item.querySelector('.reward-icon').textContent;

    if (totalPoints < cost) {
        alert('Not enough points!');
        return;
    }

    currentReward = { name, description, cost, icon };
    showRedeemModal();
}

function showRedeemModal() {
    document.getElementById('modalRewardIcon').textContent = currentReward.icon;
    document.getElementById('modalRewardName').textContent = currentReward.name;
    document.getElementById('modalRewardDescription').textContent = currentReward.description;
    document.getElementById('modalRewardCost').textContent = currentReward.cost;
    document.getElementById('modalUserBalance').textContent = totalPoints;
    
    document.getElementById('redeemModal').style.display = 'block';
}

function confirmRedeem() {
    totalPoints -= currentReward.cost;
    
    const newReward = {
        name: currentReward.name,
        icon: currentReward.icon,
        date: new Date().toLocaleDateString()
    };
    
    redeemedRewards.push(newReward);
    updateDisplay();
    hideRedeemModal();
    showSuccess();
}

function updateDisplay() {
    updatePoints();
    updateRedeemedList();
    updateButtons();
}

function updateRedeemedList() {
    const container = document.getElementById('redeemedItems');
    
    if (redeemedRewards.length === 0) {
        container.innerHTML = '<div class="empty-state">No rewards redeemed yet!</div>';
        return;
    }

    let html = '';
    redeemedRewards.forEach(reward => {
        html += `
            <div class="redeemed-item">
                <div class="reward-icon">${reward.icon}</div>
                <div class="reward-info">
                    <h4>${reward.name}</h4>
                    <p>Redeemed on ${reward.date}</p>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function updateButtons() {
    const items = document.querySelectorAll('.reward-item');
    
    items.forEach(item => {
        const cost = parseInt(item.dataset.cost);
        const button = item.querySelector('.redeem-btn');
        
        if (totalPoints >= cost) {
            button.disabled = false;
            button.textContent = 'Redeem';
        } else {
            button.disabled = true;
            button.textContent = 'Need More Points';
        }
    });
}

function showSuccess() {
    document.getElementById('successMessage').textContent = 
        `You redeemed "${currentReward.name}"!`;
    document.getElementById('successModal').style.display = 'block';
}

function hideRedeemModal() {
    document.getElementById('redeemModal').style.display = 'none';
}

function hideSuccessModal() {
    document.getElementById('successModal').style.display = 'none';
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    updateDisplay();
});
