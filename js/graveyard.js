// graveyard 

// Function to delete a task from local storage
function deleteTask(taskToDelete) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task.id !== taskToDelete.id);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log("Task deleted. Updated tasks:", tasks);

    // Add task to the graveyard
    let graveyardTasks = JSON.parse(localStorage.getItem("graveyardTasks")) || [];
    graveyardTasks.push(taskToDelete);
    localStorage.setItem("graveyardTasks", JSON.stringify(graveyardTasks));
}

// Function to display tasks in the graveyard with click event to exhume
function displayGraveyardTasks() {
    const graveyardTasks = JSON.parse(localStorage.getItem("graveyardTasks")) || [];
    const graveyardContainer = document.getElementById("graveyardTasks");
    graveyardContainer.innerHTML = ""; // Clear previous tasks

    graveyardTasks.forEach(task => {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task-container");
        taskElement.textContent = `${task.text} (Due: ${task.dueDate})`;

        // Add click event listener to open exhumation modal
        taskElement.addEventListener("click", () => {
            openExhumeModal(task);
        });

        graveyardContainer.appendChild(taskElement);
    });
}

// Toggle between task grid and graveyard view
toggleViewButton.addEventListener("click", () => {
    if (taskGridContainer.style.display !== "none") {
        taskGridContainer.style.display = "none";
        taskGraveyardContainer.style.display = "block";
        toggleViewButton.textContent = "View Active Tasks";

        // Load and display graveyard tasks
        displayGraveyardTasks();
    } else {
        taskGridContainer.style.display = "block";
        taskGraveyardContainer.style.display = "none";
        toggleViewButton.textContent = "View Task Graveyard";
    }
});

// Clear all tasks from the graveyard
document.getElementById("clearGraveyardButton").addEventListener("click", () => {
    localStorage.removeItem("graveyardTasks");
    displayGraveyardTasks(); // Refresh displayed tasks
    console.log("All tasks cleared from graveyard");
});

// Function to open the exhumation confirmation modal
function openExhumeModal(task) {
    // Get the exhumation modal and show it
    const exhumeModal = document.getElementById("exhumeModal");
    exhumeModal.style.display = "block";

    // Set up the event for the "Exhume Task" button
    document.getElementById("confirmExhumeBtn").onclick = () => {
        exhumeTask(task);
        exhumeModal.style.display = "none"; // Close the modal after exhuming
    };

    // Set up the event for the "Cancel" button
    document.getElementById("cancelExhumeBtn").onclick = () => {
        exhumeModal.style.display = "none"; // Close the modal without changes
    };
}

// Function to exhume a task from the graveyard
function exhumeTask(taskToExhume) {
    let graveyardTasks = JSON.parse(localStorage.getItem("graveyardTasks")) || [];
    graveyardTasks = graveyardTasks.filter(task => task.id !== taskToExhume.id);
    localStorage.setItem("graveyardTasks", JSON.stringify(graveyardTasks));

    // Add the task back to the active tasks list
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(taskToExhume);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Refresh the displayed tasks
    displayTask(taskToExhume);
    displayGraveyardTasks();
}

// Load tasks from local storage on page load and display them
document.addEventListener("DOMContentLoaded", () => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => displayTask(task));

    // Initially hide the graveyard container
    taskGraveyardContainer.style.display = "none";

    // Apply the saved theme if any
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
        switchTheme(savedTheme);
    }

    // Load and display graveyard tasks
    displayGraveyardTasks();
});
