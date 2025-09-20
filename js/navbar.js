// PathFinder Navbar JavaScript Functionality
console.log("Navbar JS loaded.");

class NavbarManager {
    constructor() {
        this.init();
    }

    init() {
        this.highlightActivePage();
        this.addMobileToggle();
        this.addSmoothScrolling();
        this.handleUserAuthState();
        this.addNavigationListeners();
    }

    // Highlight the current active page in navigation
    highlightActivePage() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.navbar a');

        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                link.classList.add('active');
            }
        });
    }

    // Add mobile hamburger menu functionality
    addMobileToggle() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        // Create mobile toggle button
        const mobileToggle = document.createElement('button');
        mobileToggle.className = 'mobile-toggle';
        mobileToggle.innerHTML = '☰';
        mobileToggle.style.display = 'none';

        // Insert toggle button at the beginning of navbar
        navbar.insertBefore(mobileToggle, navbar.firstChild);

        // Toggle mobile menu
        mobileToggle.addEventListener('click', () => {
            navbar.classList.toggle('mobile-open');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navbar.contains(e.target)) {
                navbar.classList.remove('mobile-open');
            }
        });
    }

    // Add smooth scrolling for internal links
    addSmoothScrolling() {
        const navLinks = document.querySelectorAll('.navbar a[href^="#"]');

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Handle user authentication state display
    handleUserAuthState() {
        // Check if user is logged in (you can integrate with Supabase here)
        const isLoggedIn = this.checkAuthStatus();
        const navbar = document.querySelector('.navbar');

        if (!navbar) return;

        if (isLoggedIn) {
            // Add user menu or profile indicator
            this.addUserMenu();
        } else {
            // Add login/register buttons
            this.addAuthButtons();
        }
    }

    checkAuthStatus() {
        // Placeholder - integrate with your Supabase auth
        // return supabase.auth.getUser() !== null;
        return localStorage.getItem('pathfinder_user') !== null;
    }

    addUserMenu() {
        const navbar = document.querySelector('.navbar');
        const userMenu = document.createElement('div');
        userMenu.className = 'user-menu';
        userMenu.innerHTML = `
            <button class="user-profile-btn">👤 Profile</button>
            <div class="dropdown-menu">
                <a href="profile.html">My Profile</a>
                <a href="settings.html">Settings</a>
                <a href="#" onclick="navbarManager.logout()">Logout</a>
            </div>
        `;
        navbar.appendChild(userMenu);

        // Toggle dropdown
        const profileBtn = userMenu.querySelector('.user-profile-btn');
        profileBtn.addEventListener('click', () => {
            userMenu.classList.toggle('dropdown-open');
        });
    }

    addAuthButtons() {
        const navbar = document.querySelector('.navbar');
        const authButtons = document.createElement('div');
        authButtons.className = 'auth-buttons';
        authButtons.innerHTML = `
            <a href="login.html" class="login-btn">Login</a>
            <a href="register.html" class="register-btn">Sign Up</a>
        `;
        navbar.appendChild(authButtons);
    }

    // Navigation event listeners
    addNavigationListeners() {
        const navLinks = document.querySelectorAll('.navbar a');

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Add loading state for page transitions
                if (!link.getAttribute('href').startsWith('#')) {
                    this.showLoadingState();
                }

                // Track navigation analytics (if needed)
                this.trackNavigation(link.getAttribute('href'));
            });
        });
    }

    showLoadingState() {
        // Add a subtle loading indicator
        const navbar = document.querySelector('.navbar');
        navbar.classList.add('loading');

        // Remove loading state after a short delay
        setTimeout(() => {
            navbar.classList.remove('loading');
        }, 500);
    }

    trackNavigation(href) {
        // Track page navigation for analytics
        console.log(`Navigating to: ${href}`);
        // You can integrate with Google Analytics or other tracking here
    }

    // Utility methods
    logout() {
        localStorage.removeItem('pathfinder_user');
        window.location.href = 'index.html';
    }

    // Update navigation based on user progress (for learning paths)
    updateProgressIndicators() {
        const navLinks = document.querySelectorAll('.navbar a');
        const userProgress = this.getUserProgress();

        navLinks.forEach(link => {
            const page = link.getAttribute('href');
            if (userProgress[page]) {
                link.classList.add('completed');
            }
        });
    }

    getUserProgress() {
        // Placeholder - get user progress from localStorage or Supabase
        return JSON.parse(localStorage.getItem('user_progress') || '{}');
    }

    // Search functionality
    addSearchFeature() {
        const navbar = document.querySelector('.navbar');
        const searchContainer = document.createElement('div');
        searchContainer.className = 'navbar-search';
        searchContainer.innerHTML = `
            <input type="text" placeholder="Search courses..." class="search-input">
            <button class="search-btn">🔍</button>
        `;

        navbar.appendChild(searchContainer);

        const searchInput = searchContainer.querySelector('.search-input');
        const searchBtn = searchContainer.querySelector('.search-btn');

        searchBtn.addEventListener('click', () => {
            this.performSearch(searchInput.value);
        });

        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.performSearch(searchInput.value);
            }
        });
    }

    performSearch(query) {
        if (query.trim()) {
            // Redirect to search results or filter current page
            console.log(`Searching for: ${query}`);
            // window.location.href = `search.html?q=${encodeURIComponent(query)}`;
        }
    }
}

// Initialize navbar when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.navbarManager = new NavbarManager();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NavbarManager;
}
