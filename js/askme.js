// AskMe! Chatbot JavaScript
class AskMeBot {
    constructor() {
        this.currentPersona = 'mentor';
        this.currentLanguage = 'en';
        this.slangMode = false;
        this.voiceEnabled = true;
        this.voiceSpeed = 1.0;
        this.isRecording = false;
        this.recognition = null;
        this.synthesis = window.speechSynthesis;

        this.personas = {
            mentor: {
                name: 'Mentor',
                description: 'Wise and supportive guidance',
                avatar: '../images/mentor-avatar.png',
                color: '#667eea'
            },
            funny: {
                name: 'Funny',
                description: 'Cheerful and humorous helper',
                avatar: '../images/funny-avatar.png',
                color: '#28a745'
            },
            calm: {
                name: 'Calm',
                description: 'Peaceful and relaxing companion',
                avatar: '../images/calm-avatar.png',
                color: '#17a2b8'
            },
            energetic: {
                name: 'Energetic',
                description: 'Enthusiastic and motivating',
                avatar: '../images/energetic-avatar.png',
                color: '#fd7e14'
            }
        };

        this.languages = {
            en: 'English',
            es: 'Spanish',
            fr: 'French',
            de: 'German',
            pt: 'Portuguese'
        };

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupSpeechRecognition();
        this.updatePersonaDisplay();
        this.displayWelcomeMessage();
    }

    setupEventListeners() {
        // Input and send functionality
        const messageInput = document.getElementById('messageInput');
        const sendButton = document.getElementById('sendButton');
        const micButton = document.getElementById('micButton');

        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        sendButton.addEventListener('click', () => this.sendMessage());
        micButton.addEventListener('click', () => this.toggleVoiceInput());

        // Persona selector
        const personaSelect = document.getElementById('personaSelect');
        personaSelect.addEventListener('change', (e) => {
            this.currentPersona = e.target.value;
            this.updatePersonaDisplay();
        });

        // Language selector
        const languageSelect = document.getElementById('languageSelect');
        languageSelect.addEventListener('change', (e) => {
            this.currentLanguage = e.target.value;
            this.updateLanguageDisplay();
        });

        // Slang toggle
        const slangToggle = document.getElementById('slangToggle');
        slangToggle.addEventListener('change', (e) => {
            this.slangMode = e.target.checked;
        });

        // Voice settings
        const voiceToggle = document.getElementById('voiceToggle');
        voiceToggle.addEventListener('change', (e) => {
            this.voiceEnabled = e.target.checked;
            if (!this.voiceEnabled && this.synthesis.speaking) {
                this.synthesis.cancel();
            }
        });

        const voiceSpeed = document.getElementById('voiceSpeed');
        const speedValue = document.getElementById('speedValue');
        voiceSpeed.addEventListener('input', (e) => {
            this.voiceSpeed = parseFloat(e.target.value);
            speedValue.textContent = this.voiceSpeed.toFixed(1) + 'x';
        });

        // Clear chat
        const clearChat = document.getElementById('clearChat');
        clearChat.addEventListener('click', () => this.clearChat());
    }

    setupSpeechRecognition() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            this.recognition = new SpeechRecognition();

            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            this.recognition.lang = this.getVoiceLanguage();

            this.recognition.onstart = () => {
                this.isRecording = true;
                this.updateMicButton();
                this.updateInputStatus('Listening...');
            };

