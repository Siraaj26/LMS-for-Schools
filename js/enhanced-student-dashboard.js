// Enhanced Student Dashboard JavaScript
// Integrates payment system with student dashboard

class EnhancedStudentDashboard {
    constructor() {
        this.paymentStatus = 'pending';
        this.skills = [];
        this.badges = [];
        this.assignments = [];
        
        this.init();
    }

    init() {
        this.loadStudentData();
        this.setupEventListeners();
        this.updateDashboard();
        this.checkPaymentStatus();
    }

    loadStudentData() {
        // Load student data from localStorage or API
        this.skills = [
            { name: 'Problem Solving', level: 85, status: 'Advanced' },
            { name: 'Communication', level: 70, status: 'Intermediate' },
            { name: 'Teamwork', level: 90, status: 'Advanced' },
            { name: 'Critical Thinking', level: 75, status: 'Intermediate' },
            { name: 'Leadership', level: 60, status: 'Developing' }
        ];

        this.badges = [
            { name: 'Problem Solver', icon: '🎯', earned: true, date: '2024-03-10' },
            { name: 'Communicator', icon: '💬', earned: true, date: '2024-03-05' },
            { name: 'Leader', icon: '🏆', earned: false, progress: 60 }
        ];

        this.assignments = [
            { id: 'A001', title: 'Math Assignment', subject: 'Mathematics', dueDate: '2024-03-20', status: 'pending' },
            { id: 'A002', title: 'Science Project', subject: 'Science', dueDate: '2024-03-22', status: 'in-progress' },
            { id: 'A003', title: 'English Essay', subject: 'English', dueDate: '2024-03-25', status: 'pending' }
        ];
    }

