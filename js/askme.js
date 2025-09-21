// AskMe! Chatbot JavaScript
class AskMeBot {
    constructor() {
        this.currentPersona = 'mentor';
        this.currentLanguage = 'en';

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
            pt: 'Portuguese',
            xh: 'Xhosa',
            zu: 'Zulu',
            af: 'Afrikaans'
        };

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updatePersonaDisplay();
        this.displayWelcomeMessage();
    }

    setupEventListeners() {
        // Input and send functionality
        const messageInput = document.getElementById('messageInput');
        const sendButton = document.getElementById('sendButton');

        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        sendButton.addEventListener('click', () => this.sendMessage());

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
        });

        // Clear chat
        const clearChat = document.getElementById('clearChat');
        clearChat.addEventListener('click', () => this.clearChat());
    }

    updateInputStatus(message) {
        document.getElementById('inputStatus').textContent = message;
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

        } catch (error) {
            console.error('Chat API error:', error);
            this.hideTypingIndicator();

            const errorMessage = "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.";
            this.displayMessage(errorMessage, 'bot');
        } finally {
            this.setInputDisabled(false);
        }
    }

    async callChatAPI(message) {
        const payload = {
            message: message,
            persona: this.currentPersona,
            language: this.currentLanguage,
            slang: false // Always false since slang mode is removed
        };

        let retryCount = 0;
        const maxRetries = 3;

        const attemptRequest = async () => {
            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 20000); // 20 second timeout

                const response = await fetch('/api/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload),
                    signal: controller.signal
                });

                clearTimeout(timeoutId);

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));

                    if (response.status === 429) {
                        throw new Error('RATE_LIMIT: Please wait a moment before sending another message.');
                    } else if (response.status === 503) {
                        throw new Error('SERVICE_BUSY: The AI service is busy. Please try again in a few moments.');
                    } else if (response.status === 504) {
                        throw new Error('TIMEOUT: Request timeout. Please try a shorter message.');
                    } else {
                        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
                    }
                }

                return await response.json();

            } catch (error) {
                console.error(`Request attempt ${retryCount + 1} failed:`, error.message);

                // Check if we should retry
                if (retryCount < maxRetries && (
                    error.name === 'AbortError' ||
                    error.message.includes('fetch') ||
                    error.message.includes('network') ||
                    error.message.includes('TIMEOUT') ||
                    error.message.includes('SERVICE_BUSY')
                )) {
                    retryCount++;
                    this.updateInputStatus(`Retrying... (${retryCount}/${maxRetries})`);

                    // Exponential backoff: wait 1s, then 2s, then 4s
                    const delay = Math.pow(2, retryCount - 1) * 1000;
                    await new Promise(resolve => setTimeout(resolve, delay));

                    return attemptRequest();
                }

                // If it's a rate limit error, provide specific guidance
                if (error.message.includes('RATE_LIMIT')) {
                    throw new Error('You\'re sending messages too quickly. Please wait a moment before trying again.');
                }

                // If it's a service busy error, provide specific guidance
                if (error.message.includes('SERVICE_BUSY')) {
                    throw new Error('The AI service is currently busy. Please try again in a few moments.');
                }

                // If it's a timeout, provide specific guidance
                if (error.message.includes('TIMEOUT') || error.name === 'AbortError') {
                    throw new Error('The request timed out. Please try sending a shorter message.');
                }

                // Generic error for anything else
                throw new Error('Unable to connect to the chat service. Please check your internet connection and try again.');
            }
        };

        return attemptRequest();
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
