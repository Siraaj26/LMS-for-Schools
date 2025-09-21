document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const calendar = document.getElementById('calendar-days');
    const monthYear = document.getElementById('month-year');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const modal = document.getElementById('eventModal');
    const closeBtn = document.querySelector('.close');
    const saveBtn = document.getElementById('saveEvent');
    const cancelBtn = document.getElementById('cancelEvent');
    const deleteBtn = document.getElementById('deleteEvent');
    const eventTitle = document.getElementById('eventTitle');
    const eventDate = document.getElementById('eventDate');
    
    // Inline form elements
    const inlineSaveBtn = document.querySelector('.btn-save');
    const inlineDeleteBtn = document.querySelector('.btn-delete');
    const inlineCancelBtn = document.querySelector('.btn-cancel');
    const inlineEventTitle = document.getElementById('inlineEventTitle');
    const inlineEventDate = document.getElementById('inlineEventDate');
    const addEventCard = document.querySelector('.add-event-card');

    // State
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth();
    let events = JSON.parse(localStorage.getItem('studentCalendarEvents')) || [];
    let selectedDate = null;
    let selectedEvent = null;

    // Constants
    const months = ["January", "February", "March", "April", "May", "June", 
                   "July", "August", "September", "October", "November", "December"];
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // Initialize the calendar
    function initCalendar() {
        renderCalendar();
        setupEventListeners();
    }

    // Render the calendar
    function renderCalendar() {
        calendar.innerHTML = '';
        monthYear.textContent = `${months[currentMonth]} ${currentYear}`;

        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

        // Add day headers
        days.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.className = 'day-header';
            dayHeader.textContent = day;
            calendar.appendChild(dayHeader);
        });

        // Add days from previous month
        for (let i = 0; i < firstDay; i++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'day other-month';
            const prevMonthDay = daysInPrevMonth - firstDay + i + 1;
            dayElement.innerHTML = `<div class="day-number">${prevMonthDay}</div>`;
            calendar.appendChild(dayElement);
        }

        // Add days of current month
        const today = new Date();
        const isCurrentMonth = today.getFullYear() === currentYear && today.getMonth() === currentMonth;

        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'day';
            
            if (isCurrentMonth && day === today.getDate()) {
                dayElement.classList.add('today');
            }
            
            const dayNumber = document.createElement('div');
            dayNumber.className = 'day-number';
            dayNumber.textContent = day;
            
            const eventList = document.createElement('div');
            eventList.className = 'event-list';
            
            const dateKey = formatDate(new Date(currentYear, currentMonth, day));
            const dayEvents = getEventsForDate(dateKey);
            
            if (dayEvents.length > 0) {
                dayElement.classList.add('has-events');
                dayEvents.forEach(event => {
                    const eventElement = document.createElement('div');
                    eventElement.className = 'event-item';
                    eventElement.textContent = event.title;
                    eventElement.title = event.title;
                    eventElement.addEventListener('click', (e) => {
                        e.stopPropagation();
                        openEditEventModal(event);
                    });
                    eventList.appendChild(eventElement);
                });
            }
            
            dayElement.appendChild(dayNumber);
            dayElement.appendChild(eventList);
            
            dayElement.addEventListener('click', () => {
                const date = new Date(currentYear, currentMonth, day);
                openNewEventModal(date);
            });
            
            calendar.appendChild(dayElement);
        }
        
        // Add days from next month
        const totalCells = Math.ceil((daysInMonth + firstDay) / 7) * 7;
        const remainingCells = totalCells - (daysInMonth + firstDay);
        
        for (let i = 1; i <= remainingCells; i++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'day other-month';
            dayElement.innerHTML = `<div class="day-number">${i}</div>`;
            calendar.appendChild(dayElement);
        }
    }

    // Event handlers
    function setupEventListeners() {
        prevBtn.addEventListener('click', () => {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            renderCalendar();
        });

        nextBtn.addEventListener('click', () => {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            renderCalendar();
        });

        // Modal event listeners
        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        if (cancelBtn) cancelBtn.addEventListener('click', closeModal);
        if (saveBtn) saveBtn.addEventListener('click', saveEvent);
        if (deleteBtn) deleteBtn.addEventListener('click', deleteEvent);
        
        // Inline form event listeners
        if (inlineSaveBtn) inlineSaveBtn.addEventListener('click', saveInlineEvent);
        if (inlineDeleteBtn) inlineDeleteBtn.addEventListener('click', deleteInlineEvent);
        if (inlineCancelBtn) inlineCancelBtn.addEventListener('click', clearInlineForm);
        
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Event management
    function getEventsForDate(date) {
        return events.filter(event => event.date === date);
    }

    function saveEvent() {
        if (!eventTitle.value.trim()) {
            alert('Please enter a title for the event');
            return;
        }

        const event = {
            id: selectedEvent ? selectedEvent.id : Date.now(),
            title: eventTitle.value.trim(),
            date: eventDate.value
        };

        if (selectedEvent) {
            const index = events.findIndex(e => e.id === selectedEvent.id);
            if (index !== -1) {
                events[index] = event;
            }
        } else {
            events.push(event);
        }

        saveEvents();
        renderCalendar();
        closeModal();
    }

    function saveInlineEvent() {
        if (!inlineEventTitle.value.trim()) {
            alert('Please enter a title for the event');
            return;
        }

        if (!inlineEventDate.value) {
            alert('Please select a date for the event');
            return;
        }

        const event = {
            id: Date.now(),
            title: inlineEventTitle.value.trim(),
            date: inlineEventDate.value
        };

        events.push(event);
        saveEvents();
        renderCalendar();
        clearInlineForm();
        
        // Show success message
        showNotification('Event added successfully!', 'success');
    }

    function deleteInlineEvent() {
        if (confirm('Are you sure you want to clear the form?')) {
            clearInlineForm();
        }
    }

    function clearInlineForm() {
        inlineEventTitle.value = '';
        inlineEventDate.value = '';
    }

    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#00b894' : '#74b9ff'};
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            font-weight: 500;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    function deleteEvent() {
        if (selectedEvent && confirm('Are you sure you want to delete this event?')) {
            events = events.filter(event => event.id !== selectedEvent.id);
            saveEvents();
            renderCalendar();
            closeModal();
        }
    }

    function saveEvents() {
        localStorage.setItem('studentCalendarEvents', JSON.stringify(events));
    }

    function openNewEventModal(date) {
        selectedEvent = null;
        const formattedDate = formatDate(date);
        eventTitle.value = '';
        eventDate.value = formattedDate;
        document.querySelector('#eventModal h3').textContent = 'Add Event';
        deleteBtn.style.display = 'none';
        modal.style.display = 'flex';
    }

    function openEditEventModal(event) {
        selectedEvent = event;
        eventTitle.value = event.title;
        eventDate.value = event.date;
        document.querySelector('#eventModal h3').textContent = 'Edit Event';
        deleteBtn.style.display = 'block';
        modal.style.display = 'flex';
    }

    function closeModal() {
        modal.style.display = 'none';
        selectedEvent = null;
    }

    function formatDate(date) {
        const d = new Date(date);
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        const year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }

    // Initialize the calendar
    initCalendar();
});
