// Teacher Dashboard JavaScript
// Handles teacher dashboard functionality

class TeacherDashboard {
    constructor() {
        this.currentUser = null;
        this.currentClass = null;
        this.students = [];
        this.assignments = [];
        
        this.init();
    }

    init() {
        this.getCurrentUser();
        this.loadTeacherData();
        this.setupEventListeners();
        this.updateDashboard();
    }

    getCurrentUser() {
        // Get current teacher user from URL or localStorage
        const urlParams = new URLSearchParams(window.location.search);
        const userEmail = urlParams.get('user') || localStorage.getItem('currentUserEmail');
        
        if (userEmail && window.authDB) {
            this.currentUser = window.authDB.getUserByEmail(userEmail);
            console.log('Teacher user:', this.currentUser);
        }
    }

    loadTeacherData() {
        if (!this.currentUser) return;

        // Load students from database
        this.students = window.authDB.getStudentsByTeacher(this.currentUser.email);
        
        // Initialize default student data if not present
        this.students.forEach(student => {
            if (!student.academic_progress) {
                student.academic_progress = [];
            }
            if (!student.skills) {
                student.skills = [];
            }
            if (!student.activities) {
                student.activities = [];
            }
        });

        // Load assignments from teacher data
        this.assignments = this.currentUser.assignments || [
            { id: 'A001', title: 'Algebra Quiz', class: 'MATH10A', dueDate: '2024-03-20', status: 'graded' },
            { id: 'A002', title: 'Geometry Test', class: 'MATH11B', dueDate: '2024-03-22', status: 'pending' },
            { id: 'A003', title: 'Calculus Assignment', class: 'MATH12A', dueDate: '2024-03-25', status: 'pending' }
        ];
    }

