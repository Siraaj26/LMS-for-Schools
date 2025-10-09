import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../../styles/teacher-dashboard.css';

function TeacherDashboard() {
    const navigate = useNavigate();
    
    // Mock data for teacher dashboard
    const [teacherData] = useState({
        name: "Ms. Sarah Smith",
        email: "teacher@test.com",
        subject: "Mathematics",
        school: "Horizon Academy",
        avatar: "/images/teacher-avatar.jpg"
    });

    const [classStats] = useState({
        totalStudents: 24,
        activeStudents: 22,
        averageGrade: 85,
        assignmentsGraded: 18,
        pendingGrading: 6
    });

    const [students] = useState([
        { id: 1, name: "Alex Johnson", grade: 87, attendance: 95, lastActive: "2 hours ago", status: "active" },
        { id: 2, name: "Emma Wilson", grade: 92, attendance: 98, lastActive: "1 hour ago", status: "active" },
        { id: 3, name: "Michael Brown", grade: 78, attendance: 90, lastActive: "3 hours ago", status: "needs_attention" },
        { id: 4, name: "Sarah Davis", grade: 89, attendance: 96, lastActive: "30 minutes ago", status: "active" },
        { id: 5, name: "David Lee", grade: 83, attendance: 94, lastActive: "1 hour ago", status: "active" }
    ]);

    const [recentAssignments] = useState([
        { id: 1, title: "Calculus Integration Problems", subject: "Math", dueDate: "Dec 15", submissions: 18, total: 24, status: "active" },
        { id: 2, title: "Algebra Quiz", subject: "Math", dueDate: "Dec 12", submissions: 24, total: 24, status: "completed" },
        { id: 3, title: "Trigonometry Review", subject: "Math", dueDate: "Dec 20", submissions: 5, total: 24, status: "active" }
    ]);

    const [pendingApprovals] = useState([
        { id: 1, student: "Alex Johnson", request: "Assignment Extension", subject: "Calculus", reason: "Family emergency", date: "Dec 10" },
        { id: 2, student: "Emma Wilson", request: "Extra Credit", subject: "Algebra", reason: "Missed class due to illness", date: "Dec 9" }
    ]);

    const [parentCommunications] = useState([
        { id: 1, parent: "Sarah Johnson", student: "Alex Johnson", subject: "Progress Update", message: "Alex is showing excellent progress in calculus.", date: "Dec 10", type: "positive" },
        { id: 2, parent: "Michael Brown", student: "Emma Wilson", subject: "Concern", message: "Emma seems to be struggling with the latest assignment.", date: "Dec 8", type: "concern" }
    ]);

    const getGradeColor = (grade) => {
        if (grade >= 90) return '#10b981';
        if (grade >= 80) return '#f59e0b';
        if (grade >= 70) return '#f97316';
        return '#ef4444';
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return '#10b981';
            case 'needs_attention': return '#f59e0b';
            case 'inactive': return '#6b7280';
            default: return '#6b7280';
        }
    };

    const getAssignmentStatus = (submissions, total) => {
        const percentage = (submissions / total) * 100;
        if (percentage === 100) return 'completed';
        if (percentage >= 75) return 'good';
        if (percentage >= 50) return 'moderate';
        return 'low';
    };

    return (
        <div className="teacher-dashboard">
            <Navbar />
            
            <main className="dashboard-main">
                {/* Welcome Header */}
                <section className="welcome-hero">
                    <div className="welcome-container">
                        <div className="welcome-content">
                            <div className="welcome-text">
                                <h1 className="welcome-title">
                                    Welcome back, <span className="highlight">{teacherData.name}</span>
                                </h1>
                                <p className="welcome-subtitle">
                                    {teacherData.subject} • {teacherData.school}
                                </p>
                                <div className="teacher-stats">
                                    <div className="stat-item">
                                        <span className="stat-number">{classStats.totalStudents}</span>
                                        <span className="stat-label">Total Students</span>
                                    </div>
                                    <div className="stat-item">
                                        <span className="stat-number">{classStats.averageGrade}%</span>
                                        <span className="stat-label">Average Grade</span>
                                    </div>
                                    <div className="stat-item">
                                        <span className="stat-number">{classStats.assignmentsGraded}</span>
                                        <span className="stat-label">Graded</span>
                                    </div>
                                </div>
                            </div>
                            <div className="teacher-avatar-section">
                                <div className="avatar-container">
                                    <div className="teacher-avatar">
                                        <span className="avatar-icon">👩‍🏫</span>
                                    </div>
                                    <div className="status-badge">
                                        <span className="status-dot"></span>
                                        <span className="status-text">Online</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Class Overview */}
                <section className="class-overview">
                    <div className="overview-container">
                        <h2 className="section-title">Class Overview</h2>
                        <div className="overview-grid">
                            <div className="overview-card">
                                <div className="card-header">
                                    <h3 className="card-title">Student Performance</h3>
                                    <div className="performance-indicator">
                                        <span className="indicator-dot excellent"></span>
                                        <span className="indicator-text">Excellent</span>
                                    </div>
                                </div>
                                <div className="performance-chart">
                                    <div className="chart-container">
                                        <div className="chart-bar">
                                            <div className="bar-segment excellent" style={{width: '40%'}}></div>
                                            <div className="bar-segment good" style={{width: '35%'}}></div>
                                            <div className="bar-segment average" style={{width: '20%'}}></div>
                                            <div className="bar-segment needs-improvement" style={{width: '5%'}}></div>
                                        </div>
                                        <div className="chart-legend">
                                            <div className="legend-item">
                                                <span className="legend-dot excellent"></span>
                                                <span>90-100%</span>
                                            </div>
                                            <div className="legend-item">
                                                <span className="legend-dot good"></span>
                                                <span>80-89%</span>
                                            </div>
                                            <div className="legend-item">
                                                <span className="legend-dot average"></span>
                                                <span>70-79%</span>
                                            </div>
                                            <div className="legend-item">
                                                <span className="legend-dot needs-improvement"></span>
                                                <span>Below 70%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="overview-card">
                                <div className="card-header">
                                    <h3 className="card-title">Assignment Status</h3>
                                    <div className="assignment-summary">
                                        <span className="graded">{classStats.assignmentsGraded} Graded</span>
                                        <span className="pending">{classStats.pendingGrading} Pending</span>
                                    </div>
                                </div>
                                <div className="assignment-progress">
                                    <div className="progress-ring">
                                        <div className="ring-fill" style={{'--progress': `${(classStats.assignmentsGraded / (classStats.assignmentsGraded + classStats.pendingGrading)) * 100}%`}}></div>
                                        <div className="ring-text">
                                            {Math.round((classStats.assignmentsGraded / (classStats.assignmentsGraded + classStats.pendingGrading)) * 100)}%
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="overview-card">
                                <div className="card-header">
                                    <h3 className="card-title">Attendance</h3>
                                    <div className="attendance-rate">94%</div>
                                </div>
                                <div className="attendance-chart">
                                    <div className="attendance-bars">
                                        {Array.from({length: 7}, (_, i) => (
                                            <div key={i} className="attendance-bar" style={{height: `${85 + Math.random() * 15}%`}}></div>
                                        ))}
                                    </div>
                                    <div className="attendance-labels">
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

                {/* Student List */}
                <section className="student-list">
                    <div className="students-container">
                        <div className="section-header">
                            <h2 className="section-title">Students</h2>
                            <div className="student-filters">
                                <button className="filter-btn active">All</button>
                                <button className="filter-btn">Needs Attention</button>
                                <button className="filter-btn">Top Performers</button>
                            </div>
                        </div>
                        <div className="students-grid">
                            {students.map((student) => (
                                <div key={student.id} className={`student-card ${student.status}`}>
                                    <div className="student-header">
                                        <div className="student-info">
                                            <h4 className="student-name">{student.name}</h4>
                                            <p className="student-grade">Grade: {student.grade}%</p>
                                        </div>
                                        <div className="student-status">
                                            <span className="status-dot" style={{backgroundColor: getStatusColor(student.status)}}></span>
                                            <span className="status-text">{student.status.replace('_', ' ')}</span>
                                        </div>
                                    </div>
                                    <div className="student-metrics">
                                        <div className="metric">
                                            <span className="metric-label">Attendance</span>
                                            <span className="metric-value">{student.attendance}%</span>
                                        </div>
                                        <div className="metric">
                                            <span className="metric-label">Last Active</span>
                                            <span className="metric-value">{student.lastActive}</span>
                                        </div>
                                    </div>
                                    <div className="student-actions">
                                        <button className="action-btn primary">View Progress</button>
                                        <button className="action-btn secondary">Message</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Recent Assignments */}
                <section className="recent-assignments">
                    <div className="assignments-container">
                        <div className="section-header">
                            <h2 className="section-title">Recent Assignments</h2>
                            <button className="create-assignment-btn">Create Assignment</button>
                        </div>
                        <div className="assignments-list">
                            {recentAssignments.map((assignment) => (
                                <div key={assignment.id} className="assignment-card">
                                    <div className="assignment-header">
                                        <h4 className="assignment-title">{assignment.title}</h4>
                                        <div className="assignment-status">
                                            <span className={`status-badge ${getAssignmentStatus(assignment.submissions, assignment.total)}`}>
                                                {assignment.status}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="assignment-details">
                                        <p className="assignment-subject">{assignment.subject}</p>
                                        <p className="due-date">Due: {assignment.dueDate}</p>
                                    </div>
                                    <div className="assignment-progress">
                                        <div className="progress-info">
                                            <span className="submissions">{assignment.submissions}/{assignment.total} submitted</span>
                                            <span className="percentage">{Math.round((assignment.submissions / assignment.total) * 100)}%</span>
                                        </div>
                                        <div className="progress-bar">
                                            <div className="progress-fill" style={{width: `${(assignment.submissions / assignment.total) * 100}%`}}></div>
                                        </div>
                                    </div>
                                    <div className="assignment-actions">
                                        <button className="action-btn primary">Grade</button>
                                        <button className="action-btn secondary">View</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Pending Approvals */}
                <section className="pending-approvals">
                    <div className="approvals-container">
                        <div className="section-header">
                            <h2 className="section-title">Pending Approvals</h2>
                            <span className="approval-count">{pendingApprovals.length} requests</span>
                        </div>
                        <div className="approvals-list">
                            {pendingApprovals.map((approval) => (
                                <div key={approval.id} className="approval-card">
                                    <div className="approval-header">
                                        <div className="student-info">
                                            <h4 className="student-name">{approval.student}</h4>
                                            <p className="request-type">{approval.request}</p>
                                        </div>
                                        <span className="approval-date">{approval.date}</span>
                                    </div>
                                    <div className="approval-details">
                                        <p className="subject">{approval.subject}</p>
                                        <p className="reason">{approval.reason}</p>
                                    </div>
                                    <div className="approval-actions">
                                        <button className="approve-btn">Approve</button>
                                        <button className="deny-btn">Deny</button>
                                        <button className="message-btn">Message</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Parent Communications */}
                <section className="parent-communications">
                    <div className="communications-container">
                        <div className="section-header">
                            <h2 className="section-title">Parent Communications</h2>
                            <button className="compose-btn">Compose Message</button>
                        </div>
                        <div className="communications-list">
                            {parentCommunications.map((comm) => (
                                <div key={comm.id} className={`communication-card ${comm.type}`}>
                                    <div className="comm-header">
                                        <div className="parent-info">
                                            <h4 className="parent-name">{comm.parent}</h4>
                                            <p className="student-name">Student: {comm.student}</p>
                                        </div>
                                        <span className="comm-date">{comm.date}</span>
                                    </div>
                                    <div className="comm-content">
                                        <h5 className="comm-subject">{comm.subject}</h5>
                                        <p className="comm-message">{comm.message}</p>
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

export default TeacherDashboard;