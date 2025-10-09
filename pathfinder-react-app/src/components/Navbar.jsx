import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabaseClient } from '../config/supabaseConfig';

function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        checkUser();
    }, []);

    const checkUser = async () => {
        try {
            const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
            const { data: { session }, error: sessionError } = await supabaseClient.auth.getSession();
            
            if (user && session && !userError && !sessionError) {
                setUser(user);
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

    const toggleProfileDropdown = () => {
        setIsProfileDropdownOpen(!isProfileDropdownOpen);
    };

    const handleSignOut = async () => {
        try {
            await supabaseClient.auth.signOut();
            // Clear local storage
            localStorage.removeItem('userEmail');
            localStorage.removeItem('currentUserEmail');
            localStorage.removeItem('userId');
            localStorage.removeItem('userType');
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
                <Link to="/home" className="nav-link">Home</Link>
                <Link to="/askme" className="nav-link">🤖 AskMe! AI</Link>
                <Link to="/student/academics" className="nav-link">📚 Academics</Link>
                <Link to="/rewards" className="nav-link">🏆 Rewards</Link>
                <Link to="/inbox" className="nav-link">📬 Inbox</Link>
            </div>

            {/* User Actions */}
            <div className="navbar-actions">
                {user ? (
                    // Signed-in user actions
                    <div className="signed-in-actions">
                        <button 
                            className="navbar-icon-btn dashboard-btn"
                            onClick={() => navigate('/student/dashboard')}
                            title="Go to Student Dashboard"
                        >
                            <span className="icon">📊</span>
                            <span className="btn-text">Dashboard</span>
                        </button>
                        <button 
                            className="navbar-icon-btn profile-btn"
                            onClick={toggleProfileDropdown}
                            title="Profile Menu"
                        >
                            <span className="icon">👤</span>
                            <span className="btn-text">Profile</span>
                        </button>
                        {isProfileDropdownOpen && (
                            <div className="navbar-dropdown">
                                <button onClick={() => navigate('/student/dashboard')} className="dropdown-item">
                                    📊 Student Dashboard
                                </button>
                                <button onClick={() => navigate('/student/academics')} className="dropdown-item">
                                    📚 Academics
                                </button>
                                <button onClick={() => navigate('/rewards')} className="dropdown-item">
                                    🏆 Rewards
                                </button>
                                <div className="dropdown-divider"></div>
                                <button onClick={handleSignOut} className="dropdown-item signout">
                                    🚪 Sign Out
                                </button>
                            </div>
                        )}
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