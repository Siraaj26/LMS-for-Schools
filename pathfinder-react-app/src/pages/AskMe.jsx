import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

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
        <div data-role="student">
            <Navbar />
            
            <main className="askme-container">
                <section id="askme" className="askme-section">
                    <div className="askme-content">
                        {/* Chat Window */}
                        <div className="chat-container">
                            <div className="chat-window" id="chatWindow">
                                <div className="welcome-message">
                                    <div className="bot-message">
                                        <div className="avatar-container">
                                            <img src="/images/bot-avatar.png" alt="AskMe Bot" className="bot-avatar" id="botAvatar" />
                                        </div>
                                        <div className="message-content">
                                            <p>Hello! I'm AskMe!, your learning assistant. How can I help you today? 😊</p>
                                        </div>
                                    </div>
                                </div>
                                {chatHistory.map((msg, index) => (
                                    <div key={index} className={msg.type === 'user' ? 'user-message' : 'bot-message'}>
                                        {msg.type === 'bot' && (
                                            <div className="avatar-container">
                                                <img src={personaInfo.avatar} alt="Bot" className="bot-avatar" />
                                            </div>
                                        )}
                                        <div className="message-content">
                                            <p>{msg.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Chat Controls */}
                            <div className="chat-controls">
                                {/* Persona Selector */}
                                <div className="control-group">
                                    <label htmlFor="personaSelect">Personality:</label>
                                    <select 
                                        id="personaSelect" 
                                        className="control-select"
                                        value={persona}
                                        onChange={(e) => setPersona(e.target.value)}
                                    >
                                        <option value="mentor">🎓 Mentor</option>
                                        <option value="funny">😄 Funny</option>
                                        <option value="calm">😌 Calm</option>
                                        <option value="energetic">⚡ Energetic</option>
                                    </select>
                                </div>

                                {/* Language Selector */}
                                <div className="control-group">
                                    <label htmlFor="languageSelect">Language:</label>
                                    <select 
                                        id="languageSelect" 
                                        className="control-select"
                                        value={language}
                                        onChange={(e) => setLanguage(e.target.value)}
                                    >
                                        <option value="en">🇺🇸 English</option>
                                        <option value="es">🇪🇸 Spanish</option>
                                        <option value="fr">🇫🇷 French</option>
                                        <option value="de">🇩🇪 German</option>
                                        <option value="pt">🇵🇹 Portuguese</option>
                                        <option value="xh">🇿🇦 Xhosa</option>
                                        <option value="zu">🇿🇦 Zulu</option>
                                        <option value="af">🇿🇦 Afrikaans</option>
                                    </select>
                                </div>
                            </div>

                            {/* Input Area */}
                            <div className="input-area">
                                <div className="input-container">
                                    <input 
                                        type="text" 
                                        id="messageInput" 
                                        className="message-input" 
                                        placeholder="Type your question here..." 
                                        maxLength="500"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                    />
                                    <button id="sendButton" className="send-button" title="Send Message" onClick={handleSendMessage}>
                                        <i className="fas fa-paper-plane"></i>
                                    </button>
                                </div>
                                <div className="input-status" id="inputStatus"></div>
                            </div>
                        </div>

                        {/* Chat Settings Panel */}
                        <div className="settings-panel">
                            <h3>Chat Settings</h3>

                            <div className="persona-preview">
                                <h4>Current Persona</h4>
                                <div className="persona-card" id="personaCard">
                                    <img src={personaInfo.avatar} alt={personaInfo.name} className="persona-avatar" id="personaAvatar" />
                                    <div className="persona-info">
                                        <h5 id="personaName">{personaInfo.name}</h5>
                                        <p id="personaDescription">{personaInfo.description}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="setting-item" style={{marginTop: '3rem'}}>
                                <button id="clearChat" className="clear-button" onClick={handleClearChat}>
                                    <i className="fas fa-trash"></i> Clear Chat
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

export default AskMe;

