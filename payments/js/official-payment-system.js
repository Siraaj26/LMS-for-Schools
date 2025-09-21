// Official Payment System with Grade-Specific Fees
class OfficialPaymentSystem {
    constructor() {
        this.currentGrade = 10;
        this.currentStudent = {
            id: 'ST2024001',
            name: 'Thabo Mthembu',
            grade: 10,
            parentName: 'Mrs. Mthembu',
            email: 'parent@example.com',
            phone: '+27 82 123 4567'
        };

        // Grade-specific fee structures
        this.gradeFees = {
            8: {
                name: 'Grade 8',
                annualTotal: 5500,
                termAmount: 1375,
                breakdown: {
                    tuition: 3500,
                    stationery: 600,
                    technology: 150,
                    sports: 400,
                    library: 100,
                    labMaterials: 200,
                    registration: 200,
                    insurance: 150,
                    development: 100
                }
            },
            9: {
                name: 'Grade 9',
                annualTotal: 6000,
                termAmount: 1500,
                breakdown: {
                    tuition: 3800,
                    stationery: 650,
                    technology: 175,
                    sports: 450,
                    library: 125,
                    labMaterials: 250,
                    registration: 225,
                    insurance: 175,
                    development: 100
                }
            },
            10: {
                name: 'Grade 10',
                annualTotal: 7000,
                termAmount: 1750,
                breakdown: {
                    tuition: 4500,
                    stationery: 800,
                    technology: 200,
                    sports: 500,
                    library: 150,
                    labMaterials: 300,
                    registration: 250,
                    insurance: 200,
                    development: 100
                }
            },
            11: {
                name: 'Grade 11',
                annualTotal: 8000,
                termAmount: 2000,
                breakdown: {
                    tuition: 5200,
                    stationery: 900,
                    technology: 225,
                    sports: 550,
                    library: 175,
                    labMaterials: 350,
                    registration: 275,
                    insurance: 225,
                    development: 100
                }
            },
            12: {
                name: 'Grade 12',
                annualTotal: 9000,
                termAmount: 2250,
                breakdown: {
                    tuition: 5900,
                    stationery: 1000,
                    technology: 250,
                    sports: 600,
                    library: 200,
                    labMaterials: 400,
                    registration: 300,
                    insurance: 250,
                    development: 100
                }
            }
        };

        this.terms = {
            term1: {
                id: 'term1',
                name: 'Term 1',
                period: 'January 15 - March 22, 2025',
                dueDate: '2025-01-10',
                status: 'paid'
            },
            term2: {
                id: 'term2',
                name: 'Term 2',
                period: 'April 8 - June 14, 2025',
                dueDate: '2025-04-03',
                status: 'paid'
            },
            term3: {
                id: 'term3',
                name: 'Term 3',
                period: 'July 8 - September 20, 2025',
                dueDate: '2025-07-03',
                status: 'overdue'
            },
            term4: {
                id: 'term4',
                name: 'Term 4',
                period: 'October 7 - December 6, 2025',
                dueDate: '2025-10-02',
                status: 'pending'
            }
        };

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateFeeStructure();
        this.updateStudentInfo();
        this.checkAccessRestrictions();
    }

