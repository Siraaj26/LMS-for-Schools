import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../../styles/student-dashboard.css';

function StudentDashboard() {
    // Mock data for a teen-friendly dashboard
    const [studentData] = useState({
        name: "Alex Johnson",
        grade: "Grade 11",
        school: "Horizon Academy",
        avatar: "/images/avatar.jpg",
        streak: 12,
        points: 2450
    });

    const [stats] = useState({
        overallGrade: 87,
        completedAssignments: 24,
        pendingAssignments: 3,
        studyStreak: 12,
        hoursThisWeek: 18.5,
        totalPoints: 2450
    });

    const [recentGrades] = useState([
        { subject: "Mathematics", grade: 92, trend: "up", icon: "📊" },
        { subject: "Physics", grade: 85, trend: "up", icon: "⚡" },
        { subject: "Chemistry", grade: 88, trend: "stable", icon: "🧪" },
        { subject: "English", grade: 83, trend: "down", icon: "📚" },
        { subject: "History", grade: 90, trend: "up", icon: "🏛️" }
    ]);

    const [upcomingTasks] = useState([
        { title: "Calculus Integration Problems", subject: "Math", dueDate: "Tomorrow", priority: "high", points: 50 },
        { title: "Physics Lab Report", subject: "Physics", dueDate: "Dec 15", priority: "medium", points: 75 },
        { title: "Chemistry Quiz Prep", subject: "Chemistry", dueDate: "Dec 18", priority: "low", points: 25 },
        { title: "English Essay", subject: "English", dueDate: "Dec 20", priority: "high", points: 100 }
    ]);


    const [todoItems, setTodoItems] = useState([
        { id: 1, text: 'Complete calculus homework', completed: false, priority: 'high', points: 50 },
        { id: 2, text: 'Review physics formulas', completed: false, priority: 'medium', points: 25 },
        { id: 3, text: 'Prepare for chemistry quiz', completed: true, priority: 'low', points: 30 },
        { id: 4, text: 'Read English chapter 4', completed: false, priority: 'medium', points: 20 }
    ]);

    const [newTaskInput, setNewTaskInput] = useState('');
    
    // Calendar state
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [calendarEvents, setCalendarEvents] = useState([
        { id: 1, title: "Math Quiz", date: "2024-12-15", time: "10:00", type: "quiz", points: 50, completed: false },
        { id: 2, title: "Physics Lab", date: "2024-12-18", time: "14:00", type: "lab", points: 75, completed: false },
        { id: 3, title: "English Essay Due", date: "2024-12-20", time: "23:59", type: "assignment", points: 100, completed: false },
        { id: 4, title: "Study Group", date: "2024-12-22", time: "16:00", type: "study", points: 25, completed: false }
    ]);
    
    // Gamification state
    const [dailyQuests] = useState([
        { id: 1, title: "Complete 3 assignments", progress: 2, target: 3, points: 100, completed: false },
        { id: 2, title: "Study for 2 hours", progress: 1.5, target: 2, points: 75, completed: false },
        { id: 3, title: "Get 90%+ on a quiz", progress: 0, target: 1, points: 150, completed: false }
    ]);
    
    const [leaderboard] = useState([
        { rank: 1, name: "Emma Wilson", points: 3200, avatar: "👩‍🎓", streak: 15 },
        { rank: 2, name: "Alex Johnson", points: 2450, avatar: "👨‍🎓", streak: 12 },
        { rank: 3, name: "Michael Brown", points: 2100, avatar: "👨‍🎓", streak: 8 },
        { rank: 4, name: "Sarah Davis", points: 1950, avatar: "👩‍🎓", streak: 10 },
        { rank: 5, name: "David Lee", points: 1800, avatar: "👨‍🎓", streak: 6 }
    ]);
    
    const [showCalendar, setShowCalendar] = useState(false);
    const [newEvent, setNewEvent] = useState({ title: '', date: '', time: '', type: 'assignment' });

    // Load events from localStorage on component mount
    useEffect(() => {
        const savedEvents = localStorage.getItem('studentCalendarEvents');
        if (savedEvents) {
            setCalendarEvents(JSON.parse(savedEvents));
        }
    }, []);

    // Save events to localStorage whenever calendarEvents changes
    useEffect(() => {
        localStorage.setItem('studentCalendarEvents', JSON.stringify(calendarEvents));
    }, [calendarEvents]);

    const handleAddTask = () => {
        if (newTaskInput.trim()) {
            const newTask = {
                id: Date.now(),
                text: newTaskInput.trim(),
                completed: false,
                priority: 'medium',
                points: 25
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

    // Calendar functions
    const getDaysInMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const formatDate = (date) => {
        return date.toISOString().split('T')[0];
    };

    const getEventsForDate = (date) => {
        const dateStr = formatDate(date);
        return calendarEvents.filter(event => event.date === dateStr);
    };

    const addEvent = () => {
        if (newEvent.title && newEvent.date) {
            const event = {
                id: Date.now(),
                title: newEvent.title,
                date: newEvent.date,
                time: newEvent.time || '00:00',
                type: newEvent.type,
                points: newEvent.type === 'quiz' ? 50 : newEvent.type === 'assignment' ? 100 : 25,
                completed: false
            };
            setCalendarEvents([...calendarEvents, event]);
            setNewEvent({ title: '', date: '', time: '', type: 'assignment' });
        }
    };

    const toggleEventCompleted = (eventId) => {
        setCalendarEvents(calendarEvents.map(event => 
            event.id === eventId ? { ...event, completed: !event.completed } : event
        ));
    };

    const deleteEvent = (eventId) => {
        setCalendarEvents(calendarEvents.filter(event => event.id !== eventId));
    };

    const navigateMonth = (direction) => {
        setCurrentDate(prev => {
            const newDate = new Date(prev);
            newDate.setMonth(prev.getMonth() + direction);
            return newDate;
        });
    };

    const getEventTypeIcon = (type) => {
        switch (type) {
            case 'quiz': return '📝';
            case 'assignment': return '📋';
            case 'lab': return '🧪';
            case 'study': return '📚';
            case 'exam': return '🎯';
            default: return '📅';
        }
    };

    const getEventTypeColor = (type) => {
        switch (type) {
            case 'quiz': return '#ff6b6b';
            case 'assignment': return '#4ecdc4';
            case 'lab': return '#45b7d1';
            case 'study': return '#96ceb4';
            case 'exam': return '#feca57';
            default: return '#a0a0a0';
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return '#ff6b6b';
            case 'medium': return '#ffd93d';
            case 'low': return '#6bcf7f';
            default: return '#a0a0a0';
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

    const getGradeColor = (grade) => {
        if (grade >= 90) return '#6bcf7f';
        if (grade >= 80) return '#ffd93d';
        if (grade >= 70) return '#ff9f43';
        return '#ff6b6b';
    };

    return (
        <div className="fun-student-dashboard">
            <Navbar />
            
            <main className="dashboard-main">
                {/* Fun Welcome Hero */}
                <section className="welcome-hero">
                    <div className="welcome-container">
                    <div className="welcome-content">
                        <div className="welcome-text">
                                <div className="welcome-greeting">
                                    <span className="greeting-emoji">🎉</span>
                            <h1 className="welcome-title">
                                        Hey <span className="highlight">{studentData.name}!</span>
                            </h1>
                                </div>
                            <p className="welcome-subtitle">
                                    {studentData.grade} at {studentData.school}
                                </p>
                                <div className="motivation-text">
                                    <span className="motivation-emoji">🚀</span>
                                    <span>Ready to level up your learning today?</span>
                                </div>
                            </div>
                            <div className="student-avatar-section">
                                <div className="avatar-container">
                                    <img src={studentData.avatar} alt="Student Avatar" className="student-avatar" />
                                    <div className="avatar-badge">
                                        Level {Math.floor(stats.totalPoints / 500) + 1}
                                    </div>
                        </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Gamified Stats Overview */}
                <section className="stats-overview">
                    <div className="stats-container">
                        <div className="stats-header">
                            <h2 className="stats-title">🎮 Your Learning Stats</h2>
                            <div className="level-progress">
                                <div className="level-info">
                                    <span className="current-level">Level {Math.floor(stats.totalPoints / 500) + 1}</span>
                                    <span className="level-points">{stats.totalPoints} XP</span>
                                </div>
                                <div className="level-bar">
                                    <div className="level-fill" style={{width: `${(stats.totalPoints % 500) / 5}%`}}></div>
                                </div>
                                <span className="next-level">Next: {Math.floor(stats.totalPoints / 500) * 500 + 500} XP</span>
                            </div>
                        </div>
                    <div className="stats-grid">
                        <div className="stat-card grade-card">
                            <div className="stat-icon">📊</div>
                            <div className="stat-content">
                                    <div className="stat-number">{stats.overallGrade}%</div>
                                    <div className="stat-label">Overall Grade</div>
                                <div className="stat-progress">
                                        <div className="progress-bar">
                                            <div className="progress-fill" style={{width: `${stats.overallGrade}%`}}></div>
                                        </div>
                                        <div className="progress-text">
                                            {stats.overallGrade >= 90 ? "🌟 Amazing!" : stats.overallGrade >= 80 ? "🎯 Great job!" : "💪 Keep going!"}
                                        </div>
                                    </div>
                            </div>
                        </div>
                        
                        <div className="stat-card streak-card">
                            <div className="stat-icon">🔥</div>
                            <div className="stat-content">
                                    <div className="stat-number">{stats.studyStreak}</div>
                                    <div className="stat-label">Day Streak</div>
                                    <div className="streak-fire">
                                        {Array.from({length: Math.min(stats.studyStreak, 5)}, (_, i) => '🔥').join('')}
                                    </div>
                                    <div className="stat-sub">
                                        {stats.studyStreak >= 7 ? "🔥 On fire!" : stats.studyStreak >= 3 ? "⚡ Getting hot!" : "💪 Building momentum!"}
                                    </div>
                                </div>
                        </div>
                        
                        <div className="stat-card hours-card">
                            <div className="stat-icon">⏰</div>
                            <div className="stat-content">
                                    <div className="stat-number">{stats.hoursThisWeek}h</div>
                                    <div className="stat-label">Study Time</div>
                                    <div className="hours-visual">
                                <div className="hours-bar">
                                            <div className="hours-fill" style={{width: `${Math.min(stats.hoursThisWeek / 20 * 100, 100)}%`}}></div>
                                        </div>
                                    </div>
                                    <div className="stat-sub">
                                        {stats.hoursThisWeek >= 15 ? "🎯 Study champion!" : stats.hoursThisWeek >= 10 ? "📚 Great focus!" : "💪 Keep studying!"}
                                    </div>
                            </div>
                        </div>
                        
                        <div className="stat-card assignments-card">
                            <div className="stat-icon">📝</div>
                            <div className="stat-content">
                                    <div className="stat-number">{stats.pendingAssignments}</div>
                                    <div className="stat-label">Due Soon</div>
                                    <div className="urgency-indicator">
                                        {stats.pendingAssignments > 2 ? "🚨" : stats.pendingAssignments > 0 ? "⚠️" : "✅"}
                                    </div>
                                    <div className="stat-sub">
                                        {stats.pendingAssignments === 0 ? "🎉 All caught up!" : `${stats.pendingAssignments} to complete`}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Dynamic Main Content with Better Flow */}
                <section className="main-content">
                    <div className="content-container">
                        {/* Top Priority Section - Overall Performance */}
                        <div className="priority-section">
                            <div className="performance-overview">
                                <div className="performance-hero">
                                    <div className="performance-main">
                                        <h2 className="section-title">🎯 Your Academic Performance</h2>
                                        <div className="performance-stats">
                                            <div className="main-stat">
                                                <div className="stat-value">{stats.overallGrade}%</div>
                                                <div className="stat-label">Overall Grade</div>
                                                <div className="stat-trend">
                                                    {stats.overallGrade >= 90 ? '🌟 Excellent!' : stats.overallGrade >= 80 ? '🎯 Great job!' : '💪 Keep improving!'}
                                                </div>
                                            </div>
                                            <div className="performance-breakdown">
                                                <div className="breakdown-item">
                                                    <span className="breakdown-label">Study Streak</span>
                                                    <span className="breakdown-value">{stats.studyStreak} days 🔥</span>
                                                </div>
                                                <div className="breakdown-item">
                                                    <span className="breakdown-label">This Week</span>
                                                    <span className="breakdown-value">{stats.hoursThisWeek}h studied</span>
                                                </div>
                                                <div className="breakdown-item">
                                                    <span className="breakdown-label">Due Soon</span>
                                                    <span className="breakdown-value">{stats.pendingAssignments} assignments</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="performance-visual">
                                        <div className="grade-chart">
                                            <div className="chart-circle">
                                                <div className="circle-progress" style={{'--progress': `${stats.overallGrade}%`}}>
                                                    <span className="circle-text">{stats.overallGrade}%</span>
                                                </div>
                                            </div>
                                            <div className="chart-labels">
                                                <div className="label-item">
                                                    <span className="label-dot excellent"></span>
                                                    <span>90-100%</span>
                                                </div>
                                                <div className="label-item">
                                                    <span className="label-dot good"></span>
                                                    <span>80-89%</span>
                                                </div>
                                                <div className="label-item">
                                                    <span className="label-dot average"></span>
                                                    <span>70-79%</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Dynamic Content Grid */}
                        <div className="dynamic-grid">
                            {/* Left Column - Academic Focus */}
                            <div className="academic-column">
                                {/* Recent Grades - Enhanced */}
                                <div className="content-card grades-card enhanced">
                                    <div className="card-header">
                                        <h2 className="card-title">📈 Recent Performance</h2>
                                        <div className="card-subtitle">Track your academic progress</div>
                                    </div>
                                    <div className="grades-grid">
                                {recentGrades.map((grade, index) => (
                                            <div key={index} className="grade-card">
                                                <div className="grade-header">
                                        <div className="grade-icon">{grade.icon}</div>
                                                    <div className="grade-subject">{grade.subject}</div>
                                        </div>
                                        <div className="grade-score" style={{color: getGradeColor(grade.grade)}}>
                                            {grade.grade}%
                                        </div>
                                                <div className="grade-trend">
                                                    <span className="trend-icon">{getTrendIcon(grade.trend)}</span>
                                                    <span className="trend-text">
                                                        {grade.trend === 'up' ? 'Improving!' : grade.trend === 'down' ? 'Needs focus' : 'Steady'}
                                                    </span>
                                                </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                                {/* Upcoming Tasks - Streamlined */}
                                <div className="content-card tasks-card enhanced">
                            <div className="card-header">
                                        <h2 className="card-title">📋 Upcoming Missions</h2>
                                        <div className="card-subtitle">Your priority assignments</div>
                            </div>
                                    <div className="tasks-flow">
                                {upcomingTasks.map((task, index) => (
                                            <div key={index} className="task-card">
                                                <div className="task-priority-indicator" style={{backgroundColor: getPriorityColor(task.priority)}}></div>
                                                <div className="task-content">
                                            <h4 className="task-title">{task.title}</h4>
                                                    <div className="task-meta">
                                                        <span className="task-subject">{task.subject}</span>
                                            <span className="task-due">Due: {task.dueDate}</span>
                                        </div>
                                                </div>
                                                <div className="task-reward">
                                                    <span className="reward-points">+{task.points} XP</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Gamification & Social */}
                            <div className="gamification-column">
                                {/* Daily Quests - Prominent */}
                                <div className="content-card quests-card enhanced">
                                    <div className="card-header">
                                        <h2 className="card-title">⚔️ Daily Quests</h2>
                                        <div className="quest-timer">⏰ 6h 23m left</div>
                                    </div>
                                    <div className="quests-flow">
                                        {dailyQuests.map((quest, index) => (
                                            <div key={index} className={`quest-card ${quest.completed ? 'completed' : ''}`}>
                                                <div className="quest-icon">⚔️</div>
                                                <div className="quest-content">
                                                    <h4 className="quest-title">{quest.title}</h4>
                                                    <div className="quest-progress">
                                                        <div className="progress-bar">
                                                            <div 
                                                                className="progress-fill" 
                                                                style={{width: `${Math.min((quest.progress / quest.target) * 100, 100)}%`}}
                                                            ></div>
                                                        </div>
                                                        <span className="progress-text">{quest.progress}/{quest.target}</span>
                                                    </div>
                                                </div>
                                                <div className="quest-reward">
                                                    <span className="reward-icon">⭐</span>
                                                    <span className="reward-text">+{quest.points}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Leaderboard - Compact */}
                                <div className="content-card leaderboard-card enhanced">
                                    <div className="card-header">
                                        <h2 className="card-title">🏆 Class Rankings</h2>
                                        <div className="your-rank">You're #2!</div>
                                    </div>
                                    <div className="leaderboard-compact">
                                        {leaderboard.slice(0, 3).map((player, index) => (
                                            <div key={index} className={`leaderboard-item ${player.name === studentData.name ? 'current-player' : ''}`}>
                                                <div className="rank-badge">
                                                    {player.rank === 1 ? '🥇' : player.rank === 2 ? '🥈' : '🥉'}
                                                </div>
                                                <div className="player-avatar">{player.avatar}</div>
                                                <div className="player-info">
                                                    <div className="player-name">{player.name}</div>
                                                    <div className="player-points">{player.points} XP</div>
                                        </div>
                                    </div>
                                ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Section - Interactive Tools */}
                        <div className="tools-section">
                            {/* Quick Actions */}
                            <div className="content-card todo-card enhanced">
                            <div className="card-header">
                                    <h2 className="card-title">✅ Daily Tasks</h2>
                                    <div className="card-subtitle">Complete your daily objectives</div>
                            </div>
                                <div className="todo-flow">
                                {todoItems.map(task => (
                                        <div key={task.id} className={`todo-card ${task.completed ? 'completed' : ''}`}>
                                        <input 
                                            type="checkbox" 
                                            checked={task.completed}
                                            onChange={() => handleToggleTask(task.id)}
                                            className="todo-checkbox"
                                        />
                                        <div className="todo-content">
                                            <span className="todo-text">{task.text}</span>
                                                <div className="todo-points">+{task.points} XP</div>
                                        </div>
                                        <button 
                                            onClick={() => handleDeleteTask(task.id)}
                                            className="delete-btn"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <div className="todo-input-section">
                                <input 
                                    type="text"
                                    value={newTaskInput}
                                    onChange={(e) => setNewTaskInput(e.target.value)}
                                    placeholder="Add a new task..."
                                        className="fun-input"
                                    onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
                                />
                                    <button onClick={handleAddTask} className="fun-button small primary">
                                        Add Task
                                    </button>
                                </div>
                            </div>

                            {/* Interactive Calendar */}
                            <div className="content-card calendar-card enhanced">
                                <div className="card-header">
                                    <h2 className="card-title">📅 Event Calendar</h2>
                                    <button 
                                        className="fun-button small primary"
                                        onClick={() => setShowCalendar(!showCalendar)}
                                    >
                                        {showCalendar ? 'Hide Calendar' : 'Show Calendar'}
                                    </button>
                                </div>
                                
                                {showCalendar && (
                                    <div className="calendar-container">
                                        <div className="calendar-header">
                                            <button 
                                                className="calendar-nav-btn"
                                                onClick={() => navigateMonth(-1)}
                                            >
                                                ◀
                                            </button>
                                            <h3 className="calendar-month">
                                                {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                            </h3>
                                            <button 
                                                className="calendar-nav-btn"
                                                onClick={() => navigateMonth(1)}
                                            >
                                                ▶
                                            </button>
                                        </div>
                                        
                                        <div className="calendar-grid">
                                            <div className="calendar-day-header">Sun</div>
                                            <div className="calendar-day-header">Mon</div>
                                            <div className="calendar-day-header">Tue</div>
                                            <div className="calendar-day-header">Wed</div>
                                            <div className="calendar-day-header">Thu</div>
                                            <div className="calendar-day-header">Fri</div>
                                            <div className="calendar-day-header">Sat</div>
                                            
                                            {Array.from({length: 35}, (_, i) => {
                                                const day = i - getFirstDayOfMonth(currentDate) + 1;
                                                const isCurrentMonth = day > 0 && day <= getDaysInMonth(currentDate);
                                                const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                                                const events = getEventsForDate(date);
                                                const isToday = formatDate(date) === formatDate(new Date());
                                                
                                                return (
                                                    <div 
                                                        key={i} 
                                                        className={`calendar-day ${isCurrentMonth ? 'current-month' : 'other-month'} ${isToday ? 'today' : ''}`}
                                                        onClick={() => setSelectedDate(date)}
                                                    >
                                                        <div className="day-number">{isCurrentMonth ? day : ''}</div>
                                                        {events.length > 0 && (
                                                            <div className="day-events">
                                                                {events.slice(0, 2).map(event => (
                                                                    <div 
                                                                        key={event.id}
                                                                        className="event-indicator"
                                                                        style={{backgroundColor: getEventTypeColor(event.type)}}
                                                                        title={event.title}
                                                                    >
                                                                        {getEventTypeIcon(event.type)}
                                                                    </div>
                                                                ))}
                                                                {events.length > 2 && (
                                                                    <div className="more-events">+{events.length - 2}</div>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                        </div>

                                        <div className="calendar-events">
                                            <h4 className="events-title">Events for {selectedDate.toLocaleDateString()}</h4>
                                            <div className="events-list">
                                                {getEventsForDate(selectedDate).map(event => (
                                                    <div key={event.id} className={`event-item ${event.completed ? 'completed' : ''}`}>
                                                        <div className="event-icon">{getEventTypeIcon(event.type)}</div>
                                                        <div className="event-content">
                                                            <h5 className="event-title">{event.title}</h5>
                                                            <p className="event-time">{event.time}</p>
                                                        </div>
                                                        <div className="event-actions">
                                                            <button 
                                                                className="event-toggle"
                                                                onClick={() => toggleEventCompleted(event.id)}
                                                            >
                                                                {event.completed ? '✅' : '⭕'}
                                                            </button>
                                                            <button 
                                                                className="event-delete"
                                                                onClick={() => deleteEvent(event.id)}
                                                            >
                                                                🗑️
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                            </div>
                                        </div>
                                        
                                        <div className="add-event-section">
                                            <h4 className="add-event-title">Add New Event</h4>
                                            <div className="add-event-form">
                                                <input 
                                                    type="text"
                                                    placeholder="Event title"
                                                    value={newEvent.title}
                                                    onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                                                    className="event-input"
                                                />
                                                <input 
                                                    type="date"
                                                    value={newEvent.date}
                                                    onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                                                    className="event-input"
                                                />
                                                <input 
                                                    type="time"
                                                    value={newEvent.time}
                                                    onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                                                    className="event-input"
                                                />
                                                <select 
                                                    value={newEvent.type}
                                                    onChange={(e) => setNewEvent({...newEvent, type: e.target.value})}
                                                    className="event-select"
                                                >
                                                    <option value="assignment">📋 Assignment</option>
                                                    <option value="quiz">📝 Quiz</option>
                                                    <option value="lab">🧪 Lab</option>
                                                    <option value="study">📚 Study</option>
                                                    <option value="exam">🎯 Exam</option>
                                                </select>
                                                <button onClick={addEvent} className="fun-button small primary">
                                                    Add Event
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

            </main>
            
            <Footer />
        </div>
    );
}

export default StudentDashboard;