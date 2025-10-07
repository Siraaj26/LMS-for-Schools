import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

function StudentDashboard() {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [todoItems, setTodoItems] = useState([
        { id: 1, text: 'Finish Maths Assignment', completed: false },
        { id: 2, text: 'Read Chapter 4', completed: false }
    ]);
    const [newTaskInput, setNewTaskInput] = useState('');
    const [showAddTask, setShowAddTask] = useState(false);

    const handleTodoToggle = (id) => {
        setTodoItems(todoItems.map(item => 
            item.id === id ? { ...item, completed: !item.completed } : item
        ));
    };

    const handleAddTask = () => {
        if (newTaskInput.trim()) {
            setTodoItems([...todoItems, {
                id: Date.now(),
                text: newTaskInput,
                completed: false
            }]);
            setNewTaskInput('');
            setShowAddTask(false);
        }
    };

    return (
        <div data-role="student">
            <Navbar />
            
            <main className="dashboard">
                {/* Left side (2/3 width) */}
                <section className="left-side">
                    <div className="student-header">
                        <div className="student-info">
                            <div className="student-avatar">
                                <img src="/images/avatar.jpg" alt="Student Avatar" />
                            </div>
                            <div className="student-details">
                                <h1>Welcome, Stacy Swanepoel!</h1>
                                <p>Grade 10 • Student ID: ST2024001</p>
                                <div className="student-stats">
                                    <span className="stat">Location: Johannesburg</span>
                                    <span className="stat">Last Login: Today</span>
                                </div>
                            </div>
                        </div>
                        <div className="student-actions">
                            <button className="action-btn primary">View Profile</button>
                        </div>
                    </div>

                    {/* Main Dashboard Content */}
                    <div className="dashboard-content">
                        {/* Quick Overview */}
                        <div className="quick-overview-section">
                            <h2>Quick Overview</h2>
                            <div className="overview-cards-container">
                                <div className="card small-card announcements">
                                    <span className="small-card-icon"><i className="fa-solid fa-bullhorn"></i></span>
                                    <span className="small-card-number">4</span>
                                    <span className="small-card-label"><a href="/inbox">Announcements</a></span>
                                </div>
                                <div className="card small-card assignments">
                                    <span className="small-card-icon"><i className="fa-solid fa-book"></i></span>
                                    <span className="small-card-number">2</span>
                                    <span className="small-card-label">Assignments Due</span>
                                </div>
                                <div className="card small-card rewards" onClick={() => window.location.href='/rewards'} style={{cursor: 'pointer'}}>
                                    <span className="small-card-icon"><i className="fa-solid fa-trophy"></i></span>
                                    <span className="small-card-number">1000</span>
                                    <span className="small-card-label">Reward Points</span>
                                    <p className="progress-text">300 pts → Next Badge</p>
                                </div>
                            </div>
                        </div>

                        {/* Main Content Cards (2x2 grid) */}
                        <div className="big-cards">
                            <div className="card big">
                                <div className="card-header">
                                    <span className="card-icon">🎓</span>
                                    <span className="card-title"><a href="/student/academics">Academics</a></span>
                                </div>
                                <div className="card-stats">
                                    <div className="stat-block">
                                        <span className="stat-label">Avg Grade</span>
                                        <span className="stat-value">82%</span>
                                    </div>
                                    <div className="stat-block">
                                        <span className="stat-label">Subjects</span>
                                        <span className="stat-value">7</span>
                                    </div>
                                    <div className="stat-block">
                                        <span className="stat-label">Overdue</span>
                                        <span className="stat-value">2</span>
                                    </div>
                                </div>
                            </div>
                            <div className="card big">
                                <div className="card-header">
                                    <span className="card-icon">🗣️</span>
                                    <span className="card-title"><a href="/student/soft-skills">Soft Skills</a></span>
                                </div>
                                <div className="card-stats">
                                    <div className="stat-block">
                                        <span className="stat-label">Badges</span>
                                        <span className="stat-value">5</span>
                                    </div>
                                    <div className="stat-block">
                                        <span className="stat-label">Modules</span>
                                        <span className="stat-value">3/6</span>
                                    </div>
                                    <div className="stat-block">
                                        <span className="stat-label">Last Completed</span>
                                        <span className="stat-value">Teamwork</span>
                                    </div>
                                </div>
                            </div>
                            <div className="card big">
                                <div className="card-header">
                                    <span className="card-icon">⚽</span>
                                    <span className="card-title"><a href="/student/extracurricular">Extracurricular</a></span>
                                </div>
                                <div className="card-stats">
                                    <div className="stat-block">
                                        <span className="stat-label">Activities</span>
                                        <span className="stat-value">2</span>
                                    </div>
                                    <div className="stat-block">
                                        <span className="stat-label">Hours</span>
                                        <span className="stat-value">14</span>
                                    </div>
                                    <div className="stat-block">
                                        <span className="stat-label">Last</span>
                                        <span className="stat-value">Soccer</span>
                                    </div>
                                </div>
                            </div>
                            <div className="card big">
                                <div className="card-header">
                                    <span className="card-icon">🌍</span>
                                    <span className="card-title">Community</span>
                                </div>
                                <div className="card-stats">
                                    <div className="stat-block">
                                        <span className="stat-label">Events</span>
                                        <span className="stat-value">1</span>
                                    </div>
                                    <div className="stat-block">
                                        <span className="stat-label">Points</span>
                                        <span className="stat-value">120</span>
                                    </div>
                                    <div className="stat-block">
                                        <span className="stat-label">Next Event</span>
                                        <span className="stat-value">Cleanup</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Right side (1/3 width) */}
                <section className="right-panel">
                    {/* Calendar */}
                    <div id="calendar">
                        <div className="calendar-header">
                            <h2 id="month-year">September 2025</h2>
                            <div className="calendar-nav">
                                <button id="prev">‹</button>
                                <button id="next">›</button>
                            </div>
                        </div>
                        <div className="calendar" id="calendar-days"></div>
                    </div>

                    {/* To-Do List */}
                    <div className="todo-list">
                        <div className="todo-header">
                            <h3>📝 To-Do</h3>
                            <button className="add-task-btn" title="Add Task" onClick={() => setShowAddTask(true)}>
                                <i className="fa fa-plus"></i>
                            </button>
                        </div>
                        <ul id="todo-items">
                            {todoItems.map(item => (
                                <li key={item.id} className={item.completed ? 'completed' : ''}>
                                    <label className="custom-checkbox">
                                        <input 
                                            type="checkbox" 
                                            checked={item.completed}
                                            onChange={() => handleTodoToggle(item.id)}
                                        />
                                        <span className="checkmark"></span>
                                    </label>
                                    <span className="todo-text">{item.text}</span>
                                </li>
                            ))}
                        </ul>
                        {showAddTask && (
                            <div className="add-task-row">
                                <input 
                                    type="text" 
                                    className="add-task-input" 
                                    placeholder="New task..."
                                    value={newTaskInput}
                                    onChange={(e) => setNewTaskInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
                                />
                                <button className="save-task-btn" onClick={handleAddTask}>
                                    <i className="fa fa-check"></i>
                                </button>
                            </div>
                        )}
                    </div>
                </section>
            </main>
            
            <Footer />
        </div>
    );
}

export default StudentDashboard;


