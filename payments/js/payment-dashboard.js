// Payment Dashboard JavaScript
// Handles payment dashboard functionality and data display

class PaymentDashboard {
    constructor() {
        this.currentPage = 1;
        this.itemsPerPage = 10;
        this.paymentHistory = [];
        this.filteredHistory = [];
        
        this.init();
    }

    init() {
        this.loadPaymentData();
        this.setupEventListeners();
        this.updateDashboard();
    }

    loadPaymentData() {
        // Load payment data from localStorage or API
        // For demo purposes, we'll use sample data
        this.paymentHistory = [
            {
                id: 'PAY001',
                date: '2025-03-15',
                reference: 'ST2024001-2024Q1',
                description: 'Term 1 Tuition Fee',
                amount: 15000, // R150.00 in cents
                method: 'Credit Card',
                status: 'completed',
                transactionId: 'TXN123456789'
            },
            {
                id: 'PAY002',
                date: '2025-02-28',
                reference: 'ST2024001-2024Q1',
                description: 'Activity Fee - Sports',
                amount: 500, // R5.00 in cents
                method: 'Bank Transfer',
                status: 'completed',
                transactionId: 'TXN123456790'
            },
            {
                id: 'PAY003',
                date: '2025-01-15',
                reference: 'ST2024001-2023Q4',
                description: 'Term 4 Tuition Fee',
                amount: 15000, // R150.00 in cents
                method: 'Credit Card',
                status: 'completed',
                transactionId: 'TXN123456791'
            },
            {
                id: 'PAY004',
                date: '2025-03-20',
                reference: 'ST2024001-2024Q1',
                description: 'Late Payment Fee',
                amount: 100, // R1.00 in cents
                method: 'Credit Card',
                status: 'completed',
                transactionId: 'TXN123456792'
            }
        ];

        this.filteredHistory = [...this.paymentHistory];
    }

    setupEventListeners() {
        // Payment method selection
        const methodOptions = document.querySelectorAll('input[name="payment-method"]');
        methodOptions.forEach(option => {
            option.addEventListener('change', (e) => {
                this.handlePaymentMethodChange(e);
            });
        });

        // Quick action buttons
        const makePaymentBtn = document.querySelector('.action-btn.primary');
        if (makePaymentBtn) {
            makePaymentBtn.addEventListener('click', () => this.openPaymentForm());
        }

        const viewHistoryBtn = document.querySelector('.action-btn.secondary');
        if (viewHistoryBtn) {
            viewHistoryBtn.addEventListener('click', () => this.viewPaymentHistory());
        }

        // Payment status banner action
        const statusActionBtn = document.getElementById('payment-action-btn');
        if (statusActionBtn) {
            statusActionBtn.addEventListener('click', () => this.handleStatusAction());
        }
    }

    handlePaymentMethodChange(e) {
        // Update active state
        document.querySelectorAll('.method-option').forEach(opt => {
            opt.classList.remove('active');
        });
        e.target.closest('.method-option').classList.add('active');

        // Update payment method display
        const methodName = e.target.value === 'card' ? 'Credit/Debit Card' : 'Bank Transfer (EFT)';
        console.log('Selected payment method:', methodName);
    }

    handleStatusAction() {
        const paymentStatus = localStorage.getItem('paymentStatus') || 'pending';
        
        switch (paymentStatus) {
            case 'paid':
                this.viewPaymentHistory();
                break;
            case 'pending':
            case 'overdue':
                this.openPaymentForm();
                break;
        }
    }

    updateDashboard() {
        this.updatePaymentStatus();
        this.updateBalanceCard();
        this.updateFeeBreakdown();
        this.updateRecentPayments();
        this.updatePaymentReminders();
    }

    updatePaymentStatus() {
        const paymentStatus = localStorage.getItem('paymentStatus') || 'pending';
        const lastPayment = localStorage.getItem('lastPayment');
        const lastPaymentAmount = localStorage.getItem('lastPaymentAmount');

        // Update status banner
        const statusBanner = document.getElementById('payment-status-banner');
        const statusText = document.getElementById('payment-status-text');
        const statusBadge = document.getElementById('payment-status-badge');
        const actionBtn = document.getElementById('payment-action-btn');

        if (statusBanner) {
            switch (paymentStatus) {
                case 'paid':
                    statusBanner.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
                    if (statusText) {
                        statusText.textContent = `Payment up to date. Last payment: ${lastPayment || 'N/A'} (${lastPaymentAmount || 'N/A'})`;
                    }
                    break;
                case 'pending':
                    statusBanner.style.background = 'linear-gradient(135deg, #ffc107 0%, #fd7e14 100%)';
                    if (statusText) {
                        statusText.textContent = 'Payment pending. Please complete your payment to continue.';
                    }
                    break;
                case 'overdue':
                    statusBanner.style.background = 'linear-gradient(135deg, #dc3545 0%, #e83e8c 100%)';
                    if (statusText) {
                        statusText.textContent = 'Payment overdue. Access restricted until payment is made.';
                    }
                    break;
            }
        }

        if (statusBadge) {
            statusBadge.textContent = paymentStatus.charAt(0).toUpperCase() + paymentStatus.slice(1);
            statusBadge.className = `payment-status ${paymentStatus}`;
        }

        if (actionBtn) {
            switch (paymentStatus) {
                case 'paid':
                    actionBtn.textContent = 'View History';
                    break;
                case 'pending':
                case 'overdue':
                    actionBtn.textContent = 'Make Payment';
                    break;
            }
        }
    }

