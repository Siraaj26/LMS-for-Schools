// Payment Processor - Backend Integration
class PaymentProcessor {
    constructor() {
        this.stripePublicKey = 'pk_test_51234567890abcdef'; // Replace with your actual Stripe public key
        this.stripeSecretKey = 'sk_test_51234567890abcdef'; // Replace with your actual Stripe secret key
        this.apiBaseUrl = 'https://api.empiras-vanguard.co.za'; // Replace with your actual API URL
        
        this.paymentMethods = {
            stripe: {
                name: 'Credit/Debit Cards',
                enabled: true,
                currency: 'ZAR',
                processingFee: 0.029 // 2.9% + 30c
            },
            eft: {
                name: 'EFT/Bank Transfer',
                enabled: true,
                currency: 'ZAR',
                processingFee: 0.00
            },
            snapscan: {
                name: 'SnapScan',
                enabled: true,
                currency: 'ZAR',
                processingFee: 0.025 // 2.5%
            },
            zapper: {
                name: 'Zapper',
                enabled: true,
                currency: 'ZAR',
                processingFee: 0.025 // 2.5%
            },
            cash: {
                name: 'Cash at School',
                enabled: true,
                currency: 'ZAR',
                processingFee: 0.00
            }
        };

        this.init();
    }

    init() {
        this.loadStripe();
        this.setupEventListeners();
    }

    async loadStripe() {
        if (typeof Stripe === 'undefined') {
            const script = document.createElement('script');
            script.src = 'https://js.stripe.com/v3/';
            script.onload = () => {
                this.stripe = Stripe(this.stripePublicKey);
            };
            document.head.appendChild(script);
        } else {
            this.stripe = Stripe(this.stripePublicKey);
        }
    }

    setupEventListeners() {
        // Payment form submission
        document.addEventListener('submit', (e) => {
            if (e.target.classList.contains('payment-form')) {
                e.preventDefault();
                this.handlePaymentSubmission(e.target);
            }
        });

        // Payment method selection
        document.addEventListener('change', (e) => {
            if (e.target.name === 'payment-method') {
                this.updatePaymentMethod(e.target.value);
            }
        });
    }

    async handlePaymentSubmission(form) {
        const formData = new FormData(form);
        const paymentData = {
            amount: parseFloat(formData.get('amount')),
            currency: 'ZAR',
            paymentMethod: formData.get('payment-method'),
            studentId: formData.get('student-id'),
            termId: formData.get('term-id'),
            description: formData.get('description'),
            customerEmail: formData.get('customer-email'),
            customerName: formData.get('customer-name'),
            customerPhone: formData.get('customer-phone')
        };

        try {
            this.showLoadingState();
            
            switch (paymentData.paymentMethod) {
                case 'stripe':
                    await this.processStripePayment(paymentData);
                    break;
                case 'eft':
                    await this.processEFTPayment(paymentData);
                    break;
                case 'snapscan':
                    await this.processSnapScanPayment(paymentData);
                    break;
                case 'zapper':
                    await this.processZapperPayment(paymentData);
                    break;
                case 'cash':
                    await this.processCashPayment(paymentData);
                    break;
                default:
                    throw new Error('Invalid payment method selected');
            }
        } catch (error) {
            this.handlePaymentError(error);
        } finally {
            this.hideLoadingState();
        }
    }

    async processStripePayment(paymentData) {
        try {
            // Create payment intent using API simulation
            const response = await window.paymentAPI.makeAPICall('/api/payments/create-intent', 'POST', {
                amount: Math.round(paymentData.amount * 100), // Convert to cents
                currency: paymentData.currency,
                studentId: paymentData.studentId,
                termId: paymentData.termId,
                description: paymentData.description,
                customerEmail: paymentData.customerEmail,
                customerName: paymentData.customerName
            });

            const { clientSecret, paymentIntentId } = response;

            // Simulate Stripe payment confirmation
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Simulate successful payment
            const paymentIntent = {
                id: paymentIntentId,
                status: 'succeeded',
                amount: paymentData.amount * 100,
                currency: paymentData.currency
            };

            await this.handlePaymentSuccess(paymentIntent, paymentData);

        } catch (error) {
            throw new Error(`Stripe payment failed: ${error.message}`);
        }
    }

