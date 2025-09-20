document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const calendar = document.getElementById('calendar');
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
    const eventTime = document.getElementById('eventTime');
    const eventDescription = document.getElementById('eventDescription');

    // State
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth();
    let events = JSON.parse(localStorage.getItem('calendarEvents')) || [];
    let selectedDate = null;
    let selectedEvent = null;

    // Constants
    const months = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // Initialize the calendar
    function initCalendar() {
        renderCalendar();
        setupEventListeners();
    }

    function renderCalendar() {
    
        calendar.innerHTML = '';
        monthYear.textContent = `${months[currentMonth]} ${currentYear}`;
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();
        
        days.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.className = 'day-header';
            dayHeader.textContent = day;
            calendar.appendChild(dayHeader);
        });

        // Add empty cells for days from the previous month
        for (let i = 0; i < firstDay; i++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'day other-month';
            const prevMonthDay = daysInPrevMonth - firstDay + i + 1;
            dayElement.innerHTML = `<div class="day-number">${prevMonthDay}</div>`;
            calendar.appendChild(dayElement);
        }

        // Add days of the current month
        const today = new Date();
        const isCurrentMonth = today.getFullYear() === currentYear && today.getMonth() === currentMonth;

        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'day';
            
            // Check if this is today
            if (isCurrentMonth && day === today.getDate()) {
                dayElement.classList.add('today');
            }
            
            // Create day number element
            const dayNumber = document.createElement('div');
            dayNumber.className = 'day-number';
            dayNumber.textContent = day;
            
            // Create event list container
            const eventList = document.createElement('div');
            eventList.className = 'event-list';
            
            // Add events for this day
            const dateKey = formatDate(new Date(currentYear, currentMonth, day));
            const dayEvents = getEventsForDate(dateKey);
            
            if (dayEvents.length > 0) {
                dayElement.classList.add('has-events');
                dayEvents.forEach(event => {
                    const eventElement = document.createElement('div');
                    eventElement.className = 'event-item';
                    eventElement.textContent = event.title;
                    eventElement.title = `${event.title}${event.time ? ' at ' + event.time : ''}${event.description ? '\n' + event.description : ''}`;
                    eventElement.addEventListener('click', (e) => {
                        e.stopPropagation();
                        openEditEventModal(event);
                    });
                    eventList.appendChild(eventElement);
                });
            }
            
            dayElement.appendChild(dayNumber);
            dayElement.appendChild(eventList);
            
            // Add click event to create new event
            dayElement.addEventListener('click', () => {
                const date = new Date(currentYear, currentMonth, day);
                openNewEventModal(date);
            });
            
            calendar.appendChild(dayElement);
        }
    }

    // Event handlers
    function setupEventListeners() {
        // Navigation
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

        // Modal controls
        closeBtn.addEventListener('click', closeModal);
        cancelBtn.addEventListener('click', closeModal);
        
        // Save event
        saveBtn.addEventListener('click', saveEvent);
        
        // Delete event
        deleteBtn.addEventListener('click', deleteEvent);
      
    
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
            date: eventDate.value,
            time: eventTime.value,
            description: eventDescription.value.trim()
        };

        if (selectedEvent) {
            // Update existing event
            const index = events.findIndex(e => e.id === selectedEvent.id);
            if (index !== -1) {
                events[index] = event;
            }
        } else {
            // Add new event
            events.push(event);
        }

        saveEvents();
        renderCalendar();
        closeModal();
    }

    function deleteEvent() {
        if (selectedEvent && confirm()) {
            events = events.filter(event => event.id !== selectedEvent.id);
            saveEvents();
            renderCalendar();
            closeModal();
        }
    }

    function saveEvents() {
        localStorage.setItem('calendarEvents', JSON.stringify(events));
    }

    // Modal functions
    function openNewEventModal(date) {
        selectedEvent = null;
        selectedDate = date;
        
        // Set default values
        eventTitle.value = '';
        eventDate.value = formatDate(date);
        eventTime.value = '';
        eventDescription.value = '';
        
        // Show/hide delete button
        deleteBtn.style.display = 'none';
        
        // Show modal
        modal.style.display = 'flex';
    }

    function openEditEventModal(event) {
        selectedEvent = event;
        
        // Fill form with event data
        eventTitle.value = event.title;
        eventDate.value = event.date;
        eventTime.value = event.time || '';
        eventDescription.value = event.description || '';
        
        // Show delete button
        deleteBtn.style.display = 'block';
        
        // Show modal
        modal.style.display = 'flex';
    }

    function closeModal() {
        modal.style.display = 'none';
        selectedEvent = null;
    }

    // Helper functions
    function formatDate(date) {
        const d = new Date(date);
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        const year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }

    initCalendar();
});