    setupEventListeners() {
        // Class card clicks
        document.querySelectorAll('.class-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const classCode = card.querySelector('.class-code').textContent;
                this.viewClass(classCode);
            });
        });

        // Tool button clicks
        document.querySelectorAll('.tool-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const toolName = btn.querySelector('.tool-name').textContent.toLowerCase();
                this.handleToolClick(toolName);
            });
        });
    }

    updateDashboard() {
        this.updateClassStats();
        this.updateStudentProgress();
        this.updateSkillsAssessment();
        this.updateRecentActivity();
    }

    updateClassStats() {
        // Update class statistics
        const classCards = document.querySelectorAll('.class-card');
        classCards.forEach(card => {
            const classCode = card.querySelector('.class-code').textContent;
            const stats = this.getClassStats(classCode);
            
            // Update student count
            const studentCount = card.querySelector('.stat-item:nth-child(1) .stat-value');
            if (studentCount) studentCount.textContent = stats.students;

            // Update assignment count
            const assignmentCount = card.querySelector('.stat-item:nth-child(2) .stat-value');
            if (assignmentCount) assignmentCount.textContent = stats.assignments;

            // Update average grade
            const avgGrade = card.querySelector('.stat-item:nth-child(3) .stat-value');
            if (avgGrade) avgGrade.textContent = stats.avgGrade + '%';
        });
    }

    getClassStats(classCode) {
        // Calculate stats for a specific class
        const classStudents = this.students.filter(s => s.class === classCode);
        const classAssignments = this.assignments.filter(a => a.class === classCode);
        
        return {
            students: classStudents.length,
            assignments: classAssignments.length,
            avgGrade: classStudents.length > 0 ? 
                Math.round(classStudents.reduce((sum, s) => sum + s.grade, 0) / classStudents.length) : 0
        };
    }

    updateStudentProgress() {
        const progressItems = document.querySelectorAll('.progress-item');
        
        // Calculate progress distribution
        const onTrack = this.students.filter(s => s.status === 'on-track').length;
        const needsAttention = this.students.filter(s => s.status === 'needs-attention').length;
        const atRisk = this.students.filter(s => s.status === 'at-risk').length;
        const total = this.students.length;

        if (progressItems.length >= 3) {
            // On Track
            const onTrackItem = progressItems[0];
            const onTrackBar = onTrackItem.querySelector('.progress-fill');
            const onTrackValue = onTrackItem.querySelector('.progress-value');
            if (onTrackBar) onTrackBar.style.width = `${(onTrack / total) * 100}%`;
            if (onTrackValue) onTrackValue.textContent = `${onTrack} students`;

            // Needs Attention
            const needsAttentionItem = progressItems[1];
            const needsAttentionBar = needsAttentionItem.querySelector('.progress-fill');
            const needsAttentionValue = needsAttentionItem.querySelector('.progress-value');
            if (needsAttentionBar) needsAttentionBar.style.width = `${(needsAttention / total) * 100}%`;
            if (needsAttentionValue) needsAttentionValue.textContent = `${needsAttention} students`;

            // At Risk
            const atRiskItem = progressItems[2];
            const atRiskBar = atRiskItem.querySelector('.progress-fill');
            const atRiskValue = atRiskItem.querySelector('.progress-value');
            if (atRiskBar) atRiskBar.style.width = `${(atRisk / total) * 100}%`;
            if (atRiskValue) atRiskValue.textContent = `${atRisk} students`;
        }
    }

    updateSkillsAssessment() {
        const skillItems = document.querySelectorAll('.skill-item');
        const skills = [
            { name: 'Problem Solving', level: 80 },
            { name: 'Critical Thinking', level: 75 },
            { name: 'Communication', level: 70 }
        ];

        skillItems.forEach((item, index) => {
            if (skills[index]) {
                const skillBar = item.querySelector('.skill-bar .skill-fill');
                const skillValue = item.querySelector('.skill-value');
                
                if (skillBar) skillBar.style.width = `${skills[index].level}%`;
                if (skillValue) skillValue.textContent = `${skills[index].level}%`;
            }
        });
    }

    updateRecentActivity() {
        const activityList = document.querySelector('.activity-list');
        if (!activityList) return;

        const activities = [
            { icon: '📝', text: 'Graded 15 assignments for MATH10A', time: '2 hours ago' },
            { icon: '📊', text: 'Updated progress for Thabo Mthembu', time: '4 hours ago' },
            { icon: '🎯', text: 'Created new skills assessment', time: '1 day ago' }
        ];

        activityList.innerHTML = activities.map(activity => `
            <div class="activity-item">
                <div class="activity-icon">${activity.icon}</div>
                <div class="activity-content">
                    <p>${activity.text}</p>
                    <small>${activity.time}</small>
                </div>
            </div>
        `).join('');
    }

    viewClass(classCode) {
        this.currentClass = classCode;
        console.log(`Viewing class: ${classCode}`);
        // In a real app, this would navigate to a class detail page
        alert(`Viewing class ${classCode} - This would show detailed class information`);
    }

    gradeAssignments(classCode) {
        console.log(`Grading assignments for class: ${classCode}`);
        // In a real app, this would open a grading interface
        alert(`Grading assignments for ${classCode} - This would open the grading interface`);
    }

    createAssignment() {
        this.openAssignmentModal();
    }

    openAssignmentModal() {
        const modal = document.getElementById('assignmentModal');
        if (modal) {
            modal.style.display = 'flex';
            // Set default due date to tomorrow
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            document.getElementById('assignmentDueDate').value = tomorrow.toISOString().split('T')[0];
        }
    }

    closeAssignmentModal() {
        const modal = document.getElementById('assignmentModal');
        if (modal) {
            modal.style.display = 'none';
            document.getElementById('assignmentForm').reset();
        }
    }

    saveAssignment() {
        const title = document.getElementById('assignmentTitle').value;
        const className = document.getElementById('assignmentClass').value;
        const dueDate = document.getElementById('assignmentDueDate').value;
        const points = document.getElementById('assignmentPoints').value;

        if (!title || !className || !dueDate || !points) {
            alert('Please fill in all fields');
            return;
        }

        // Check if this is a new class
        const existingClass = document.querySelector(`[onclick="viewClass('${className}')"]`);
        
        if (!existingClass) {
            // Create new class card
            this.createNewClass(className, title);
        }

        const assignment = {
            title: title,
            class: className,
            dueDate: dueDate,
            points: points,
            status: 'pending'
        };

        this.assignments.push(assignment);
        this.closeAssignmentModal();
        alert('Assignment created!');
    }

    createNewClass(className, assignmentTitle) {
        // Create class code from className
        const classCode = className.replace(/\s+/g, '').toUpperCase();
        
        // Generate random stats
        const students = Math.floor(Math.random() * 20) + 20; // 20-40 students
        const avgGrade = Math.floor(Math.random() * 20) + 70; // 70-90%
        
        // Create new class card HTML
        const newClassCard = `
            <div class="class-card" onclick="viewClass('${classCode}')">
                <div class="class-header">
                    <div class="class-icon">📝</div>
                    <div class="class-info">
                        <h3>${className}</h3>
                        <span class="class-code">${classCode}</span>
                    </div>
                </div>
                <div class="class-stats">
                    <div class="stat-item">
                        <span class="stat-label">Students</span>
                        <span class="stat-value">${students}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Assignments</span>
                        <span class="stat-value">1</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Avg Grade</span>
                        <span class="stat-value">${avgGrade}%</span>
                    </div>
                </div>
                <div class="class-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${avgGrade}%"></div>
                    </div>
                    <span class="progress-text">Class Progress: ${avgGrade}%</span>
                </div>
            </div>
        `;
        
        // Add to dashboard
        const classCards = document.querySelector('.class-cards');
        if (classCards) {
            classCards.insertAdjacentHTML('beforeend', newClassCard);
        }
    }

    showAssignments() {
        let message = "Assignments:\n";
        if (this.assignments.length === 0) {
            message += "No assignments created yet.";
        } else {
            this.assignments.forEach((assignment, index) => {
                message += `${index + 1}. ${assignment.title} - ${assignment.class} (Due: ${assignment.dueDate})\n`;
            });
        }
        alert(message);
    }


    viewReports() {
        console.log('Viewing reports');
        // In a real app, this would open a reports page
        alert('Viewing reports - This would open the reports interface');
    }

    gradeWork() {
        console.log('Grading work');
        // In a real app, this would open a grading interface
        alert('Grading work - This would open the grading interface');
    }

    trackSkills() {
        console.log('Tracking skills');
        // In a real app, this would open a skills tracking interface
        alert('Tracking skills - This would open the skills tracking interface');
    }

    communicate() {
        console.log('Communicating with students/parents');
        // In a real app, this would open a communication interface
        alert('Communication - This would open the messaging interface');
    }

    viewCalendar() {
        console.log('Viewing calendar');
        // In a real app, this would open a full calendar view
        alert('Calendar - This would open the full calendar interface');
    }

    handleToolClick(toolName) {
        switch (toolName) {
            case 'assignment':
                this.createAssignment();
                break;
            case 'grade':
                this.gradeWork();
                break;
            case 'skills':
                this.trackSkills();
                break;
            case 'reports':
                this.viewReports();
                break;
            case 'message':
                this.communicate();
                break;
            case 'calendar':
                this.viewCalendar();
                break;
        }
    }
}

