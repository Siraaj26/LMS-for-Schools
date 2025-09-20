document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');
    
    signupForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    var fullName = document.getElementById('studentFullName').value;
    var email = document.getElementById('studentEmail').value;
    var password = document.getElementById('studentPassword').value;
    var confirmPassword = document.getElementById('confirmPassword').value;
    var currentGrade = document.getElementById('currentGrade').value;
    var phoneNumber = document.getElementById('phoneNumber').value;
    var location = document.getElementById('location').value;
    var targetUniversity = document.getElementById('targetUniversity').value;
    var parentName = document.getElementById('parentFullName').value;
    var parentEmail = document.getElementById('parentEmail').value;
    var parentPhone = document.getElementById('parentPhoneNumber').value;
    
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    if (!fullName || !email || !password || !currentGrade || !phoneNumber || !location || !targetUniversity || !parentName || !parentEmail || !parentPhone) {
        alert('Please fill in all required fields!');
        return;
    }
    
    try {
        // Check if student email already exists
        if (window.authDB.userExists(email)) {
            alert('Student email already exists! Please use a different email.');
            return;
        }
        
        // Create student account
        const studentData = {
            email: email,
            password: password,
            user_type: 'student',
            full_name: fullName,
            parent_email: parentEmail,
            phone_number: phoneNumber,
            current_grade: currentGrade,
            location: location,
            target_university: targetUniversity
        };
        
            const studentUser = window.authDB.createUser(studentData);
            
            // Try to create parent account
            try {
                if (window.authDB.userExists(parentEmail)) {
                    // Parent exists, continue
                } else {
                    const parentPassword = 'temp_password_' + Date.now();
                    const parentData = {
                        email: parentEmail,
                        password: parentPassword,
                        user_type: 'parent',
                        full_name: parentName,
                        phone_number: parentPhone,
                        student_email: email
                    };
                    
                    const parentUser = window.authDB.createUser(parentData);
                }
            } catch (parentError) {
                console.error('Parent creation error:', parentError);
            }
            
            // Redirect to student dashboard
            window.location.href = 'student/student_dash.html?user=' + encodeURIComponent(email);
    } catch (error) {
        alert('Something went wrong. Please try again.');
    }
    });
});