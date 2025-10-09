import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Rewards() {
    const [totalPoints, setTotalPoints] = useState(1000);
    const [redeemedItems, setRedeemedItems] = useState([]);
    const [showRedeemModal, setShowRedeemModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [selectedReward, setSelectedReward] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const rewards = [
        { name: 'Homework Pass', description: 'Skip one homework assignment', cost: 50, icon: '📝' },
        { name: 'Extra Credit', description: 'Get 5% extra credit on next test', cost: 75, icon: '📚' },
        { name: 'Lunch with Teacher', description: 'Have lunch with your favorite teacher', cost: 100, icon: '🍕' },
        { name: 'Library Privileges', description: 'Extended library access for a week', cost: 125, icon: '📖' },
        { name: 'Computer Lab Time', description: 'Extra computer lab time after school', cost: 150, icon: '💻' },
        { name: 'School Store Voucher', description: 'R50 voucher for school store', cost: 200, icon: '🛍️' },
        { name: 'Front of Line Pass', description: 'Skip to front of lunch line for a week', cost: 250, icon: '🥪' },
        { name: "Principal's Office Visit", description: 'Meet with principal for positive recognition', cost: 300, icon: '👔' }
    ];

    const handleRedeemClick = (reward) => {
        setSelectedReward(reward);
        setShowRedeemModal(true);
    };

    const confirmRedeem = () => {
        if (selectedReward && totalPoints >= selectedReward.cost) {
            setTotalPoints(totalPoints - selectedReward.cost);
            setRedeemedItems([...redeemedItems, selectedReward]);
            setSuccessMessage(`You've successfully redeemed ${selectedReward.name}!`);
            setShowRedeemModal(false);
            setShowSuccessModal(true);
        } else {
            alert('Not enough points!');
        }
    };

    return (
        <div data-role="student">
            <Navbar />
            
            <main className="rewards-container">
                <div className="rewards-header">
                    <h1>🏆 Rewards Store</h1>
                    <div className="points-display">
                        <span className="points-icon">⭐</span>
                        <span className="points-amount" id="totalPoints">{totalPoints}</span>
                        <span className="points-label">Points</span>
                    </div>
                </div>

                <div className="rewards-content">
                    {/* Redeemed Items */}
                    <div className="redeemed-section">
                        <h2>Your Rewards</h2>
                        <div className="redeemed-items" id="redeemedItems">
                            {redeemedItems.length === 0 ? (
                                <div className="empty-state">No rewards redeemed yet. Start earning points!</div>
                            ) : (
                                redeemedItems.map((item, index) => (
                                    <div key={index} className="redeemed-item">
                                        <div className="reward-icon">{item.icon}</div>
                                        <div className="reward-info">
                                            <h3>{item.name}</h3>
                                            <p>{item.description}</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Available Rewards */}
                    <div className="available-section">
                        <h2>Available Rewards</h2>
                        <div className="rewards-grid">
                            {rewards.map((reward, index) => (
                                <div key={index} className="reward-item">
                                    <div className="reward-icon">{reward.icon}</div>
                                    <div className="reward-info">
                                        <h3>{reward.name}</h3>
                                        <p>{reward.description}</p>
                                        <div className="reward-cost">{reward.cost} points</div>
                                    </div>
                                    <button className="redeem-btn" onClick={() => handleRedeemClick(reward)}>Redeem</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Confirm Modal */}
                {showRedeemModal && selectedReward && (
                    <div id="redeemModal" className="modal" style={{display: 'block'}}>
                        <div className="modal-content">
                            <h3>Confirm Redemption</h3>
                            <div className="reward-preview">
                                <div className="reward-icon" id="modalRewardIcon">{selectedReward.icon}</div>
                                <div className="reward-details">
                                    <h4 id="modalRewardName">{selectedReward.name}</h4>
                                    <p id="modalRewardDescription">{selectedReward.description}</p>
                                    <p>Cost: <strong id="modalRewardCost">{selectedReward.cost}</strong> points</p>
                                    <p>Your balance: <strong id="modalUserBalance">{totalPoints}</strong> points</p>
                                </div>
                            </div>
                            <div className="form-actions">
                                <button className="btn-primary" onClick={confirmRedeem}>Yes, Redeem!</button>
                                <button className="btn-secondary" onClick={() => setShowRedeemModal(false)}>Cancel</button>
                            </div>
                            <span className="close" onClick={() => setShowRedeemModal(false)}>&times;</span>
                        </div>
                    </div>
                )}

                {/* Success Modal */}
                {showSuccessModal && (
                    <div id="successModal" className="modal" style={{display: 'block'}}>
                        <div className="modal-content">
                            <h3>🎉 Success!</h3>
                            <p id="successMessage">{successMessage}</p>
                            <button className="btn-primary" onClick={() => setShowSuccessModal(false)}>Great!</button>
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}

export default Rewards;



