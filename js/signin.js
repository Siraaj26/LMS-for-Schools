// Simple sign in form handler with Supabase
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
        // Try to sign in with Supabase
        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password
        });
        
        if (error) {
            alert('Sign in failed: ' + error.message);
            return;
        }
        
        if (data.user) {
            // Get user type from database
            var userType = await getUserType(email);
            
            alert('Sign in successful! Welcome, ' + data.user.email);
            
            // Redirect based on user type
            if (userType === 'student') {
                window.location.href = 'student/student_dash.html';
            } else if (userType === 'parent') {
                window.location.href = 'parent/parent_dash.html';
            } else if (userType === 'teacher') {
                window.location.href = 'teacher/teacher_dash.html';
            } else {
                window.location.href = 'student/student_dash.html'; // default
            }
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong. Please try again.');
    }
});

// Simple function to get user type from database
async function getUserType(email) {
    try {
        // Check student table
        const { data: studentData } = await supabaseClient
            .from('student_login')
            .select('user_type')
            .eq('email', email)
            .single();
            
        if (studentData) {
            return studentData.user_type;
        }
        
        // Check parent table
        const { data: parentData } = await supabaseClient
            .from('parent_login')
            .select('user_type')
            .eq('parent_email', email)
            .single();
            
        if (parentData) {
            return parentData.user_type;
        }
        
        // Check teacher table
        const { data: teacherData } = await supabaseClient
            .from('admin_login')
            .select('user_type')
            .eq('email', email)
            .single();
            
        if (teacherData) {
            return teacherData.user_type;
        }
        
        return 'student'; // default
    } catch (error) {
        console.error('Error getting user type:', error);
        return 'student'; // default
    }
}