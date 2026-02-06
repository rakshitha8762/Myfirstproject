// Get data from localStorage or set empty array
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Get HTML elements
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const addBtn = document.getElementById("addBtn");

// Add event listener
addBtn.addEventListener("click", addTask);

// CREATE
function addTask() {
  const task = taskInput.value.trim();

  if (task === "") {
    alert("Please enter a task");
    return;
  }

  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  taskInput.value = "";
  renderTasks();
}

// READ
function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span>${task}</span>
      <div>
        <button class="edit-btn" onclick="editTask(${index})">Edit</button>
        <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
      </div>
    `;

    taskList.appendChild(li);
  });
}

// UPDATE
function editTask(index) {
  const updatedTask = prompt("Edit task", tasks[index]);

  if (updatedTask !== null && updatedTask.trim() !== "") {
    tasks[index] = updatedTask;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
  }
}

// DELETE
function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

// Load tasks on page refresh
renderTasks();

