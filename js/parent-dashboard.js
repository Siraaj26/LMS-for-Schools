// Parent Dashboard JavaScript
// Handles parent dashboard functionality

class ParentDashboard {
    constructor() {
        this.childId = 'ST2024001';
        this.childName = 'Thabo Mthembu';
        this.paymentStatus = 'pending';
        this.childData = {};
        
        this.init();
    }

    init() {
        this.getCurrentUser();
        this.loadChildData();
        this.setupEventListeners();
        this.updateDashboard();
    }

    getCurrentUser() {
        // Get current parent user from URL or localStorage
        const urlParams = new URLSearchParams(window.location.search);
        const userEmail = urlParams.get('user') || localStorage.getItem('currentUserEmail');
        
        if (userEmail && window.authDB) {
            this.currentUser = window.authDB.getUserByEmail(userEmail);
            console.log('Parent user:', this.currentUser);
        }
    }

    loadChildData() {
        const student = window.authDB.getStudentByParentEmail(this.currentUser.email);
        if (student) {
            this.childData = {
                id: student.id,
                name: student.full_name,
                grade: student.current_grade || 10,
                school: 'Johannesburg High School',
                attendance: student.attendance || 95,
                academicProgress: (student.academic_grades || []).map(grade => ({
                    subject: grade.subject,
                    grade: grade.grade,
                    trend: grade.trend || '+0%',
                    teacher: grade.teacher || 'Teacher'
                })),
                skills: (student.skills || []).map(skill => ({
                    name: skill.name,
                    level: skill.level,
                    status: skill.status
                })),
                payment_amount: student.payment_amount || 156.00,
                payment_status: student.payment_status || 'pending',
                recentActivities: student.activities || [],
                upcomingEvents: [
                    { date: '15', month: 'Mar', title: 'Parent-Teacher Meeting', time: '2:00 PM - 3:00 PM' },
                    { date: '20', month: 'Mar', title: 'Science Fair', time: '9:00 AM - 2:00 PM' },
                    { date: '25', month: 'Mar', title: 'Sports Day', time: '8:00 AM - 4:00 PM' }
                ]
            };
        }
    }

