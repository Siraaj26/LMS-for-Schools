class Inbox {
    constructor() {
        this.currentUser = null;
        this.currentFilter = 'all';
        this.messages = [];
        this.init();
    }

    init() {
        this.getCurrentUser();
        this.loadMessages();
        this.setupEventListeners();
        this.updateStats();
    }

    getCurrentUser() {
        const urlParams = new URLSearchParams(window.location.search);
        const userEmail = urlParams.get('user') || localStorage.getItem('currentUserEmail');
        this.currentUser = window.authDB.getUserByEmail(userEmail);
    }

    loadMessages() {
        if (!window.messages) {
            window.messages = [
                {
                    id: 1,
                    from: 'Ms. Johnson',
                    fromEmail: 'teacher@school.com',
                    to: this.currentUser ? this.currentUser.email : 'student@school.com',
                    subject: 'Math Assignment Feedback',
                    body: 'Great work on your recent math assignment! You scored 85%. Keep up the excellent work.',
                    date: '2024-03-15',
                    time: '10:30 AM',
                    isRead: false,
                    type: 'received'
                },
                {
                    id: 2,
                    from: this.currentUser ? this.currentUser.email : 'student@school.com',
                    to: 'Ms. Johnson',
                    toEmail: 'teacher@school.com',
                    subject: 'Question about Homework',
                    body: 'Hi Ms. Johnson, I have a question about problem 5 on page 42. Could you help me understand it better?',
                    date: '2024-03-14',
                    time: '3:45 PM',
                    isRead: true,
                    type: 'sent'
                },
                {
                    id: 3,
                    from: 'School Admin',
                    fromEmail: 'admin@school.com',
                    to: this.currentUser ? this.currentUser.email : 'student@school.com',
                    subject: 'Parent-Teacher Meeting Reminder',
                    body: 'This is a reminder that parent-teacher meetings are scheduled for next week. Please check your calendar.',
                    date: '2024-03-13',
                    time: '9:00 AM',
                    isRead: false,
                    type: 'received'
                }
            ];
        }
        this.messages = window.messages;
        this.displayMessages();
    }

    setupEventListeners() {
        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setFilter(e.target.dataset.filter);
            });
        });

        // Search functionality
        const searchInput = document.getElementById('messageSearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchMessages(e.target.value);
            });
        }
    }

    setFilter(filter) {
        this.currentFilter = filter;
        
        // Update active button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-filter="${filter}"]`).classList.add('active');

        // Update title
        const title = document.getElementById('messagesTitle');
        switch(filter) {
            case 'unread':
                title.textContent = 'Unread Messages';
                break;
            case 'sent':
                title.textContent = 'Sent Messages';
                break;
            default:
                title.textContent = 'All Messages';
        }

        this.displayMessages();
    }

    displayMessages() {
        const messagesList = document.getElementById('messagesList');
        if (!messagesList) return;

        let filteredMessages = this.messages;

        // Apply filter
        switch(this.currentFilter) {
            case 'unread':
                filteredMessages = this.messages.filter(msg => !msg.isRead && msg.type === 'received');
                break;
            case 'sent':
                filteredMessages = this.messages.filter(msg => msg.type === 'sent');
                break;
        }

        if (filteredMessages.length === 0) {
            messagesList.innerHTML = '<div class="no-messages">No messages found.</div>';
            return;
        }

        messagesList.innerHTML = filteredMessages.map(message => `
            <div class="message-item ${!message.isRead && message.type === 'received' ? 'unread' : ''}" 
                 onclick="window.inbox.showMessageDetail(${message.id})">
                <div class="message-icon">
                    ${message.type === 'sent' ? '📤' : '📥'}
                </div>
                <div class="message-info">
                    <div class="message-header">
                        <span class="message-from">${message.type === 'sent' ? `To: ${message.to}` : message.from}</span>
                        <span class="message-date">${message.date} ${message.time}</span>
                    </div>
                    <div class="message-subject">${message.subject}</div>
                    <div class="message-preview">${message.body.substring(0, 100)}...</div>
                </div>
                ${!message.isRead && message.type === 'received' ? '<div class="unread-indicator"></div>' : ''}
            </div>
        `).join('');
    }

    showMessageDetail(messageId) {
        const message = this.messages.find(msg => msg.id === messageId);
        if (!message) return;

        // Mark as read if it's a received message
        if (message.type === 'received' && !message.isRead) {
            message.isRead = true;
            this.updateStats();
            this.displayMessages();
        }

        // Show modal
        document.getElementById('messageDetailSubject').textContent = message.subject;
        document.getElementById('messageDetailFrom').textContent = 
            `From: ${message.type === 'sent' ? message.to : message.from}`;
        document.getElementById('messageDetailDate').textContent = 
            `${message.date} at ${message.time}`;
        document.getElementById('messageDetailBody').textContent = message.body;
        
        document.getElementById('messageDetailModal').style.display = 'block';
        this.currentMessageId = messageId;
    }

    sendMessage() {
        const to = document.getElementById('messageTo').value;
        const subject = document.getElementById('messageSubject').value;
        const body = document.getElementById('messageBody').value;

        if (!to || !subject || !body) {
            alert('Please fill in all fields');
            return;
        }

        const newMessage = {
            id: Date.now(),
            from: this.currentUser ? this.currentUser.email : 'student@school.com',
            to: to,
            toEmail: `${to}@school.com`,
            subject: subject,
            body: body,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
            isRead: true,
            type: 'sent'
        };

        window.messages.push(newMessage);
        this.messages = window.messages;
        this.displayMessages();
        this.updateStats();
        this.hideNewMessageForm();
        
        alert('Message sent successfully!');
    }

    replyToMessage() {
        const message = this.messages.find(msg => msg.id === this.currentMessageId);
        if (!message) return;

        document.getElementById('messageTo').value = message.fromEmail.split('@')[0];
        document.getElementById('messageSubject').value = `Re: ${message.subject}`;
        document.getElementById('messageBody').value = '';
        
        this.hideMessageDetail();
        this.showNewMessageForm();
    }

    deleteMessage() {
        if (confirm('Are you sure you want to delete this message?')) {
            this.messages = this.messages.filter(msg => msg.id !== this.currentMessageId);
            window.messages = this.messages;
            this.displayMessages();
            this.updateStats();
            this.hideMessageDetail();
        }
    }

    searchMessages(query) {
        const searchTerm = query.toLowerCase();
        const messageItems = document.querySelectorAll('.message-item');
        
        messageItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }

    updateStats() {
        const totalMessages = this.messages.length;
        const unreadMessages = this.messages.filter(msg => !msg.isRead && msg.type === 'received').length;
        
        const totalElement = document.getElementById('totalMessages');
        const unreadElement = document.getElementById('unreadMessages');
        
        if (totalElement) totalElement.textContent = totalMessages;
        if (unreadElement) unreadElement.textContent = unreadMessages;
    }

    showNewMessageForm() {
        document.getElementById('newMessageModal').style.display = 'block';
    }

    hideNewMessageForm() {
        document.getElementById('newMessageModal').style.display = 'none';
        document.getElementById('messageTo').value = '';
        document.getElementById('messageSubject').value = '';
        document.getElementById('messageBody').value = '';
    }

    hideMessageDetail() {
        document.getElementById('messageDetailModal').style.display = 'none';
        this.currentMessageId = null;
    }
}

// Global functions for HTML onclick handlers
function showNewMessageForm() {
    if (window.inbox) {
        window.inbox.showNewMessageForm();
    }
}

function hideNewMessageForm() {
    if (window.inbox) {
        window.inbox.hideNewMessageForm();
    }
}

function sendMessage() {
    if (window.inbox) {
        window.inbox.sendMessage();
    }
}

function hideMessageDetail() {
    if (window.inbox) {
        window.inbox.hideMessageDetail();
    }
}

function replyToMessage() {
    if (window.inbox) {
        window.inbox.replyToMessage();
    }
}

function deleteMessage() {
    if (window.inbox) {
        window.inbox.deleteMessage();
    }
}

// Initialize inbox when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.inbox = new Inbox();
});
