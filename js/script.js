function loadNavbar() {
    const path = window.location.pathname.includes('/html/') ? 'components/navbar.html' : 'html/components/navbar.html';
    
    fetch(path)
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar').innerHTML = data;
            initializeNavbar();
        })
        .catch(error => console.error('Error loading the navbar:', error));
}

function loadFooter(){
    const path = window.location.pathname.includes('/html/') ? 'components/footer.html' : 'html/components/footer.html';
    
    fetch(path)
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        })
        .catch(error => console.error('Error loading the footer:', error));
}

function initializeNavbar() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    const signInBtns = document.querySelectorAll('#signInBtn, #heroSignInBtn');
    const signUpBtns = document.querySelectorAll('#signUpBtn, #heroSignUpBtn, #stepsSignUpBtn, #futureSignUpBtn');

    signInBtns.forEach(btn => {
        btn.addEventListener('click', handleSignIn);
    });

    signUpBtns.forEach(btn => {
        btn.addEventListener('click', handleSignUp);
    });
}

function initializeFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const answerId = question.getAttribute('data-faq');
            const answer = document.querySelector(`[data-answer="${answerId}"]`);
            
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                    const otherAnswer = item.querySelector('.faq-answer');
                    if (otherAnswer) {
                        otherAnswer.classList.remove('active');
                    }
                }
            });
            
            faqItem.classList.toggle('active');
            if (answer) {
                answer.classList.toggle('active');
            }
        });
    });
}

function initializeNavbarScroll() {
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.style.background = 'linear-gradient(135deg, rgba(26, 32, 44, 0.98), rgba(45, 55, 72, 0.98))';
                navbar.style.boxShadow = '0 15px 50px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                navbar.style.borderColor = 'rgba(255, 255, 255, 0.25)';
            } else {
                navbar.style.background = 'linear-gradient(135deg, rgba(26, 32, 44, 0.95), rgba(45, 55, 72, 0.95))';
                navbar.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
                navbar.style.borderColor = 'rgba(255, 255, 255, 0.15)';
            }
        }
    });
}

function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.feature-card, .step, .roadmap-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadNavbar();
    loadFooter();
    
    if (typeof initializeSupabase === 'function') {
        initializeSupabase();
    }
    
    setTimeout(() => {
        initializeFAQ();
        initializeNavbarScroll();
        initializeAnimations();
    }, 100);
    
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('auth-modal-overlay')) {
            closeAuthModal();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAuthModal();
        }
    });
});