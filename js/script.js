// Simple FAQ functionality
function setupFAQ() {
    const questions = document.querySelectorAll('.faq-question');
    
    questions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.parentElement.querySelector('.faq-answer');
            
            // Close other answers
            questions.forEach(otherQuestion => {
                if (otherQuestion !== this) {
                    const otherAnswer = otherQuestion.parentElement.querySelector('.faq-answer');
                    otherAnswer.classList.remove('active');
                    otherQuestion.parentElement.classList.remove('active');
                }
            });
            
            // Toggle current answer
            answer.classList.toggle('active');
            this.parentElement.classList.toggle('active');
        });
    });
}

// Set up buttons
function setupButtons() {
    const signInBtn = document.getElementById('heroSignInBtn');
    const signUpBtn2 = document.getElementById('stepsSignUpBtn');
    const signUpBtn3 = document.getElementById('futureSignUpBtn');
    
    if (signInBtn) {
        signInBtn.addEventListener('click', function() {
            window.location.href = 'signin.html';
        });
    }
    
    if (signUpBtn2) {
        signUpBtn2.addEventListener('click', function() {
            window.location.href = 'signup.html';
        });
    }
    
    if (signUpBtn3) {
        signUpBtn3.addEventListener('click', function() {
            window.location.href = 'signup.html';
        });
    }
}

// When page loads
document.addEventListener('DOMContentLoaded', function() {
    setupFAQ();
    setupButtons();
});