import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

function TeacherDashboard() {
    const [showAssignmentModal, setShowAssignmentModal] = useState(false);
    const [assignmentData, setAssignmentData] = useState({
        title: '',
        class: '',
        dueDate: '',
        points: ''
    });

    const handleAssignmentChange = (e) => {
        setAssignmentData({
            ...assignmentData,
            [e.target.name]: e.target.value
        });
    };

    const createAssignment = () => {
        setShowAssignmentModal(true);
    };

    const saveAssignment = () => {
        console.log('Saving assignment:', assignmentData);
        setShowAssignmentModal(false);
        setAssignmentData({ title: '', class: '', dueDate: '', points: '' });
    };

    return (
        <div data-role="teacher">
            <Navbar />
            
            <main className="teacher-dashboard">
                {/* Teacher Header */}
                <div className="teacher-header">
                    <div className="teacher-info">
                        <div className="teacher-avatar">
                            <img src="/images/avatar.jpg" alt="Teacher Avatar" />
                        </div>
                        <div className="teacher-details">
                            <h1>Welcome, Ms. Sarah Johnson</h1>
                            <p>Mathematics & English Teacher • Grade 10-12</p>
                            <div className="teacher-stats">
                                <span className="stat">Classes: 7</span>
                                <span className="stat">Students: 201</span>
                                <span className="stat">Subjects: 2</span>
                            </div>
                        </div>
                    </div>
                    <div className="teacher-actions">
                        <button className="action-btn primary" onClick={createAssignment}>
                            📝 New Assignment
                        </button>
                        <button className="action-btn secondary">
                            📋 View Assignments
                        </button>
                        <button className="action-btn secondary">
                            📅 Calendar
                        </button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="teacher-content">
                    {/* Left Side - Class Overview */}
                    <section className="class-overview">
                        <h2>Class Overview</h2>
                        
                        {/* Class Cards */}
                        <div className="class-cards">
                            {[
                                { name: 'Mathematics Grade 8A', code: 'MATH8A', icon: '🔢', students: 28, assignments: 6, avgGrade: 72 },
                                { name: 'Mathematics Grade 9B', code: 'MATH9B', icon: '📐', students: 31, assignments: 5, avgGrade: 75 },
                                { name: 'Mathematics Grade 10A', code: 'MATH10A', icon: '📊', students: 32, assignments: 4, avgGrade: 78 },
                                { name: 'Mathematics Grade 11B', code: 'MATH11B', icon: '🧮', students: 29, assignments: 3, avgGrade: 82 },
                                { name: 'Advanced Mathematics 12', code: 'MATH12A', icon: '🎯', students: 22, assignments: 4, avgGrade: 85 },
                                { name: 'English Grade 10A', code: 'ENG10A', icon: '📚', students: 30, assignments: 3, avgGrade: 76 },
                                { name: 'English Literature 11B', code: 'ENG11B', icon: '✍️', students: 28, assignments: 2, avgGrade: 79 }
                            ].map((classItem, index) => (
                                <div key={index} className="class-card">
                                    <div className="class-header">
                                        <div className="class-icon">{classItem.icon}</div>
                                        <div className="class-info">
                                            <h3>{classItem.name}</h3>
                                            <span className="class-code">{classItem.code}</span>
                                        </div>
                                    </div>
                                    <div className="class-stats">
                                        <div className="stat-item">
                                            <span className="stat-label">Students</span>
                                            <span className="stat-value">{classItem.students}</span>
                                        </div>
                                        <div className="stat-item">
                                            <span className="stat-label">Assignments</span>
                                            <span className="stat-value">{classItem.assignments}</span>
                                        </div>
                                        <div className="stat-item">
                                            <span className="stat-label">Avg Grade</span>
                                            <span className="stat-value">{classItem.avgGrade}%</span>
                                        </div>
                                    </div>
                                    <div className="class-progress">
                                        <div className="progress-bar">
                                            <div className="progress-fill" style={{width: `${classItem.avgGrade}%`}}></div>
                                        </div>
                                        <span className="progress-text">Class Progress: {classItem.avgGrade}%</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Recent Activity */}
                        <div className="recent-activity">
                            <h3>Recent Activity</h3>
                            <div className="activity-list">
                                <div className="activity-item">
                                    <div className="activity-icon">📝</div>
                                    <div className="activity-content">
                                        <p>Graded 15 assignments for MATH10A</p>
                                        <small>2 hours ago</small>
                                    </div>
                                </div>
                                <div className="activity-item">
                                    <div className="activity-icon">📊</div>
                                    <div className="activity-content">
                                        <p>Updated progress for Thabo Mthembu</p>
                                        <small>4 hours ago</small>
                                    </div>
                                </div>
                                <div className="activity-item">
                                    <div className="activity-icon">🎯</div>
                                    <div className="activity-content">
                                        <p>Created new skills assessment</p>
                                        <small>1 day ago</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Right Side - Student Progress & Tools */}
                    <section className="teacher-sidebar">
                        {/* Student Progress */}
                        <div className="student-progress">
                            <h3>Student Progress Overview</h3>
                            <div className="progress-summary">
                                <div className="progress-item">
                                    <span className="progress-label">On Track</span>
                                    <div className="progress-bar">
                                        <div className="progress-fill" style={{width: '75%'}}></div>
                                    </div>
                                    <span className="progress-value">67 students</span>
                                </div>
                                <div className="progress-item">
                                    <span className="progress-label">Needs Attention</span>
                                    <div className="progress-bar">
                                        <div className="progress-fill warning" style={{width: '20%'}}></div>
                                    </div>
                                    <span className="progress-value">18 students</span>
                                </div>
                                <div className="progress-item">
                                    <span className="progress-label">At Risk</span>
                                    <div className="progress-bar">
                                        <div className="progress-fill danger" style={{width: '5%'}}></div>
                                    </div>
                                    <span className="progress-value">4 students</span>
                                </div>
                            </div>
                        </div>

                        {/* Calendar */}
                        <div className="calendar-section">
                            <h3>📅 Upcoming Events</h3>
                            <div className="calendar-events">
                                {[
                                    { day: '15', month: 'Mar', title: 'Grade 8 Math Test', time: '9:00 AM - 10:30 AM' },
                                    { day: '18', month: 'Mar', title: 'Parent-Teacher Meeting', time: '2:00 PM - 4:00 PM' },
                                    { day: '22', month: 'Mar', title: 'Grade 12 Assignment Due', time: 'All Day' },
                                    { day: '25', month: 'Mar', title: 'Math Department Meeting', time: '3:00 PM - 4:30 PM' }
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

                        {/* Quick Tools */}
                        <div className="quick-tools">
                            <h3>Quick Tools</h3>
                            <div className="tools-grid">
                                <button className="tool-btn" onClick={createAssignment}>
                                    <span className="tool-icon">📝</span>
                                    <span className="tool-name">Assignment</span>
                                </button>
                                <button className="tool-btn">
                                    <span className="tool-icon">✅</span>
                                    <span className="tool-name">Grade</span>
                                </button>
                                <button className="tool-btn">
                                    <span className="tool-icon">🎯</span>
                                    <span className="tool-name">Skills</span>
                                </button>
                                <button className="tool-btn">
                                    <span className="tool-icon">📊</span>
                                    <span className="tool-name">Reports</span>
                                </button>
                                <button className="tool-btn">
                                    <span className="tool-icon">💬</span>
                                    <span className="tool-name">Message</span>
                                </button>
                                <button className="tool-btn">
                                    <span className="tool-icon">📅</span>
                                    <span className="tool-name">Calendar</span>
                                </button>
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            {/* Assignment Creation Modal */}
            {showAssignmentModal && (
                <div id="assignmentModal" className="modal" style={{display: 'block'}}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>Create Assignment & Subject</h3>
                            <button className="close" onClick={() => setShowAssignmentModal(false)}>&times;</button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>Assignment Title:</label>
                                <input 
                                    type="text" 
                                    name="title"
                                    value={assignmentData.title}
                                    onChange={handleAssignmentChange}
                                    placeholder="Enter assignment title" 
                                />
                            </div>
                            
                            <div className="form-group">
                                <label>Subject/Class:</label>
                                <input 
                                    type="text" 
                                    name="class"
                                    value={assignmentData.class}
                                    onChange={handleAssignmentChange}
                                    placeholder="e.g., Science Grade 9, History 11, Art 10" 
                                />
                                <small style={{color: '#666', fontSize: '0.8rem'}}>Type a new subject or class name</small>
                            </div>
                            
                            <div className="form-group">
                                <label>Due Date:</label>
                                <input 
                                    type="date" 
                                    name="dueDate"
                                    value={assignmentData.dueDate}
                                    onChange={handleAssignmentChange}
                                />
                            </div>
                            
                            <div className="form-group">
                                <label>Points:</label>
                                <input 
                                    type="number" 
                                    name="points"
                                    value={assignmentData.points}
                                    onChange={handleAssignmentChange}
                                    placeholder="100" 
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button onClick={() => setShowAssignmentModal(false)}>Cancel</button>
                            <button onClick={saveAssignment}>Create</button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}

export default TeacherDashboard;


