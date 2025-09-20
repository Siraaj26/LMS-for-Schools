// Sign in form handler with SQLite database
document.getElementById('signinForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Get form values
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    
    // Check if fields are filled
    if (!email || !password) {
        alert('Please fill in all fields!');
        return;
    }
    
    try {
        // Try to sign in with local database
        const authResult = window.authDB.authenticate(email, password);
        
        if (!authResult.success) {
            alert('Sign in failed: ' + authResult.error);
            return;
        }
        
        const user = authResult.user;
        console.log('Sign in successful:', user);
        
        alert('Sign in successful! Welcome, ' + user.full_name);
        
        // Store user email for dashboard personalization
        localStorage.setItem('currentUserEmail', user.email);
        
        // Redirect based on user type
        if (user.user_type === 'student') {
            window.location.href = 'student/student_dash.html?user=' + encodeURIComponent(user.email);
        } else if (user.user_type === 'parent') {
            window.location.href = 'parent/parent_dash.html?user=' + encodeURIComponent(user.email);
        } else if (user.user_type === 'teacher') {
            window.location.href = 'teacher/teacher_dash.html?user=' + encodeURIComponent(user.email);
        } else {
            window.location.href = 'student/student_dash.html?user=' + encodeURIComponent(user.email); // default
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong. Please try again.');
    }
});

// Sign in functionality is now handled by the SQLite database