    updateBalanceCard() {
        const currentBalance = document.getElementById('current-balance');
        const dueDate = document.getElementById('due-date');
        const paymentStatusBadge = document.getElementById('payment-status-badge');

        if (currentBalance) {
            // Calculate current balance based on payment status
            const paymentStatus = localStorage.getItem('paymentStatus') || 'pending';
            const balance = paymentStatus === 'paid' ? 0 : 15600; // R156.00 in cents
            currentBalance.textContent = this.formatZAR(balance);
        }

        if (dueDate) {
            dueDate.textContent = '31 March 2024';
        }

        if (paymentStatusBadge) {
            const paymentStatus = localStorage.getItem('paymentStatus') || 'pending';
            paymentStatusBadge.textContent = paymentStatus.charAt(0).toUpperCase() + paymentStatus.slice(1);
            paymentStatusBadge.className = `payment-status ${paymentStatus}`;
        }
    }

    updateFeeBreakdown() {
        const feeList = document.getElementById('fee-list');
        const totalAmount = document.getElementById('total-amount');

        if (feeList) {
            const fees = [
                { name: 'Tuition Fee', amount: 15000 },
                { name: 'Activity Fee', amount: 500 },
                { name: 'Late Payment Fee', amount: 100 }
            ];

            feeList.innerHTML = fees.map(fee => `
                <div class="fee-item">
                    <span class="fee-name">${fee.name}</span>
                    <span class="fee-amount">${this.formatZAR(fee.amount)}</span>
                </div>
            `).join('');
        }

        if (totalAmount) {
            totalAmount.textContent = this.formatZAR(15600); // R156.00
        }
    }

    updateRecentPayments() {
        const recentPaymentsList = document.getElementById('recent-payments-list');
        
        if (recentPaymentsList) {
            // Show last 3 payments
            const recentPayments = this.paymentHistory.slice(0, 3);
            
            recentPaymentsList.innerHTML = recentPayments.map(payment => `
                <div class="recent-payment-item">
                    <div class="payment-info">
                        <div class="payment-description">${payment.description}</div>
                        <div class="payment-date">${this.formatDate(payment.date)}</div>
                    </div>
                    <div class="payment-amount">${this.formatZAR(payment.amount)}</div>
                </div>
            `).join('');
        }
    }

    updatePaymentReminders() {
        const reminderList = document.querySelector('.reminder-list');
        
        if (reminderList) {
            const paymentStatus = localStorage.getItem('paymentStatus') || 'pending';
            
            if (paymentStatus === 'pending' || paymentStatus === 'overdue') {
                reminderList.innerHTML = `
                    <div class="reminder">
                        <span class="reminder-icon">⏰</span>
                        <div class="reminder-content">
                            <p>Payment due in 5 days</p>
                            <small>31 March 2024</small>
                        </div>
                    </div>
                `;
            } else {
                reminderList.innerHTML = `
                    <div class="reminder">
                        <span class="reminder-icon">✅</span>
                        <div class="reminder-content">
                            <p>All payments up to date</p>
                            <small>Next payment due 30 June 2024</small>
                        </div>
                    </div>
                `;
            }
        }
    }

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

    // Format South African Rand
    formatZAR(amountInCents) {
        const amount = amountInCents / 100;
        return new Intl.NumberFormat('en-ZA', {
            style: 'currency',
            currency: 'ZAR'
        }).format(amount);
    }

    // Format date for display
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-ZA', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    // Calculate total paid amount
    calculateTotalPaid() {
        return this.paymentHistory
            .filter(payment => payment.status === 'completed')
            .reduce((total, payment) => total + payment.amount, 0);
    }

    // Get last payment
    getLastPayment() {
        const completedPayments = this.paymentHistory.filter(payment => payment.status === 'completed');
        return completedPayments.length > 0 ? completedPayments[0] : null;
    }

    // Get next due amount
    getNextDueAmount() {
        const paymentStatus = localStorage.getItem('paymentStatus') || 'pending';
        return paymentStatus === 'paid' ? 0 : 15600; // R156.00 in cents
    }
}

// Global functions for HTML onclick handlers
function openPaymentForm() {
    if (window.paymentDashboard) {
        window.paymentDashboard.openPaymentForm();
    }
}

function viewPaymentHistory() {
    if (window.paymentDashboard) {
        window.paymentDashboard.viewPaymentHistory();
    }
}

function downloadInvoice() {
    if (window.paymentDashboard) {
        window.paymentDashboard.downloadInvoice();
    }
}

function handlePaymentAction() {
    if (window.paymentDashboard) {
        window.paymentDashboard.handleStatusAction();
    }
}

// Initialize payment dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.paymentDashboard = new PaymentDashboard();
});
