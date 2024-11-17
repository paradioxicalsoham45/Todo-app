document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("task-input");
  const categorySelect = document.getElementById("category-select");
  const addTaskBtn = document.getElementById("add-task-btn");
  const todoList = document.getElementById("todo-list");
  const filterCategory = document.getElementById("filter-category");
});

let tasks = [];

const addTask = () => {
  const taskText = taskInput.value.trim();
  const taskCategory = categorySelect.value;

  if (taskText !== "") {
    const task = {
      id: Date.now(),
      text: taskText,
      category: taskCategory,
      completed: false,
    };
    tasks.push(task);
    renderTasks(tasks);
    taskInput.value = "";
  }
};

const renderTasks = (taskArray) => {
  taskList.innerHTML = "";
  taskArray.forEach((task) => {
    const taskItem = document.createElement("li");
    taskItem.classList.add("task-Item");
    if (task.completed) taskItem.classList.add("completed");

    taskItem.innerHTML = ` <span>${task.text} - <strong>${task.category}</strong></span>
    <div class="task-actions">
    <button onclick="toggleTask(${task.id})">✔️</button>
    <button onclick="deleteTask(${task.id})">❌</button>
    </div>`;
    taskList.appendChild(taskItem);
  });
};

window.toggleTask = (id) => {
  tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  renderTasks(tasks);
};

window.deleteTask = (id) => {
  tasks = tasks.filter((task) => task.id !== id);
  renderTasks(tasks);
};

filterCategory.addEventListener("change", (e) => {
  const selectedCategory = e.target.value;
  const filteredTasks =
    selectedCategory === "All"
      ? tasks
      : tasks.filter((task) => task.category === selectedCategory);
  renderTasks(filteredTasks);
});

addTask.addEventListener("click", addTask);

taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});
