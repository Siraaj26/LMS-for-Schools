// Simple Teacher Dashboard - Beginner Friendly
// This is easy to understand and modify

// Global variables to store data
let currentTeacher = null;
let allStudents = [];

// When page loads, get the teacher data
function initializeTeacherDashboard() {
    // Get teacher email from URL
    const urlParams = new URLSearchParams(window.location.search);
    const teacherEmail = urlParams.get('user');
    
    if (teacherEmail && window.authDB) {
        // Find teacher in database
        currentTeacher = window.authDB.getUserByEmail(teacherEmail);
        
        if (currentTeacher) {
            // Get all students
            allStudents = window.authDB.getStudentsByTeacher(teacherEmail);
            
            // Update the dashboard with real data
            updateTeacherDashboard();
        }
    }
}

// Update the dashboard with current data
function updateTeacherDashboard() {
    if (!currentTeacher) return;
    
    // Update teacher name
    const welcomeElement = document.getElementById('teacher-welcome');
    if (welcomeElement) {
        welcomeElement.textContent = `Welcome, ${currentTeacher.full_name}!`;
    }
    
    // Update student count
    updateStudentCount();
    
    // Update recent activity
    updateRecentActivity();
}

// Show how many students the teacher has
function updateStudentCount() {
    const studentCountElements = document.querySelectorAll('.stat-value');
    if (studentCountElements.length > 0 && allStudents.length > 0) {
        // Update the first stat (students count)
        studentCountElements[1].textContent = allStudents.length;
    }
}

// Update recent activity list
function updateRecentActivity() {
    const activityList = document.querySelector('.activity-list');
    if (!activityList) return;
    
    // Simple activities list
    const activities = [
        { icon: '📝', text: 'Graded assignments for Math class', time: '2 hours ago' },
        { icon: '📊', text: 'Updated progress for students', time: '4 hours ago' },
        { icon: '🎯', text: 'Created new skills assessment', time: '1 day ago' }
    ];
    
    // Show activities in HTML
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

// Simple function to create assignment
function createAssignment() {
    const title = prompt('Enter assignment title:');
    if (title) {
        const subject = prompt('Enter subject (Math, Science, English):');
        if (subject) {
            // Update teacher's assignments
            if (!currentTeacher.assignments) {
                currentTeacher.assignments = [];
            }
            
            const newAssignment = {
                id: Date.now(),
                title: title,
                subject: subject,
                status: 'active',
                created: new Date().toLocaleDateString()
            };
            
            currentTeacher.assignments.push(newAssignment);
            
            alert(`Assignment "${title}" created successfully!`);
            
            // Update recent activity
            updateRecentActivity();
        }
    }
}

// Simple function to grade work
function gradeWork() {
    if (allStudents.length === 0) {
        alert('No students found to grade');
        return;
    }
    
    // Show list of students
    let studentList = 'Select a student to grade:\n\n';
    allStudents.forEach((student, index) => {
        studentList += `${index + 1}. ${student.full_name}\n`;
    });
    
    const choice = prompt(studentList + '\nEnter student number:');
    const studentIndex = parseInt(choice) - 1;
    
    if (studentIndex >= 0 && studentIndex < allStudents.length) {
        const student = allStudents[studentIndex];
        const grade = prompt(`Enter grade for ${student.full_name} (0-100):`);
        const subject = prompt('Enter subject:');
        
        if (grade && subject) {
            // Add grade to student's academic progress
            if (!student.academic_progress) {
                student.academic_progress = [];
            }
            
            student.academic_progress.push({
                subject: subject,
                grade: parseInt(grade),
                date: new Date().toLocaleDateString()
            });
            
            alert(`Grade ${grade}% recorded for ${student.full_name} in ${subject}`);
            
            // Update recent activity
            updateRecentActivity();
        }
    }
}

// Simple function to view reports
function viewReports() {
    if (allStudents.length === 0) {
        alert('No students found');
        return;
    }
    
    let report = 'Student Reports:\n\n';
    allStudents.forEach(student => {
        report += `Student: ${student.full_name}\n`;
        report += `Email: ${student.email}\n`;
        report += `Grade: ${student.current_grade || 'Not specified'}\n`;
        
        if (student.academic_progress && student.academic_progress.length > 0) {
            report += 'Recent Grades:\n';
            student.academic_progress.slice(-3).forEach(progress => {
                report += `  ${progress.subject}: ${progress.grade}%\n`;
            });
        }
        report += '\n';
    });
    
    alert(report);
}

// Simple function to communicate with students/parents
function communicate() {
    alert('Communication feature would open here.\nThis would allow you to send messages to students and parents.');
}

// Simple function to view payments
function viewPayments() {
    let paymentInfo = 'Payment Information:\n\n';
    allStudents.forEach(student => {
        const status = student.payment_status || 'pending';
        paymentInfo += `${student.full_name}: ${status}\n`;
    });
    alert(paymentInfo);
}

// Start the dashboard when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeTeacherDashboard();
});
