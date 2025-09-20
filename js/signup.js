// Simple signup form handler
document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    var userType = document.getElementById('userType').value;
    var fullName = document.getElementById('studentFullName').value;
    var email = document.getElementById('studentEmail').value;
    var password = document.getElementById('studentPassword').value;
    var confirmPassword = document.getElementById('confirmPassword').value;
    
    // Check if user type is selected
    if (!userType) {
        alert('Please select your role!');
        return;
    }
    
    // Check if passwords match
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    // Check if all required fields are filled
    if (!fullName || !email || !password) {
        alert('Please fill in all required fields!');
        return;
    }
    
    // Show success message with user type
    alert('Account created successfully as ' + userType + '! Welcome, ' + fullName);
    
    // Redirect to appropriate dashboard
    if (userType === 'student') {
        window.location.href = 'student/student_dash.html';
    } else if (userType === 'parent') {
        window.location.href = 'parent/parent_dash.html';
    } else if (userType === 'teacher') {
        window.location.href = 'teacher/teacher_dash.html';
    } else {
        window.location.href = 'index.html';
    }
});