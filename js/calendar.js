document.addEventListener('DOMContentLoaded', function() {
    // Get the important parts of the page we need to interact with
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
  

    let currentDate = new Date(); // Today’s date
    let currentYear = currentDate.getFullYear(); // Current year
    let currentMonth = currentDate.getMonth(); // Current month
    let events = JSON.parse(localStorage.getItem('calendarEvents')) || []; // Get saved events from the browser (or an empty array if none)
    let selectedDate = null; // Store the selected date for a new event
    let selectedEvent = null; // Store the event that is being edited

  
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // Start by setting up the calendar
    function initCalendar() {
        renderCalendar(); // Render the calendar
        setupEventListeners(); // Set up button clicks and modal actions
    }

    // Function to render the calendar
    function renderCalendar() {
        calendar.innerHTML = ''; // Clear any old content from the calendar
        monthYear.textContent = `${months[currentMonth]} ${currentYear}`; // Set the current month/year at the top

        // Get the first day of the month and how many days the month has
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

        // Add the days of the week (Sun, Mon, Tue, etc.)
        days.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.className = 'day-header';
            dayHeader.textContent = day;
            calendar.appendChild(dayHeader);
        });

        // Add empty cells for the days from the previous month (if the first day isn't Sunday)
        for (let i = 0; i < firstDay; i++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'day other-month';
            const prevMonthDay = daysInPrevMonth - firstDay + i + 1;
            dayElement.innerHTML = `<div class="day-number">${prevMonthDay}</div>`;
            calendar.appendChild(dayElement);
        }

        // Add the days of the current month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'day';

            // Highlight today's date
            const today = new Date();
            if (today.getFullYear() === currentYear && today.getMonth() === currentMonth && today.getDate() === day) {
                dayElement.classList.add('today');
            }

            // Show the day number
            const dayNumber = document.createElement('div');
            dayNumber.className = 'day-number';
            dayNumber.textContent = day;

            // Create a place to show events for the day
            const eventList = document.createElement('div');
            eventList.className = 'event-list';

            // Find events for this day
            const dateKey = formatDate(new Date(currentYear, currentMonth, day));
            const dayEvents = getEventsForDate(dateKey);

            // If there are events, display them
            dayEvents.forEach(event => {
                const eventElement = document.createElement('div');
                eventElement.className = 'event-item';
                eventElement.textContent = event.title;
                eventElement.addEventListener('click', () => openEditEventModal(event));
                eventList.appendChild(eventElement);
            });

            dayElement.appendChild(dayNumber);
            dayElement.appendChild(eventList);

            // Clicking a day opens the modal to add a new event
            dayElement.addEventListener('click', () => openNewEventModal(new Date(currentYear, currentMonth, day)));

            calendar.appendChild(dayElement);
        }
    }

    // Get events for a specific day
    function getEventsForDate(date) {
        return events.filter(event => event.date === date);
    }

    // Set up the button actions (next, previous, modal, etc.)
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

        closeBtn.addEventListener('click', closeModal);
        cancelBtn.addEventListener('click', closeModal);
        saveBtn.addEventListener('click', saveEvent);
        deleteBtn.addEventListener('click', deleteEvent);
    }

    // Save or update an event
    function saveEvent() {
        if (!eventTitle.value.trim()) {
            alert('Please enter a title for the event');
            return;
        }

        const event = {
            id: selectedEvent ? selectedEvent.id : Date.now(),
            title: eventTitle.value.trim(),
            date: eventDate.value,
        };

        if (selectedEvent) {
            const index = events.findIndex(e => e.id === selectedEvent.id);
            events[index] = event;
        } else {
            // Add new event
            events.push(event);
        }

        saveEvents();
        renderCalendar();
        closeModal();
    }

    // Delete an event
    function deleteEvent() {
        if (selectedEvent && confirm()) {
            events = events.filter(event => event.id !== selectedEvent.id);
            saveEvents();
            renderCalendar();
            closeModal();
        }
    }

    // Save events to local storage so they stay after refreshing
    function saveEvents() {
        localStorage.setItem('calendarEvents', JSON.stringify(events));
    }

    // Open the modal to add a new event
    function openNewEventModal(date) {
        selectedEvent = null;
        selectedDate = date;
        eventTitle.value = '';
        eventDate.value = formatDate(date);
        deleteBtn.style.display = 'none'; // Hide delete button for new events
        modal.style.display = 'flex'; // Show the modal
    }

    function openEditEventModal(event) {
        selectedEvent = event;
        eventTitle.value = event.title;
        eventDate.value = event.date;
        deleteBtn.style.display = 'block'; // Show delete button for editing events
        modal.style.display = 'flex'; // Show the modal
    }
    function closeModal() {
        modal.style.display = 'none';
        selectedEvent = null;
    }

    // Format date as YYYY-MM-DD
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
