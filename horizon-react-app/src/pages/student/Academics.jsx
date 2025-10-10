import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../../styles/academics.css';

function Academics() {
    return (
        <div className="academic-dashboard">
            <Navbar />
            
            <main>
                <div className="academic-header">
                    <div className="academic-info">
                        <h1>Academics</h1>
                        <div className="academic-stats">
                            <span className="stat">Hours Spent: 168</span>
                        </div>
                    </div>
                    <div className="academic-actions">
                        <button className="action-btn primary">
                            Add New +
                        </button>
                    </div>
                </div>

                <div className="academic-content">
                    <section className="class-overview">
                        <div className="class-cards">
                            <div className="class-card">
                                <div className="class-header">
                                    <h2>Courses</h2>
                                    <span className="class-code">In Progress</span>
                                </div>
                                <div className="class-stats">
                                    <div className="stat-item"><span className="stat-label">Enrolled</span><span className="stat-value"> 7</span></div>
                                    <div className="stat-item"><span className="stat-label">Completed</span><span className="stat-value"> 2</span></div>
                                </div>
                                <div className="class-actions">
                                    <button className="btn-small">View</button>
                                    <button className="btn-small secondary">
                                        <img src="/images/edit.png" alt="Edit" />
                                    </button>
                                </div>
                            </div>

                            <div className="class-card">
                                <div className="class-header">
                                    <h2>Reports</h2>
                                    <span className="class-code">Latest</span>
                                </div>
                                <div className="class-stats">
                                    <div className="stat-item"><span className="stat-label">Average Grade</span><span className="stat-value"> 82%</span></div>
                                    <div className="stat-item"><span className="stat-label">Assignments Graded</span><span className="stat-value"> 18</span></div>
                                </div>
                                <div className="class-actions">
                                    <button className="btn-small">View</button>
                                    <button className="btn-small secondary">
                                        <img src="/images/download.png" alt="Download" />
                                    </button>
                                </div>
                            </div>

                            <div className="class-card">
                                <div className="class-header">
                                    <h2>Academic Goals</h2>
                                    <span className="class-code">Active</span>
                                </div>
                                <div className="class-stats">
                                    <div className="stat-item"><span className="stat-label">Goals Set</span><span className="stat-value"> 3</span></div>
                                    <div className="stat-item"><span className="stat-label">Completed</span><span className="stat-value"> 1</span></div>
                                </div>
                                <div className="class-actions">
                                    <button className="btn-small">View</button>
                                    <button className="btn-small secondary">
                                        <img src="/images/add.png" alt="Add" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section id="academic-goals-report" className="academic-section">
                        <h2>Academic Goals Report</h2>
                        <div id="goals-report-content">
                        </div>
                    </section>

                    <section id="curriculum-section" className="academic-section">
                        <h2>Curriculum / Courses</h2>
                        <div id="curriculum-content">
                        </div>
                    </section>
                </div>
            </main>
            
            <Footer />
        </div>
    );
}

export default Academics;



