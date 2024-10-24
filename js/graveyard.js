
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
});

// Toggle between task grid and graveyard view
toggleViewButton.addEventListener("click", () => {
    if (taskGridContainer.style.display !== "none") {
        taskGridContainer.style.display = "none";
        taskGraveyardContainer.style.display = "block";
        toggleViewButton.textContent = "View Active Tasks";

        // Load graveyard tasks from local storage
        const graveyardTasks = JSON.parse(localStorage.getItem("graveyardTasks")) || [];
        const graveyardContainer = document.getElementById("graveyardTasks");
        graveyardContainer.innerHTML = ""; // Clear previous tasks
        graveyardTasks.forEach(task => {
            const taskElement = document.createElement("div");
            taskElement.classList.add("task-container");
            taskElement.textContent = `${task.text} (Due: ${task.dueDate})`;
            graveyardContainer.appendChild(taskElement);
        });
    } else {
        taskGridContainer.style.display = "block";
        taskGraveyardContainer.style.display = "none";
        toggleViewButton.textContent = "View Task Graveyard";
    }
});