import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../../styles/modern-dashboard.css';

function ModernStudentDashboard() {
    const navigate = useNavigate();
    
    // Mock data for demonstration
    const [studentData] = useState({
        name: "Alex Johnson",
        grade: "Grade 11",
        school: "Horizon Academy",
        avatar: "/images/avatar.jpg",
        email: localStorage.getItem('userEmail') || 'student@horizon.com'
    });

    const [stats] = useState({
        overallGrade: 87,
        completedAssignments: 24,
        pendingAssignments: 3,
        studyStreak: 12,
        hoursStudied: 45.5
    });

    const [recentGrades] = useState([
        { subject: "Mathematics", grade: 92, trend: "up" },
        { subject: "Physics", grade: 85, trend: "up" },
        { subject: "Chemistry", grade: 88, trend: "stable" },
        { subject: "English", grade: 83, trend: "down" }
    ]);

    const [upcomingAssignments] = useState([
        { title: "Calculus Integration Problems", subject: "Mathematics", dueDate: "Tomorrow", priority: "high" },
        { title: "Physics Lab Report", subject: "Physics", dueDate: "Dec 15", priority: "medium" },
        { title: "Chemistry Quiz", subject: "Chemistry", dueDate: "Dec 18", priority: "low" }
    ]);

    const [achievements] = useState([
        { title: "Study Streak Master", description: "12 days in a row", icon: "🔥", earned: true },
        { title: "Math Wizard", description: "90+ in 3 math tests", icon: "🧮", earned: true },
        { title: "Early Bird", description: "Complete 5 assignments early", icon: "⏰", earned: false }
    ]);

    const [todoItems, setTodoItems] = useState([
        { id: 1, text: 'Complete calculus homework', completed: false, priority: 'high' },
        { id: 2, text: 'Review physics formulas', completed: false, priority: 'medium' },
        { id: 3, text: 'Prepare for chemistry quiz', completed: true, priority: 'low' }
    ]);

    const [newTaskInput, setNewTaskInput] = useState('');

    const handleAddTask = () => {
        if (newTaskInput.trim()) {
            const newTask = {
                id: Date.now(),
                text: newTaskInput.trim(),
                completed: false,
                priority: 'medium'
            };
            setTodoItems([...todoItems, newTask]);
            setNewTaskInput('');
        }
    };

    const handleToggleTask = (id) => {
        setTodoItems(todoItems.map(task => 
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const handleDeleteTask = (id) => {
        setTodoItems(todoItems.filter(task => task.id !== id));
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return '#ff4757';
            case 'medium': return '#ffa502';
            case 'low': return '#2ed573';
            default: return '#747d8c';
        }
    };

    const getTrendIcon = (trend) => {
        switch (trend) {
            case 'up': return '📈';
            case 'down': return '📉';
            case 'stable': return '➡️';
            default: return '➡️';
        }
    };

    return (
        <div className="modern-dashboard">
            <Navbar />
            
            <main className="dashboard-main">
                {/* Welcome Section */}
                <section className="welcome-section">
                    <div className="welcome-content">
                        <div className="welcome-text">
                            <h1 className="welcome-title">
                                Welcome back, <span className="highlight">{studentData.name}</span>
                            </h1>
                            <p className="welcome-subtitle">
                                {studentData.grade} • {studentData.school}
                            </p>
                        </div>
                        <div className="welcome-avatar">
                            <img src={studentData.avatar} alt={studentData.name} />
                            <div className="status-indicator"></div>
                        </div>
                    </div>
                </section>

                {/* Stats Grid */}
                <section className="stats-section">
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-icon">📊</div>
                            <div className="stat-content">
                                <h3 className="stat-value">{stats.overallGrade}%</h3>
                                <p className="stat-label">Overall Grade</p>
                            </div>
                        </div>
                        
                        <div className="stat-card">
                            <div className="stat-icon">✅</div>
                            <div className="stat-content">
                                <h3 className="stat-value">{stats.completedAssignments}</h3>
                                <p className="stat-label">Completed</p>
                            </div>
                        </div>
                        
                        <div className="stat-card">
                            <div className="stat-icon">⏰</div>
                            <div className="stat-content">
                                <h3 className="stat-value">{stats.pendingAssignments}</h3>
                                <p className="stat-label">Pending</p>
                            </div>
                        </div>
                        
                        <div className="stat-card">
                            <div className="stat-icon">🔥</div>
                            <div className="stat-content">
                                <h3 className="stat-value">{stats.studyStreak}</h3>
                                <p className="stat-label">Day Streak</p>
                            </div>
                        </div>
                        
                        <div className="stat-card">
                            <div className="stat-icon">📚</div>
                            <div className="stat-content">
                                <h3 className="stat-value">{stats.hoursStudied}h</h3>
                                <p className="stat-label">This Week</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Main Content Grid */}
                <section className="content-section">
                    <div className="content-grid">
                        {/* Recent Grades */}
                        <div className="content-card grades-card">
                            <div className="card-header">
                                <h2 className="card-title">Recent Grades</h2>
                                <button className="card-action">View All</button>
                            </div>
                            <div className="grades-list">
                                {recentGrades.map((grade, index) => (
                                    <div key={index} className="grade-item">
                                        <div className="grade-subject">
                                            <h4>{grade.subject}</h4>
                                            <span className="trend-icon">{getTrendIcon(grade.trend)}</span>
                                        </div>
                                        <div className="grade-value">
                                            <span className={`grade-score ${grade.grade >= 90 ? 'excellent' : grade.grade >= 80 ? 'good' : 'needs-improvement'}`}>
                                                {grade.grade}%
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Upcoming Assignments */}
                        <div className="content-card assignments-card">
                            <div className="card-header">
                                <h2 className="card-title">Upcoming Assignments</h2>
                                <button className="card-action">View All</button>
                            </div>
                            <div className="assignments-list">
                                {upcomingAssignments.map((assignment, index) => (
                                    <div key={index} className="assignment-item">
                                        <div className="assignment-info">
                                            <h4 className="assignment-title">{assignment.title}</h4>
                                            <p className="assignment-subject">{assignment.subject}</p>
                                            <span className="assignment-due">Due: {assignment.dueDate}</span>
                                        </div>
                                        <div className="assignment-priority">
                                            <span 
                                                className="priority-dot" 
                                                style={{ backgroundColor: getPriorityColor(assignment.priority) }}
                                            ></span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* To-Do List */}
                        <div className="content-card todo-card">
                            <div className="card-header">
                                <h2 className="card-title">My Tasks</h2>
                            </div>
                            <div className="todo-list">
                                {todoItems.map(task => (
                                    <div key={task.id} className={`todo-item ${task.completed ? 'completed' : ''}`}>
                                        <div className="todo-content">
                                            <input 
                                                type="checkbox" 
                                                checked={task.completed}
                                                onChange={() => handleToggleTask(task.id)}
                                                className="todo-checkbox"
                                            />
                                            <span className="todo-text">{task.text}</span>
                                        </div>
                                        <div className="todo-actions">
                                            <span 
                                                className="priority-indicator"
                                                style={{ backgroundColor: getPriorityColor(task.priority) }}
                                            ></span>
                                            <button 
                                                onClick={() => handleDeleteTask(task.id)}
                                                className="delete-btn"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="todo-input-section">
                                <input 
                                    type="text"
                                    value={newTaskInput}
                                    onChange={(e) => setNewTaskInput(e.target.value)}
                                    placeholder="Add a new task..."
                                    className="todo-input"
                                    onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
                                />
                                <button onClick={handleAddTask} className="add-task-btn">Add</button>
                            </div>
                        </div>

                        {/* Achievements */}
                        <div className="content-card achievements-card">
                            <div className="card-header">
                                <h2 className="card-title">Achievements</h2>
                                <button className="card-action">View All</button>
                            </div>
                            <div className="achievements-list">
                                {achievements.map((achievement, index) => (
                                    <div key={index} className={`achievement-item ${achievement.earned ? 'earned' : 'locked'}`}>
                                        <div className="achievement-icon">
                                            {achievement.earned ? achievement.icon : '🔒'}
                                        </div>
                                        <div className="achievement-content">
                                            <h4 className="achievement-title">{achievement.title}</h4>
                                            <p className="achievement-description">{achievement.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Quick Actions */}
                <section className="quick-actions">
                    <div className="actions-grid">
                        <button className="action-btn primary" onClick={() => navigate('/askme')}>
                            <span className="action-icon">🤖</span>
                            <span className="action-text">AskMe! AI</span>
                        </button>
                        <button className="action-btn secondary" onClick={() => navigate('/student/academics')}>
                            <span className="action-icon">📚</span>
                            <span className="action-text">Academics</span>
                        </button>
                        <button className="action-btn secondary" onClick={() => navigate('/rewards')}>
                            <span className="action-icon">🏆</span>
                            <span className="action-text">Rewards</span>
                        </button>
                        <button className="action-btn secondary" onClick={() => navigate('/inbox')}>
                            <span className="action-icon">📬</span>
                            <span className="action-text">Inbox</span>
                        </button>
                    </div>
                </section>
            </main>
            
            <Footer />
        </div>
    );
}

export default ModernStudentDashboard;
