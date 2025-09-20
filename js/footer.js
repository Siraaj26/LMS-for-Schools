// Footer JavaScript - Fixed to allow actual navigation
document.addEventListener('DOMContentLoaded', function() {
    // Social media link interactions
    const socialLinks = document.querySelectorAll('.footer-links a');

    socialLinks.forEach((link, index) => {
        const platforms = ['Instagram', 'Facebook', 'Twitter', 'LinkedIn'];
        const platform = platforms[index];

        // Add click tracking but allow navigation
        link.addEventListener('click', function(e) {
            // Don't prevent default - allow navigation to occur
            console.log(`Navigating to ${platform} social link`);

            // Show quick feedback before navigation
            showSocialClickFeedback(this, platform);

            // Optional: Add analytics tracking here
            // trackSocialClick(platform);
        });

        // Add tooltip on hover
        link.setAttribute('title', `Follow us on ${platform}`);

        // Add hover effects
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.1) rotate(5deg)';
        });

        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1) rotate(0deg)';
        });
    });

    // Footer policy links tracking
    const policyLinks = document.querySelectorAll('.footer-bottom-links a');
    policyLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const linkText = this.textContent.trim();
            console.log(`Footer policy link clicked: ${linkText}`);

            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // Add scroll-to-top functionality when clicking copyright
    const copyrightText = document.querySelector('.footer-bottom p');
    if (copyrightText) {
        copyrightText.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            showMessage('Scrolling to top...', 'info');
        });
        copyrightText.style.cursor = 'pointer';
        copyrightText.title = 'Click to scroll to top';
    }

    // Intersection Observer for footer animation
    observeFooterAnimation();

    // Add floating back-to-top button
    createFloatingBackToTop();
});

// Show quick feedback when social media link is clicked (doesn't prevent navigation)
function showSocialClickFeedback(element, platform) {
    // Create ripple effect
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;

    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = '50%';
    ripple.style.top = '50%';
    ripple.style.marginLeft = -size / 2 + 'px';
    ripple.style.marginTop = -size / 2 + 'px';

    element.style.position = 'relative';
    element.appendChild(ripple);

    // Show brief message (shorter duration since user is navigating away)
    showMessage(`Opening ${platform}...`, 'info', 1000);

    // Remove ripple after animation
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.remove();
        }
    }, 600);
}

// Observe footer for entrance animation
function observeFooterAnimation() {
    const footer = document.querySelector('.footer');
    if (!footer) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate social links one by one
                const socialLinks = footer.querySelectorAll('.footer-links a');
                socialLinks.forEach((link, index) => {
                    setTimeout(() => {
                        link.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s both`;
                    }, index * 100);
                });

                // Animate footer bottom
                const footerBottom = footer.querySelector('.footer-bottom');
                if (footerBottom) {
                    setTimeout(() => {
                        footerBottom.style.animation = 'fadeInUp 0.6s ease-out both';
                    }, socialLinks.length * 100);
                }
            }
        });
    }, { threshold: 0.2 });

    observer.observe(footer);
}

// Create floating back-to-top button
function createFloatingBackToTop() {
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopButton.className = 'back-to-top-btn';
    backToTopButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #3b82f6, #1e40af);
        color: white;
        border: none;
        font-size: 18px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 20px rgba(59, 130, 246, 0.4);
        display: flex;
        align-items: center;
        justify-content: center;
    `;

    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        // Add click animation
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });

    // Hover effects
    backToTopButton.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.boxShadow = '0 6px 25px rgba(59, 130, 246, 0.6)';
    });

    backToTopButton.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 4px 20px rgba(59, 130, 246, 0.4)';
    });

    document.body.appendChild(backToTopButton);

    // Show/hide based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.style.opacity = '1';
            backToTopButton.style.visibility = 'visible';
        } else {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.visibility = 'hidden';
        }
    });
}

// Show message to user (modified to accept duration parameter)
function showMessage(message, type = 'info', duration = 3000) {
    // Remove existing messages
    const existingMessage = document.querySelector('.footer-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = `footer-message footer-message-${type}`;
    messageElement.innerHTML = `
        <i class="fas fa-info-circle"></i>
        <span>${message}</span>
    `;

    // Style the message
    messageElement.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        padding: 12px 20px;
        border-radius: 25px;
        color: white;
        font-weight: 500;
        font-size: 14px;
        z-index: 10001;
        transform: translateX(100%);
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        backdrop-filter: blur(10px);
        max-width: 250px;
    `;

    // Set background color based on type
    const colors = {
        success: 'linear-gradient(135deg, #10b981, #059669)',
        error: 'linear-gradient(135deg, #ef4444, #dc2626)',
        info: 'linear-gradient(135deg, #3b82f6, #2563eb)',
        warning: 'linear-gradient(135deg, #f59e0b, #d97706)'
    };
    messageElement.style.background = colors[type] || colors.info;

    // Add to page
    document.body.appendChild(messageElement);

    // Animate in
    setTimeout(() => {
        messageElement.style.transform = 'translateX(0)';
    }, 100);

    // Auto remove after specified duration
    setTimeout(() => {
        messageElement.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (messageElement.parentNode) {
                messageElement.remove();
            }
        }, 300);
    }, duration);
}

// Add CSS animations for ripple effect
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Export functions for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showMessage,
        showSocialClickFeedback
    };
}
