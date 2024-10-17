// Get modal elements
const modal = document.getElementById('taskModal');
const addTaskButton = document.getElementById('addTaskButton'); // Update this ID
const closeModal = document.getElementsByClassName('close')[0];
const submitTaskBtn = document.getElementById('submitTaskBtn');

// Open modal when "Add New Task" is clicked
addTaskButton.onclick = function() {
    modal.style.display = 'flex'; // Show the modal
}

// Close modal when 'x' is clicked
closeModal.onclick = function() {
    modal.style.display = 'none'; // Hide the modal
}

// Close modal when clicking outside the modal
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = 'none'; // Hide the modal
    }
}

// Retrieve tasks from localStorage when the page loads
window.onload = function() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    storedTasks.forEach(displayTask);  // Display each task
}

// Function to add a new task
submitTaskBtn.onclick = function() {
    const taskInput = document.getElementById('taskInput').value;
    if (taskInput === '') return;  // Prevent adding empty tasks

    const taskList = JSON.parse(localStorage.getItem('tasks')) || [];
    
    // Add task to taskList and update localStorage
    taskList.push(taskInput);
    localStorage.setItem('tasks', JSON.stringify(taskList));

    // Display task in the grid
    displayTask(taskInput);
    
    // Clear the input field and close the modal
    document.getElementById('taskInput').value = '';
    modal.style.display = 'none';
}

// Function to display a task in the correct grid cell
function displayTask(task) {
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('grid-item');
    taskDiv.textContent = task;

    // Append the task to a specific grid cell (you might want to modify this)
    const gridCells = document.querySelectorAll('.grid-item'); // Adjust according to your grid setup
    for (let i = 0; i < gridCells.length; i++) {
        if (gridCells[i].textContent === '') { // Find an empty cell
            gridCells[i].textContent = task; // Place task in that cell
            break;
        }
    }
}

// Optional: Clear all tasks
function clearTasks() {
    localStorage.removeItem('tasks');
    document.querySelector('.grid').innerHTML = '';  // Clear the visual grid
}
