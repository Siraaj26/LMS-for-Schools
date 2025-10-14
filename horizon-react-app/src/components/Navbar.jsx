import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { supabaseClient } from '../config/supabaseConfig';

function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        checkUser();
    }, []);

    const checkUser = async () => {
        try {
            // Check if user is logged in via localStorage (custom auth)
            const userEmail = localStorage.getItem('userEmail');
            const userType = localStorage.getItem('userType');
            
            if (userEmail && userType) {
                setUser({ 
                    email: userEmail, 
                    user_type: userType,
                    id: localStorage.getItem('userId')
                });
            } else {
                setUser(null);
            }
        } catch (error) {
            setUser(null);
        }
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleSignOut = async () => {
        try {
            // Clear local storage (custom auth)
            localStorage.removeItem('userEmail');
            localStorage.removeItem('currentUserEmail');
            localStorage.removeItem('userId');
            localStorage.removeItem('userType');
            localStorage.removeItem('userFullName');
            localStorage.removeItem('userGrade');
            localStorage.removeItem('userLocation');
            
            setUser(null);
            // Redirect to landing page
            navigate('/');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <nav className="navbar">
            {/* Logo Section */}
            <div className="nav-logo">
                <Link to="/" className="brand-link" title="Go to Home">
                    <span className="brand-name">Horizon Academy</span>
                </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="mobile-toggle" onClick={toggleMobileMenu}>
                <span></span>
                <span></span>
                <span></span>
            </div>

            {/* Navigation Links */}
            <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
                <Link 
                    to={user ? "/student/dashboard" : "/"} 
                    className={`nav-link ${(location.pathname === '/' || location.pathname === '/student/dashboard') ? 'active' : ''}`}
                >
                    Home
                </Link>
                <Link 
                    to="/askme" 
                    className={`nav-link ${location.pathname === '/askme' ? 'active' : ''}`}
                >
                    🤖 AskMe! AI
                </Link>
                <Link 
                    to="/student/academics" 
                    className={`nav-link ${location.pathname === '/student/academics' ? 'active' : ''}`}
                >
                    📚 Academics
                </Link>
                <Link 
                    to="/rewards" 
                    className={`nav-link ${location.pathname === '/rewards' ? 'active' : ''}`}
                >
                    🏆 Rewards
                </Link>
                <Link 
                    to="/inbox" 
                    className={`nav-link ${location.pathname === '/inbox' ? 'active' : ''}`}
                >
                    📬 Inbox
                </Link>
            </div>

            {/* User Actions */}
            <div className="navbar-actions">
                {user ? (
                    // Signed-in user actions
                    <div className="signed-in-actions">
                        <div 
                            className="profile-dropdown-container"
                            onMouseEnter={() => setIsProfileDropdownOpen(true)}
                            onMouseLeave={() => setIsProfileDropdownOpen(false)}
                        >
                            <button 
                                className="navbar-icon-btn profile-btn"
                                title="Profile Menu"
                            >
                                <span className="btn-text">Profile</span>
                            </button>
                            {isProfileDropdownOpen && (
                            <div className="navbar-dropdown">
                                <button onClick={() => navigate('/student/academics')} className="dropdown-item">
                                    Academics
                                </button>
                                <button onClick={() => navigate('/rewards')} className="dropdown-item">
                                    Rewards
                                </button>
                                <div className="dropdown-divider"></div>
                                <button onClick={handleSignOut} className="dropdown-item signout">
                                    Sign Out
                                </button>
                            </div>
                            )}
                        </div>
                    </div>
                ) : (
                    // Non-signed-in user actions
                    <div className="auth-actions">
                        <button 
                            className="apple-button secondary small"
                            onClick={() => navigate('/signin')}
                        >
                            Sign In
                        </button>
                        <button 
                            className="apple-button primary small"
                            onClick={() => navigate('/signup')}
                        >
                            Get Started
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;