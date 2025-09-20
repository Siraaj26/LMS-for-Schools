// Simple signup form handler for students only
document.getElementById('signupForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Get form values
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
    
    // Check if passwords match
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    // Check if all required fields are filled
    if (!fullName || !email || !password || !currentGrade || !phoneNumber || !location || !targetUniversity || !parentName || !parentEmail || !parentPhone) {
        alert('Please fill in all required fields!');
        return;
    }
    
    try {
        // Create student account with Supabase
        const { data, error } = await supabaseClient.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    full_name: fullName,
                    user_type: 'student'
                }
            }
        });
        
        if (error) {
            alert('Sign up failed: ' + error.message);
            return;
        }
        
        if (data.user) {
            // Insert student data into student_login table
            await supabaseClient
                .from('student_login')
                .insert([
                    {
                        full_name: fullName,
                        email: email,
                        password: password,
                        user_type: 'student',
                        parent_email: parentEmail,
                        phone_number: phoneNumber,
                        current_grade: currentGrade,
                        location: location,
                        target_university: targetUniversity
                    }
                ]);
            
            // Insert parent data into parent_login table
            await supabaseClient
                .from('parent_login')
                .insert([
                    {
                        full_name: parentName,
                        parent_email: parentEmail,
                        phone_number: parentPhone,
                        password: 'temp_password_' + Date.now(),
                        user_type: 'parent',
                        student_email: email
                    }
                ]);
            
            alert('Student account created successfully! Welcome, ' + fullName);
            
            // Redirect to student dashboard
            window.location.href = 'student/student_dash.html';
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong. Please try again.');
    }
});