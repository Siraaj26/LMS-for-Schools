// Dashboard Authentication and Personalization
// This script personalizes dashboards based on the logged-in user

class DashboardAuth {
    constructor() {
        this.currentUser = null;
        this.init();
    }

    init() {
        this.getCurrentUser();
        this.personalizeDashboard();
    }

    getCurrentUser() {
        // For demo purposes, we'll get the user from URL parameters or localStorage
        // In a real app, this would come from the authentication session
        
        // Check URL parameters for user email (from login redirect)
        const urlParams = new URLSearchParams(window.location.search);
        const userEmail = urlParams.get('user') || localStorage.getItem('currentUserEmail');
        
        if (userEmail && window.authDB) {
            this.currentUser = window.authDB.getUserByEmail(userEmail);
            if (this.currentUser) {
                localStorage.setItem('currentUserEmail', userEmail);
                console.log('Current user:', this.currentUser);
            }
        }
        
        // If no user found, redirect to login
        if (!this.currentUser) {
            this.redirectToLogin();
        }
    }

    personalizeDashboard() {
        if (!this.currentUser) return;

        const userType = this.currentUser.user_type;
        
        switch (userType) {
            case 'student':
                this.personalizeStudentDashboard();
                break;
            case 'parent':
                this.personalizeParentDashboard();
                break;
            case 'teacher':
                this.personalizeTeacherDashboard();
                break;
        }
    }

    personalizeStudentDashboard() {
        // Update welcome message
        const welcomeElement = document.getElementById('student-welcome');
        if (welcomeElement) {
            welcomeElement.textContent = `Welcome, ${this.currentUser.full_name}!`;
        }

        // Update student-specific data
        const gradeElement = document.querySelector('.current-grade');
        if (gradeElement && this.currentUser.current_grade) {
            gradeElement.textContent = this.currentUser.current_grade;
        }

        const locationElement = document.querySelector('.location');
        if (locationElement && this.currentUser.location) {
            locationElement.textContent = this.currentUser.location;
        }

        const universityElement = document.querySelector('.target-university');
        if (universityElement && this.currentUser.target_university) {
            universityElement.textContent = this.currentUser.target_university;
        }
    }

    personalizeParentDashboard() {
        // Update welcome message
        const welcomeElement = document.getElementById('parent-welcome');
        if (welcomeElement) {
            welcomeElement.textContent = `Welcome, ${this.currentUser.full_name}!`;
        }

        // Update parent-specific data
        const childInfo = document.querySelector('.parent-details p');
        if (childInfo && this.currentUser.student_email) {
            // Get student info from database
            const student = window.authDB.getUserByEmail(this.currentUser.student_email);
            if (student) {
                childInfo.textContent = `Parent of ${student.full_name} (${student.current_grade || 'Grade Unknown'})`;
            }
        }
    }

    personalizeTeacherDashboard() {
        // Update welcome message
        const welcomeElement = document.getElementById('teacher-welcome');
        if (welcomeElement) {
            welcomeElement.textContent = `Welcome, ${this.currentUser.full_name}!`;
        }
    }

    redirectToLogin() {
        // Redirect to login page if no user is authenticated
        console.log('No authenticated user found, redirecting to login');
        window.location.href = '../signin.html';
    }

    logout() {
        // Clear user data and redirect to login
        localStorage.removeItem('currentUserEmail');
        window.location.href = '../signin.html';
    }
}

// Initialize dashboard authentication when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.dashboardAuth = new DashboardAuth();
});

// Global logout function
function logout() {
    if (window.dashboardAuth) {
        window.dashboardAuth.logout();
    }
}
