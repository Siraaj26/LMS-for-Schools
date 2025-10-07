import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

function ParentDashboard() {
    return (
        <div data-role="parent">
            <Navbar />
            
            <main className="parent-dashboard">
                {/* Parent Header */}
                <div className="parent-header">
                    <div className="parent-info">
                        <div className="parent-avatar">
                            <img src="/images/avatar.jpg" alt="Parent Avatar" />
                        </div>
                        <div className="parent-details">
                            <h1 id="parent-welcome">Welcome, Parent!</h1>
                            <p>Parent of Thabo Mthembu (Grade 10)</p>
                            <div className="parent-stats">
                                <span className="stat">Children: 1</span>
                                <span className="stat">School: Johannesburg High</span>
                                <span className="stat">Last Login: Today</span>
                            </div>
                        </div>
                    </div>
                    <div className="parent-actions">
                        <button className="action-btn primary">
                            💳 Make Payment
                        </button>
                        <button className="action-btn secondary">
                            💬 Contact Teacher
                        </button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="parent-content">
                    {/* Left Side - Child Overview */}
                    <section className="child-overview">
                        <h2>Thabo's Progress</h2>
                        
                        {/* Child Summary Card */}
                        <div className="child-summary">
                            <div className="child-info">
                                <div className="child-avatar">
                                    <img src="/images/avatar.jpg" alt="Thabo Mthembu" />
                                </div>
                                <div className="child-details">
                                    <h3>Thabo Mthembu</h3>
                                    <p>Grade 10 • Student ID: ST2024001</p>
                                    <div className="child-status">
                                        <span className="status-badge active">Active</span>
                                        <span className="attendance">Attendance: 95%</span>
                                    </div>
                                </div>
                            </div>
                            <div className="child-actions">
                                <button className="btn-small">View Profile</button>
                                <button className="btn-small secondary">Reports</button>
                            </div>
                        </div>

                        {/* Academic Progress */}
                        <div className="academic-progress">
                            <h3>Academic Progress</h3>
                            <div className="subject-cards">
                                {[
                                    { name: 'Mathematics', icon: '📐', grade: '78%', trend: '↗ +5%', teacher: 'Ms. Johnson' },
                                    { name: 'Science', icon: '🔬', grade: '82%', trend: '↗ +3%', teacher: 'Mr. Smith' },
                                    { name: 'English', icon: '📚', grade: '75%', trend: '↗ +2%', teacher: 'Ms. Brown' },
                                    { name: 'Geography', icon: '🌍', grade: '80%', trend: '↗ +4%', teacher: 'Mr. Davis' }
                                ].map((subject, index) => (
                                    <div key={index} className="subject-card">
                                        <div className="subject-header">
                                            <span className="subject-icon">{subject.icon}</span>
                                            <span className="subject-name">{subject.name}</span>
                                        </div>
                                        <div className="subject-grade">{subject.grade}</div>
                                        <div className="subject-trend">{subject.trend}</div>
                                        <div className="subject-teacher">{subject.teacher}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Skills Development */}
                        <div className="skills-development">
                            <h3>Skills Development</h3>
                            <div className="skills-grid">
                                {[
                                    { name: 'Problem Solving', icon: '🎯', level: 'Advanced', progress: 85 },
                                    { name: 'Communication', icon: '💬', level: 'Intermediate', progress: 70 },
                                    { name: 'Teamwork', icon: '🤝', level: 'Advanced', progress: 90 },
                                    { name: 'Critical Thinking', icon: '💡', level: 'Intermediate', progress: 75 }
                                ].map((skill, index) => (
                                    <div key={index} className="skill-card">
                                        <div className="skill-icon">{skill.icon}</div>
                                        <div className="skill-name">{skill.name}</div>
                                        <div className="skill-level">{skill.level}</div>
                                        <div className="skill-progress">
                                            <div className="progress-bar">
                                                <div className="progress-fill" style={{width: `${skill.progress}%`}}></div>
                                            </div>
                                            <span className="progress-text">{skill.progress}%</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Right Side - Financial & Communication */}
                    <section className="parent-sidebar">
                        {/* Payment Status */}
                        <div className="payment-status">
                            <h3>Payment Status</h3>
                            <div className="payment-card">
                                <div className="payment-header">
                                    <span className="payment-icon">💰</span>
                                    <span className="payment-title">Current Balance</span>
                                </div>
                                <div className="payment-amount">R 156.00</div>
                                <div className="payment-due">Due: 31 March 2024</div>
                                <div className="payment-status-badge pending">Pending</div>
                                <button className="payment-btn">Make Payment</button>
                            </div>
                        </div>

                        {/* Upcoming Events */}
                        <div className="upcoming-events">
                            <h3>Upcoming Events</h3>
                            <div className="event-list">
                                {[
                                    { day: '15', month: 'Mar', title: 'Parent-Teacher Meeting', time: '2:00 PM - 3:00 PM' },
                                    { day: '20', month: 'Mar', title: 'Science Fair', time: '9:00 AM - 2:00 PM' },
                                    { day: '25', month: 'Mar', title: 'Sports Day', time: '8:00 AM - 4:00 PM' }
                                ].map((event, index) => (
                                    <div key={index} className="event-item">
                                        <div className="event-date">
                                            <span className="day">{event.day}</span>
                                            <span className="month">{event.month}</span>
                                        </div>
                                        <div className="event-details">
                                            <p>{event.title}</p>
                                            <small>{event.time}</small>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="quick-actions">
                            <h3>Quick Actions</h3>
                            <div className="action-grid">
                                <button className="action-btn-small">
                                    <span className="btn-icon">👤</span>
                                    <span className="btn-text">Profile</span>
                                </button>
                                <button className="action-btn-small">
                                    <span className="btn-icon">📊</span>
                                    <span className="btn-text">Reports</span>
                                </button>
                                <button className="action-btn-small">
                                    <span className="btn-icon">💰</span>
                                    <span className="btn-text">Payment</span>
                                </button>
                                <button className="action-btn-small">
                                    <span className="btn-icon">💬</span>
                                    <span className="btn-text">Message</span>
                                </button>
                                <button className="action-btn-small">
                                    <span className="btn-icon">📅</span>
                                    <span className="btn-text">Calendar</span>
                                </button>
                                <button className="action-btn-small">
                                    <span className="btn-icon">📝</span>
                                    <span className="btn-text">Assignments</span>
                                </button>
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default ParentDashboard;


