import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabaseClient } from '../config/supabaseConfig';
import '../styles/apple-landing.css';

function AppleLanding() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        checkUser();
        
        const handleScroll = () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.hero-section::before');
            parallaxElements.forEach(element => {
                const speed = 0.5;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        };

        let ticking = false;
        const optimizedScrollHandler = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', optimizedScrollHandler, { passive: true });
        
        return () => {
            window.removeEventListener('scroll', optimizedScrollHandler);
        };
    }, []);

    const checkUser = async () => {
        try {
            const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
            const { data: { session }, error: sessionError } = await supabaseClient.auth.getSession();
            
            // Don't auto-redirect authenticated users from landing page
            // Let them stay on landing page if they want to
            if (user && session && !userError && !sessionError) {
                console.log('User is authenticated, showing landing page with user context');
                setUser(user);
                setLoading(false);
                return;
            }
        } catch (error) {
            console.log('Error checking user session:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleGetStarted = () => {
        navigate('/signup');
    };

    const handleSignIn = () => {
        navigate('/signin');
    };


    if (loading) {
        return (
            <div className="apple-landing">
                <div className="hero-section">
                    <div className="hero-content">
                        <h1 className="hero-title">Horizon</h1>
                        <p className="hero-subtitle">Leading you to discovery, progress, and direction</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="apple-landing">
            {/* Navigation Bar */}
            <nav className="apple-navbar">
                <div className="navbar-container">
                    <div className="navbar-brand">
                        <h2 className="brand-text" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Horizon</h2>
                    </div>
                    <div className="navbar-links">
                        <a href="#features" className="nav-link">Features</a>
                        <a href="#why-choose" className="nav-link">Why</a>
                        <a href="#pricing" className="nav-link">Pricing</a>
                    </div>
                    <div className="navbar-actions">
                        {user ? (
                            // Authenticated user actions
                            <>
                                <button 
                                    className="apple-button secondary small"
                                    onClick={() => navigate('/student/dashboard')}
                                >
                                    📊 Dashboard
                                </button>
                                <button 
                                    className="apple-button primary small"
                                    onClick={() => navigate('/student/academics')}
                                >
                                    📚 Academics
                                </button>
                            </>
                        ) : (
                            // Non-authenticated user actions
                            <>
                                <button 
                                    className="apple-button secondary small"
                                    onClick={handleSignIn}
                                >
                                    Sign In
                                </button>
                                <button 
                                    className="apple-button primary small"
                                    onClick={handleGetStarted}
                                >
                                    Get Started
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {/* Main Landing Page Content */}
            <>
                    {/* Main Hero Section */}
                    <section className="hero-section" id="hero">
                        <div className="hero-content">
                            <h1 className="hero-title">Horizon</h1>
                            {user ? (
                                <>
                                    <p className="hero-subtitle">
                                        Welcome back, {user.email?.split('@')[0]}!<br />
                                        Ready to continue your educational journey?
                                    </p>
                                    <div className="hero-actions">
                                        <button 
                                            className="apple-button primary"
                                            onClick={() => navigate('/student/dashboard')}
                                        >
                                            📊 Go to Dashboard
                                            <svg className="button-arrow" viewBox="0 0 24 24" fill="none">
                                                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </button>
                                        <button 
                                            className="apple-button secondary"
                                            onClick={() => navigate('/student/academics')}
                                        >
                                            📚 View Academics
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <p className="hero-subtitle">
                                        Leading students to discovery, progress, and direction.<br />
                                        Your educational journey begins here.
                                    </p>
                                    <div className="hero-actions">
                                        <button 
                                            className="apple-button primary"
                                            onClick={handleGetStarted}
                                        >
                                            Begin Journey
                                            <svg className="button-arrow" viewBox="0 0 24 24" fill="none">
                                                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </button>
                                        <button 
                                            className="apple-button secondary"
                                            onClick={handleSignIn}
                                        >
                                            Sign In
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </section>

                    {/* Features Section */}
                    <section className="features-section" id="features">
                        <div className="section-content">
                            <h2 className="section-title">Designed for your learning journey</h2>
                            <div className="features-showcase">
                                <div className="feature-highlight">
                                    <div className="feature-visual">
                                        <div className="feature-icon-large">
                                            <svg viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="feature-content">
                                        <h3 className="feature-title">Discovery</h3>
                                        <p className="feature-description">
                                            Uncover your potential through personalized learning paths 
                                            and explore new horizons in education.
                                        </p>
                                        <div className="feature-benefits">
                                            <span className="benefit-tag">AI-Powered</span>
                                            <span className="benefit-tag">Personalized</span>
                                            <span className="benefit-tag">Adaptive</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="features-grid">
                                <div className="feature-item">
                                    <div className="feature-icon">
                                        <svg viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
                                        </svg>
                                    </div>
                                    <h3 className="feature-title">Progress</h3>
                                    <p className="feature-description">
                                        Track your academic journey with real-time insights 
                                        and celebrate every milestone achieved.
                                    </p>
                                </div>

                                <div className="feature-item">
                                    <div className="feature-icon">
                                        <svg viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                        </svg>
                                    </div>
                                    <h3 className="feature-title">Direction</h3>
                                    <p className="feature-description">
                                        Find your path forward with AI-powered guidance 
                                        and mentorship from experienced educators.
                                    </p>
                                </div>

                                <div className="feature-item">
                                    <div className="feature-icon">
                                        <svg viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                        </svg>
                                    </div>
                                    <h3 className="feature-title">Achievement</h3>
                                    <p className="feature-description">
                                        Reach new heights with comprehensive support 
                                        for both curriculum and extracurricular activities.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Why Choose Horizon Section */}
                    <section className="why-section" id="why-choose">
                        <div className="section-content">
                            <div className="why-header">
                                <h2 className="section-title">Why choose Horizon?</h2>
                                <p className="section-subtitle">Three reasons that make all the difference</p>
                            </div>
                            <div className="why-container">
                                <div className="why-content">
                                    <div className="why-grid">
                                        <div className="why-item">
                                            <div className="why-number">01</div>
                                            <div className="why-text">
                                                <h3>Personalized Learning</h3>
                                                <p>AI-powered curriculum that adapts to your learning style and pace, ensuring every student reaches their full potential.</p>
                                            </div>
                                        </div>
                                        <div className="why-item">
                                            <div className="why-number">02</div>
                                            <div className="why-text">
                                                <h3>Global Community</h3>
                                                <p>Connect with students and educators from around the world, fostering collaboration and cultural exchange.</p>
                                            </div>
                                        </div>
                                        <div className="why-item">
                                            <div className="why-number">03</div>
                                            <div className="why-text">
                                                <h3>Real-time Progress</h3>
                                                <p>Track your academic journey with detailed analytics and insights that help you stay on the path to success.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="why-visual">
                                    <div className="why-image-container">
                                        <img src="/images/hero.jpeg" alt="Students collaborating in a modern learning environment" />
                                        <div className="image-overlay"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Pricing Section */}
                    <section className="pricing-section" id="pricing">
                        <div className="section-content">
                            <div className="pricing-header">
                                <h2 className="section-title">Choose your learning path</h2>
                                <p className="section-subtitle">Flexible plans designed for every student</p>
                            </div>
                            <div className="pricing-grid">
                                <div className="pricing-card">
                                    <div className="pricing-card-content">
                                        <div className="pricing-header">
                                            <h3 className="pricing-title">Student</h3>
                                            <div className="pricing-price">
                                                <span className="price-currency">R</span>
                                                <span className="price-amount">99</span>
                                                <span className="price-period">/month</span>
                                            </div>
                                        </div>
                                        <div className="pricing-features">
                                            <div className="feature-item">
                                                <div className="feature-check">
                                                    <svg viewBox="0 0 24 24" fill="none">
                                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                </div>
                                                <span>Personalized learning paths</span>
                                            </div>
                                            <div className="feature-item">
                                                <div className="feature-check">
                                                    <svg viewBox="0 0 24 24" fill="none">
                                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                </div>
                                                <span>Progress tracking</span>
                                            </div>
                                            <div className="feature-item">
                                                <div className="feature-check">
                                                    <svg viewBox="0 0 24 24" fill="none">
                                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                </div>
                                                <span>Global community access</span>
                                            </div>
                                        </div>
                                        <button className="apple-button secondary">Get Started</button>
                                    </div>
                                </div>
                                
                                <div className="pricing-card featured">
                                    <div className="pricing-badge">Most Popular</div>
                                    <div className="pricing-card-content">
                                        <div className="pricing-header">
                                            <h3 className="pricing-title">Premium</h3>
                                            <div className="pricing-price">
                                                <span className="price-currency">R</span>
                                                <span className="price-amount">199</span>
                                                <span className="price-period">/month</span>
                                            </div>
                                        </div>
                                        <div className="pricing-features">
                                            <div className="feature-item">
                                                <div className="feature-check">
                                                    <svg viewBox="0 0 24 24" fill="none">
                                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                </div>
                                                <span>Everything in Student</span>
                                            </div>
                                            <div className="feature-item">
                                                <div className="feature-check">
                                                    <svg viewBox="0 0 24 24" fill="none">
                                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                </div>
                                                <span>1-on-1 mentorship</span>
                                            </div>
                                            <div className="feature-item">
                                                <div className="feature-check">
                                                    <svg viewBox="0 0 24 24" fill="none">
                                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                </div>
                                                <span>Career guidance</span>
                                            </div>
                                            <div className="feature-item">
                                                <div className="feature-check">
                                                    <svg viewBox="0 0 24 24" fill="none">
                                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                </div>
                                                <span>Advanced analytics</span>
                                            </div>
                                        </div>
                                        <button className="apple-button primary">Get Started</button>
                                    </div>
                                </div>
                                
                                <div className="pricing-card">
                                    <div className="pricing-card-content">
                                        <div className="pricing-header">
                                            <h3 className="pricing-title">Family</h3>
                                            <div className="pricing-price">
                                                <span className="price-currency">R</span>
                                                <span className="price-amount">399</span>
                                                <span className="price-period">/month</span>
                                            </div>
                                        </div>
                                        <div className="pricing-features">
                                            <div className="feature-item">
                                                <div className="feature-check">
                                                    <svg viewBox="0 0 24 24" fill="none">
                                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                </div>
                                                <span>Up to 4 students</span>
                                            </div>
                                            <div className="feature-item">
                                                <div className="feature-check">
                                                    <svg viewBox="0 0 24 24" fill="none">
                                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                </div>
                                                <span>Parent dashboard</span>
                                            </div>
                                            <div className="feature-item">
                                                <div className="feature-check">
                                                    <svg viewBox="0 0 24 24" fill="none">
                                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                </div>
                                                <span>Family progress reports</span>
                                            </div>
                                        </div>
                                        <button className="apple-button secondary">Get Started</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Final CTA Section */}
                    <section className="cta-section">
                        <div className="section-content">
                            <h2 className="section-title">Ready to begin your journey?</h2>
                            <p className="cta-subtitle">
                                Join thousands of students already discovering their potential with Horizon.
                            </p>
                            <div className="cta-actions">
                                <button 
                                    className="apple-button primary large"
                                    onClick={handleGetStarted}
                                >
                                    Get Started
                                </button>
                            </div>
                        </div>
                    </section>
            </>
        </div>
    );
}

export default AppleLanding;