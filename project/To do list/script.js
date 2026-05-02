const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const todayTask = document.getElementById("todayTask");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  taskList.innerHTML = "";
  const today = new Date().toISOString().split("T")[0];
  let todayTasks = [];

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = `${task.text} ${task.date ? `(due: ${task.date})` : ""}`;

    span.addEventListener("click", () => toggleTask(index));

    const actions = document.createElement("div");
    actions.className = "actions";

    const delBtn = document.createElement("button");
    delBtn.textContent = "❌";
    delBtn.addEventListener("click", () => deleteTask(index));

    actions.appendChild(delBtn);
    li.appendChild(span);
    li.appendChild(actions);
    taskList.appendChild(li);

    if (task.date === today) todayTasks.push(task.text);
  });

  todayTask.textContent = todayTasks.length > 0
    ? `🎯 Today’s Task: ${todayTasks.join(", ")}`
    : "🎉 No tasks for today, enjoy your day!";

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

addTaskBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  const date = taskDate.value;

  if (!text) {
    alert("Please enter task!");
    return;
  }

  tasks.push({ text, date, completed: false });
  taskInput.value = "";
  taskDate.value = "";
  renderTasks();
});

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

renderTasks();
