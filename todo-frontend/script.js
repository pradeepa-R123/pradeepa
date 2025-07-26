async function fetchTasks() {
  const res = await fetch("http://localhost:5000/api/tasks");
  const tasks = await res.json();
  tasks.forEach(displayTask);
}

async function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();
  if (taskText === "") return;

  const res = await fetch("http://localhost:5000/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: taskText })
  });

  const task = await res.json();
  displayTask(task);
  input.value = "";
}

function displayTask(task) {
  const li = document.createElement("li");
  li.dataset.id = task._id;
  li.innerHTML = `
    <span onclick="toggleComplete(this)" style="text-decoration: ${task.completed ? 'line-through' : 'none'}">
      ${task.title}
    </span>
    <div>
      <button onclick="editTask(this)">✏️</button>
      <button onclick="deleteTask(this)">❌</button>
    </div>
  `;
  document.getElementById("taskList").appendChild(li);
}

async function toggleComplete(span) {
  const li = span.closest("li");
  const id = li.dataset.id;
  const completed = span.style.textDecoration !== "line-through";

  await fetch(`http://localhost:5000/api/tasks/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed })
  });

  span.style.textDecoration = completed ? "line-through" : "none";
}

async function editTask(button) {
  const li = button.closest("li");
  const id = li.dataset.id;
  const span = li.querySelector("span");
  const newTitle = prompt("Edit task:", span.innerText);

  if (newTitle && newTitle !== span.innerText) {
    await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle })
    });

    span.innerText = newTitle;
  }
}

async function deleteTask(button) {
  const li = button.closest("li");
  const id = li.dataset.id;

  await fetch(`http://localhost:5000/api/tasks/${id}`, {
    method: "DELETE"
  });

  li.remove();
}

document.addEventListener("DOMContentLoaded", fetchTasks);