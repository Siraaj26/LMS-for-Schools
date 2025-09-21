
const academicGoals = [
  { goal: "Achieve 85%+ in Mathematics", status: "In Progress", progress: "70%" },
  { goal: "Complete all Science assignments", status: "Completed", progress: "100%" },
  { goal: "Read 5 literature books", status: "In Progress", progress: "40%" }
];


const curriculum = [
  { course: "Mathematics", teacher: "Mr. Dlamini", status: "Ongoing" },
  { course: "Physical Science", teacher: "Ms. Nkosi", status: "Ongoing" },
  { course: "English Literature", teacher: "Mrs. Smith", status: "Ongoing" },
  { course: "History", teacher: "Mr. Patel", status: "Completed" }
];

function renderAcademicGoalsReport() {
  const container = document.getElementById('goals-report-content');
  if (!container) return;
  let html = '<table class="academic-table"><thead><tr><th>Goal</th><th>Status</th><th>Progress</th></tr></thead><tbody>';
  academicGoals.forEach(g => {
    html += `<tr><td>${g.goal}</td><td>${g.status}</td><td>${g.progress}</td></tr>`;
  });
  html += '</tbody></table>';
  container.innerHTML = html;
}

function renderCurriculum() {
  const container = document.getElementById('curriculum-content');
  if (!container) return;
  let html = '<table class="academic-table"><thead><tr><th>Course</th><th>Teacher</th><th>Status</th></tr></thead><tbody>';
  curriculum.forEach(c => {
    html += `<tr><td>${c.course}</td><td>${c.teacher}</td><td>${c.status}</td></tr>`;
  });
  html += '</tbody></table>';
  container.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', function() {
  renderAcademicGoalsReport();
  renderCurriculum();
});


