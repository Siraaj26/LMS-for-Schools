// Admin Dashboard - Comprehensive Features
// This includes all the features from the image

let currentAdmin = null;
let adminStats = {};
let allStudents = [];
let allTasks = [];
let allMeetings = [];

// Initialize admin dashboard
function initializeAdminDashboard() {
    // Get admin email from URL
    const urlParams = new URLSearchParams(window.location.search);
    const adminEmail = urlParams.get('user');
    
    if (adminEmail && window.authDB) {
        currentAdmin = window.authDB.getUserByEmail(adminEmail);
        
        if (currentAdmin) {
            loadAdminData();
            updateAdminDashboard();
            showWelcomeMessage();
        }
    }
}

// Load all admin data
function loadAdminData() {
    // Get statistics
    adminStats = window.authDB.getAdminStats();
    
    // Get all students
    allStudents = window.authDB.getStudentsByTeacher(currentAdmin.email);
    
    // Get tasks
    allTasks = window.authDB.getTasks();
    
    // Get meetings
    allMeetings = window.authDB.getMeetings();
}

// Update the dashboard display
function updateAdminDashboard() {
    if (!currentAdmin) return;
    
    // Update admin name
    const welcomeElement = document.getElementById('teacher-welcome');
    if (welcomeElement) {
        welcomeElement.textContent = `Welcome, ${currentAdmin.full_name}!`;
    }
    
    // Update summary cards
    updateSummaryCards();
    
    // Update students table
    updateStudentsTable();
    
    // Update tasks section
    updateTasksSection();
    
    // Update meetings section
    updateMeetingsSection();
}

// Show welcome message
function showWelcomeMessage() {
    // Simple console log instead of popup
    console.log('Admin access granted! Successfully signed in as admin.');
}

// Update summary cards
function updateSummaryCards() {
    // Update student count
    const studentCard = document.querySelector('.class-card:nth-child(1) .stat-item:nth-child(1) .stat-value');
    if (studentCard) {
        studentCard.textContent = adminStats.totalStudents;
    }
    
    // Update pending tasks
    const taskCard = document.querySelector('.class-card:nth-child(2) .stat-item:nth-child(1) .stat-value');
    if (taskCard) {
        taskCard.textContent = adminStats.pendingTasks;
    }
    
    // Update meetings
    const meetingCard = document.querySelector('.class-card:nth-child(3) .stat-item:nth-child(1) .stat-value');
    if (meetingCard) {
        meetingCard.textContent = adminStats.upcomingMeetings;
    }
    
    // Update completion rate
    const completionCard = document.querySelector('.class-card:nth-child(3) .stat-item:nth-child(3) .stat-value');
    if (completionCard) {
        completionCard.textContent = adminStats.completionRate + '%';
    }
}

// Update students table
function updateStudentsTable() {
    const studentsSection = document.querySelector('.class-overview');
    if (!studentsSection) return;
    
    // Create students table if it doesn't exist
    let studentsTable = document.getElementById('students-table');
    if (!studentsTable) {
        const tableHTML = `
            <div class="students-section">
                <h3>👥 Students</h3>
                <table id="students-table" style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                    <thead>
                        <tr style="background-color: #f8f9fa;">
                            <th style="padding: 10px; border: 1px solid #ddd;">Name</th>
                            <th style="padding: 10px; border: 1px solid #ddd;">Email</th>
                            <th style="padding: 10px; border: 1px solid #ddd;">Grade</th>
                            <th style="padding: 10px; border: 1px solid #ddd;">Target School</th>
                            <th style="padding: 10px; border: 1px solid #ddd;">Actions</th>
                        </tr>
                    </thead>
                    <tbody id="students-tbody">
                    </tbody>
                </table>
            </div>
        `;
        studentsSection.insertAdjacentHTML('beforeend', tableHTML);
        studentsTable = document.getElementById('students-table');
    }
    
    // Populate students table
    const tbody = document.getElementById('students-tbody');
    if (tbody) {
        tbody.innerHTML = allStudents.map(student => `
            <tr>
                <td style="padding: 10px; border: 1px solid #ddd;">${student.full_name}</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${student.email}</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${student.current_grade || 'Not specified'}</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${student.target_university || 'Not specified'}</td>
                <td style="padding: 10px; border: 1px solid #ddd;">
                    <button onclick="viewStudentProfile('${student.id}')" style="margin-right: 5px; padding: 5px 10px; background: #007bff; color: white; border: none; border-radius: 3px;">View Profile</button>
                    <button onclick="uploadStudentReport('${student.id}')" style="padding: 5px 10px; background: #28a745; color: white; border: none; border-radius: 3px;">📄 Upload Report</button>
                </td>
            </tr>
        `).join('');
    }
}

// Update tasks section
function updateTasksSection() {
    // This would update the tasks display
    console.log('Tasks updated:', allTasks.length);
}

// Update meetings section
function updateMeetingsSection() {
    // This would update the meetings display
    console.log('Meetings updated:', allMeetings.length);
}

// Admin Functions

// View student profile
function viewStudentProfile(studentId) {
    const student = allStudents.find(s => s.id == studentId);
    if (student) {
        // Redirect to student profile page
        window.location.href = `student-profile.html?id=${studentId}`;
    }
}

// Upload student report
function uploadStudentReport(studentId) {
    const student = allStudents.find(s => s.id == studentId);
    if (student) {
        // Redirect to upload page
        window.location.href = `upload-report.html?student=${studentId}`;
    }
}

// Create new task
function createTask() {
    // Redirect to task creation page
    window.location.href = 'create-task.html';
}

// Complete task
function completeTask(taskId) {
    const task = window.authDB.completeTask(taskId);
    if (task) {
        loadAdminData();
        updateAdminDashboard();
    }
}

// Create meeting
function createMeeting() {
    // Redirect to meeting creation page
    window.location.href = 'create-meeting.html';
}

// View analytics
function viewAnalytics() {
    // Redirect to analytics page
    window.location.href = 'analytics.html';
}

// Manage reports
function manageReports() {
    // Redirect to reports page
    window.location.href = 'reports.html';
}

// Start the admin dashboard when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeAdminDashboard();
});
