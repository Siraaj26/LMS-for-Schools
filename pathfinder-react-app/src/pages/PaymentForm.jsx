import React, { useState } from 'react';

function PaymentForm() {
    const [formData, setFormData] = useState({
        studentName: 'Thabo Mthembu',
        studentId: 'ST2024001',
        email: 'thabo.mthembu@student.pathfinder-vanguard.co.za',
        phone: '+27 82 123 4567',
        term: 'term3',
        amount: 1750,
        description: 'School fees payment for Term 3, 2025',
        paymentMethod: 'stripe'
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Processing payment:', formData);
        alert('Payment processing... This is a demo.');
    };

    return (
        <div className="payment-form-container">
            {/* Payment Header */}
            <div className="payment-header">
                <h1><i className="fas fa-credit-card"></i> Make Payment</h1>
                <p>Secure payment processing for school fees</p>
            </div>

            {/* Payment Form */}
            <form className="payment-form" id="paymentForm" onSubmit={handleSubmit}>
                {/* Student Information */}
                <div className="form-section">
                    <h3><i className="fas fa-user"></i> Student Information</h3>
                    <div className="form-row">
                        <div className="form-group required">
                            <label htmlFor="studentName">Student Name</label>
                            <input 
                                type="text" 
                                id="studentName" 
                                name="studentName" 
                                value={formData.studentName}
                                onChange={handleChange}
                                required 
                            />
                        </div>
                        <div className="form-group required">
                            <label htmlFor="studentId">Student ID</label>
                            <input 
                                type="text" 
                                id="studentId" 
                                name="studentId" 
                                value={formData.studentId}
                                onChange={handleChange}
                                required 
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group required">
                            <label htmlFor="email">Email Address</label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                value={formData.email}
                                onChange={handleChange}
                                required 
                            />
                        </div>
                        <div className="form-group required">
                            <label htmlFor="phone">Phone Number</label>
                            <input 
                                type="tel" 
                                id="phone" 
                                name="phone" 
                                value={formData.phone}
                                onChange={handleChange}
                                required 
                            />
                        </div>
                    </div>
                </div>

                {/* Payment Details */}
                <div className="form-section">
                    <h3><i className="fas fa-receipt"></i> Payment Details</h3>
                    <div className="form-row">
                        <div className="form-group required">
                            <label htmlFor="term">Term</label>
                            <select 
                                id="term" 
                                name="term" 
                                value={formData.term}
                                onChange={handleChange}
                                required
                            >
                                <option value="term3">Term 3 (July 8 - September 20, 2025)</option>
                                <option value="term4">Term 4 (October 7 - December 6, 2025)</option>
                            </select>
                        </div>
                        <div className="form-group required">
                            <label htmlFor="amount">Amount (ZAR)</label>
                            <input 
                                type="number" 
                                id="amount" 
                                name="amount" 
                                value={formData.amount}
                                onChange={handleChange}
                                step="0.01" 
                                min="0" 
                                required 
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea 
                            id="description" 
                            name="description" 
                            rows="2" 
                            value={formData.description}
                            readOnly
                        />
                    </div>
                </div>

                {/* Payment Method Selection */}
                <div className="form-section">
                    <h3><i className="fas fa-credit-card"></i> Payment Method</h3>
                    <div className="payment-methods">
                        {[
                            { id: 'stripe', icon: 'fas fa-credit-card', name: 'Credit/Debit Card', description: 'Visa, MasterCard, American Express' },
                            { id: 'eft', icon: 'fas fa-university', name: 'EFT Transfer', description: 'Bank transfer' },
                            { id: 'snapscan', icon: 'fas fa-mobile-alt', name: 'SnapScan', description: 'Mobile payment app' },
                            { id: 'zapper', icon: 'fas fa-qrcode', name: 'Zapper', description: 'QR code payment' },
                            { id: 'cash', icon: 'fas fa-money-bill-wave', name: 'Cash at School', description: 'Pay at school office' }
                        ].map(method => (
                            <label key={method.id} className="payment-method" htmlFor={method.id}>
                                <input 
                                    type="radio" 
                                    id={method.id} 
                                    name="paymentMethod" 
                                    value={method.id}
                                    checked={formData.paymentMethod === method.id}
                                    onChange={handleChange}
                                    required 
                                />
                                <div className="payment-method-icon">
                                    <i className={method.icon}></i>
                                </div>
                                <div className="payment-method-name">{method.name}</div>
                                <div className="payment-method-description">{method.description}</div>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Payment Summary */}
                <div className="payment-summary">
                    <h3><i className="fas fa-calculator"></i> Payment Summary</h3>
                    <div className="summary-item">
                        <span className="label">Term Fee:</span>
                        <span className="value">R {formData.amount.toFixed(2)}</span>
                    </div>
                    <div className="summary-item">
                        <span className="label">Processing Fee:</span>
                        <span className="value" id="processingFee">R 0.00</span>
                    </div>
                    <div className="summary-item">
                        <span className="label">Total Amount:</span>
                        <span className="value" id="totalAmount">R {formData.amount.toFixed(2)}</span>
                    </div>
                </div>

                {/* Form Actions */}
                <div className="form-actions">
                    <button type="submit" className="btn-pay">
                        <i className="fas fa-credit-card"></i> Process Payment
                    </button>
                    <button type="button" className="btn-cancel" onClick={() => window.history.back()}>
                        <i className="fas fa-times"></i> Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default PaymentForm;


