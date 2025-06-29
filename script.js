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

  tasks.forEach(function (task) {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);
    if (task.completed) {
      li.classList.add("completed");
    }

    const taskTextSpan = document.createElement("span");
    taskTextSpan.innerText = task.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "-";
    deleteBtn.classList.add("delete-btn");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    li.appendChild(checkbox);
    li.appendChild(taskTextSpan);
    li.appendChild(deleteBtn);

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

function deleteTask(taskId) {
  tasks = tasks.filter(function (task) {
    return task.id !== Number(taskId);
  });
  saveTasks();
  renderTasks();
}

function toggleComplete(taskId) {
  tasks = tasks.map(function (task) {
    if (task.id == Number(taskId)) {
      return {
        id: task.id,
        text: task.text,
        completed: !task.completed,
      };
    } else {
      return task;
    }
  });
  saveTasks();
  renderTasks();
}

// Save the tasks to the local storage of the browser.
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// --- EVENT LISTENERS ---
form.addEventListener("submit", function (event) {
  event.preventDefault();
  const taskText = taskInput.value.trim();

  if (taskText !== "") {
    addTask(taskText);
  } else {
    alert("Please enter a valid task!");
  }
  taskInput.value = "";
  taskInput.focus();
});

taskList.addEventListener("click", function (event) {
  const taskId = event.target.closest("li").getAttribute("data-id");
  if (event.target.classList.contains("delete-btn")) {
    deleteTask(taskId);
  } else if (event.target.type == "checkbox") {
    toggleComplete(taskId);
  }
});