    async processEFTPayment(paymentData) {
        try {
            // Generate EFT payment details
            const eftDetails = await this.generateEFTDetails(paymentData);
            
            // Create pending payment record using API simulation
            const response = await window.paymentAPI.makeAPICall('/api/payments/create-eft', 'POST', {
                ...paymentData,
                eftDetails: eftDetails,
                status: 'pending'
            });
            
            // Show EFT payment instructions
            this.showEFTPaymentInstructions(eftDetails, response.paymentId);
            
        } catch (error) {
            throw new Error(`EFT payment failed: ${error.message}`);
        }
    }

    async processSnapScanPayment(paymentData) {
        try {
            // Create SnapScan payment request using API simulation
            const response = await window.paymentAPI.makeAPICall('/api/payments/create-snapscan', 'POST', {
                ...paymentData,
                status: 'pending'
            });
            
            // Show SnapScan QR code
            this.showSnapScanPayment(response.qrCode, response.snapscanUrl, response.paymentId);
            
        } catch (error) {
            throw new Error(`SnapScan payment failed: ${error.message}`);
        }
    }

    async processZapperPayment(paymentData) {
        try {
            // Create Zapper payment request using API simulation
            const response = await window.paymentAPI.makeAPICall('/api/payments/create-zapper', 'POST', {
                ...paymentData,
                status: 'pending'
            });
            
            // Show Zapper QR code
            this.showZapperPayment(response.qrCode, response.zapperUrl, response.paymentId);
            
        } catch (error) {
            throw new Error(`Zapper payment failed: ${error.message}`);
        }
    }

    async processCashPayment(paymentData) {
        try {
            // Create cash payment record using API simulation
            const response = await window.paymentAPI.makeAPICall('/api/payments/create-cash', 'POST', {
                ...paymentData,
                status: 'pending',
                instructions: 'Pay at school office during business hours'
            });
            
            // Show cash payment instructions
            this.showCashPaymentInstructions(response.paymentId);
            
        } catch (error) {
            throw new Error(`Cash payment failed: ${error.message}`);
        }
    }

    async generateEFTDetails(paymentData) {
        return {
            bankName: 'First National Bank',
            accountName: 'Empiras Vanguard School',
            accountNumber: '1234567890',
            branchCode: '250655',
            reference: `EMP${paymentData.studentId}${paymentData.termId}`,
            amount: paymentData.amount,
            dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 7 days from now
        };
    }

