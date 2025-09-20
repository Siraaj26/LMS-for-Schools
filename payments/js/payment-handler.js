// Payment Handler - South African Context
// Handles Stripe payments and payment-gated access

class PaymentHandler {
    constructor() {
        this.stripe = null;
        this.elements = null;
        this.cardElement = null;
        this.paymentIntent = null;
        this.isProcessing = false;
        
        // South African test data
        this.testData = {
            student: {
                id: 'ST2024001',
                name: 'Thabo Mthembu',
                school: 'Johannesburg High School'
            },
            fees: {
                tuition: 15000, // R150.00 in cents
                activities: 500, // R5.00 in cents
                late_fee: 100,  // R1.00 in cents
                total: 15600    // R156.00 in cents
            }
        };
        
        this.init();
    }

    init() {
        // Initialize Stripe with test key
        this.stripe = Stripe('pk_test_51234567890abcdef'); // Replace with your test key
        
        // Check payment status on page load
        this.checkPaymentStatus();
        
        // Initialize payment form if on payment page
        if (document.getElementById('payment-form')) {
            this.initializePaymentForm();
        }
    }

    // Check if user has paid (payment-gated access)
    checkPaymentStatus() {
        // In a real app, this would check against your database
        // For demo purposes, we'll use localStorage
        const paymentStatus = localStorage.getItem('paymentStatus') || 'pending';
        const lastPayment = localStorage.getItem('lastPayment');
        
        this.updatePaymentStatusUI(paymentStatus, lastPayment);
        
        // Block access if payment is overdue
        if (paymentStatus === 'overdue') {
            this.blockAccess();
        }
    }

    updatePaymentStatusUI(status, lastPayment) {
        const statusBanner = document.getElementById('payment-status-banner');
        const statusText = document.getElementById('payment-status-text');
        const statusBadge = document.getElementById('payment-status-badge');
        const actionBtn = document.getElementById('payment-action-btn');
        
        if (!statusBanner) return;

        // Update status text
        if (statusText) {
            switch (status) {
                case 'paid':
                    statusText.textContent = `Payment up to date. Last payment: ${lastPayment || 'N/A'}`;
                    statusBanner.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
                    break;
                case 'pending':
                    statusText.textContent = 'Payment pending. Please complete your payment to continue.';
                    statusBanner.style.background = 'linear-gradient(135deg, #ffc107 0%, #fd7e14 100%)';
                    break;
                case 'overdue':
                    statusText.textContent = 'Payment overdue. Access restricted until payment is made.';
                    statusBanner.style.background = 'linear-gradient(135deg, #dc3545 0%, #e83e8c 100%)';
                    break;
            }
        }

        // Update status badge
        if (statusBadge) {
            statusBadge.textContent = status.charAt(0).toUpperCase() + status.slice(1);
            statusBadge.className = `payment-status ${status}`;
        }

        // Update action button
        if (actionBtn) {
            switch (status) {
                case 'paid':
                    actionBtn.textContent = 'View History';
                    actionBtn.onclick = () => window.location.href = 'payment_history.html';
                    break;
                case 'pending':
                case 'overdue':
                    actionBtn.textContent = 'Make Payment';
                    actionBtn.onclick = () => this.openPaymentForm();
                    break;
            }
        }
    }

    blockAccess() {
        // Hide main dashboard content
        const dashboard = document.querySelector('.dashboard, .payment-dashboard');
        if (dashboard) {
            dashboard.style.display = 'none';
        }

        // Show payment required message
        const body = document.body;
        body.innerHTML = `
            <div class="payment-required-overlay">
                <div class="payment-required-content">
                    <div class="payment-icon">💰</div>
                    <h1>Payment Required</h1>
                    <p>Your account has an overdue payment. Please complete your payment to access the dashboard.</p>
                    <div class="payment-amount">
                        <span class="amount-label">Amount Due:</span>
                        <span class="amount-value">R 156.00</span>
                    </div>
                    <button class="btn-primary" onclick="paymentHandler.openPaymentForm()">
                        Make Payment Now
                    </button>
                </div>
            </div>
        `;
    }

    openPaymentForm() {
        // Open payment form in modal or redirect
        if (document.getElementById('payment-modal')) {
            document.getElementById('payment-modal').style.display = 'block';
        } else {
            window.location.href = 'payment_form.html';
        }
    }

