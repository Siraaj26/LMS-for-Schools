// Enhanced Student Dashboard JavaScript
class StudentDashboard {
    constructor() {
        this.studentData = {
            name: 'Thabo Mthembu',
            grade: 10,
            studentId: 'ST2024001',
            attendance: 95,
            points: 1250,
            badges: 8,
            averageGrade: 78,
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
        };
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateDashboard();
    }

    setupEventListeners() {
        // Todo list checkboxes
        document.querySelectorAll('.todo-list input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                this.handleTodoToggle(e.target);
            });
        });

        // Card click handlers
        document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('click', (e) => {
                this.handleCardClick(e.currentTarget);
            });
        });
    }

    updateDashboard() {
        this.updateStudentInfo();
        this.updateSmallCards();
        this.updateBigCards();
    }

    updateStudentInfo() {
        const nameElement = document.querySelector('.student-info h1');
        const infoElement = document.querySelector('.student-info p');
        const avatarElement = document.querySelector('.student-avatar img');
        const statsElements = document.querySelectorAll('.student-stats .stat');

        if (nameElement) nameElement.textContent = `Welcome, ${this.studentData.name.split(' ')[0]}!`;
        if (infoElement) infoElement.textContent = `Grade ${this.studentData.grade} • Student ID: ${this.studentData.studentId}`;
        if (avatarElement) avatarElement.src = this.studentData.avatar;

        if (statsElements.length >= 3) {
            statsElements[0].textContent = `Attendance: ${this.studentData.attendance}%`;
            statsElements[1].textContent = `Points: ${this.studentData.points.toLocaleString()}`;
            statsElements[2].textContent = `Badges: ${this.studentData.badges}`;
        }
    }

    updateSmallCards() {
        const cards = document.querySelectorAll('.small-cards .card');
        
        if (cards.length >= 3) {
            // Announcements card
            const announcementsContent = cards[0].querySelector('.card-content p');
            if (announcementsContent) announcementsContent.textContent = '3 new messages';

            // Assignments card
            const assignmentsContent = cards[1].querySelector('.card-content p');
            if (assignmentsContent) assignmentsContent.textContent = '3 pending';

            // Grades card
            const gradesContent = cards[2].querySelector('.card-content p');
            if (gradesContent) gradesContent.textContent = `Math: 78%`;
        }
    }

    updateBigCards() {
        const bigCards = document.querySelectorAll('.big-cards .card.big');
        
        if (bigCards.length >= 4) {
            // Academics card
            const academicsContent = bigCards[0].querySelector('.card-content p');
            const academicsProgress = bigCards[0].querySelector('.progress-fill');
            if (academicsContent) academicsContent.textContent = `Average: ${this.studentData.averageGrade}%`;
            if (academicsProgress) academicsProgress.style.width = `${this.studentData.averageGrade}%`;

            // Soft Skills card
            const skillsContent = bigCards[1].querySelector('.card-content p');
            if (skillsContent) skillsContent.textContent = '5 skills tracked';

            // Extracurricular card
            const extracurricularContent = bigCards[2].querySelector('.card-content p');
            if (extracurricularContent) extracurricularContent.textContent = '3 activities';

            // Community card
            const communityContent = bigCards[3].querySelector('.card-content p');
            if (communityContent) communityContent.textContent = 'Service hours: 25';
        }
    }

    handleTodoToggle(checkbox) {
        const taskId = checkbox.id;
        this.updatePoints(checkbox.checked ? 10 : -10);
    }

    handleCardClick(card) {
        const cardText = card.textContent.toLowerCase();
        
        if (cardText.includes('announcements')) {
            this.viewAnnouncements();
        } else if (cardText.includes('assignments')) {
            this.viewAssignments();
        } else if (cardText.includes('grades')) {
            this.viewGrades();
        } else if (cardText.includes('academics')) {
            this.viewAcademics();
        } else if (cardText.includes('soft skills')) {
            this.viewSoftSkills();
        } else if (cardText.includes('extracurricular')) {
            this.viewExtracurricular();
        } else if (cardText.includes('community')) {
            this.viewCommunity();
        }
    }

    updatePoints(points) {
        this.studentData.points += points;
        this.updateStudentInfo();
    }

    // Navigation functions
    viewAnnouncements() {
        alert('📢 Announcements:\n\n• School assembly tomorrow at 8:00 AM\n• Science fair registration opens next week\n• New library hours: 7:00 AM - 6:00 PM');
    }

    viewAssignments() {
        alert('📝 Assignments Due:\n\n• Math: Quadratic Equations (Due: March 16)\n• English: Essay on Climate Change (Due: March 18)\n• Science: Lab Report (Due: March 20)');
    }

    viewGrades() {
        alert('📊 Recent Grades:\n\n• Mathematics: 78% (Test 3)\n• Science: 82% (Lab Report)\n• English: 75% (Essay)\n• Geography: 80% (Project)');
    }

    viewAcademics() {
        alert('🎓 Academic Progress:\n\n• Overall Average: 78%\n• Trending: +3% this term\n• Strongest Subject: Science (82%)\n• Needs Improvement: English (75%)');
    }

    viewSoftSkills() {
        alert('🗣️ Soft Skills Development:\n\n• Problem Solving: Advanced (85%)\n• Communication: Intermediate (70%)\n• Teamwork: Advanced (90%)\n• Critical Thinking: Intermediate (75%)');
    }

    viewExtracurricular() {
        alert('⚽ Extracurricular Activities:\n\n• Football Team (Captain)\n• Debate Club (Active member)\n• Student Council (Representative)\n• Community Service (25 hours)');
    }

    viewCommunity() {
        alert('🌍 Community Involvement:\n\n• Volunteer at local food bank\n• Mentor younger students\n• Environmental club member\n• Total service hours: 25');
    }
}

// Global functions for onclick handlers
function viewAnnouncements() {
    if (window.studentDashboard) {
        window.studentDashboard.viewAnnouncements();
    }
}

function viewAssignments() {
    if (window.studentDashboard) {
        window.studentDashboard.viewAssignments();
    }
}

function viewGrades() {
    if (window.studentDashboard) {
        window.studentDashboard.viewGrades();
    }
}

function viewAcademics() {
    if (window.studentDashboard) {
        window.studentDashboard.viewAcademics();
    }
}

function viewSoftSkills() {
    if (window.studentDashboard) {
        window.studentDashboard.viewSoftSkills();
    }
}

function viewExtracurricular() {
    if (window.studentDashboard) {
        window.studentDashboard.viewExtracurricular();
    }
}

function viewCommunity() {
    if (window.studentDashboard) {
        window.studentDashboard.viewCommunity();
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.studentDashboard = new StudentDashboard();
});