    showEFTPaymentInstructions(eftDetails, paymentId) {
        const modal = document.createElement('div');
        modal.className = 'payment-instructions-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>EFT Payment Instructions</h3>
                    <span class="close" onclick="this.parentElement.parentElement.parentElement.remove()">&times;</span>
                </div>
                <div class="modal-body">
                    <div class="eft-details">
                        <h4>Banking Details:</h4>
                        <div class="bank-info">
                            <div class="info-row">
                                <span class="label">Bank:</span>
                                <span class="value">${eftDetails.bankName}</span>
                            </div>
                            <div class="info-row">
                                <span class="label">Account Name:</span>
                                <span class="value">${eftDetails.accountName}</span>
                            </div>
                            <div class="info-row">
                                <span class="label">Account Number:</span>
                                <span class="value">${eftDetails.accountNumber}</span>
                            </div>
                            <div class="info-row">
                                <span class="label">Branch Code:</span>
                                <span class="value">${eftDetails.branchCode}</span>
                            </div>
                            <div class="info-row">
                                <span class="label">Reference:</span>
                                <span class="value">${eftDetails.reference}</span>
                            </div>
                            <div class="info-row">
                                <span class="label">Amount:</span>
                                <span class="value">R ${eftDetails.amount.toLocaleString()}</span>
                            </div>
                            <div class="info-row">
                                <span class="label">Due Date:</span>
                                <span class="value">${eftDetails.dueDate}</span>
                            </div>
                        </div>
                        <div class="instructions">
                            <h4>Instructions:</h4>
                            <ol>
                                <li>Use the reference number exactly as shown</li>
                                <li>Payment will be processed within 2-3 business days</li>
                                <li>You will receive an email confirmation once processed</li>
                                <li>Keep your payment proof for your records</li>
                            </ol>
                        </div>
                        <div class="payment-actions">
                            <button class="btn-primary" onclick="paymentProcessor.copyEFTDetails()">
                                <i class="fas fa-copy"></i> Copy Details
                            </button>
                            <button class="btn-secondary" onclick="paymentProcessor.downloadEFTInstructions('${paymentId}')">
                                <i class="fas fa-download"></i> Download Instructions
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    showSnapScanPayment(qrCode, snapscanUrl, paymentId) {
        const modal = document.createElement('div');
        modal.className = 'payment-instructions-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>SnapScan Payment</h3>
                    <span class="close" onclick="this.parentElement.parentElement.parentElement.remove()">&times;</span>
                </div>
                <div class="modal-body">
                    <div class="snapscan-payment">
                        <div class="qr-code">
                            <img src="${qrCode}" alt="SnapScan QR Code" style="max-width: 200px;">
                        </div>
                        <div class="instructions">
                            <h4>How to Pay:</h4>
                            <ol>
                                <li>Open the SnapScan app on your phone</li>
                                <li>Scan the QR code above</li>
                                <li>Enter the amount: R ${this.getCurrentAmount()}</li>
                                <li>Complete the payment</li>
                            </ol>
                            <p><strong>Or click the link below:</strong></p>
                            <a href="${snapscanUrl}" target="_blank" class="snapscan-link">
                                <i class="fas fa-mobile-alt"></i> Pay with SnapScan
                            </a>
                        </div>
                        <div class="payment-status">
                            <p>Payment Status: <span id="payment-status-${paymentId}">Waiting for payment...</span></p>
                            <div class="status-indicator">
                                <div class="spinner"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        
        // Start polling for payment status
        this.pollPaymentStatus(paymentId);
    }

    showZapperPayment(qrCode, zapperUrl, paymentId) {
        const modal = document.createElement('div');
        modal.className = 'payment-instructions-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Zapper Payment</h3>
                    <span class="close" onclick="this.parentElement.parentElement.parentElement.remove()">&times;</span>
                </div>
                <div class="modal-body">
                    <div class="zapper-payment">
                        <div class="qr-code">
                            <img src="${qrCode}" alt="Zapper QR Code" style="max-width: 200px;">
                        </div>
                        <div class="instructions">
                            <h4>How to Pay:</h4>
                            <ol>
                                <li>Open the Zapper app on your phone</li>
                                <li>Scan the QR code above</li>
                                <li>Enter the amount: R ${this.getCurrentAmount()}</li>
                                <li>Complete the payment</li>
                            </ol>
                            <p><strong>Or click the link below:</strong></p>
                            <a href="${zapperUrl}" target="_blank" class="zapper-link">
                                <i class="fas fa-qrcode"></i> Pay with Zapper
                            </a>
                        </div>
                        <div class="payment-status">
                            <p>Payment Status: <span id="payment-status-${paymentId}">Waiting for payment...</span></p>
                            <div class="status-indicator">
                                <div class="spinner"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        
        // Start polling for payment status
        this.pollPaymentStatus(paymentId);
    }

    showCashPaymentInstructions(paymentId) {
        const modal = document.createElement('div');
        modal.className = 'payment-instructions-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Cash Payment Instructions</h3>
                    <span class="close" onclick="this.parentElement.parentElement.parentElement.remove()">&times;</span>
                </div>
                <div class="modal-body">
                    <div class="cash-payment">
                        <div class="payment-info">
                            <h4>Payment Details:</h4>
                            <div class="info-row">
                                <span class="label">Amount:</span>
                                <span class="value">R ${this.getCurrentAmount()}</span>
                            </div>
                            <div class="info-row">
                                <span class="label">Payment ID:</span>
                                <span class="value">${paymentId}</span>
                            </div>
                        </div>
                        <div class="instructions">
                            <h4>How to Pay:</h4>
                            <ol>
                                <li>Visit the school office during business hours (8:00 AM - 4:00 PM)</li>
                                <li>Bring exact cash amount</li>
                                <li>Provide the Payment ID to the office staff</li>
                                <li>Receive a receipt for your payment</li>
                            </ol>
                            <div class="office-hours">
                                <h4>Office Hours:</h4>
                                <p>Monday - Friday: 8:00 AM - 4:00 PM</p>
                                <p>Saturday: 8:00 AM - 12:00 PM</p>
                                <p>Sunday: Closed</p>
                            </div>
                        </div>
                        <div class="payment-actions">
                            <button class="btn-primary" onclick="paymentProcessor.downloadCashInstructions('${paymentId}')">
                                <i class="fas fa-download"></i> Download Instructions
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    async pollPaymentStatus(paymentId) {
        const maxAttempts = 60; // 5 minutes with 5-second intervals
        let attempts = 0;

        const poll = async () => {
            try {
                const response = await fetch(`${this.apiBaseUrl}/api/payments/status/${paymentId}`, {
                    headers: {
                        'Authorization': `Bearer ${this.getAuthToken()}`
                    }
                });

                if (response.ok) {
                    const { status } = await response.json();
                    const statusElement = document.getElementById(`payment-status-${paymentId}`);
                    
                    if (statusElement) {
                        statusElement.textContent = status;
                        
                        if (status === 'completed') {
                            this.handlePaymentSuccess({ id: paymentId }, this.getCurrentPaymentData());
                            return;
                        } else if (status === 'failed') {
                            this.handlePaymentError(new Error('Payment failed'));
                            return;
                        }
                    }
                }

                attempts++;
                if (attempts < maxAttempts) {
                    setTimeout(poll, 5000); // Poll every 5 seconds
                } else {
                    this.handlePaymentError(new Error('Payment timeout'));
                }
            } catch (error) {
                console.error('Error polling payment status:', error);
                attempts++;
                if (attempts < maxAttempts) {
                    setTimeout(poll, 5000);
                }
            }
        };

        poll();
    }

    async handlePaymentSuccess(paymentIntent, paymentData) {
        try {
            // Update payment status on backend
            await fetch(`${this.apiBaseUrl}/api/payments/confirm`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.getAuthToken()}`
                },
                body: JSON.stringify({
                    paymentId: paymentIntent.id,
                    studentId: paymentData.studentId,
                    termId: paymentData.termId,
                    amount: paymentData.amount,
                    status: 'completed'
                })
            });

            // Show success message
            this.showPaymentSuccess(paymentIntent, paymentData);
            
            // Update access restrictions
            this.updateAccessRestrictions(paymentData.studentId);
            
            // Send confirmation email
            await this.sendPaymentConfirmation(paymentData);
            
        } catch (error) {
            console.error('Error handling payment success:', error);
        }
    }

    showPaymentSuccess(paymentIntent, paymentData) {
        const modal = document.createElement('div');
        modal.className = 'payment-success-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3><i class="fas fa-check-circle"></i> Payment Successful!</h3>
                </div>
                <div class="modal-body">
                    <div class="success-details">
                        <div class="success-icon">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <div class="payment-summary">
                            <h4>Payment Confirmed</h4>
                            <div class="summary-item">
                                <span class="label">Amount:</span>
                                <span class="value">R ${paymentData.amount.toLocaleString()}</span>
                            </div>
                            <div class="summary-item">
                                <span class="label">Term:</span>
                                <span class="value">${paymentData.termId}</span>
                            </div>
                            <div class="summary-item">
                                <span class="label">Transaction ID:</span>
                                <span class="value">${paymentIntent.id}</span>
                            </div>
                            <div class="summary-item">
                                <span class="label">Date:</span>
                                <span class="value">${new Date().toLocaleDateString()}</span>
                            </div>
                        </div>
                        <div class="success-message">
                            <p>Your payment has been processed successfully. You will receive a confirmation email shortly.</p>
                            <p>Your access to all school features has been restored.</p>
                        </div>
                        <div class="success-actions">
                            <button class="btn-primary" onclick="paymentProcessor.downloadReceipt('${paymentIntent.id}')">
                                <i class="fas fa-download"></i> Download Receipt
                            </button>
                            <button class="btn-secondary" onclick="window.location.href='../html/student/student_dash.html'">
                                <i class="fas fa-home"></i> Return to Dashboard
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    handlePaymentError(error) {
        const modal = document.createElement('div');
        modal.className = 'payment-error-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3><i class="fas fa-exclamation-triangle"></i> Payment Failed</h3>
                </div>
                <div class="modal-body">
                    <div class="error-details">
                        <div class="error-icon">
                            <i class="fas fa-exclamation-triangle"></i>
                        </div>
                        <div class="error-message">
                            <h4>Payment could not be processed</h4>
                            <p>${error.message}</p>
                            <p>Please try again or contact support if the problem persists.</p>
                        </div>
                        <div class="error-actions">
                            <button class="btn-primary" onclick="this.parentElement.parentElement.parentElement.parentElement.remove()">
                                <i class="fas fa-redo"></i> Try Again
                            </button>
                            <button class="btn-secondary" onclick="paymentProcessor.contactSupport()">
                                <i class="fas fa-phone"></i> Contact Support
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    showLoadingState() {
        const loadingOverlay = document.createElement('div');
        loadingOverlay.id = 'payment-loading-overlay';
        loadingOverlay.className = 'payment-loading-overlay';
        loadingOverlay.innerHTML = `
            <div class="loading-content">
                <div class="spinner"></div>
                <p>Processing payment...</p>
            </div>
        `;
        document.body.appendChild(loadingOverlay);
    }

    hideLoadingState() {
        const loadingOverlay = document.getElementById('payment-loading-overlay');
        if (loadingOverlay) {
            loadingOverlay.remove();
        }
    }

    updatePaymentMethod(method) {
        const paymentForm = document.querySelector('.payment-form');
        if (paymentForm) {
            // Update form fields based on payment method
            const cardFields = paymentForm.querySelector('.card-fields');
            const eftFields = paymentForm.querySelector('.eft-fields');
            const mobileFields = paymentForm.querySelector('.mobile-fields');
            
            // Hide all fields
            if (cardFields) cardFields.style.display = 'none';
            if (eftFields) eftFields.style.display = 'none';
            if (mobileFields) mobileFields.style.display = 'none';
            
            // Show relevant fields
            switch (method) {
                case 'stripe':
                    if (cardFields) cardFields.style.display = 'block';
                    break;
                case 'eft':
                    if (eftFields) eftFields.style.display = 'block';
                    break;
                case 'snapscan':
                case 'zapper':
                    if (mobileFields) mobileFields.style.display = 'block';
                    break;
            }
        }
    }

    getCardElement() {
        // This would return the Stripe card element
        // Implementation depends on your Stripe setup
        return document.querySelector('#card-element');
    }

    getCurrentAmount() {
        const amountInput = document.querySelector('input[name="amount"]');
        return amountInput ? parseFloat(amountInput.value) : 0;
    }

    getCurrentPaymentData() {
        const form = document.querySelector('.payment-form');
        if (!form) return null;
        
        const formData = new FormData(form);
        return {
            amount: parseFloat(formData.get('amount')),
            currency: 'ZAR',
            paymentMethod: formData.get('payment-method'),
            studentId: formData.get('student-id'),
            termId: formData.get('term-id'),
            description: formData.get('description'),
            customerEmail: formData.get('customer-email'),
            customerName: formData.get('customer-name'),
            customerPhone: formData.get('customer-phone')
        };
    }

    getAuthToken() {
        // Get authentication token from localStorage or sessionStorage
        return localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    }

    async updateAccessRestrictions(studentId) {
        // Update access restrictions after successful payment
        try {
            await fetch(`${this.apiBaseUrl}/api/students/${studentId}/update-access`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.getAuthToken()}`
                }
            });
        } catch (error) {
            console.error('Error updating access restrictions:', error);
        }
    }

    async sendPaymentConfirmation(paymentData) {
        try {
            await fetch(`${this.apiBaseUrl}/api/payments/send-confirmation`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.getAuthToken()}`
                },
                body: JSON.stringify({
                    studentId: paymentData.studentId,
                    amount: paymentData.amount,
                    termId: paymentData.termId,
                    customerEmail: paymentData.customerEmail
                })
            });
        } catch (error) {
            console.error('Error sending payment confirmation:', error);
        }
    }

    copyEFTDetails() {
        const eftDetails = document.querySelector('.bank-info');
        if (eftDetails) {
            const text = eftDetails.innerText;
            navigator.clipboard.writeText(text).then(() => {
                alert('Banking details copied to clipboard!');
            });
        }
    }

    async downloadEFTInstructions(paymentId) {
        // Generate and download EFT instructions PDF
        const instructions = this.generateEFTInstructions(paymentId);
        this.downloadFile(instructions, `eft-instructions-${paymentId}.txt`);
    }

    async downloadCashInstructions(paymentId) {
        // Generate and download cash payment instructions
        const instructions = this.generateCashInstructions(paymentId);
        this.downloadFile(instructions, `cash-instructions-${paymentId}.txt`);
    }

    async downloadReceipt(paymentId) {
        // Generate and download payment receipt
        const receipt = await this.generateReceipt(paymentId);
        this.downloadFile(receipt, `payment-receipt-${paymentId}.txt`);
    }

    generateEFTInstructions(paymentId) {
        return `EFT Payment Instructions - Payment ID: ${paymentId}
        
Banking Details:
Bank: First National Bank
Account Name: Empiras Vanguard School
Account Number: 1234567890
Branch Code: 250655
Reference: EMP${this.getCurrentPaymentData()?.studentId}${this.getCurrentPaymentData()?.termId}
Amount: R ${this.getCurrentAmount()}

Instructions:
1. Use the reference number exactly as shown
2. Payment will be processed within 2-3 business days
3. You will receive an email confirmation once processed
4. Keep your payment proof for your records

Generated: ${new Date().toLocaleString()}`;
    }

    generateCashInstructions(paymentId) {
        return `Cash Payment Instructions - Payment ID: ${paymentId}
        
Payment Details:
Amount: R ${this.getCurrentAmount()}
Payment ID: ${paymentId}

Instructions:
1. Visit the school office during business hours (8:00 AM - 4:00 PM)
2. Bring exact cash amount
3. Provide the Payment ID to the office staff
4. Receive a receipt for your payment

Office Hours:
Monday - Friday: 8:00 AM - 4:00 PM
Saturday: 8:00 AM - 12:00 PM
Sunday: Closed

Generated: ${new Date().toLocaleString()}`;
    }

    async generateReceipt(paymentId) {
        const paymentData = this.getCurrentPaymentData();
        return `Payment Receipt - Transaction ID: ${paymentId}
        
Student: ${paymentData?.customerName}
Student ID: ${paymentData?.studentId}
Term: ${paymentData?.termId}
Amount: R ${paymentData?.amount}
Payment Method: ${paymentData?.paymentMethod}
Date: ${new Date().toLocaleString()}

Thank you for your payment!

Empiras Vanguard School
Generated: ${new Date().toLocaleString()}`;
    }

    downloadFile(content, filename) {
        const blob = new Blob([content], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }

    contactSupport() {
        window.location.href = 'mailto:support@empiras-vanguard.co.za?subject=Payment Support Request';
    }
}

// Initialize payment processor
document.addEventListener('DOMContentLoaded', () => {
    window.paymentProcessor = new PaymentProcessor();
});
