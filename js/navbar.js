// Navbar JavaScript Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize navbar functionality after components are loaded
    setTimeout(initializeNavbar, 100);
});

function initializeNavbar() {
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
        // Toggle dropdown on click
        profileDropdown.addEventListener('click', function(event) {
            event.stopPropagation();
            const isVisible = dropdown.style.opacity === '1';

            if (isVisible) {
                dropdown.style.opacity = '0';
                dropdown.style.visibility = 'hidden';
                dropdown.style.transform = 'translateY(-10px)';
            } else {
                dropdown.style.opacity = '1';
                dropdown.style.visibility = 'visible';
                dropdown.style.transform = 'translateY(0)';
            }
        });

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
        const linkHref = link.getAttribute('href');
        if (linkHref) {
            // Check if current page matches the link
            if (currentPage.includes(linkHref.replace('/html/', '')) || 
                (link.id === 'homeLink' && currentPage.includes('student_dash.html'))) {
                link.classList.add('active');
                link.style.background = 'rgba(255, 255, 255, 0.2)';
                link.style.color = 'white';
            }
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
                    behavior: 'smooth'
                });
            }
        });
    });
}

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