    setupEventListeners() {
        // Grade selection buttons
        document.querySelectorAll('.grade-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const grade = parseInt(e.target.getAttribute('data-grade'));
                this.selectGrade(grade);
            });
        });

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

    selectGrade(grade) {
        this.currentGrade = grade;
        this.currentStudent.grade = grade;
        
        // Update active button
        document.querySelectorAll('.grade-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-grade="${grade}"]`).classList.add('active');
        
        // Update fee structure
        this.updateFeeStructure();
        this.updateStudentInfo();
        this.updateTermsGrid();
    }

    updateFeeStructure() {
        const gradeData = this.gradeFees[this.currentGrade];
        if (!gradeData) return;

        // Update fee breakdown
        const feeItems = document.querySelectorAll('.fee-item');
        const breakdown = gradeData.breakdown;
        
        // Academic Fees
        const academicFees = feeItems[0].parentElement;
        academicFees.querySelector('.fee-item:nth-child(2) .fee-amount').textContent = `R ${breakdown.tuition.toLocaleString()}`;
        academicFees.querySelector('.fee-item:nth-child(3) .fee-amount').textContent = `R ${breakdown.stationery.toLocaleString()}`;
        academicFees.querySelector('.fee-item:nth-child(4) .fee-amount').textContent = `R ${breakdown.technology.toLocaleString()}`;

        // Activity Fees
        const activityFees = feeItems[4].parentElement;
        activityFees.querySelector('.fee-item:nth-child(2) .fee-amount').textContent = `R ${breakdown.sports.toLocaleString()}`;
        activityFees.querySelector('.fee-item:nth-child(3) .fee-amount').textContent = `R ${breakdown.library.toLocaleString()}`;
        activityFees.querySelector('.fee-item:nth-child(4) .fee-amount').textContent = `R ${breakdown.labMaterials.toLocaleString()}`;

        // Administrative Fees
        const adminFees = feeItems[7].parentElement;
        adminFees.querySelector('.fee-item:nth-child(2) .fee-amount').textContent = `R ${breakdown.registration.toLocaleString()}`;
        adminFees.querySelector('.fee-item:nth-child(3) .fee-amount').textContent = `R ${breakdown.insurance.toLocaleString()}`;
        adminFees.querySelector('.fee-item:nth-child(4) .fee-amount').textContent = `R ${breakdown.development.toLocaleString()}`;

        // Update total amounts
        document.querySelector('.total-amount').textContent = `R ${gradeData.annualTotal.toLocaleString()}`;
        document.querySelector('.total-fees p:last-child').textContent = `Per Term: R ${gradeData.termAmount.toLocaleString()}`;
    }

    updateStudentInfo() {
        const studentDetails = document.querySelector('.student-details');
        if (studentDetails) {
            studentDetails.querySelector('h4').textContent = this.currentStudent.name;
            studentDetails.querySelector('p').textContent = `Grade ${this.currentStudent.grade} • Student ID: ${this.currentStudent.id}`;
        }

        const studentAvatar = document.querySelector('.student-avatar');
        if (studentAvatar) {
            const initials = this.currentStudent.name.split(' ').map(n => n[0]).join('');
            studentAvatar.textContent = initials;
        }
    }

    updateTermsGrid() {
        const gradeData = this.gradeFees[this.currentGrade];
        const termAmounts = document.querySelectorAll('.term-amount .amount');
        
        termAmounts.forEach(amount => {
            amount.textContent = `R ${gradeData.termAmount.toLocaleString()}`;
        });
    }

    checkAccessRestrictions() {
        const overdueTerms = Object.values(this.terms).filter(term => term.status === 'overdue');
        const hasOverdue = overdueTerms.length > 0;

        if (hasOverdue) {
            this.showAccessRestrictions();
        } else {
            this.hideAccessRestrictions();
        }
    }

    showAccessRestrictions() {
        const restrictionsDiv = document.querySelector('.access-restrictions');
        if (restrictionsDiv) {
            restrictionsDiv.style.display = 'block';
        }
    }

    hideAccessRestrictions() {
        const restrictionsDiv = document.querySelector('.access-restrictions');
        if (restrictionsDiv) {
            restrictionsDiv.style.display = 'none';
        }
    }

    initiatePayment(termId) {
        const term = this.terms[termId];
        const gradeData = this.gradeFees[this.currentGrade];
        
        if (!term || !gradeData) return;

        const paymentData = {
            termId: term.id,
            termName: term.name,
            amount: gradeData.termAmount,
            studentId: this.currentStudent.id,
            studentName: this.currentStudent.name,
            grade: this.currentStudent.grade,
            parentName: this.currentStudent.parentName,
            email: this.currentStudent.email,
            phone: this.currentStudent.phone,
            dueDate: term.dueDate
        };

        // Store payment data
        sessionStorage.setItem('paymentData', JSON.stringify(paymentData));
        
        // Redirect to payment form
        window.location.href = 'payment_form.html';
    }

    showSubscriptionModal(termId) {
        const term = this.terms[termId];
        const gradeData = this.gradeFees[this.currentGrade];
        
        if (!term || !gradeData) return;

        const modal = document.createElement('div');
        modal.className = 'subscription-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Setup Auto-Payment for ${term.name}</h3>
                    <span class="close" onclick="this.parentElement.parentElement.parentElement.remove()">&times;</span>
                </div>
                <div class="modal-body">
                    <p>Choose your preferred auto-payment option:</p>
                    <div class="subscription-options-modal">
                        <div class="subscription-option" onclick="officialPaymentSystem.selectSubscription('monthly', '${termId}')">
                            <h4>Monthly</h4>
                            <div class="price">R ${Math.ceil(gradeData.termAmount / 3).toLocaleString()}/month</div>
                            <p>3 monthly payments</p>
                        </div>
                        <div class="subscription-option" onclick="officialPaymentSystem.selectSubscription('termly', '${termId}')">
                            <h4>Termly</h4>
                            <div class="price">R ${gradeData.termAmount.toLocaleString()}/term</div>
                            <p>Automatic term payments</p>
                        </div>
                        <div class="subscription-option" onclick="officialPaymentSystem.selectSubscription('annual', '${termId}')">
                            <h4>Annual</h4>
                            <div class="price">R ${gradeData.annualTotal.toLocaleString()}/year</div>
                            <p>5% discount on total</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
    }

    selectSubscription(subscriptionType, termId) {
        const term = this.terms[termId];
        const gradeData = this.gradeFees[this.currentGrade];
        
        const subscriptionData = {
            subscriptionType: subscriptionType,
            termId: termId,
            grade: this.currentGrade,
            amount: subscriptionType === 'annual' ? gradeData.annualTotal : gradeData.termAmount,
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

    viewReceipt(termId) {
        const term = this.terms[termId];
        const gradeData = this.gradeFees[this.currentGrade];
        
        const receiptData = {
            termId: term.id,
            termName: term.name,
            period: term.period,
            amount: gradeData.termAmount,
            breakdown: gradeData.breakdown,
            studentId: this.currentStudent.id,
            studentName: this.currentStudent.name,
            grade: this.currentStudent.grade,
            parentName: this.currentStudent.parentName,
            paymentDate: '2025-01-15',
            paymentMethod: 'Credit Card',
            transactionId: 'TXN' + Math.random().toString(36).substr(2, 9).toUpperCase()
        };

        // Store receipt data
        sessionStorage.setItem('receiptData', JSON.stringify(receiptData));
        
        // Redirect to receipt page
        window.location.href = 'payment_receipt.html';
    }

    viewPaymentDetails() {
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
                        <h4>Outstanding Fees - Grade ${this.currentGrade}</h4>
                        <div class="fee-item">
                            <span>Term 3 (Overdue)</span>
                            <span>R ${this.gradeFees[this.currentGrade].termAmount.toLocaleString()}</span>
                        </div>
                        <div class="fee-item">
                            <span>Term 4 (Pending)</span>
                            <span>R ${this.gradeFees[this.currentGrade].termAmount.toLocaleString()}</span>
                        </div>
                        <div class="fee-total">
                            <span>Total Outstanding</span>
                            <span>R ${(this.gradeFees[this.currentGrade].termAmount * 2).toLocaleString()}</span>
                        </div>
                    </div>
                    <div class="payment-options">
                        <button class="btn-primary" onclick="officialPaymentSystem.makePayment('overdue')">
                            <i class="fas fa-credit-card"></i> Pay Now
                        </button>
                        <button class="btn-secondary" onclick="officialPaymentSystem.setupPaymentPlan()">
                            <i class="fas fa-calendar-alt"></i> Setup Payment Plan
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
    }

    setupPaymentPlan() {
        // Redirect to payment plan setup
        window.location.href = 'payment_plan.html';
    }
}

// Global functions for onclick handlers
function selectGrade(grade) {
    if (window.officialPaymentSystem) {
        window.officialPaymentSystem.selectGrade(grade);
    }
}

function makePayment(termId) {
    if (window.officialPaymentSystem) {
        window.officialPaymentSystem.initiatePayment(termId);
    }
}

function setupSubscription(termId) {
    if (window.officialPaymentSystem) {
        window.officialPaymentSystem.showSubscriptionModal(termId);
    }
}

function viewReceipt(termId) {
    if (window.officialPaymentSystem) {
        window.officialPaymentSystem.viewReceipt(termId);
    }
}

function viewPaymentDetails() {
    if (window.officialPaymentSystem) {
        window.officialPaymentSystem.viewPaymentDetails();
    }
}

// Initialize the official payment system
document.addEventListener('DOMContentLoaded', () => {
    window.officialPaymentSystem = new OfficialPaymentSystem();
});
