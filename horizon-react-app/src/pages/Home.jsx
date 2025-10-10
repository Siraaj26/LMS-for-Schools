import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Home() {
    const navigate = useNavigate();

    useEffect(() => {
        // FAQ functionality
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
    }, []);

    const handleSignIn = () => {
        navigate('/signin');
    };

    const handleSignUp = () => {
        navigate('/signup');
    };

    return (
        <>
            <Navbar />
            <main>
                <section id="home" className="hero">
                <div className="hero-container">
                    <div className="hero-left">
                        <div className="hero-content">
                            <h1 className="hero-title">Horizon Academy</h1>
                            <p className="hero-subtitle">
                                Empowering students worldwide with personalized learning paths, progress tracking, and global community support. 
                                Your international academic journey starts here!
                            </p>
                            <div className="hero-buttons">
                                <a href="/signup" className="btn btn-primary btn-large">Get Started</a>
                                <button className="btn btn-secondary btn-large" id="heroSignInBtn" onClick={handleSignIn}>Sign In</button>
                            </div>
                        </div>
                    </div>
                    <div className="hero-right">
                        <div className="hero-image-container">
                            <img src="/images/hero.jpeg" alt="Students collaborating" className="hero-image" />
                        </div>
                    </div>
                </div>
            </section>

            <section id="about" className="about">
                <div className="container">
                    <h2 className="section-title">About Horizon Academy</h2>
                    <div className="about-content">
                        <div className="about-text">
                            <p className="lead">
                                Horizon Academy is a comprehensive international academic platform designed to revolutionize the way students learn, 
                                track progress, and connect with their global educational community.
                            </p>
                            <p>
                                Horizon Academy platform provides a complete 360° view of academic progress, attendance, and communication—all 
                                in one intuitive interface. We empower students to take control of their learning journey while 
                                keeping parents informed globally and supporting teachers with real-time insights across continents.
                            </p>
                        </div>
                        <div className="features-grid">
                            <div className="feature-card">
                                <h3>Academic Progress Tracking</h3>
                                <p>Monitor your grades, assignments, and overall performance with detailed analytics.</p>
                            </div>
                            <div className="feature-card">
                                <h3>Mentorship Programs</h3>
                                <p>Connect with experienced mentors who guide you through your academic challenges.</p>
                            </div>
                            <div className="feature-card">
                                <h3>Achievement Recognition</h3>
                                <p>Celebrate your accomplishments and earn badges for reaching important milestones.</p>
                            </div>
                            <div className="feature-card">
                                <h3>Community Engagement</h3>
                                <p>Join study groups, participate in discussions, and collaborate with peers.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="steps" className="next-steps">
                <div className="container">
                    <h2 className="section-title">Get Started in 3 Simple Steps</h2>
                    <div className="steps-grid">
                        <div className="step">
                            <div className="step-number">1</div>
                            <h3>Create Your Account</h3>
                            <p>Sign up with your email and set up your personalized profile to get started on your learning journey.</p>
                        </div>
                        <div className="step">
                            <div className="step-number">2</div>
                            <h3>Complete Your Profile</h3>
                            <p>Add your academic information, goals, and preferences to receive personalized recommendations.</p>
                        </div>
                        <div className="step">
                            <div className="step-number">3</div>
                            <h3>Start Learning</h3>
                            <p>Access your dashboard, track your progress, and connect with mentors and study groups.</p>
                        </div>
                    </div>
                    <div className="cta-section">
                        <button className="btn btn-primary btn-large" id="stepsSignUpBtn" onClick={handleSignUp}>Join Our Global Community</button>
                    </div>
                </div>
            </section>

            <section id="faq" className="faq">
                <div className="container">
                    <h2 className="section-title">Frequently Asked Questions</h2>
                    <div className="faq-list">
                        <div className="faq-item">
                            <button className="faq-question" data-faq="1">
                                <span>What is Horizon Academy and how does it work?</span>
                                <span className="faq-icon">+</span>
                            </button>
                            <div className="faq-answer" data-answer="1">
                                <p>Horizon Academy is a comprehensive international academic platform that helps students worldwide track their progress, connect with global mentors, and engage with their international learning community. It provides tools for grade tracking, assignment management, and personalized learning recommendations.</p>
                            </div>
                        </div>
                        <div className="faq-item">
                            <button className="faq-question" data-faq="2">
                                <span>Is Horizon Academy free to use?</span>
                                <span className="faq-icon">+</span>
                            </button>
                            <div className="faq-answer" data-answer="2">
                                <p>Yes! Horizon Academy offers a free tier with essential features for all students worldwide. We also offer premium plans with advanced analytics and additional international mentorship opportunities.</p>
                            </div>
                        </div>
                        <div className="faq-item">
                            <button className="faq-question" data-faq="3">
                                <span>How do I connect with mentors?</span>
                                <span className="faq-icon">+</span>
                            </button>
                            <div className="faq-answer" data-answer="3">
                                <p>Once you complete your profile, our matching algorithm will suggest mentors based on your academic interests and goals. You can browse mentor profiles and send connection requests directly through the platform.</p>
                            </div>
                        </div>
                        <div className="faq-item">
                            <button className="faq-question" data-faq="4">
                                <span>Can parents access my progress information?</span>
                                <span className="faq-icon">+</span>
                            </button>
                            <div className="faq-answer" data-answer="4">
                                <p>Parent access is entirely controlled by you. You can choose to share specific information with your parents through our secure parent portal, giving you control over your privacy while keeping family informed.</p>
                            </div>
                        </div>
                        <div className="faq-item">
                            <button className="faq-question" data-faq="5">
                                <span>What devices can I use Horizon Academy on?</span>
                                <span className="faq-icon">+</span>
                            </button>
                            <div className="faq-answer" data-answer="5">
                                <p>Horizon Academy is a web-based platform that works on any device with an internet connection - desktop, laptop, tablet, or smartphone. We're also developing mobile apps for iOS and Android with multi-language support.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="future" className="future">
                <div className="container">
                    <h2 className="section-title">The Future of Learning</h2>
                    <div className="future-content">
                        <div className="future-vision">
                            <h3>Our Vision</h3>
                            <p>
                                We envision a world where every student globally has access to personalized, data-driven education 
                                that adapts to their unique learning style and pace. Horizon Academy is building the foundation 
                                for this international educational future.
                            </p>
                        </div>
                        <div className="roadmap">
                            <h3>Coming Soon</h3>
                            <div className="roadmap-items">
                                <div className="roadmap-item">
                                    <h4>AI-Powered Learning Assistant</h4>
                                    <p>Intelligent tutoring system that provides personalized help and study recommendations.</p>
                                </div>
                                <div className="roadmap-item">
                                    <h4>Virtual Study Rooms</h4>
                                    <p>Immersive collaboration spaces for group projects and peer learning sessions.</p>
                                </div>
                                <div className="roadmap-item">
                                    <h4>Career Path Integration</h4>
                                    <p>Connect your academic progress with real-world career opportunities and internships.</p>
                                </div>
                                <div className="roadmap-item">
                                    <h4>Global Learning Network</h4>
                                    <p>Connect with students and educators worldwide for cultural exchange and collaboration.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="future-cta">
                        <p className="cta-text">Ready to be part of the global future of education?</p>
                        <button className="btn btn-primary btn-large" id="futureSignUpBtn" onClick={handleSignUp}>Join Horizon Academy</button>
                    </div>
                </div>
            </section>

            </main>
            <Footer />
        </>
    );
}

export default Home;


