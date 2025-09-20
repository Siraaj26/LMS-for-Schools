document.addEventListener('DOMContentLoaded', function() {
    
    const calendar = document.getElementById("calendar");
    const monthYear = document.getElementById("month-year");
    const prevBtn = document.getElementById("prev");
    const nextBtn = document.getElementById("next");
    const modal = document.getElementById("event-modal");
    const closeBtn = document.querySelector(".close");
    const eventForm = document.getElementById("event-form");
    const eventTitle = document.getElementById("event-title");
    const eventDate = document.getElementById("event-date");
    const eventDescription = document.getElementById("event-description");
    const eventsContainer = document.getElementById("events");

    
    let currentDate = new Date();
    let events = JSON.parse(localStorage.getItem('calendarEvents')) || [];
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    let selectedDate = null;

    
    function initCalendar() {
        renderCalendar();
        renderEvents();
    }

    
    function renderCalendar() {
        calendar.innerHTML = '';
        
    
        days.forEach(day => {
            const div = document.createElement("div");
            div.className = "header";
            div.textContent = day;
            calendar.appendChild(div);
        });

        const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
        const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
        const daysInPrevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();

      
        for (let i = firstDay - 1; i >= 0; i--) {
            const day = document.createElement("div");
            day.className = "day other-month";
            day.textContent = daysInPrevMonth - i;
            calendar.appendChild(day);
        }

      
        const today = new Date();
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement("div");
            dayElement.className = "day";
            dayElement.textContent = day;
            
          
            if (day === today.getDate() && 
                currentDate.getMonth() === today.getMonth() && 
                currentDate.getFullYear() === today.getFullYear()) {
                dayElement.classList.add("today");
            }

        
            const dateStr = formatDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
            if (hasEventOnDate(dateStr)) {
                const eventDot = document.createElement("div");
                eventDot.className = "event-dot";
                dayElement.appendChild(eventDot);
            }

    
            dayElement.addEventListener('click', () => {
                selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                showEventModal(selectedDate);
            });

            calendar.appendChild(dayElement);
        }

    
        const totalDays = firstDay + daysInMonth;
        const remainingCells = totalDays <= 35 ? 35 - totalDays : 42 - totalDays;
        
        for (let i = 1; i <= remainingCells; i++) {
            const day = document.createElement("div");
            day.className = "day other-month";
            day.textContent = i;
            calendar.appendChild(day);
        }

      
        monthYear.textContent = `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    }


    function showEventModal(date) {
        const formattedDate = formatDate(date);
        eventDate.value = formattedDate;
        eventTitle.value = '';
        eventDescription.value = '';
        modal.style.display = 'block';
    }

  
    function closeModal() {
        modal.style.display = 'none';
    }

    function formatDate(date) {
        const d = new Date(date);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    }

    
    function hasEventOnDate(dateStr) {
        return events.some(event => event.date === dateStr);
    }

    
    function renderEvents() {
        eventsContainer.innerHTML = '';
        const sortedEvents = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));
        
        sortedEvents.forEach((event, index) => {
            const eventElement = document.createElement('div');
            eventElement.className = 'event-item';
            eventElement.innerHTML = `
                <strong>${event.title}</strong>
                <span>${formatDisplayDate(event.date)}</span>
                <p>${event.description || 'No description'}</p>
                <button class="delete-event" data-index="${index}">Delete</button>
            `;
            eventsContainer.appendChild(eventElement);
        });

      
        document.querySelectorAll('.delete-event').forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const index = parseInt(button.getAttribute('data-index'));
                deleteEvent(index);
            });
        });
    }

  
    function formatDisplayDate(dateStr) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateStr).toLocaleDateString(undefined, options);
    }

    
    function addEvent(event) {
        events.push(event);
        localStorage.setItem('calendarEvents', JSON.stringify(events));
        renderCalendar();
        renderEvents();
    }

  
    function deleteEvent(index) {
        events.splice(index, 1);
        localStorage.setItem('calendarEvents', JSON.stringify(events));
        renderCalendar();
        renderEvents();
    }

  
    prevBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    nextBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    closeBtn.addEventListener('click', closeModal);

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    eventForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const newEvent = {
            title: eventTitle.value,
            date: eventDate.value,
            description: eventDescription.value
        };
        
        addEvent(newEvent);
        closeModal();
    });


    initCalendar();
});
