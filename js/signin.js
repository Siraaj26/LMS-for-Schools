// Simple sign in form handler
document.getElementById('signinForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    
    console.log('Email entered:', email);
    console.log('Password entered:', password);
    
    // Check if fields are filled
    if (!email || !password) {
        alert('Please fill in all fields!');
        return;
    }
    
    // Check user credentials
    var userInfo = checkUserCredentials(email, password);
    console.log('User info found:', userInfo);
    
    if (userInfo) {
        alert('Sign in successful! Welcome, ' + userInfo.name + ' (' + userInfo.type + ')');
        
        // Redirect based on user type
        if (userInfo.type === 'student') {
            window.location.href = 'student/student_dash.html';
        } else if (userInfo.type === 'parent') {
            window.location.href = 'parent/parent_dash.html';
        } else if (userInfo.type === 'teacher') {
            window.location.href = 'teacher/teacher_dash.html';
        }
    } else {
        alert('Invalid email or password! Please check your credentials.');
    }
});

// Function to check user credentials against test data
function checkUserCredentials(email, password) {
    // Test users data
    var testUsers = [
        {
            email: 'student@test.com',
            password: 'password123',
            name: 'John Student',
            type: 'student'
        },
        {
            email: 'parent@test.com',
            password: 'password123',
            name: 'Jane Parent',
            type: 'parent'
        },
        {
            email: 'teacher@test.com',
            password: 'password123',
            name: 'Mike Teacher',
            type: 'teacher'
        }
    ];
    
    console.log('Checking credentials against:', testUsers);
    
    // Check if credentials match any test user
    for (var i = 0; i < testUsers.length; i++) {
        console.log('Comparing:', email, '==', testUsers[i].email, ':', email === testUsers[i].email);
        console.log('Comparing:', password, '==', testUsers[i].password, ':', password === testUsers[i].password);
        
        if (testUsers[i].email === email && testUsers[i].password === password) {
            return testUsers[i];
        }
    }
    
    return null;
}