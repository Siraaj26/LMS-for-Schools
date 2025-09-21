// Access Restrictions System for Payment-Gated Access
class AccessRestrictions {
    constructor() {
        this.studentId = 'ST2024001';
        this.paymentStatus = {
            term1: 'paid',
            term2: 'paid', 
            term3: 'overdue',
            term4: 'pending'
        };
        this.restrictedFeatures = [
            'assignments',
            'exams',
            'reports',
            'extracurricular',
            'library',
            'resources'
        ];
        this.init();
    }

    init() {
        this.checkPaymentStatus();
        this.setupRestrictionUI();
        this.applyRestrictions();
    }

    checkPaymentStatus() {
        const overdueTerms = Object.entries(this.paymentStatus)
            .filter(([term, status]) => status === 'overdue')
            .map(([term]) => term);

        if (overdueTerms.length > 0) {
            this.hasOverduePayments = true;
            this.overdueTerms = overdueTerms;
            this.showPaymentBanner();
        } else {
            this.hasOverduePayments = false;
            this.hidePaymentBanner();
        }
    }

    setupRestrictionUI() {
        // Create payment status banner
        this.createPaymentBanner();
        
        // Add restriction overlays to restricted elements
        this.addRestrictionOverlays();
        
        // Update navigation based on payment status
        this.updateNavigation();
    }

    createPaymentBanner() {
        const banner = document.createElement('div');
        banner.id = 'payment-status-banner';
        banner.className = 'payment-banner';
        banner.innerHTML = `
            <div class="banner-content">
                <div class="banner-icon">
                    <i class="fas fa-exclamation-triangle"></i>
                </div>
                <div class="banner-text">
                    <h3>Payment Required</h3>
                    <p>You have overdue school fees. Some features are restricted until payment is made.</p>
                    <div class="overdue-terms">
                        ${this.overdueTerms ? this.overdueTerms.map(term => 
                            `<span class="term-badge">${term.toUpperCase()}</span>`
                        ).join('') : ''}
                    </div>
                </div>
                <div class="banner-actions">
                    <button class="btn-pay-now" onclick="accessRestrictions.makePayment()">
                        <i class="fas fa-credit-card"></i> Pay Now
                    </button>
                    <button class="btn-view-details" onclick="accessRestrictions.viewPaymentDetails()">
                        <i class="fas fa-info-circle"></i> View Details
                    </button>
                </div>
            </div>
        `;
        
        // Insert banner at the top of the main content
        const main = document.querySelector('main.dashboard');
        if (main) {
            main.insertBefore(banner, main.firstChild);
        }
    }

    addRestrictionOverlays() {
        // Add restriction overlays to assignment cards
        const assignmentCards = document.querySelectorAll('.card');
        assignmentCards.forEach(card => {
            if (this.isRestrictedCard(card)) {
                this.addRestrictionOverlay(card);
            }
        });

        // Add restriction to todo list
        const todoList = document.querySelector('.todo-list');
        if (todoList && this.hasOverduePayments) {
            this.addRestrictionOverlay(todoList);
        }
    }

    isRestrictedCard(card) {
        const cardText = card.textContent.toLowerCase();
        return cardText.includes('assignment') || 
               cardText.includes('exam') || 
               cardText.includes('report') ||
               cardText.includes('extracurricular');
    }

    addRestrictionOverlay(element) {
        if (element.querySelector('.restriction-overlay')) return;

        const overlay = document.createElement('div');
        overlay.className = 'restriction-overlay';
        overlay.innerHTML = `
            <div class="overlay-content">
                <div class="overlay-icon">
                    <i class="fas fa-lock"></i>
                </div>
                <div class="overlay-text">
                    <h4>Access Restricted</h4>
                    <p>Payment required to access this feature</p>
                </div>
                <button class="btn-unlock" onclick="accessRestrictions.makePayment()">
                    <i class="fas fa-credit-card"></i> Pay to Unlock
                </button>
            </div>
        `;

        element.style.position = 'relative';
        element.appendChild(overlay);
    }

    applyRestrictions() {
        if (!this.hasOverduePayments) return;

        // Disable assignment submissions
        this.disableAssignments();
        
        // Disable exam access
        this.disableExams();
        
        // Disable report access
        this.disableReports();
        
        // Disable extracurricular activities
        this.disableExtracurricular();
        
        // Disable library resources
        this.disableLibrary();
    }

