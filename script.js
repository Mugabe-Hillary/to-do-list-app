// Select the DOM elements and store in variables.
const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");

form.addEventListener("submit", function(event) {
  //Prevent the form's default behavior
  event.preventDefault();

  //Get the text from the input field and log it
  const taskText = taskInput.value.trim();
  if (taskText === "") {
    alert("Please enter a valid task!");
    taskInput.focus();
    return;
  }

  // Create a new 'li' element, add the input text and append it to the task list.
  const newTask = document.createElement("li");
  newTask.innerText = taskText;
  taskList.appendChild(newTask);

  // Clear the input field and reset cursor
  taskInput.value = "";
  taskInput.focus();
});
