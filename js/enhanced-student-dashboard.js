// Enhanced Student Dashboard JavaScript
class StudentDashboard {
    constructor() {
        this.studentData = null;
        this.gradesData = null;
        this.init();
    }

    async init() {
        this.setPaymentsLoading(true);
        // Get logged-in user's email (set this in localStorage on login)
        const userEmail = localStorage.getItem('userEmail');
        if (!userEmail) {
            this.setPaymentsError('No user email found. Please sign in again.');
            this.setPaymentsLoading(false);
            return;
        }
        // Fetch student data
        const { data: student, error: studentError } = await supabaseClient
            .from('student_login')
            .select('*')
            .eq('email', userEmail)
            .single();
        if (studentError || !student) {
            console.error('Error fetching student:', studentError);
            this.setPaymentsError('Could not load student data.');
            this.setPaymentsLoading(false);
            return;
        }
        this.studentData = student;
        // Fetch grades data
        const { data: grades, error: gradesError } = await supabaseClient
            .from('grades')
            .select('*')
            .eq('student_id', student.id);
        if (gradesError) {
            console.error('Error fetching grades:', gradesError);
            this.gradesData = [];
        } else {
            this.gradesData = grades;
        }
        // Fetch payments data
        let payments = [];
        let paymentsError = null;
        try {
            const result = await supabaseClient
                .from('payments')
                .select('*')
                .eq('student_id', student.id);
            payments = result.data;
            paymentsError = result.error;
        } catch (err) {
            paymentsError = err;
        }
        if (paymentsError) {
            console.error('Error fetching payments:', paymentsError);
            this.paymentsData = [];
            this.setPaymentsError('Could not load payment data. Please try again later.');
        } else {
            this.paymentsData = payments;
            this.setPaymentsError('');
        }
        this.setPaymentsLoading(false);
        this.setupEventListeners();
        this.updateDashboard();
        this.updatePaymentsTable();
    }

    setPaymentsLoading(isLoading) {
        const spinner = document.getElementById('payments-loading');
        const table = document.getElementById('payments-table');
        if (spinner) spinner.style.display = isLoading ? 'flex' : 'none';
        if (table) table.style.opacity = isLoading ? 0.5 : 1;
    }

    setPaymentsError(message) {
        const errorDiv = document.getElementById('payments-error');
        if (!errorDiv) return;
        if (message) {
            errorDiv.textContent = message;
            errorDiv.style.display = 'block';
        } else {
            errorDiv.textContent = '';
            errorDiv.style.display = 'none';
        }
    }

    updatePaymentsTable() {
        const table = document.getElementById('payments-table');
        if (!table || !this.paymentsData) return;
        const tbody = table.querySelector('tbody');
        if (!tbody) return;
        tbody.innerHTML = '';
        if (this.paymentsData.length === 0) {
            tbody.innerHTML = '<tr><td colspan="4">No payment records found.</td></tr>';
            return;
        }
        this.paymentsData.forEach(payment => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${payment.term}</td>
                <td>R ${payment.amount}</td>
                <td>${payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}</td>
                <td>${payment.payment_date ? payment.payment_date : '-'}</td>
            `;
            tbody.appendChild(tr);
        });
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
        if (!this.studentData) return;
        const nameElement = document.querySelector('.student-info h1');
        const infoElement = document.querySelector('.student-info p');
        const avatarElement = document.querySelector('.student-avatar img');
        const statsElements = document.querySelectorAll('.student-stats .stat');

        if (nameElement) nameElement.textContent = `Welcome, ${this.studentData.full_name.split(' ')[0]}!`;
        if (infoElement) infoElement.textContent = `Grade ${this.studentData.current_grade || ''} • Student ID: ${this.studentData.id}`;
        if (avatarElement) avatarElement.src = this.studentData.avatar || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face';

        // Example stats: attendance, points, badges (customize as needed)
        if (statsElements.length >= 3) {
            statsElements[0].textContent = `Attendance: 95%`;
            statsElements[1].textContent = `Points: 0`;
            statsElements[2].textContent = `Badges: 0`;
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

            // Grades card (show actual grade if available)
            const gradesContent = cards[2].querySelector('.card-content p');
            let mathGrade = '';
            if (this.gradesData && this.gradesData.length > 0) {
                mathGrade = this.gradesData[0].maths ? `${this.gradesData[0].maths}%` : 'N/A';
            } else {
                mathGrade = 'N/A';
            }
            if (gradesContent) gradesContent.textContent = `Math: ${mathGrade}`;
        }
    }

    updateBigCards() {
        const bigCards = document.querySelectorAll('.big-cards .card.big');
        if (bigCards.length >= 4) {
            // Academics card
            const academicsContent = bigCards[0].querySelector('.card-content p');
            const academicsProgress = bigCards[0].querySelector('.progress-fill');
            let avg = 0;
            if (this.gradesData && this.gradesData.length > 0) {
                const g = this.gradesData[0];
                // Calculate average from available subjects
                const gradesArr = [g.maths, g.english].filter(x => typeof x === 'number');
                avg = gradesArr.length ? (gradesArr.reduce((a, b) => a + b, 0) / gradesArr.length) : 0;
            }
            if (academicsContent) academicsContent.textContent = `Average: ${avg ? avg.toFixed(1) : 'N/A'}%`;
            if (academicsProgress) academicsProgress.style.width = `${avg}%`;

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