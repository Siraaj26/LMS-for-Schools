const calendar = document.getElementById("calendar");
const monthYear = document.getElementById("month-year");

let today = new Date();
let month = today.getMonth();
let year = today.getFullYear();

function renderCalendar(month, year) {
  calendar.innerHTML = ""; // clear previous calendar

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // show month + year
  monthYear.textContent = today.toLocaleString("default", { month: "long" }) + " " + year;

  // add day headers
  for (let d of dayNames) {
    calendar.innerHTML += `<div class="header">${d}</div>`;
  }

  // empty slots before first day
  for (let i = 0; i < firstDay; i++) {
    calendar.innerHTML += `<div></div>`;
  }

  // add days
  for (let day = 1; day <= daysInMonth; day++) {
    let css = (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) 
              ? "day today" : "day";
    calendar.innerHTML += `<div class="${css}">${day}</div>`;
  }
  
}

renderCalendar(month, year);