// Global functions for HTML onclick handlers
function createAssignment() {
    if (window.teacherDashboard) {
        window.teacherDashboard.createAssignment();
    }
}

function viewReports() {
    if (window.teacherDashboard) {
        window.teacherDashboard.viewReports();
    }
}

function viewClass(classCode) {
    if (window.teacherDashboard) {
        window.teacherDashboard.viewClass(classCode);
    }
}

function gradeAssignments(classCode) {
    if (window.teacherDashboard) {
        window.teacherDashboard.gradeAssignments(classCode);
    }
}

function gradeWork() {
    if (window.teacherDashboard) {
        window.teacherDashboard.gradeWork();
    }
}

function trackSkills() {
    if (window.teacherDashboard) {
        window.teacherDashboard.trackSkills();
    }
}

function communicate() {
    if (window.teacherDashboard) {
        window.teacherDashboard.communicate();
    }
}

function viewCalendar() {
    if (window.teacherDashboard) {
        window.teacherDashboard.viewCalendar();
    }
}

function openAssignmentModal() {
    if (window.teacherDashboard) {
        window.teacherDashboard.openAssignmentModal();
    }
}

function closeAssignmentModal() {
    if (window.teacherDashboard) {
        window.teacherDashboard.closeAssignmentModal();
    }
}

function saveAssignment() {
    if (window.teacherDashboard) {
        window.teacherDashboard.saveAssignment();
    }
}

function showAssignments() {
    if (window.teacherDashboard) {
        window.teacherDashboard.showAssignments();
    }
}

// Initialize teacher dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.teacherDashboard = new TeacherDashboard();
});

