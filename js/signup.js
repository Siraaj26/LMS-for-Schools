// Simple signup form handler
document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    var studentName = document.getElementById('studentFullName').value;
    var studentEmail = document.getElementById('studentEmail').value;
    var studentPassword = document.getElementById('studentPassword').value;
    var confirmPassword = document.getElementById('confirmPassword').value;
    var currentGrade = document.getElementById('currentGrade').value;
    var phoneNumber = document.getElementById('phoneNumber').value;
    var location = document.getElementById('location').value;
    var targetUniversity = document.getElementById('targetUniversity').value;
    var parentName = document.getElementById('parentFullName').value;
    var parentEmail = document.getElementById('parentEmail').value;
    var parentPhone = document.getElementById('parentPhoneNumber').value;
    
    // Check if passwords match
    if (studentPassword !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    // Check if all fields are filled
    if (!studentName || !studentEmail || !studentPassword || !currentGrade || !phoneNumber || !location || !targetUniversity || !parentName || !parentEmail || !parentPhone) {
        alert('Please fill in all fields!');
        return;
    }
    
    // Show success message
    alert('Account created successfully!');
    
    // Go back to main page
    window.location.href = '../html/index.html';
});