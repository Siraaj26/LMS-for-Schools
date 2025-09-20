// Navbar JavaScript Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle functionality
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', function() {
            // Toggle mobile menu
            navLinks.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
    }

    // Profile dropdown functionality
    const profileDropdown = document.getElementById('profileDropdown');
    const dropdown = document.getElementById('dropdown');

    if (profileDropdown && dropdown) {
        // Close dropdown when clicking outside
        document.addEventListener('click', function(event) {
            if (!profileDropdown.contains(event.target)) {
                dropdown.style.opacity = '0';
                dropdown.style.visibility = 'hidden';
                dropdown.style.transform = 'translateY(-10px)';
            }
        });

        // Prevent dropdown from closing when clicking inside it
        dropdown.addEventListener('click', function(event) {
            event.stopPropagation();
        });
    }

    // Active page highlighting
    const currentPage = window.location.pathname;
    const navLinksElements = document.querySelectorAll('.nav-link');

    navLinksElements.forEach(link => {
        if (link.getAttribute('href') && currentPage.includes(link.getAttribute('href').replace('../', ''))) {
            link.classList.add('active');
            link.style.background = 'rgba(255, 255, 255, 0.2)';
            link.style.color = 'white';
        }
    });

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll effect to navbar
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');

    if (navbar) {
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (scrollTop > 100) {
                navbar.style.background = 'rgba(30, 58, 138, 0.95)';
                navbar.style.backdropFilter = 'blur(20px)';
            } else {
                navbar.style.background = 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)';
                navbar.style.backdropFilter = 'blur(10px)';
            }

            lastScrollTop = scrollTop;
        });
    }

    // Search functionality (if search input exists)
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            // Add your search logic here
            console.log('Searching for:', searchTerm);
        });
    }

    // Notification handling
    const notificationBell = document.querySelector('.notification-bell');
    if (notificationBell) {
        notificationBell.addEventListener('click', function() {
            // Add notification logic here
            console.log('Notifications clicked');
        });
    }
});

// Utility function to update user avatar
function updateUserAvatar(avatarUrl) {
    const userAvatar = document.getElementById('userAvatar');
    if (userAvatar && avatarUrl) {
        userAvatar.src = avatarUrl;
    }
}

// Utility function to update username
function updateUsername(username) {
    const usernameElement = document.querySelector('.username');
    if (usernameElement && username) {
        usernameElement.textContent = username;
    }
}

// Function to handle logout
function handleLogout() {
    // Add logout logic here
    console.log('Logging out...');
    // Example: redirect to login page
    // window.location.href = '../login.html';
}

// Export functions for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        updateUserAvatar,
        updateUsername,
        handleLogout
    };
}
