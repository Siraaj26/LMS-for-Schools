import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/askme.css';

function AskMe() {
    const [persona, setPersona] = useState('mentor');
    const [language, setLanguage] = useState('en');
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [personaInfo, setPersonaInfo] = useState({
        name: 'Mentor',
        description: 'Wise and supportive guidance',
        avatar: '/images/mentor-avatar.png'
    });

    useEffect(() => {
        const personaData = {
            mentor: { name: 'Mentor', description: 'Wise and supportive guidance', avatar: '/images/mentor-avatar.png' },
            funny: { name: 'Funny', description: 'Cheerful and entertaining', avatar: '/images/funny-avatar.png' },
            calm: { name: 'Calm', description: 'Peaceful and relaxing', avatar: '/images/calm-avatar.png' },
            energetic: { name: 'Energetic', description: 'Dynamic and motivating', avatar: '/images/energetic-avatar.png' }
        };
        setPersonaInfo(personaData[persona]);
    }, [persona]);

    const handleSendMessage = async () => {
        if (message.trim()) {
            const userMessage = message;
            setChatHistory([...chatHistory, { type: 'user', text: userMessage }]);
            setMessage('');
            
            try {
                // Call backend API
                const response = await fetch('http://localhost:3001/api/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        message: userMessage,
                        persona: persona,
                        language: language
                    })
                });

                const data = await response.json();
                
                if (data.reply) {
                    setChatHistory(prev => [...prev, { 
                        type: 'bot', 
                        text: data.reply 
                    }]);
                } else {
                    throw new Error('No reply received');
                }
            } catch (error) {
                console.error('Error sending message:', error);
                setChatHistory(prev => [...prev, { 
                    type: 'bot', 
                    text: 'Sorry, I encountered an error. Please make sure the backend server is running on port 3001.' 
                }]);
            }
        }
    };

    const handleClearChat = () => {
        setChatHistory([]);
    };

    return (
        <div className="fun-student-dashboard askme-container">
            <Navbar />
            
            <main>
                <div className="askme-main">
                    <div className="askme-layout">
                        {/* Left Sidebar - Persona & Settings */}
                        <div className="askme-sidebar">
                            <div className="persona-card">
                                <div className="persona-header">
                                    <h3>🎭 Choose Your Assistant</h3>
                                    <p>Select a personality that matches your learning style</p>
                                </div>
                                
                                <div className="persona-grid">
                                    {Object.entries({
                                        mentor: { name: 'Mentor', description: 'Wise and supportive guidance', emoji: '🧑‍🏫' },
                                        funny: { name: 'Funny', description: 'Cheerful and entertaining', emoji: '😄' },
                                        calm: { name: 'Calm', description: 'Peaceful and relaxing', emoji: '😌' },
                                        energetic: { name: 'Energetic', description: 'Dynamic and motivating', emoji: '⚡' }
                                    }).map(([key, info]) => (
                                        <div 
                                            key={key} 
                                            className={`persona-option ${persona === key ? 'active' : ''}`}
                                            onClick={() => setPersona(key)}
                                        >
                                            <div className="persona-avatar">
                                                <span className="persona-emoji">{info.emoji}</span>
                                            </div>
                                            <div className="persona-info">
                                                <h4>{info.name}</h4>
                                                <p>{info.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>

                        {/* Main Chat Area */}
                        <div className="askme-chat">
                            <div className="chat-container">
                                <div className="chat-header">
                                    <div className="chat-avatar">
                                        <span className="avatar-emoji">
                                            {persona === 'mentor' ? '🧑‍🏫' : 
                                             persona === 'funny' ? '😄' : 
                                             persona === 'calm' ? '😌' : '⚡'}
                                        </span>
                                    </div>
                                    <div className="chat-info">
                                        <h3>{personaInfo.name}</h3>
                                        <p>{personaInfo.description}</p>
                                    </div>
                                    <div className="chat-controls">
                                        <select 
                                            value={language} 
                                            onChange={(e) => setLanguage(e.target.value)}
                                            className="language-select-compact"
                                        >
                                            <option value="en">🇺🇸 EN</option>
                                            <option value="es">🇪🇸 ES</option>
                                            <option value="fr">🇫🇷 FR</option>
                                            <option value="de">🇩🇪 DE</option>
                                        </select>
                                        <button 
                                            className="clear-chat-btn" 
                                            onClick={handleClearChat}
                                            title="Clear chat history"
                                        >
                                            🗑️
                                        </button>
                                        <div className="chat-status">
                                            <span className="status-dot"></span>
                                            <span>Online</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="chat-messages" id="chatMessages">
                                    {chatHistory.length === 0 ? (
                                        <div className="welcome-message">
                                            <div className="welcome-avatar">
                                                <span className="avatar-emoji">
                                                    {persona === 'mentor' ? '🧑‍🏫' : 
                                                     persona === 'funny' ? '😄' : 
                                                     persona === 'calm' ? '😌' : '⚡'}
                                                </span>
                                            </div>
                                            <div className="welcome-content">
                                                <h4>Hello! I'm {personaInfo.name} 👋</h4>
                                                <p>I'm here to help you with your studies! Ask me anything about your courses, assignments, or learning strategies.</p>
                                                <div className="quick-questions">
                                                    <button className="quick-btn" onClick={() => setMessage("Help me understand this concept")}>
                                                        💡 Explain a concept
                                                    </button>
                                                    <button className="quick-btn" onClick={() => setMessage("Give me study tips")}>
                                                        📚 Study tips
                                                    </button>
                                                    <button className="quick-btn" onClick={() => setMessage("Help me with my assignment")}>
                                                        📝 Assignment help
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        chatHistory.map((message, index) => (
                                            <div key={index} className={`message ${message.type}`}>
                                                <div className="message-avatar">
                                                    {message.type === 'user' ? (
                                                        <span className="avatar-emoji">👤</span>
                                                    ) : (
                                                        <span className="avatar-emoji">
                                                            {persona === 'mentor' ? '🧑‍🏫' : 
                                                             persona === 'funny' ? '😄' : 
                                                             persona === 'calm' ? '😌' : '⚡'}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="message-content">
                                                    {message.text}
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                                
                                <div className="chat-input">
                                    <div className="input-container">
                                        <input 
                                            type="text" 
                                            placeholder="Ask me anything about your studies..."
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                            className="message-input"
                                        />
                                        <button 
                                            className="send-btn" 
                                            onClick={handleSendMessage}
                                            disabled={!message.trim()}
                                        >
                                            <span>Send</span>
                                            <span className="send-icon">🚀</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default AskMe;

