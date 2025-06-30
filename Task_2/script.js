// JavaScript Form Validation
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const message = document.getElementById('message');
  const formMessage = document.getElementById('formMessage');

  if (!name.value || !email.value || !message.value) {
    formMessage.textContent = 'Please fill in all fields.';
    formMessage.style.color = 'red';
  } else if (!validateEmail(email.value)) {
    formMessage.textContent = 'Enter a valid email address.';
    formMessage.style.color = 'red';
  } else {
    formMessage.textContent = 'Form submitted successfully!';
    formMessage.style.color = 'green';
    name.value = '';
    email.value = '';
    message.value = '';
  }
});

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Dynamic To-Do List
function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskList = document.getElementById('taskList');

  if (taskInput.value.trim() === '') return;

  const li = document.createElement('li');
  li.textContent = taskInput.value;

  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'Remove';
  removeBtn.onclick = () => li.remove();

  li.appendChild(removeBtn);
  taskList.appendChild(li);

  taskInput.value = '';
}
