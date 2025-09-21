// Term-Based Payment System JavaScript
class TermPaymentSystem {
    constructor() {
        this.currentStudent = {
            id: 'ST2024001',
            name: 'Thabo Mthembu',
            grade: 10,
            parentName: 'Mrs. Mthembu',
            email: 'parent@example.com',
            phone: '+27 82 123 4567'
        };

        this.terms = {
            term1: {
                id: 'term1',
                name: 'Term 1',
                period: 'January 15 - March 22, 2024',
                amount: 6000,
                dueDate: '2024-01-10',
                status: 'paid',
                breakdown: {
                    tuition: 4500,
                    stationery: 800,
                    sports: 500,
                    technology: 200
                }
            },
            term2: {
                id: 'term2',
                name: 'Term 2',
                period: 'April 8 - June 14, 2024',
                amount: 6000,
                dueDate: '2024-04-03',
                status: 'paid',
                breakdown: {
                    tuition: 4500,
                    stationery: 800,
                    sports: 500,
                    technology: 200
                }
            },
            term3: {
                id: 'term3',
                name: 'Term 3',
                period: 'July 8 - September 20, 2024',
                amount: 6000,
                dueDate: '2024-07-03',
                status: 'overdue',
                breakdown: {
                    tuition: 4500,
                    stationery: 800,
                    sports: 500,
                    technology: 200
                }
            },
            term4: {
                id: 'term4',
                name: 'Term 4',
                period: 'October 7 - December 6, 2024',
                amount: 6000,
                dueDate: '2024-10-02',
                status: 'pending',
                breakdown: {
                    tuition: 4500,
                    stationery: 800,
                    sports: 500,
                    technology: 200
                }
            }
        };

        this.subscriptionOptions = {
            monthly: {
                name: 'Monthly Subscription',
                amount: 2000,
                frequency: 'monthly',
                discount: 0,
                description: 'Automatic monthly payments'
            },
            termly: {
                name: 'Termly Subscription',
                amount: 6000,
                frequency: 'termly',
                discount: 0.05,
                description: 'Automatic term payments with 5% discount'
            },
            annual: {
                name: 'Annual Subscription',
                amount: 22800,
                frequency: 'annual',
                discount: 0.05,
                description: 'One annual payment with 5% discount'
            }
        };

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateAccessStatus();
        this.checkPaymentRestrictions();
    }

    setupEventListeners() {
        // Payment buttons
        document.querySelectorAll('[onclick*="makePayment"]').forEach(button => {
            button.addEventListener('click', (e) => {
                const termId = e.target.getAttribute('onclick').match(/'([^']+)'/)[1];
                this.initiatePayment(termId);
            });
        });