    setupEventListeners() {
        // Card click handlers
        document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('click', (e) => {
                const cardType = this.getCardType(card);
                this.handleCardClick(cardType);
            });
        });

        // Payment action handler
        const paymentActionBtn = document.getElementById('payment-action-btn');
        if (paymentActionBtn) {
            paymentActionBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.handlePaymentAction();
            });
        }
    }

    updateDashboard() {
        this.updateSkillsProgress();
        this.updateBadgeProgress();
        this.updatePaymentWidget();
        this.updateCardContent();
    }

    checkPaymentStatus() {
        // Check payment status from localStorage or API
        const paymentStatus = localStorage.getItem('paymentStatus') || 'pending';
        this.paymentStatus = paymentStatus;
        
        this.updatePaymentBanner();
        this.updatePaymentWidget();
    }

    updatePaymentBanner() {
        const banner = document.getElementById('payment-status-banner');
        const statusText = document.getElementById('payment-status-text');
        const actionBtn = document.getElementById('payment-action-btn');

        if (!banner) return;

        // Show banner if payment is pending or overdue
        if (this.paymentStatus === 'pending' || this.paymentStatus === 'overdue') {
            banner.style.display = 'block';
            banner.className = `payment-status-banner ${this.paymentStatus}`;

            if (statusText) {
                switch (this.paymentStatus) {
                    case 'pending':
                        statusText.textContent = 'Payment pending. Please complete your payment to continue.';
                        break;
                    case 'overdue':
                        statusText.textContent = 'Payment overdue. Access restricted until payment is made.';
                        break;
                }
            }

            if (actionBtn) {
                actionBtn.textContent = 'Make Payment';
                actionBtn.onclick = () => this.openPaymentForm();
            }
        } else {
            banner.style.display = 'none';
        }
    }

    updatePaymentWidget() {
        const paymentAmount = document.querySelector('.payment-amount');
        const paymentDue = document.querySelector('.payment-due');
        const paymentStatusBadge = document.querySelector('.payment-status-badge');
        const paymentBtn = document.querySelector('.payment-btn-small');

        if (paymentAmount) paymentAmount.textContent = 'R 156.00';
        if (paymentDue) paymentDue.textContent = 'Due: 31 March 2024';
        
        if (paymentStatusBadge) {
            paymentStatusBadge.textContent = this.paymentStatus.charAt(0).toUpperCase() + this.paymentStatus.slice(1);
            paymentStatusBadge.className = `payment-status-badge ${this.paymentStatus}`;
        }

        if (paymentBtn) {
            paymentBtn.onclick = () => this.openPaymentForm();
        }
    }

    updateSkillsProgress() {
        const skillItems = document.querySelectorAll('.skill-item');
        
        skillItems.forEach((item, index) => {
            if (this.skills[index]) {
                const skill = this.skills[index];
                const skillBar = item.querySelector('.skill-fill');
                const skillValue = item.querySelector('.skill-value');
                
                if (skillBar) skillBar.style.width = `${skill.level}%`;
                if (skillValue) skillValue.textContent = `${skill.level}%`;
            }
        });
    }

    updateBadgeProgress() {
        const badgeItems = document.querySelectorAll('.badge-item');
        
        badgeItems.forEach((item, index) => {
            if (this.badges[index]) {
                const badge = this.badges[index];
                const badgeIcon = item.querySelector('.badge-icon');
                const badgeName = item.querySelector('.badge-name');
                
                if (badgeIcon) badgeIcon.textContent = badge.icon;
                if (badgeName) badgeName.textContent = badge.name;
                
                // Update badge status
                if (badge.earned) {
                    item.classList.add('earned');
                    item.classList.remove('next');
                } else {
                    item.classList.add('next');
                    item.classList.remove('earned');
                }
            }
        });
    }

    updateCardContent() {
        // Update small cards
        const announcementCard = document.querySelector('.small-cards .card:first-child');
        if (announcementCard) {
            const content = announcementCard.querySelector('.card-content');
            if (content) {
                content.innerHTML = `
                    <h4>Announcements</h4>
                    <p>3 new messages</p>
                `;
            }
        }

        const assignmentCard = document.querySelector('.small-cards .card:last-child');
        if (assignmentCard) {
            const content = assignmentCard.querySelector('.card-content');
            if (content) {
                const pendingCount = this.assignments.filter(a => a.status === 'pending').length;
                content.innerHTML = `
                    <h4>Assignments Due</h4>
                    <p>${pendingCount} pending</p>
                `;
            }
        }

        // Update big cards with progress
        this.updateBigCard('academics', 'Average: 78%', 78);
        this.updateBigCard('soft-skills', '5 skills tracked', null, ['Problem Solving', 'Communication']);
        this.updateBigCard('extracurricular', '3 activities', null, null, ['Football', 'Debate']);
        this.updateBigCard('community', 'Service hours: 25', null, null, null, ['Volunteer', 'Mentor']);
    }

    updateBigCard(type, description, progress, skills, activities, community) {
        const card = document.querySelector(`.big-cards .card.big[onclick*="${type}"]`);
        if (!card) return;

        const content = card.querySelector('.card-content');
        if (!content) return;

        let html = `<h3>${this.getCardTitle(type)}</h3><p>${description}</p>`;
        
        if (progress !== null) {
            html += `<div class="progress-bar"><div class="progress-fill" style="width: ${progress}%"></div></div>`;
        }
        
        if (skills) {
            html += `<div class="skills-preview">${skills.map(skill => `<span class="skill-badge">${skill}</span>`).join('')}</div>`;
        }
        
        if (activities) {
            html += `<div class="activity-preview">${activities.map(activity => `<span class="activity-item">${activity}</span>`).join('')}</div>`;
        }
        
        if (community) {
            html += `<div class="community-preview">${community.map(item => `<span class="community-item">${item}</span>`).join('')}</div>`;
        }

        content.innerHTML = html;
    }

    getCardTitle(type) {
        const titles = {
            'academics': 'Academics',
            'soft-skills': 'Soft Skills',
            'extracurricular': 'Extracurricular',
            'community': 'Community'
        };
        return titles[type] || type;
    }

    getCardType(card) {
        if (card.classList.contains('big')) {
            const onclick = card.getAttribute('onclick');
            if (onclick.includes('viewAcademics')) return 'academics';
            if (onclick.includes('viewSoftSkills')) return 'soft-skills';
            if (onclick.includes('viewExtracurricular')) return 'extracurricular';
            if (onclick.includes('viewCommunity')) return 'community';
        } else {
            if (card.onclick && card.onclick.toString().includes('viewAnnouncements')) return 'announcements';
            if (card.onclick && card.onclick.toString().includes('viewAssignments')) return 'assignments';
        }
        return 'unknown';
    }

    handleCardClick(cardType) {
        switch (cardType) {
            case 'academics':
                this.viewAcademics();
                break;
            case 'soft-skills':
                this.viewSoftSkills();
                break;
            case 'extracurricular':
                this.viewExtracurricular();
                break;
            case 'community':
                this.viewCommunity();
                break;
            case 'announcements':
                this.viewAnnouncements();
                break;
            case 'assignments':
                this.viewAssignments();
                break;
        }
    }

    handlePaymentAction() {
        this.openPaymentForm();
    }

    openPaymentForm() {
        window.location.href = '../payments/html/payment_form.html';
    }

    // Navigation functions
    viewAcademics() {
        console.log('Viewing academics');
        alert('Academics - This would show detailed academic progress and grades');
    }

    viewSoftSkills() {
        console.log('Viewing soft skills');
        alert('Soft Skills - This would show detailed skills tracking and development');
    }

    viewExtracurricular() {
        console.log('Viewing extracurricular activities');
        alert('Extracurricular - This would show activities and achievements');
    }

    viewCommunity() {
        console.log('Viewing community involvement');
        alert('Community - This would show community service and volunteer work');
    }

    viewAnnouncements() {
        console.log('Viewing announcements');
        alert('Announcements - This would show school announcements and messages');
    }

    viewAssignments() {
        console.log('Viewing assignments');
        alert('Assignments - This would show current assignments and due dates');
    }
}

// Global functions for HTML onclick handlers
function handlePaymentAction() {
    if (window.enhancedStudentDashboard) {
        window.enhancedStudentDashboard.handlePaymentAction();
    }
}

function openPaymentForm() {
    if (window.enhancedStudentDashboard) {
        window.enhancedStudentDashboard.openPaymentForm();
    }
}

function viewAcademics() {
    if (window.enhancedStudentDashboard) {
        window.enhancedStudentDashboard.viewAcademics();
    }
}

function viewSoftSkills() {
    if (window.enhancedStudentDashboard) {
        window.enhancedStudentDashboard.viewSoftSkills();
    }
}

function viewExtracurricular() {
    if (window.enhancedStudentDashboard) {
        window.enhancedStudentDashboard.viewExtracurricular();
    }
}

function viewCommunity() {
    if (window.enhancedStudentDashboard) {
        window.enhancedStudentDashboard.viewCommunity();
    }
}

function viewAnnouncements() {
    if (window.enhancedStudentDashboard) {
        window.enhancedStudentDashboard.viewAnnouncements();
    }
}

function viewAssignments() {
    if (window.enhancedStudentDashboard) {
        window.enhancedStudentDashboard.viewAssignments();
    }
}

// Initialize enhanced student dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.enhancedStudentDashboard = new EnhancedStudentDashboard();
});

