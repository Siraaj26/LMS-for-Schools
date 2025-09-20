// Simple sign in form handler
document.getElementById('signinForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    
    // Check if fields are filled
    if (!email || !password) {
        alert('Please fill in all fields!');
        return;
    }
    
    // Show success message
    alert('Sign in successful!');
    
    // Go to dashboard (for now, go back to main page)
    window.location.href = 'index.html';
});