        // Subscription buttons
        document.querySelectorAll('[onclick*="setupSubscription"]').forEach(button => {
            button.addEventListener('click', (e) => {
                const termId = e.target.getAttribute('onclick').match(/'([^']+)'/)[1];
                this.showSubscriptionModal(termId);
            });
        });

        // Receipt buttons
        document.querySelectorAll('[onclick*="viewReceipt"]').forEach(button => {
            button.addEventListener('click', (e) => {
                const termId = e.target.getAttribute('onclick').match(/'([^']+)'/)[1];
                this.viewReceipt(termId);
            });
        });
    }

    updateAccessStatus() {
        const overdueTerms = Object.values(this.terms).filter(term => term.status === 'overdue');
        const hasOverdue = overdueTerms.length > 0;

        if (hasOverdue) {
            this.applyAccessRestrictions();
        } else {
            this.removeAccessRestrictions();
        }
    }

    applyAccessRestrictions() {
        // This would integrate with the main application to restrict access
        console.log('Applying access restrictions due to overdue payments');
        
        // Show restriction notice
        const restrictionNotice = document.querySelector('.restriction-notice');
        if (restrictionNotice) {
            restrictionNotice.style.display = 'block';
        }

        // Update status
        const statusElement = document.querySelector('.status-overdue');
        if (statusElement) {
            statusElement.textContent = 'Limited Access - Term 3 Overdue';
        }
    }

    removeAccessRestrictions() {
        console.log('Removing access restrictions - all payments up to date');
        
        const restrictionNotice = document.querySelector('.restriction-notice');
        if (restrictionNotice) {
            restrictionNotice.style.display = 'none';
        }
    }

    checkPaymentRestrictions() {
        const overdueTerms = Object.values(this.terms).filter(term => term.status === 'overdue');
        
        if (overdueTerms.length > 0) {
            this.showRestrictionAlert();
        }
    }

    showRestrictionAlert() {
        const alertMessage = `
            🚫 ACCESS RESTRICTED 🚫
            
            You have overdue school fees for ${overdueTerms.map(t => t.name).join(', ')}.
            
            Limited access to:
            • Assignment submissions
            • Exam access
            • Report cards
            • Extracurricular activities
            • Library resources
            
            Please make payment to restore full access.
        `;
        
        // This would show a modal or redirect to payment page
        console.log(alertMessage);
    }

    initiatePayment(termId) {
        const term = this.terms[termId];
        if (!term) return;

        // Redirect to payment form with term details
        const paymentData = {
            termId: term.id,
            termName: term.name,
            amount: term.amount,
            studentId: this.currentStudent.id,
            studentName: this.currentStudent.name,
            parentName: this.currentStudent.parentName,
            email: this.currentStudent.email,
            phone: this.currentStudent.phone
        };

        // Store payment data in session storage
        sessionStorage.setItem('paymentData', JSON.stringify(paymentData));
        
        // Redirect to payment form
        window.location.href = 'payment_form.html';
    }

    showSubscriptionModal(termId) {
        const term = this.terms[termId];
        if (!term) return;

        const modal = document.createElement('div');
        modal.className = 'subscription-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Setup Subscription for ${term.name}</h3>
                    <span class="close" onclick="this.parentElement.parentElement.parentElement.remove()">&times;</span>
                </div>
                <div class="modal-body">
                    <p>Choose your preferred subscription option:</p>
                    <div class="subscription-options-modal">
                        <div class="subscription-option" onclick="termPaymentSystem.selectSubscription('monthly', '${termId}')">
                            <h4>Monthly</h4>
                            <div class="price">R 2,000/month</div>
                            <p>Automatic monthly payments</p>
                        </div>
                        <div class="subscription-option" onclick="termPaymentSystem.selectSubscription('termly', '${termId}')">
                            <h4>Termly</h4>
                            <div class="price">R 6,000/term</div>
                            <p>5% discount on total</p>
                        </div>
                        <div class="subscription-option" onclick="termPaymentSystem.selectSubscription('annual', '${termId}')">
                            <h4>Annual</h4>
                            <div class="price">R 22,800/year</div>
                            <p>5% total discount</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
    }

    selectSubscription(subscriptionType, termId) {
        const subscription = this.subscriptionOptions[subscriptionType];
        const term = this.terms[termId];

        const subscriptionData = {
            subscriptionType: subscriptionType,
            termId: termId,
            amount: subscription.amount,
            frequency: subscription.frequency,
            discount: subscription.discount,
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

    viewReceipt(termId) {
        const term = this.terms[termId];
        if (!term) return;

        const receiptData = {
            termId: term.id,
            termName: term.name,
            period: term.period,
            amount: term.amount,
            breakdown: term.breakdown,
            studentId: this.currentStudent.id,
            studentName: this.currentStudent.name,
            parentName: this.currentStudent.parentName,
            paymentDate: '2024-01-15', // This would come from database
            paymentMethod: 'Credit Card',
            transactionId: 'TXN' + Math.random().toString(36).substr(2, 9).toUpperCase()
        };

        // Store receipt data
        sessionStorage.setItem('receiptData', JSON.stringify(receiptData));
        
        // Redirect to receipt page
        window.location.href = 'payment_receipt.html';
    }

    // Global functions for onclick handlers
    makePayment(termId) {
        if (window.termPaymentSystem) {
            window.termPaymentSystem.initiatePayment(termId);
        }
    }

    setupSubscription(termId) {
        if (window.termPaymentSystem) {
            window.termPaymentSystem.showSubscriptionModal(termId);
        }
    }

    viewReceipt(termId) {
        if (window.termPaymentSystem) {
            window.termPaymentSystem.viewReceipt(termId);
        }
    }

    setupMonthlySubscription() {
        if (window.termPaymentSystem) {
            window.termPaymentSystem.selectSubscription('monthly', 'term3');
        }
    }

    setupTermlySubscription() {
        if (window.termPaymentSystem) {
            window.termPaymentSystem.selectSubscription('termly', 'term3');
        }
    }

    setupAnnualSubscription() {
        if (window.termPaymentSystem) {
            window.termPaymentSystem.selectSubscription('annual', 'term3');
        }
    }
}

// Initialize the term payment system
document.addEventListener('DOMContentLoaded', () => {
    window.termPaymentSystem = new TermPaymentSystem();
});

// Global functions for onclick handlers
function makePayment(termId) {
    if (window.termPaymentSystem) {
        window.termPaymentSystem.initiatePayment(termId);
    }
}

function setupSubscription(termId) {
    if (window.termPaymentSystem) {
        window.termPaymentSystem.showSubscriptionModal(termId);
    }
}

function viewReceipt(termId) {
    if (window.termPaymentSystem) {
        window.termPaymentSystem.viewReceipt(termId);
    }
}

function setupMonthlySubscription() {
    if (window.termPaymentSystem) {
        window.termPaymentSystem.selectSubscription('monthly', 'term3');
    }
}

function setupTermlySubscription() {
    if (window.termPaymentSystem) {
        window.termPaymentSystem.selectSubscription('termly', 'term3');
    }
}

function setupAnnualSubscription() {
    if (window.termPaymentSystem) {
        window.termPaymentSystem.selectSubscription('annual', 'term3');
    }
}