    setupEventListeners() {
        // Action button clicks
        document.querySelectorAll('.action-btn-small').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = btn.querySelector('.btn-text').textContent.toLowerCase();
                this.handleAction(action);
            });
        });
    }

    updateDashboard() {
        this.updateChildSummary();
        this.updateAcademicProgress();
        this.updateSkillsDevelopment();
        this.updateRecentActivities();
        this.updateUpcomingEvents();
        this.updatePaymentStatus();
    }

    switchChild(childId) {
        this.currentChild = childId;
        
        // Update tab states
        document.querySelectorAll('.child-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.getElementById(`${childId}-tab`).classList.add('active');
        
        // Update dashboard with new child data
        this.updateDashboard();
    }

    updateChildSummary() {
        const currentChildData = this.childData[this.currentChild];
        const childName = document.querySelector('.child-details h3');
        const childInfo = document.querySelector('.child-details p');
        const attendance = document.querySelector('.attendance');
        const childAvatar = document.querySelector('.child-avatar img');
        const childAvatarContainer = document.querySelector('.child-avatar');

        if (childName) childName.textContent = currentChildData.name;
        if (childInfo) childInfo.textContent = `Grade ${currentChildData.grade} • Student ID: ${currentChildData.id}`;
        if (attendance) attendance.textContent = `Attendance: ${currentChildData.attendance}%`;
        if (childAvatar && currentChildData.avatar) childAvatar.src = currentChildData.avatar;
        if (childAvatarContainer) {
            childAvatarContainer.setAttribute('data-tooltip', `${currentChildData.name} - Grade ${currentChildData.grade} Student`);
        }
    }

    updateAcademicProgress() {
        const subjectCards = document.querySelectorAll('.subject-card');
        const currentChildData = this.childData[this.currentChild];
        
        currentChildData.academicProgress.forEach((subject, index) => {
            if (subjectCards[index]) {
                const card = subjectCards[index];
                
                // Update subject name
                const subjectName = card.querySelector('.subject-name');
                if (subjectName) subjectName.textContent = subject.subject;

                // Update grade
                const grade = card.querySelector('.subject-grade');
                if (grade) grade.textContent = `${subject.grade}%`;

                // Update trend
                const trend = card.querySelector('.subject-trend');
                if (trend) trend.textContent = subject.trend;

                // Update teacher
                const teacher = card.querySelector('.subject-teacher');
                if (teacher) teacher.textContent = subject.teacher;
            }
        });
    }

    updateSkillsDevelopment() {
        const skillCards = document.querySelectorAll('.skill-card');
        const currentChildData = this.childData[this.currentChild];
        
        currentChildData.skills.forEach((skill, index) => {
            if (skillCards[index]) {
                const card = skillCards[index];
                
                // Update skill name
                const skillName = card.querySelector('.skill-name');
                if (skillName) skillName.textContent = skill.name;

                // Update skill level
                const skillLevel = card.querySelector('.skill-level');
                if (skillLevel) skillLevel.textContent = skill.status;

                // Update progress bar
                const progressFill = card.querySelector('.progress-fill');
                if (progressFill) progressFill.style.width = `${skill.level}%`;

                // Update progress text
                const progressText = card.querySelector('.progress-text');
                if (progressText) progressText.textContent = `${skill.level}%`;
            }
        });
    }

    updateRecentActivities() {
        const activityList = document.querySelector('.activity-list');
        if (!activityList) return;

        const currentChildData = this.childData[this.currentChild];
        activityList.innerHTML = currentChildData.recentActivities.map(activity => `
            <div class="activity-item">
                <div class="activity-icon">${activity.icon}</div>
                <div class="activity-content">
                    <p>${activity.text}</p>
                    <small>${activity.time}</small>
                </div>
            </div>
        `).join('');
    }

    updateUpcomingEvents() {
        const eventList = document.querySelector('.event-list');
        if (!eventList) return;

        eventList.innerHTML = this.childData.upcomingEvents.map(event => `
            <div class="event-item">
                <div class="event-date">
                    <span class="day">${event.date}</span>
                    <span class="month">${event.month}</span>
                </div>
                <div class="event-details">
                    <p>${event.title}</p>
                    <small>${event.time}</small>
                </div>
            </div>
        `).join('');
    }

    updatePaymentStatus() {
        const paymentAmount = document.querySelector('.payment-amount');
        const paymentDue = document.querySelector('.payment-due');
        const paymentStatusBadge = document.querySelector('.payment-status-badge');

        if (paymentAmount) {
            const amount = this.childData?.payment_amount || 156.00;
            paymentAmount.textContent = `R ${amount}`;
        }
        if (paymentDue) paymentDue.textContent = 'Due: 31 March 2024';
        if (paymentStatusBadge) {
            const status = this.childData?.payment_status || 'pending';
            paymentStatusBadge.textContent = status.charAt(0).toUpperCase() + status.slice(1);
            paymentStatusBadge.className = `payment-status-badge ${status}`;
        }
    }

    makePayment() {
        console.log('Making payment');
        
        // Simulate payment processing
        if (confirm('Are you sure you want to make a payment of R 156.00?')) {
            // Update payment status in database
            if (this.childData && window.authDB) {
                const updatedStudent = window.authDB.updatePaymentStatus(this.childData.id, 'paid', '156.00');
                if (updatedStudent) {
                    this.paymentStatus = 'paid';
                    this.childData.payment_status = 'paid';
                    
                    // Add activity
                    window.authDB.addActivity(this.childData.id, {
                        icon: '💰',
                        text: 'Payment made successfully',
                        time: 'Just now'
                    });
                    
                    // Refresh dashboard
                    this.updateDashboard();
                    
                    alert('Payment successful! Status updated.');
                }
            }
        }
    }

    contactTeacher() {
        console.log('Contacting teacher');
        // In a real app, this would open a communication interface
        alert('Contact Teacher - This would open the messaging interface');
    }

    viewChildProfile() {
        console.log('Viewing child profile');
        // In a real app, this would open a detailed profile page
        alert('View Child Profile - This would show detailed child information');
    }

    viewChildReports() {
        console.log('Viewing child reports');
        // In a real app, this would open a reports page
        alert('View Child Reports - This would show detailed academic reports');
    }

    viewCalendar() {
        console.log('Viewing calendar');
        // In a real app, this would open a calendar view
        alert('View Calendar - This would show the school calendar');
    }

    viewAssignments() {
        console.log('Viewing assignments');
        // In a real app, this would show child's assignments
        alert('View Assignments - This would show child\'s assignments');
    }

    handleAction(action) {
        switch (action) {
            case 'profile':
                this.viewChildProfile();
                break;
            case 'reports':
                this.viewChildReports();
                break;
            case 'payment':
                this.makePayment();
                break;
            case 'message':
                this.contactTeacher();
                break;
            case 'calendar':
                this.viewCalendar();
                break;
            case 'assignments':
                this.viewAssignments();
                break;
        }
    }
}

// Global functions for HTML onclick handlers
function makePayment() {
    if (window.parentDashboard) {
        window.parentDashboard.makePayment();
    }
}

function contactTeacher() {
    if (window.parentDashboard) {
        window.parentDashboard.contactTeacher();
    }
}

function viewChildProfile() {
    if (window.parentDashboard) {
        window.parentDashboard.viewChildProfile();
    }
}

function viewChildReports() {
    if (window.parentDashboard) {
        window.parentDashboard.viewChildReports();
    }
}

function viewCalendar() {
    if (window.parentDashboard) {
        window.parentDashboard.viewCalendar();
    }
}

function viewAssignments() {
    if (window.parentDashboard) {
        window.parentDashboard.viewAssignments();
    }
}

function switchChild(childId) {
    if (window.parentDashboard) {
        window.parentDashboard.switchChild(childId);
    }
}

// Initialize parent dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.parentDashboard = new ParentDashboard();
});

