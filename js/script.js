// Simple FAQ functionality
function setupFAQ() {
    const questions = document.querySelectorAll('.faq-question');
    
    questions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.parentElement.querySelector('.faq-answer');
            
            // Close other answers
            questions.forEach(otherQuestion => {
                if (otherQuestion !== this) {
                    const otherAnswer = otherQuestion.parentElement.querySelector('.faq-answer');
                    otherAnswer.classList.remove('active');
                    otherQuestion.parentElement.classList.remove('active');
                }
            });
            
            // Toggle current answer
            answer.classList.toggle('active');
            this.parentElement.classList.toggle('active');
        });
    });
}

// Set up buttons
function setupButtons() {
    const signInBtn = document.getElementById('heroSignInBtn');
    const signUpBtn2 = document.getElementById('stepsSignUpBtn');
    const signUpBtn3 = document.getElementById('futureSignUpBtn');
    
    if (signInBtn) {
        signInBtn.addEventListener('click', function() {
            window.location.href = 'signin.html';
        });
    }
    
    if (signUpBtn2) {
        signUpBtn2.addEventListener('click', function() {
            window.location.href = 'signup.html';
        });
    }
    
    if (signUpBtn3) {
        signUpBtn3.addEventListener('click', function() {
            window.location.href = 'signup.html';
        });
    }
}

// To-Do List Interactivity: strikethrough, add, and remove
function setupTodoList() {
  const todoList = document.getElementById('todo-items');
  if (!todoList) return;

  // Strikethrough on check
  todoList.addEventListener('change', function(e) {
    if (e.target.type === 'checkbox') {
      const li = e.target.closest('li');
      if (e.target.checked) {
        li.classList.add('completed');
      } else {
        li.classList.remove('completed');
      }
    }
  });

  // Add task
  const addBtn = document.querySelector('.add-task-btn');
  const addRow = document.querySelector('.add-task-row');
  const addInput = document.querySelector('.add-task-input');
  const saveBtn = document.querySelector('.save-task-btn');

  if (addBtn && addRow && addInput && saveBtn) {
    addBtn.addEventListener('click', () => {
      addRow.style.display = 'flex';
      addInput.focus();
    });
    saveBtn.addEventListener('click', () => {
      const val = addInput.value.trim();
      if (val) {
        const li = document.createElement('li');
        li.innerHTML = `<label class="custom-checkbox"><input type="checkbox"><span class="checkmark"></span></label><span class="todo-text"></span>`;
        li.querySelector('.todo-text').textContent = val;
        todoList.appendChild(li);
        addInput.value = '';
        addRow.style.display = 'none';
      }
    });
    addInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') saveBtn.click();
    });
  }
}

// When page loads
document.addEventListener('DOMContentLoaded', function() {
    setupFAQ();
    setupButtons();
    setupTodoList();
});