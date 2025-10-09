import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../../styles/parent-dashboard.css';

function ParentDashboard() {
    const navigate = useNavigate();
    
    // Mock data for parent dashboard
    const [parentData] = useState({
        name: "Sarah Johnson",
        email: "parent@test.com",
        children: [
            {
                id: 1,
                name: "Alex Johnson",
                grade: "Grade 11",
                school: "Horizon Academy",
                avatar: "/images/avatar.jpg",
                overallGrade: 87,
                attendance: 95,
                behaviorScore: 92
            }
        ]
    });

    const [studentProgress] = useState({
        overallGrade: 87,
        attendance: 95,
        behaviorScore: 92,
        completedAssignments: 24,
        pendingAssignments: 3,
        studyHours: 18.5,
        lastLogin: "2 hours ago"
    });

    const [recentGrades] = useState([
        { subject: "Mathematics", grade: 92, trend: "up", teacher: "Ms. Smith", date: "Dec 10" },
        { subject: "Physics", grade: 85, trend: "up", teacher: "Mr. Brown", date: "Dec 8" },
        { subject: "Chemistry", grade: 88, trend: "stable", teacher: "Dr. Wilson", date: "Dec 7" },
        { subject: "English", grade: 83, trend: "down", teacher: "Ms. Davis", date: "Dec 5" },
        { subject: "History", grade: 90, trend: "up", teacher: "Mr. Taylor", date: "Dec 3" }
    ]);

    const [upcomingAssignments] = useState([
        { title: "Calculus Integration Problems", subject: "Math", dueDate: "Dec 15", priority: "high", teacher: "Ms. Smith" },
        { title: "Physics Lab Report", subject: "Physics", dueDate: "Dec 18", priority: "medium", teacher: "Mr. Brown" },
        { title: "Chemistry Quiz", subject: "Chemistry", dueDate: "Dec 20", priority: "low", teacher: "Dr. Wilson" }
    ]);

    const [teacherCommunications] = useState([
        { teacher: "Ms. Smith", subject: "Mathematics", message: "Alex is showing excellent progress in calculus. Keep up the great work!", date: "Dec 10", type: "positive" },
        { teacher: "Mr. Brown", subject: "Physics", message: "Please ensure Alex completes the lab report by Friday.", date: "Dec 8", type: "reminder" },
        { teacher: "Ms. Davis", subject: "English", message: "Alex's essay needs some improvement. Let's schedule a meeting.", date: "Dec 5", type: "concern" }
    ]);

    const getGradeColor = (grade) => {
        if (grade >= 90) return '#34d399';
        if (grade >= 80) return '#fbbf24';
        if (grade >= 70) return '#f59e0b';
        return '#ef4444';
    };

    const getTrendIcon = (trend) => {
        switch (trend) {
            case 'up': return '↗️';
            case 'down': return '↘️';
            case 'stable': return '→';
            default: return '→';
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return '#ef4444';
            case 'medium': return '#f59e0b';
            case 'low': return '#10b981';
            default: return '#6b7280';
        }
    };

    return (
        <div className="parent-dashboard">
            <Navbar />
            
            <main className="dashboard-main">
                {/* Welcome Header */}
                <section className="welcome-hero">
                    <div className="welcome-container">
                        <div className="welcome-content">
                            <div className="welcome-text">
                                <h1 className="welcome-title">
                                    Welcome back, <span className="highlight">{parentData.name}</span>
                                </h1>
                                <p className="welcome-subtitle">
                                    Monitor your child's academic progress and stay connected with teachers
                                </p>
                            </div>
                            <div className="parent-avatar-section">
                                <div className="avatar-container">
                                    <div className="parent-avatar">
                                        <span className="avatar-icon">👨‍👩‍👧‍👦</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Student Overview */}
                <section className="student-overview">
                    <div className="overview-container">
                        <h2 className="section-title">Student Overview</h2>
                        <div className="student-cards">
                            {parentData.children.map((child) => (
                                <div key={child.id} className="student-card">
                                    <div className="student-header">
                                        <img src={child.avatar} alt={child.name} className="student-avatar" />
                                        <div className="student-info">
                                            <h3 className="student-name">{child.name}</h3>
                                            <p className="student-details">{child.grade} • {child.school}</p>
                                        </div>
                                        <div className="student-status">
                                            <span className="status-indicator online"></span>
                                            <span className="status-text">Active</span>
                                        </div>
                                    </div>
                                    <div className="student-metrics">
                                        <div className="metric">
                                            <div className="metric-value">{child.overallGrade}%</div>
                                            <div className="metric-label">Overall Grade</div>
                                        </div>
                                        <div className="metric">
                                            <div className="metric-value">{child.attendance}%</div>
                                            <div className="metric-label">Attendance</div>
                                        </div>
                                        <div className="metric">
                                            <div className="metric-value">{child.behaviorScore}%</div>
                                            <div className="metric-label">Behavior</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Progress Analytics */}
                <section className="progress-analytics">
                    <div className="analytics-container">
                        <h2 className="section-title">Progress Analytics</h2>
                        <div className="analytics-grid">
                            <div className="analytics-card">
                                <div className="card-header">
                                    <h3 className="card-title">Academic Performance</h3>
                                    <div className="performance-score">{studentProgress.overallGrade}%</div>
                                </div>
                                <div className="performance-chart">
                                    <div className="chart-bar">
                                        <div className="bar-fill" style={{width: `${studentProgress.overallGrade}%`}}></div>
                                    </div>
                                    <div className="chart-labels">
                                        <span>Excellent</span>
                                        <span>Good</span>
                                        <span>Needs Improvement</span>
                                    </div>
                                </div>
                            </div>

                            <div className="analytics-card">
                                <div className="card-header">
                                    <h3 className="card-title">Assignment Status</h3>
                                    <div className="assignment-summary">
                                        <span className="completed">{studentProgress.completedAssignments} Completed</span>
                                        <span className="pending">{studentProgress.pendingAssignments} Pending</span>
                                    </div>
                                </div>
                                <div className="assignment-progress">
                                    <div className="progress-ring">
                                        <div className="ring-fill" style={{'--progress': `${(studentProgress.completedAssignments / (studentProgress.completedAssignments + studentProgress.pendingAssignments)) * 100}%`}}></div>
                                        <div className="ring-text">
                                            {Math.round((studentProgress.completedAssignments / (studentProgress.completedAssignments + studentProgress.pendingAssignments)) * 100)}%
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="analytics-card">
                                <div className="card-header">
                                    <h3 className="card-title">Study Habits</h3>
                                    <div className="study-hours">{studentProgress.studyHours}h this week</div>
                                </div>
                                <div className="study-visualization">
                                    <div className="study-bars">
                                        {Array.from({length: 7}, (_, i) => (
                                            <div key={i} className="study-bar" style={{height: `${Math.random() * 100}%`}}></div>
                                        ))}
                                    </div>
                                    <div className="study-labels">
                                        <span>Mon</span>
                                        <span>Tue</span>
                                        <span>Wed</span>
                                        <span>Thu</span>
                                        <span>Fri</span>
                                        <span>Sat</span>
                                        <span>Sun</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Recent Grades */}
                <section className="recent-grades">
                    <div className="grades-container">
                        <div className="section-header">
                            <h2 className="section-title">Recent Grades</h2>
                            <button className="view-all-btn">View All</button>
                        </div>
                        <div className="grades-list">
                            {recentGrades.map((grade, index) => (
                                <div key={index} className="grade-item">
                                    <div className="grade-icon">
                                        <span className="subject-icon">📚</span>
                                    </div>
                                    <div className="grade-details">
                                        <h4 className="subject-name">{grade.subject}</h4>
                                        <p className="teacher-name">Teacher: {grade.teacher}</p>
                                        <span className="grade-date">{grade.date}</span>
                                    </div>
                                    <div className="grade-score">
                                        <div className="score-value" style={{color: getGradeColor(grade.grade)}}>
                                            {grade.grade}%
                                        </div>
                                        <div className="trend-indicator">
                                            <span className="trend-icon">{getTrendIcon(grade.trend)}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Upcoming Assignments */}
                <section className="upcoming-assignments">
                    <div className="assignments-container">
                        <div className="section-header">
                            <h2 className="section-title">Upcoming Assignments</h2>
                            <button className="view-all-btn">View All</button>
                        </div>
                        <div className="assignments-list">
                            {upcomingAssignments.map((assignment, index) => (
                                <div key={index} className="assignment-item">
                                    <div className="assignment-priority" style={{backgroundColor: getPriorityColor(assignment.priority)}}></div>
                                    <div className="assignment-content">
                                        <h4 className="assignment-title">{assignment.title}</h4>
                                        <p className="assignment-subject">{assignment.subject}</p>
                                        <p className="assignment-teacher">Teacher: {assignment.teacher}</p>
                                        <span className="due-date">Due: {assignment.dueDate}</span>
                                    </div>
                                    <div className="assignment-actions">
                                        <button className="remind-btn">Remind</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Teacher Communications */}
                <section className="teacher-communications">
                    <div className="communications-container">
                        <div className="section-header">
                            <h2 className="section-title">Teacher Communications</h2>
                            <button className="compose-btn">Compose Message</button>
                        </div>
                        <div className="communications-list">
                            {teacherCommunications.map((comm, index) => (
                                <div key={index} className={`communication-item ${comm.type}`}>
                                    <div className="comm-header">
                                        <div className="teacher-info">
                                            <span className="teacher-name">{comm.teacher}</span>
                                            <span className="subject">{comm.subject}</span>
                                        </div>
                                        <span className="comm-date">{comm.date}</span>
                                    </div>
                                    <div className="comm-message">
                                        <p>{comm.message}</p>
                                    </div>
                                    <div className="comm-actions">
                                        <button className="reply-btn">Reply</button>
                                        <button className="schedule-btn">Schedule Meeting</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            
            <Footer />
        </div>
    );
}

export default ParentDashboard;