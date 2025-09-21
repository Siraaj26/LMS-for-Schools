// Unified Payment Dashboard JavaScript
class UnifiedPaymentDashboard {
    constructor() {
        this.currentStudent = {
            id: 'ST2024001',
            name: 'Thabo Mthembu',
            grade: 10,
            parentName: 'Mrs. Mthembu',
            email: 'parent@example.com',
            phone: '+27 82 123 4567'
        };

        this.paymentData = {
            totalPaid: 3500,
            outstanding: 3500,
            termsPaid: 2,
            totalTerms: 4,
            progress: 50
        };

        this.terms = {
            term1: {
                id: 'term1',
                name: 'Term 1',
                period: 'January 15 - March 22, 2025',
                amount: 1750,
                status: 'paid',
                paidDate: '2025-01-15',
                paymentMethod: 'EFT Transfer',
                transactionId: 'TXN456789123'
            },
            term2: {
                id: 'term2',
                name: 'Term 2',
                period: 'April 8 - June 14, 2025',
                amount: 1750,
                status: 'paid',
                paidDate: '2025-04-10',
                paymentMethod: 'Credit Card',
                transactionId: 'TXN789456123'
            },
            term3: {
                id: 'term3',
                name: 'Term 3',
                period: 'July 8 - September 20, 2025',
                amount: 1750,
                status: 'overdue',
                dueDate: '2025-07-03'
            },
            term4: {
                id: 'term4',
                name: 'Term 4',
                period: 'October 7 - December 6, 2025',
                amount: 1750,
                status: 'pending',
                dueDate: '2025-10-02'
            }
        };

        this.paymentHistory = [
            {
                id: 'payment1',
                description: 'Term 2 Payment',
                amount: 1750,
                date: '2025-04-10',
                method: 'Credit Card',
                transactionId: 'TXN789456123',
                status: 'completed'
            },
            {
                id: 'payment2',
                description: 'Term 1 Payment',
                amount: 1750,
                date: '2025-01-15',
                method: 'EFT Transfer',
                transactionId: 'TXN456789123',
                status: 'completed'
            },
            {
                id: 'payment3',
                description: 'Registration Fee',
                amount: 250,
                date: '2025-01-05',
                method: 'Cash Payment',
                transactionId: 'RCP123456789',
                status: 'completed'
            }
        ];

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateDashboard();
        this.checkPaymentStatus();
    }

    setupEventListeners() {
        // Payment buttons
        document.querySelectorAll('[onclick*="makePayment"]').forEach(button => {
            button.addEventListener('click', (e) => {
                const termId = e.target.getAttribute('onclick').match(/'([^']+)'/)[1];
                this.initiatePayment(termId);
            });
        });

        // Other action buttons
        document.querySelectorAll('[onclick*="viewPaymentDetails"]').forEach(button => {
            button.addEventListener('click', () => {
                this.showPaymentDetails();
            });
        });

        document.querySelectorAll('[onclick*="setupSubscription"]').forEach(button => {
            button.addEventListener('click', () => {
                this.showSubscriptionModal();
            });
        });

        document.querySelectorAll('[onclick*="viewAllHistory"]').forEach(button => {
            button.addEventListener('click', () => {
                this.viewAllHistory();
            });
        });