    disableAssignments() {
        const assignmentElements = document.querySelectorAll('[data-feature="assignments"]');
        assignmentElements.forEach(element => {
            element.style.opacity = '0.5';
            element.style.pointerEvents = 'none';
            this.addRestrictionOverlay(element);
        });
    }

    disableExams() {
        const examElements = document.querySelectorAll('[data-feature="exams"]');
        examElements.forEach(element => {
            element.style.opacity = '0.5';
            element.style.pointerEvents = 'none';
            this.addRestrictionOverlay(element);
        });
    }

    disableReports() {
        const reportElements = document.querySelectorAll('[data-feature="reports"]');
        reportElements.forEach(element => {
            element.style.opacity = '0.5';
            element.style.pointerEvents = 'none';
            this.addRestrictionOverlay(element);
        });
    }

    disableExtracurricular() {
        const extracurricularElements = document.querySelectorAll('[data-feature="extracurricular"]');
        extracurricularElements.forEach(element => {
            element.style.opacity = '0.5';
            element.style.pointerEvents = 'none';
            this.addRestrictionOverlay(element);
        });
    }

    disableLibrary() {
        const libraryElements = document.querySelectorAll('[data-feature="library"]');
        libraryElements.forEach(element => {
            element.style.opacity = '0.5';
            element.style.pointerEvents = 'none';
            this.addRestrictionOverlay(element);
        });
    }

    updateNavigation() {
        // Update navigation to show payment status
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            const feature = item.getAttribute('data-feature');
            if (this.restrictedFeatures.includes(feature) && this.hasOverduePayments) {
                item.classList.add('restricted');
                item.innerHTML += '<i class="fas fa-lock restriction-icon"></i>';
            }
        });
    }

    showPaymentBanner() {
        const banner = document.getElementById('payment-status-banner');
        if (banner) {
            banner.style.display = 'block';
        }
    }

    hidePaymentBanner() {
        const banner = document.getElementById('payment-status-banner');
        if (banner) {
            banner.style.display = 'none';
        }
    }

    makePayment() {
        // Redirect to unified payment dashboard
        window.location.href = '../payments/html/unified_payment_dashboard.html';
    }

    viewPaymentDetails() {
        // Show payment details modal
        this.showPaymentModal();
    }

    showPaymentModal() {
        const modal = document.createElement('div');
        modal.className = 'payment-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Payment Details</h3>
                    <span class="close" onclick="this.parentElement.parentElement.parentElement.remove()">&times;</span>
                </div>
                <div class="modal-body">
                    <div class="payment-summary">
                        <h4>Outstanding Fees</h4>
                        <div class="fee-item">
                            <span>Term 3 (Overdue)</span>
                            <span>R 6,000</span>
                        </div>
                        <div class="fee-item">
                            <span>Term 4 (Pending)</span>
                            <span>R 6,000</span>
                        </div>
                        <div class="fee-total">
                            <span>Total Outstanding</span>
                            <span>R 12,000</span>
                        </div>
                    </div>
                    <div class="payment-options">
                        <button class="btn-primary" onclick="accessRestrictions.makePayment()">
                            <i class="fas fa-credit-card"></i> Pay Now
                        </button>
                        <button class="btn-secondary" onclick="accessRestrictions.setupSubscription()">
                            <i class="fas fa-sync-alt"></i> Setup Subscription
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
    }

    setupSubscription() {
        // Redirect to subscription setup
        window.location.href = '../payments/html/subscription_setup.html';
    }

    // Method to check if a feature is accessible
    isFeatureAccessible(feature) {
        if (!this.hasOverduePayments) return true;
        return !this.restrictedFeatures.includes(feature);
    }

    // Method to get payment status
    getPaymentStatus() {
        return {
            hasOverdue: this.hasOverduePayments,
            overdueTerms: this.overdueTerms,
            restrictedFeatures: this.restrictedFeatures
        };
    }
}

// Initialize access restrictions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.accessRestrictions = new AccessRestrictions();
});

// Global functions for onclick handlers
function makePayment() {
    if (window.accessRestrictions) {
        window.accessRestrictions.makePayment();
    }
}

function viewPaymentDetails() {
    if (window.accessRestrictions) {
        window.accessRestrictions.viewPaymentDetails();
    }
}