    initializePaymentForm() {
        // Initialize Stripe Elements
        this.elements = this.stripe.elements({
            locale: 'en-ZA' // South African locale
        });

        // Create card element
        this.cardElement = this.elements.create('card', {
            style: {
                base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                        color: '#aab7c4',
                    },
                },
                invalid: {
                    color: '#9e2146',
                },
            },
        });

        // Mount card element
        const cardElementDiv = document.getElementById('card-element');
        if (cardElementDiv) {
            this.cardElement.mount(cardElementDiv);
        }

        // Handle payment method selection
        this.handlePaymentMethodSelection();

        // Handle form submission
        const form = document.getElementById('payment-form');
        if (form) {
            form.addEventListener('submit', (e) => this.handleFormSubmission(e));
        }

        // Populate form with test data
        this.populateTestData();
    }

    handlePaymentMethodSelection() {
        const methodOptions = document.querySelectorAll('input[name="payment-method"]');
        const cardForm = document.getElementById('card-payment-form');
        const eftForm = document.getElementById('eft-payment-form');

        methodOptions.forEach(option => {
            option.addEventListener('change', (e) => {
                // Update active state
                document.querySelectorAll('.method-option').forEach(opt => {
                    opt.classList.remove('active');
                });
                e.target.closest('.method-option').classList.add('active');

                // Show/hide forms
                if (e.target.value === 'card') {
                    cardForm.style.display = 'block';
                    eftForm.style.display = 'none';
                } else if (e.target.value === 'eft') {
                    cardForm.style.display = 'none';
                    eftForm.style.display = 'block';
                }
            });
        });
    }

    populateTestData() {
        // Populate form with test data
        const studentId = document.getElementById('student-id');
        const studentName = document.getElementById('student-name');
        const schoolName = document.getElementById('school-name');
        const totalPayment = document.getElementById('total-payment');
        const eftReference = document.getElementById('eft-reference');

        if (studentId) studentId.textContent = this.testData.student.id;
        if (studentName) studentName.textContent = this.testData.student.name;
        if (schoolName) schoolName.textContent = this.testData.student.school;
        if (totalPayment) totalPayment.textContent = this.formatZAR(this.testData.fees.total);
        if (eftReference) eftReference.textContent = `${this.testData.student.id}-2024Q1`;

        // Populate fee breakdown
        this.populateFeeBreakdown();
    }

    populateFeeBreakdown() {
        const feeList = document.getElementById('fee-list');
        if (!feeList) return;

        const fees = [
            { name: 'Tuition Fee', amount: this.testData.fees.tuition },
            { name: 'Activity Fee', amount: this.testData.fees.activities },
            { name: 'Late Payment Fee', amount: this.testData.fees.late_fee }
        ];

        feeList.innerHTML = fees.map(fee => `
            <div class="fee-item">
                <span class="fee-name">${fee.name}</span>
                <span class="fee-amount">${this.formatZAR(fee.amount)}</span>
            </div>
        `).join('');

        // Update total
        const totalAmount = document.getElementById('total-amount');
        if (totalAmount) {
            totalAmount.textContent = this.formatZAR(this.testData.fees.total);
        }
    }

    async handleFormSubmission(e) {
        e.preventDefault();
        
        if (this.isProcessing) return;
        
        this.isProcessing = true;
        this.setLoadingState(true);

        try {
            const selectedMethod = document.querySelector('input[name="payment-method"]:checked').value;
            
            if (selectedMethod === 'card') {
                await this.processCardPayment();
            } else if (selectedMethod === 'eft') {
                this.processEFTPayment();
            }
        } catch (error) {
            console.error('Payment error:', error);
            this.showError('Payment failed. Please try again.');
        } finally {
            this.isProcessing = false;
            this.setLoadingState(false);
        }
    }

    async processCardPayment() {
        // Create payment intent (in real app, this would be done server-side)
        const paymentIntent = await this.createPaymentIntent();
        
        // Confirm payment
        const { error, paymentIntent: confirmedPayment } = await this.stripe.confirmCardPayment(
            paymentIntent.client_secret,
            {
                payment_method: {
                    card: this.cardElement,
                    billing_details: {
                        name: document.getElementById('cardholder-name').value,
                        email: document.getElementById('email').value,
                    },
                }
            }
        );

        if (error) {
            this.showError(error.message);
        } else {
            this.handlePaymentSuccess(confirmedPayment);
        }
    }

    async createPaymentIntent() {
        // In a real app, this would call your backend
        // For demo purposes, we'll simulate a successful creation
        return {
            id: 'pi_test_' + Math.random().toString(36).substr(2, 9),
            client_secret: 'pi_test_' + Math.random().toString(36).substr(2, 9) + '_secret_' + Math.random().toString(36).substr(2, 9),
            amount: this.testData.fees.total,
            currency: 'zar',
            status: 'requires_payment_method'
        };
    }

    processEFTPayment() {
        // For EFT, we'll simulate a successful payment
        // In a real app, this would generate bank details and wait for confirmation
        setTimeout(() => {
            this.handlePaymentSuccess({
                id: 'pi_eft_' + Math.random().toString(36).substr(2, 9),
                amount: this.testData.fees.total,
                currency: 'zar',
                status: 'succeeded',
                payment_method: 'eft'
            });
        }, 2000);
    }

    handlePaymentSuccess(paymentIntent) {
        // Update payment status
        localStorage.setItem('paymentStatus', 'paid');
        localStorage.setItem('lastPayment', new Date().toLocaleDateString('en-ZA'));
        localStorage.setItem('lastPaymentAmount', this.formatZAR(paymentIntent.amount));
        localStorage.setItem('lastPaymentMethod', paymentIntent.payment_method || 'card');

        // Show success modal
        this.showSuccessModal(paymentIntent);
    }

    showSuccessModal(paymentIntent) {
        const modal = document.getElementById('payment-success-modal');
        if (!modal) return;

        // Update modal content
        const transactionId = document.getElementById('transaction-id');
        const paymentMethodUsed = document.getElementById('payment-method-used');
        const paymentDate = document.getElementById('payment-date');

        if (transactionId) transactionId.textContent = paymentIntent.id;
        if (paymentMethodUsed) paymentMethodUsed.textContent = paymentIntent.payment_method === 'eft' ? 'Bank Transfer' : 'Credit Card';
        if (paymentDate) paymentDate.textContent = new Date().toLocaleDateString('en-ZA');

        modal.style.display = 'block';
    }

    showError(message) {
        const errorModal = document.getElementById('payment-error-modal');
        if (!errorModal) return;

        const errorMessage = document.getElementById('error-message');
        if (errorMessage) errorMessage.textContent = message;

        errorModal.style.display = 'block';
    }

    setLoadingState(loading) {
        const submitBtn = document.getElementById('submit-payment');
        if (!submitBtn) return;

        if (loading) {
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
        } else {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    }

    // Format South African Rand
    formatZAR(amountInCents) {
        const amount = amountInCents / 100;
        return new Intl.NumberFormat('en-ZA', {
            style: 'currency',
            currency: 'ZAR'
        }).format(amount);
    }

    // Utility functions for other pages
    openPaymentForm() {
        window.location.href = 'payment_form.html';
    }

    viewPaymentHistory() {
        window.location.href = 'payment_history.html';
    }

    downloadInvoice() {
        // In a real app, this would generate and download an invoice
        alert('Invoice download functionality would be implemented here');
    }

    downloadReceipt() {
        // In a real app, this would generate and download a receipt
        alert('Receipt download functionality would be implemented here');
    }

    goBack() {
        window.history.back();
    }

    goToDashboard() {
        window.location.href = 'payment_dashboard.html';
    }

    retryPayment() {
        document.getElementById('payment-error-modal').style.display = 'none';
    }

    closePaymentForm() {
        const modal = document.getElementById('payment-modal');
        if (modal) modal.style.display = 'none';
    }

    showTerms() {
        alert('Terms and Conditions would be displayed here');
    }

    showPrivacy() {
        alert('Privacy Policy would be displayed here');
    }
}

