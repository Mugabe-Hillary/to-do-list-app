// --- SELECTORS ---
// Select the DOM elements and store in variables.
const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");

// --- STATE ---
// Global tasks array variable for data persistance.
let tasks = [];

// --- FUNCTIONS ---
// Dynamically update the task list( erase and add new tasks)
function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach(function(task) {
    const li = document.createElement("li");
    li.innerText = task.text;
    taskList.appendChild(li);
  });
}

// Add task to the tasks array and then call renderTasks()
function addTask(taskText) {
  const newTask = {
    id: Date.now(),
    text: taskText,
    completed: false,
  };

  tasks.push(newTask);

  renderTasks();
}

// --- EVENT LISTENERS ---
form.addEventListener("submit", function(event) {
  event.preventDefault();
  const taskText = taskInput.value.trim();

  if (taskText !== "") {
    addTask(taskText);
    taskInput.value = "";
    taskInput.focus();
  } else {
    alert("Please enter a valid task!");
    taskInput.value = "";
    taskInput.focus();
  }
});