            this.recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                document.getElementById('messageInput').value = transcript;
                this.updateInputStatus('Voice input received');
                setTimeout(() => this.sendMessage(), 500);
            };

            this.recognition.onerror = (event) => {
                this.isRecording = false;
                this.updateMicButton();
                this.updateInputStatus(`Voice input error: ${event.error}`);
            };

            this.recognition.onend = () => {
                this.isRecording = false;
                this.updateMicButton();
                if (this.recognition.wasManuallyStarted) {
                    this.updateInputStatus('');
                }
            };
        } else {
            // Hide mic button if speech recognition is not supported
            document.getElementById('micButton').style.display = 'none';
        }
    }

    getVoiceLanguage() {
        const langMap = {
            'en': 'en-US',
            'es': 'es-ES',
            'fr': 'fr-FR',
            'de': 'de-DE',
            'pt': 'pt-PT'
        };
        return langMap[this.currentLanguage] || 'en-US';
    }

    updateMicButton() {
        const micButton = document.getElementById('micButton');
        if (this.isRecording) {
            micButton.classList.add('recording');
            micButton.innerHTML = '<i class="fas fa-stop"></i>';
        } else {
            micButton.classList.remove('recording');
            micButton.innerHTML = '<i class="fas fa-microphone"></i>';
        }
    }

    updateInputStatus(message) {
        document.getElementById('inputStatus').textContent = message;
    }

    toggleVoiceInput() {
        if (!this.recognition) {
            this.updateInputStatus('Voice input not supported');
            return;
        }

        if (this.isRecording) {
            this.recognition.stop();
        } else {
            this.recognition.lang = this.getVoiceLanguage();
            this.recognition.wasManuallyStarted = true;
            this.recognition.start();
        }
    }

    updatePersonaDisplay() {
        const persona = this.personas[this.currentPersona];
        const personaCard = document.getElementById('personaCard');
        const personaAvatar = document.getElementById('personaAvatar');
        const personaName = document.getElementById('personaName');
        const personaDescription = document.getElementById('personaDescription');
        const botAvatar = document.getElementById('botAvatar');

        personaAvatar.src = persona.avatar;
        personaName.textContent = persona.name;
        personaDescription.textContent = persona.description;
        personaCard.style.borderColor = persona.color;

        if (botAvatar) {
            botAvatar.src = persona.avatar;
        }
    }

    updateLanguageDisplay() {
        if (this.recognition) {
            this.recognition.lang = this.getVoiceLanguage();
        }
    }

    displayWelcomeMessage() {
        // Welcome message is already in HTML, no need to add programmatically
    }

    async sendMessage() {
        const messageInput = document.getElementById('messageInput');
        const message = messageInput.value.trim();

        if (!message) return;

        // Clear input and disable while processing
        messageInput.value = '';
        this.setInputDisabled(true);

        // Display user message
        this.displayMessage(message, 'user');

        // Show typing indicator
        this.showTypingIndicator();

        try {
            // Send to backend API
            const response = await this.callChatAPI(message);

            // Hide typing indicator
            this.hideTypingIndicator();

            // Display bot response
            this.displayMessage(response.reply, 'bot');

            // Speak response if voice is enabled
            if (this.voiceEnabled) {
                this.speakMessage(response.reply);
            }

        } catch (error) {
            console.error('Chat API error:', error);
            this.hideTypingIndicator();

            const errorMessage = "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.";
            this.displayMessage(errorMessage, 'bot');

            if (this.voiceEnabled) {
                this.speakMessage(errorMessage);
            }
        } finally {
            this.setInputDisabled(false);
        }
    }

    async callChatAPI(message) {
        const payload = {
            message: message,
            persona: this.currentPersona,
            language: this.currentLanguage,
            slang: this.slangMode
        };

        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    }

    displayMessage(message, sender) {
        const chatWindow = document.getElementById('chatWindow');
        const messageElement = document.createElement('div');
        messageElement.className = `message ${sender}-message`;

        const isUser = sender === 'user';
        const avatar = isUser ? '../images/avatar.jpg' : this.personas[this.currentPersona].avatar;
        const avatarAlt = isUser ? 'User' : 'AskMe Bot';

        messageElement.innerHTML = `
            <div class="avatar-container">
                <img src="${avatar}" alt="${avatarAlt}" class="${sender}-avatar">
            </div>
            <div class="message-content">
                <p>${this.escapeHtml(message)}</p>
            </div>
        `;

        chatWindow.appendChild(messageElement);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    showTypingIndicator() {
        const chatWindow = document.getElementById('chatWindow');
        const typingElement = document.createElement('div');
        typingElement.className = 'message bot-message';
        typingElement.id = 'typingIndicator';

        typingElement.innerHTML = `
            <div class="avatar-container">
                <img src="${this.personas[this.currentPersona].avatar}" alt="AskMe Bot" class="bot-avatar">
            </div>
            <div class="typing-indicator">
                <div class="typing-dots">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        `;

        chatWindow.appendChild(typingElement);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    speakMessage(message) {
        if (!this.synthesis) return;

        // Cancel any ongoing speech
        this.synthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(message);
        utterance.rate = this.voiceSpeed;
        utterance.lang = this.getVoiceLanguage();

        // Find appropriate voice for the language
        const voices = this.synthesis.getVoices();
        const voice = voices.find(v => v.lang.startsWith(this.currentLanguage)) || voices[0];
        if (voice) {
            utterance.voice = voice;
        }

        this.synthesis.speak(utterance);
    }

    setInputDisabled(disabled) {
        const messageInput = document.getElementById('messageInput');
        const sendButton = document.getElementById('sendButton');

        messageInput.disabled = disabled;
        sendButton.disabled = disabled;

        if (disabled) {
            messageInput.placeholder = 'Please wait...';
        } else {
            messageInput.placeholder = 'Type your question here...';
            messageInput.focus();
        }
    }

    clearChat() {
        const chatWindow = document.getElementById('chatWindow');

        // Keep only the welcome message
        const welcomeMessage = chatWindow.querySelector('.welcome-message');
        chatWindow.innerHTML = '';
        if (welcomeMessage) {
            chatWindow.appendChild(welcomeMessage);
        }

        // Cancel any ongoing speech
        if (this.synthesis) {
            this.synthesis.cancel();
        }

        // Clear input
        document.getElementById('messageInput').value = '';
        this.updateInputStatus('Chat cleared');

        setTimeout(() => {
            this.updateInputStatus('');
        }, 2000);
    }

    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, (m) => map[m]);
    }
}

// Initialize the chatbot when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit for components to load
    setTimeout(() => {
        window.askMeBot = new AskMeBot();
    }, 100);
});

// Handle page visibility changes to manage speech synthesis
document.addEventListener('visibilitychange', function() {
    if (document.hidden && window.speechSynthesis) {
        window.speechSynthesis.cancel();
    }
});
