import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const toggleProfileDropdown = () => {
        setIsProfileDropdownOpen(!isProfileDropdownOpen);
    };

    return (
        <nav className="navbar">
            {/* Logo Section */}
            <div className="nav-logo">
                <Link to="/">
                    <img src="/images/Empiras_Logo-Blue.png" alt="Pathfinder Logo" className="logo" />
                    <span className="brand-name">Pathfinder</span>
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
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/askme" className="nav-link">AskMe!</Link>
                <Link to="/inbox" className="nav-link">Inbox</Link>
                <Link to="/rewards" className="nav-link">🏆 Rewards</Link>
            </div>

            {/* Profile Dropdown */}
            <div className="profile" onClick={toggleProfileDropdown}>
                <img src="/images/avatar.jpg" alt="User Avatar" className="avatar" />
                <span className="username">Student</span>
                <div className="dropdown-arrow">▼</div>
                <div className={`dropdown ${isProfileDropdownOpen ? 'active' : ''}`}>
                    <Link to="/profile-picture">Profile Picture</Link>
                    <Link to="/personal-info">Personal Info</Link>
                    <Link to="/parent-info">Parent/Guardian Info</Link>
                    <Link to="/academic-goals">Academic Goals</Link>
                    <Link to="/reports">Reports</Link>
                    <Link to="/finances">Finances</Link>
                    <Link to="/settings">Settings</Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;