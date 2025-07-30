const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");
const modeToggle = document.getElementById("mode-toggle");
const clearAllBtn = document.getElementById("clear-all");
const notification = document.getElementById("notification");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let darkMode = localStorage.getItem("darkMode") === "true";

// Show tasks
function loadTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.innerHTML = `${task.name} <small>${task.date}</small>`;

        // Toggle completed
        li.addEventListener("click", () => {
            tasks[index].completed = !tasks[index].completed;
            saveTasks("Task status updated");
        });

        // Delete button
        const delBtn = document.createElement("button");
        delBtn.textContent = "X";
        delBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            tasks.splice(index, 1);
            saveTasks("Task deleted");
        });

        li.appendChild(delBtn);
        if (task.completed) li.classList.add("completed");
        taskList.appendChild(li);
    });
}

// Save tasks to localStorage
function saveTasks(message = "") {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
    if (message) showNotification(message);
}

// Add task
addBtn.addEventListener("click", () => {
    if (taskInput.value.trim() === "") {
        showNotification("Please enter a task!", true);
        return;
    }
    const now = new Date();
    tasks.push({
        name: taskInput.value.trim(),
        date: now.toLocaleString(),
        completed: false
    });
    taskInput.value = "";
    saveTasks("Task added!");
});

// Clear all tasks
clearAllBtn.addEventListener("click", () => {
    tasks = [];
    saveTasks("All tasks cleared!");
});

// Notification display
function showNotification(msg, isError = false) {
    notification.textContent = msg;
    notification.style.color = isError ? "red" : "#00e676";
    notification.style.display = "block";
    setTimeout(() => {
        notification.style.display = "none";
    }, 2000);
}

// Dark/Light Mode
function setMode() {
    document.body.classList.toggle("light", !darkMode);
    localStorage.setItem("darkMode", darkMode);
}
modeToggle.addEventListener("click", () => {
    darkMode = !darkMode;
    setMode();
});

// Load on start
setMode();
loadTasks();