        document.querySelectorAll('[onclick*="downloadStatement"]').forEach(button => {
            button.addEventListener('click', () => {
                this.downloadStatement();
            });
        });
    }

    updateDashboard() {
        this.updatePaymentSummary();
        this.updateTermsOverview();
        this.updatePaymentHistory();
        this.updatePaymentStatus();
    }

    updatePaymentSummary() {
        // Update summary stats
        const totalPaidElement = document.querySelector('.stat-card:nth-child(1) .stat-value');
        const outstandingElement = document.querySelector('.stat-card:nth-child(2) .stat-value');
        const termsPaidElement = document.querySelector('.stat-card:nth-child(3) .stat-value');
        const progressElement = document.querySelector('.stat-card:nth-child(4) .stat-value');

        if (totalPaidElement) totalPaidElement.textContent = `R ${this.paymentData.totalPaid.toLocaleString()}`;
        if (outstandingElement) outstandingElement.textContent = `R ${this.paymentData.outstanding.toLocaleString()}`;
        if (termsPaidElement) termsPaidElement.textContent = `${this.paymentData.termsPaid}/${this.paymentData.totalTerms}`;
        if (progressElement) progressElement.textContent = `${this.paymentData.progress}%`;
    }

    updateTermsOverview() {
        // Update term amounts based on current grade
        const termAmounts = document.querySelectorAll('.term-amount .amount');
        termAmounts.forEach(amount => {
            amount.textContent = `R ${this.terms.term1.amount.toLocaleString()}`;
        });
    }

    updatePaymentHistory() {
        // Update payment history items
        const historyItems = document.querySelectorAll('.history-item');
        this.paymentHistory.forEach((payment, index) => {
            if (historyItems[index]) {
                const historyInfo = historyItems[index].querySelector('.history-info');
                const historyAmount = historyItems[index].querySelector('.history-amount');
                
                if (historyInfo) {
                    historyInfo.querySelector('h4').textContent = payment.description;
                    historyInfo.querySelector('p').textContent = `${payment.method} • Transaction ID: ${payment.transactionId}`;
                }
                
                if (historyAmount) {
                    historyAmount.querySelector('.amount').textContent = `R ${payment.amount.toLocaleString()}`;
                    historyAmount.querySelector('.date').textContent = this.formatDate(payment.date);
                }
            }
        });
    }

    updatePaymentStatus() {
        const overdueTerms = Object.values(this.terms).filter(term => term.status === 'overdue');
        const hasOverdue = overdueTerms.length > 0;

        if (hasOverdue) {
            this.showPaymentBanner();
        } else {
            this.hidePaymentBanner();
        }
    }

    showPaymentBanner() {
        const banner = document.querySelector('.payment-status-banner');
        if (banner) {
            banner.style.display = 'block';
        }
    }

    hidePaymentBanner() {
        const banner = document.querySelector('.payment-status-banner');
        if (banner) {
            banner.style.display = 'none';
        }
    }

    checkPaymentStatus() {
        const overdueTerms = Object.values(this.terms).filter(term => term.status === 'overdue');
        
        if (overdueTerms.length > 0) {
            this.applyAccessRestrictions();
        } else {
            this.removeAccessRestrictions();
        }
    }

    applyAccessRestrictions() {
        // This would integrate with the main application to restrict access
        console.log('Applying access restrictions due to overdue payments');
        
        // Update restriction notice
        const overdueTerms = Object.values(this.terms).filter(term => term.status === 'overdue');
        const termBadges = document.querySelectorAll('.term-badge');
        
        termBadges.forEach((badge, index) => {
            if (overdueTerms[index]) {
                badge.textContent = overdueTerms[index].name.toUpperCase();
            }
        });
    }

    removeAccessRestrictions() {
        console.log('Removing access restrictions - all payments up to date');
    }

    initiatePayment(termId) {
        const term = this.terms[termId];
        if (!term) return;

        const paymentData = {
            termId: term.id,
            termName: term.name,
            amount: term.amount,
            studentId: this.currentStudent.id,
            studentName: this.currentStudent.name,
            grade: this.currentStudent.grade,
            parentName: this.currentStudent.parentName,
            email: this.currentStudent.email,
            phone: this.currentStudent.phone,
            dueDate: term.dueDate || term.paidDate
        };

        // Store payment data
        sessionStorage.setItem('paymentData', JSON.stringify(paymentData));
        
        // Redirect to payment form
        window.location.href = 'payment_form.html';
    }

    showPaymentDetails() {
        const modal = document.createElement('div');
        modal.className = 'payment-details-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Payment Details</h3>
                    <span class="close" onclick="this.parentElement.parentElement.parentElement.remove()">&times;</span>
                </div>
                <div class="modal-body">
                    <div class="payment-summary">
                        <h4>Outstanding Fees - Grade ${this.currentStudent.grade}</h4>
                        <div class="fee-item">
                            <span>Term 3 (Overdue)</span>
                            <span>R ${this.terms.term3.amount.toLocaleString()}</span>
                        </div>
                        <div class="fee-item">
                            <span>Term 4 (Pending)</span>
                            <span>R ${this.terms.term4.amount.toLocaleString()}</span>
                        </div>
                        <div class="fee-total">
                            <span>Total Outstanding</span>
                            <span>R ${(this.terms.term3.amount + this.terms.term4.amount).toLocaleString()}</span>
                        </div>
                    </div>
                    <div class="payment-options">
                        <button class="btn-primary" onclick="unifiedPaymentDashboard.makePayment('overdue')">
                            <i class="fas fa-credit-card"></i> Pay Now
                        </button>
                        <button class="btn-secondary" onclick="unifiedPaymentDashboard.setupPaymentPlan()">
                            <i class="fas fa-calendar-alt"></i> Setup Payment Plan
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
    }

    showSubscriptionModal() {
        const modal = document.createElement('div');
        modal.className = 'subscription-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Setup Auto-Payment</h3>
                    <span class="close" onclick="this.parentElement.parentElement.parentElement.remove()">&times;</span>
                </div>
                <div class="modal-body">
                    <p>Choose your preferred auto-payment option:</p>
                    <div class="subscription-options-modal">
                        <div class="subscription-option" onclick="unifiedPaymentDashboard.selectSubscription('monthly')">
                            <h4>Monthly</h4>
                            <div class="price">R ${Math.ceil(this.terms.term3.amount / 3).toLocaleString()}/month</div>
                            <p>3 monthly payments</p>
                        </div>
                        <div class="subscription-option" onclick="unifiedPaymentDashboard.selectSubscription('termly')">
                            <h4>Termly</h4>
                            <div class="price">R ${this.terms.term3.amount.toLocaleString()}/term</div>
                            <p>Automatic term payments</p>
                        </div>
                        <div class="subscription-option" onclick="unifiedPaymentDashboard.selectSubscription('annual')">
                            <h4>Annual</h4>
                            <div class="price">R ${(this.terms.term3.amount * 4).toLocaleString()}/year</div>
                            <p>5% discount on total</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
    }

    selectSubscription(subscriptionType) {
        const subscriptionData = {
            subscriptionType: subscriptionType,
            amount: subscriptionType === 'annual' ? this.terms.term3.amount * 4 : this.terms.term3.amount,
            frequency: subscriptionType,
            studentId: this.currentStudent.id,
            studentName: this.currentStudent.name,
            parentName: this.currentStudent.parentName,
            email: this.currentStudent.email,
            phone: this.currentStudent.phone
        };

        // Store subscription data
        sessionStorage.setItem('subscriptionData', JSON.stringify(subscriptionData));
        
        // Remove modal
        document.querySelector('.subscription-modal').remove();
        
        // Redirect to subscription setup
        window.location.href = 'subscription_setup.html';
    }

    viewAllHistory() {
        // Redirect to full payment history page
        window.location.href = 'payment_history.html';
    }

    downloadStatement() {
        // Generate and download payment statement
        const statementData = {
            student: this.currentStudent,
            terms: this.terms,
            paymentHistory: this.paymentHistory,
            generatedDate: new Date().toISOString()
        };

        // Create downloadable statement
        const statement = this.generateStatement(statementData);
        this.downloadFile(statement, 'payment-statement.pdf');
    }

    generateStatement(data) {
        // Generate PDF statement content
        return `Payment Statement for ${data.student.name}
Grade: ${data.student.grade}
Student ID: ${data.student.id}
Generated: ${new Date(data.generatedDate).toLocaleDateString()}

Payment Summary:
Total Paid: R ${this.paymentData.totalPaid.toLocaleString()}
Outstanding: R ${this.paymentData.outstanding.toLocaleString()}
Terms Paid: ${this.paymentData.termsPaid}/${this.paymentData.totalTerms}

Payment History:
${data.paymentHistory.map(payment => 
    `${payment.description}: R ${payment.amount.toLocaleString()} (${payment.date})`
).join('\n')}`;
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

    setupPaymentPlan() {
        // Redirect to payment plan setup
        window.location.href = 'payment_plan.html';
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-ZA', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    makePayment(termId) {
        this.initiatePayment(termId);
    }
}

// Global functions for onclick handlers
function makePayment(termId) {
    if (window.unifiedPaymentDashboard) {
        window.unifiedPaymentDashboard.makePayment(termId);
    }
}

function viewPaymentDetails() {
    if (window.unifiedPaymentDashboard) {
        window.unifiedPaymentDashboard.showPaymentDetails();
    }
}

function setupSubscription() {
    if (window.unifiedPaymentDashboard) {
        window.unifiedPaymentDashboard.showSubscriptionModal();
    }
}

function viewAllHistory() {
    if (window.unifiedPaymentDashboard) {
        window.unifiedPaymentDashboard.viewAllHistory();
    }
}

function downloadStatement() {
    if (window.unifiedPaymentDashboard) {
        window.unifiedPaymentDashboard.downloadStatement();
    }
}

// Initialize the unified payment dashboard
document.addEventListener('DOMContentLoaded', () => {
    window.unifiedPaymentDashboard = new UnifiedPaymentDashboard();
});