// Global functions for HTML onclick handlers
function openPaymentForm() {
    if (window.paymentHandler) {
        window.paymentHandler.openPaymentForm();
    }
}

function viewPaymentHistory() {
    if (window.paymentHandler) {
        window.paymentHandler.viewPaymentHistory();
    }
}

function downloadInvoice() {
    if (window.paymentHandler) {
        window.paymentHandler.downloadInvoice();
    }
}

function downloadReceipt() {
    if (window.paymentHandler) {
        window.paymentHandler.downloadReceipt();
    }
}

function goBack() {
    if (window.paymentHandler) {
        window.paymentHandler.goBack();
    }
}

function goToDashboard() {
    if (window.paymentHandler) {
        window.paymentHandler.goToDashboard();
    }
}

function retryPayment() {
    if (window.paymentHandler) {
        window.paymentHandler.retryPayment();
    }
}

function closePaymentForm() {
    if (window.paymentHandler) {
        window.paymentHandler.closePaymentForm();
    }
}

function showTerms() {
    if (window.paymentHandler) {
        window.paymentHandler.showTerms();
    }
}

function showPrivacy() {
    if (window.paymentHandler) {
        window.paymentHandler.showPrivacy();
    }
}

function handlePaymentAction() {
    if (window.paymentHandler) {
        window.paymentHandler.openPaymentForm();
    }
}

// Initialize payment handler when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.paymentHandler = new PaymentHandler();
});
