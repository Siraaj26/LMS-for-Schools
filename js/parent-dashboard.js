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
        this.loadChildData();
        this.setupEventListeners();
        this.updateDashboard();
    }

    loadChildData() {
        // Load child data from localStorage or API
        // For demo purposes, we'll use sample data
        this.childData = {
            id: this.childId,
            name: this.childName,
            grade: 10,
            school: 'Johannesburg High School',
            attendance: 95,
            academicProgress: [
                { subject: 'Mathematics', grade: 78, trend: '+5%', teacher: 'Ms. Johnson' },
                { subject: 'Science', grade: 82, trend: '+3%', teacher: 'Mr. Smith' },
                { subject: 'English', grade: 75, trend: '+2%', teacher: 'Ms. Brown' },
                { subject: 'Geography', grade: 80, trend: '+4%', teacher: 'Mr. Davis' }
            ],
            skills: [
                { name: 'Problem Solving', level: 85, status: 'Advanced' },
                { name: 'Communication', level: 70, status: 'Intermediate' },
                { name: 'Teamwork', level: 90, status: 'Advanced' },
                { name: 'Critical Thinking', level: 75, status: 'Intermediate' }
            ],
            recentActivities: [
                { icon: '📝', text: 'Math assignment submitted', time: '2 hours ago' },
                { icon: '🏆', text: 'Earned "Problem Solver" badge', time: '1 day ago' },
                { icon: '📊', text: 'Progress report updated', time: '3 days ago' },
                { icon: '💬', text: 'Teacher message received', time: '1 week ago' }
            ],
            upcomingEvents: [
                { date: '15', month: 'Mar', title: 'Parent-Teacher Meeting', time: '2:00 PM - 3:00 PM' },
                { date: '20', month: 'Mar', title: 'Science Fair', time: '9:00 AM - 2:00 PM' },
                { date: '25', month: 'Mar', title: 'Sports Day', time: '8:00 AM - 4:00 PM' }
            ]
        };
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

    updateChildSummary() {
        const childName = document.querySelector('.child-details h3');
        const childInfo = document.querySelector('.child-details p');
        const attendance = document.querySelector('.attendance');

        if (childName) childName.textContent = this.childData.name;
        if (childInfo) childInfo.textContent = `Grade ${this.childData.grade} • Student ID: ${this.childData.id}`;
        if (attendance) attendance.textContent = `Attendance: ${this.childData.attendance}%`;
    }

    updateAcademicProgress() {
        const subjectCards = document.querySelectorAll('.subject-card');
        
        this.childData.academicProgress.forEach((subject, index) => {
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
        
        this.childData.skills.forEach((skill, index) => {
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

        activityList.innerHTML = this.childData.recentActivities.map(activity => `
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

        if (paymentAmount) paymentAmount.textContent = 'R 156.00';
        if (paymentDue) paymentDue.textContent = 'Due: 31 March 2024';
        if (paymentStatusBadge) {
            paymentStatusBadge.textContent = this.paymentStatus.charAt(0).toUpperCase() + this.paymentStatus.slice(1);
            paymentStatusBadge.className = `payment-status-badge ${this.paymentStatus}`;
        }
    }

    makePayment() {
        console.log('Making payment');
        // Navigate to payment form
        window.location.href = '../payments/html/payment_form.html';
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

// Initialize parent dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.parentDashboard = new ParentDashboard();
});

