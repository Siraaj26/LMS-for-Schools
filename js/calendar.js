document.addEventListener('DOMContentLoaded', function() {
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
  

    let currentDate = new Date(); 
    let currentYear = currentDate.getFullYear(); 
    let currentMonth = currentDate.getMonth(); 
    let events = JSON.parse(localStorage.getItem('calendarEvents')) || []; 
    let selectedEvent = null;

  
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    function initCalendar() {
        renderCalendar(); 
        setupEventListeners();
    }

    function renderCalendar() {
        calendar.innerHTML = ''; 
        monthYear.textContent = `${months[currentMonth]} ${currentYear}`; 

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

            const today = new Date();
            if (today.getFullYear() === currentYear && today.getMonth() === currentMonth && today.getDate() === day) {
                dayElement.classList.add('today');
            }

            const dayNumber = document.createElement('div');
            dayNumber.className = 'day-number';
            dayNumber.textContent = day;

            const eventList = document.createElement('div');
            eventList.className = 'event-list';

            const dateKey = formatDate(new Date(currentYear, currentMonth, day));
            const dayEvents = getEventsForDate(dateKey);

            dayEvents.forEach(event => {
                const eventElement = document.createElement('div');
                eventElement.className = 'event-item';
                eventElement.textContent = event.title;
                // Add click event to edit the event (with stopPropagation to prevent day click)
                eventElement.addEventListener('click', (e) => {
                    e.stopPropagation();
                    openEditEventModal(event);
                });
                eventList.appendChild(eventElement);
            });

            dayElement.appendChild(dayNumber);
            dayElement.appendChild(eventList);

            dayElement.addEventListener('click', () => openNewEventModal(new Date(currentYear, currentMonth, day)));

            calendar.appendChild(dayElement);
        }
    }

    function getEventsForDate(date) {
        return events.filter(event => event.date === date);
    }

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

    function saveEvent() {
        if (!eventTitle.value.trim()) {
            alert("Event cannot be empty");
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

    function openNewEventModal(date) {
        selectedEvent = null;
        const formattedDate = formatDate(date);
        eventTitle.value = '';
        eventDate.value = formattedDate;
        document.querySelector('.modal h3').textContent = 'Add New Event';
        deleteBtn.style.display = 'none';
        modal.style.display = 'flex';
    }

    // Open the modal to edit an existing event
    function openEditEventModal(event) {
        selectedEvent = event;
        eventTitle.value = event.title;
        eventDate.value = event.date;
        document.querySelector('.modal h3').textContent = 'Edit Event';
        deleteBtn.style.display = 'block';
        modal.style.display = 'flex';
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
