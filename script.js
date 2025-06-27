// --- SELECTORS ---
// Select the DOM elements and store in variables.
const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");

// --- LOADING LOGIC ---
// Load the tasks from local storage and parse Or initialize tasks array.
let tasks;
const savedTasks = localStorage.getItem("tasks");
if (savedTasks) {
  tasks = JSON.parse(savedTasks);
} else {
  tasks = [];
}

// Initial Render of the tasks
renderTasks();

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
  saveTasks();
  renderTasks();
}

// Save the tasks to the local storage of the browser.
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
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
