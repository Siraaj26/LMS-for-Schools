class DashboardNumbers {
    constructor() {
        this.init();
    }

    init() {
        this.loadNumbers();
    }

    loadNumbers() {
        const userRole = document.body.getAttribute('data-role');
        const userId = this.getCurrentUserId();
        
        if (userRole === 'student') {
            this.loadStudentNumbers(userId);
        } else if (userRole === 'parent') {
            this.loadParentNumbers(userId);
        } else if (userRole === 'teacher') {
            this.loadTeacherNumbers(userId);
        }
    }

    getCurrentUserId() {
        const urlParams = new URLSearchParams(window.location.search);
        const userEmail = urlParams.get('user') || localStorage.getItem('currentUserEmail');
        const user = window.authDB.getUserByEmail(userEmail);
        return user ? user.id : null;
    }

    loadStudentNumbers(studentId) {
        const student = window.authDB.users.find(u => u.id === studentId && u.user_type === 'student');
        if (!student) return;

        this.updateElement('.small-card-number', 4, 'announcements');
        this.updateElement('.small-card-number', 3, 'assignments');
        this.updateElement('.stat-value', 82, 'avg-grade');
        this.updateElement('.stat-value', 7, 'subjects');
        this.updateElement('.stat-value', 2, 'overdue');
        this.updateElement('.stat-value', 5, 'badges');
        this.updateElement('.stat-value', '3/6', 'modules');
        this.updateElement('.stat-value', 2, 'activities');
        this.updateElement('.stat-value', 14, 'hours');
        this.updateElement('.stat-value', 1, 'events');
        this.updateElement('.stat-value', 120, 'points');
    }

    loadParentNumbers(parentId) {
        const parent = window.authDB.users.find(u => u.id === parentId && u.user_type === 'parent');
        if (!parent) return;

        const student = window.authDB.getStudentByParentEmail(parent.email);
        if (!student) return;

        this.updateElement('.attendance', `${student.attendance || 95}%`);
        this.updateElement('.payment-amount', `R ${student.payment_amount || 156.00}`);
        this.updateElement('.stat', `Children: ${1}`);
    }

    loadTeacherNumbers(teacherId) {
        this.updateElement('.stat', 'Classes: 5');
        this.updateElement('.stat', 'Students: 142');
        this.updateElement('.stat', 'Subjects: 3');
        
        this.updateClassNumbers();
    }

    updateClassNumbers() {
        const classStats = [
            { code: 'MATH8A', students: 28, assignments: 6, grade: 72 },
            { code: 'MATH9B', students: 31, assignments: 5, grade: 75 },
            { code: 'MATH10A', students: 32, assignments: 4, grade: 78 },
            { code: 'MATH11B', students: 29, assignments: 3, grade: 82 },
            { code: 'MATH12A', students: 22, assignments: 4, grade: 85 }
        ];

        classStats.forEach((cls, index) => {
            const classCard = document.querySelectorAll('.class-card')[index];
            if (classCard) {
                const studentCount = classCard.querySelector('.stat-item:nth-child(1) .stat-value');
                const assignmentCount = classCard.querySelector('.stat-item:nth-child(2) .stat-value');
                const avgGrade = classCard.querySelector('.stat-item:nth-child(3) .stat-value');
                const progressBar = classCard.querySelector('.progress-fill');
                const progressText = classCard.querySelector('.progress-text');

                if (studentCount) studentCount.textContent = cls.students;
                if (assignmentCount) assignmentCount.textContent = cls.assignments;
                if (avgGrade) avgGrade.textContent = `${cls.grade}%`;
                if (progressBar) progressBar.style.width = `${cls.grade}%`;
                if (progressText) progressText.textContent = `Class Progress: ${cls.grade}%`;
            }
        });
    }

    updateElement(selector, value, context = '') {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            if (context) {
                const card = element.closest('.card');
                if (card && card.classList.contains(context)) {
                    element.textContent = value;
                }
            } else {
                element.textContent = value;
            }
        });
    }

    addGrade(studentId, subject, grade) {
        window.authDB.addAcademicGrade(studentId, subject, grade);
        this.loadNumbers();
    }

    updateSkill(studentId, skillName, level) {
        window.authDB.updateSkillLevel(studentId, skillName, level);
        this.loadNumbers();
    }

    updateAttendance(studentId, percentage) {
        window.authDB.updateAttendance(studentId, percentage);
        this.loadNumbers();
    }

    addAssignment(teacherId, title, classCode) {
        window.authDB.createAssignment(teacherId, {
            title,
            class: classCode,
            dueDate: new Date().toISOString().split('T')[0]
        });
        this.loadNumbers();
    }

    updatePayment(studentId, amount) {
        window.authDB.updatePaymentAmount(studentId, amount);
        this.loadNumbers();
    }

    addAnnouncement(authorId, title, content) {
        window.authDB.createAnnouncement(authorId, title, content);
        this.loadNumbers();
    }

    calculatePercentage(part, total) {
        if (total === 0) return 0;
        return Math.round((part / total) * 100);
    }

    updateProgressBar(selector, percentage) {
        const progressBar = document.querySelector(selector);
        if (progressBar) {
            progressBar.style.width = `${percentage}%`;
        }
    }

    calculateAverageGrade(grades) {
        if (!grades || grades.length === 0) return 0;
        const sum = grades.reduce((total, grade) => total + grade, 0);
        return Math.round(sum / grades.length);
    }

    calculateClassProgress(completed, total) {
        return this.calculatePercentage(completed, total);
    }

    updateClassNumbers(classCode, type, value) {
        if (!window.classStats) {
            window.classStats = {};
        }
        if (!window.classStats[classCode]) {
            window.classStats[classCode] = {};
        }
        window.classStats[classCode][type] = value;
        this.loadNumbers();
    }
}

window.dashboardNumbers = new DashboardNumbers();
