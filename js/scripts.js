// Get elements
const addTaskButton = document.getElementById("addTaskButton");
const taskModal = document.getElementById("taskModal");
const closeModalButton = document.querySelector(".close");
const taskForm = document.getElementById("taskForm");
const toggleViewButton = document.getElementById("toggleViewButton");
const taskGridContainer = document.getElementById("taskGridContainer");
const taskGraveyardContainer = document.getElementById("taskGraveyardContainer");

// Create view/edit task modal
const viewTaskModal = document.createElement("div");
viewTaskModal.classList.add("modal");
viewTaskModal.innerHTML = `
    <div class="modal-content">
        <span class="close" id="closeEditModal">&times;</span>
        <h2>Edit Task</h2>
        <form id="editTaskForm">
            <label for="editTaskText">Task:</label>
            <input type="text" id="editTaskText" name="editTaskText" required><br><br>
            <label for="editPriority">Priority:</label>
            <select id="editPriority" name="editPriority">
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
            </select><br><br>
            <label for="editTimeBudget">Time Budget:</label>
            <select id="editTimeBudget" name="editTimeBudget">
                <option value="short">Short</option>
                <option value="medium">Medium</option>
                <option value="long">Long</option>
                <option value="ongoing">Ongoing</option>
            </select><br><br>
            <label for="editDueDate">Due Date:</label>
            <input type="date" id="editDueDate" name="editDueDate"><br><br>
            <label for="editNotes">Notes:</label>
            <textarea id="editNotes" name="editNotes"></textarea><br><br>
            <button type="submit" id="saveEditTaskBtn">Save Changes</button>
        </form>
    </div>
`;
document.body.appendChild(viewTaskModal);
const closeViewTaskModalButton = document.getElementById("closeEditModal");
const editTaskForm = document.getElementById("editTaskForm");

// Open the modal when the "Add Task" button is clicked
addTaskButton.addEventListener("click", () => {
    taskModal.style.display = "block";
});

// Close the modal when the "×" button is clicked
closeModalButton.addEventListener("click", () => {
    taskModal.style.display = "none";
});

// Close the view/edit task modal when the "×" button is clicked
closeViewTaskModalButton.addEventListener("click", () => {
    viewTaskModal.style.display = "none";
});

// Close the modal if the user clicks outside of the modal content
window.addEventListener("click", (event) => {
    if (event.target == taskModal) {
        taskModal.style.display = "none";
    } else if (event.target == viewTaskModal) {
        viewTaskModal.style.display = "none";
    }
});

// Handle form submission and save task to local storage
taskForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent the form from submitting normally

    // Get form values
    const taskText = document.getElementById("taskText").value;
    const priority = document.getElementById("priority").value;
    const timeBudget = document.getElementById("timeBudget").value;
    const dueDate = document.getElementById("dueDate").value; 
    const notes = document.getElementById("notes").value; 

    // Create a task object
    const task = {
        id: Date.now(), // Unique ID for each task
        text: taskText,
        priority: priority,
        time: timeBudget,
        dueDate: dueDate,
        notes: notes
    };

    // Get existing tasks from local storage or initialize an empty array
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Add the new task to the array
    tasks.push(task);

    // Save the updated tasks array back to local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Log the tasks to the console (for debugging)
    console.log("Tasks saved to local storage:", tasks);

    // Display the new task in the appropriate cell
    displayTask(task);

    // Close the modal
    taskModal.style.display = "none";

    // Clear the form
    taskForm.reset();
});

// Function to display a task in the appropriate cell
function displayTask(task) {
    // Determine the appropriate cell ID based on priority and time
    let cellId = "";
    if (task.time === "short") {
        if (task.priority === "high") cellId = "task1";
        else if (task.priority === "medium") cellId = "task2";
        else if (task.priority === "low") cellId = "task3";
    } else if (task.time === "medium") {
        if (task.priority === "high") cellId = "task4";
        else if (task.priority === "medium") cellId = "task5";
        else if (task.priority === "low") cellId = "task6";
    } else if (task.time === "long") {
        if (task.priority === "high") cellId = "task7";
        else if (task.priority === "medium") cellId = "task8";
        else if (task.priority === "low") cellId = "task9";
    } else if (task.time === "ongoing") {
        if (task.priority === "high") cellId = "task10";
        else if (task.priority === "medium") cellId = "task11";
        else if (task.priority === "low") cellId = "task12";
    }

    // Find the appropriate cell and add the task name
    if (cellId) {
        const cell = document.getElementById(cellId);
        if (cell) {
            const taskElement = document.createElement("div");
            taskElement.classList.add("task-container"); // Add a class for styling

            // Create the delete button
            const deleteButton = document.createElement("span");
            deleteButton.textContent = "×";
            deleteButton.classList.add("delete-task");
            deleteButton.addEventListener("click", (event) => {
                event.stopPropagation(); // Prevent the click from propagating to the task element
                deleteTask(task);
                cell.removeChild(taskElement);
            });

            // Add task text and delete button to the task container
            const taskTextElement = document.createElement("span");
            taskTextElement.textContent = `${task.text} (Due: ${task.dueDate})`;
            taskElement.appendChild(taskTextElement);
            taskElement.appendChild(deleteButton);
            cell.appendChild(taskElement);

            // Add click event to open the view/edit modal with task details
            taskElement.addEventListener("click", (event) => {
                if (event.target !== deleteButton) { // Ensure the delete button click does not trigger the edit modal
                    document.getElementById("editTaskText").value = task.text;
                    document.getElementById("editPriority").value = task.priority;
                    document.getElementById("editTimeBudget").value = task.time;
                    document.getElementById("editDueDate").value = task.dueDate;
                    document.getElementById("editNotes").value = task.notes;
                    viewTaskModal.style.display = "block";

                    // Handle edit form submission
                    editTaskForm.onsubmit = function (event) {
                        event.preventDefault();

                        // Update task details
                        task.text = document.getElementById("editTaskText").value;
                        task.priority = document.getElementById("editPriority").value;
                        task.time = document.getElementById("editTimeBudget").value;
                        task.dueDate = document.getElementById("editDueDate").value;
                        task.notes = document.getElementById("editNotes").value;

                        // Save updated tasks to local storage
                        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
                        tasks = tasks.map(t => (t.id === task.id ? task : t));
                        localStorage.setItem("tasks", JSON.stringify(tasks));

                        // Refresh the task display
                        cell.innerHTML = "";
                        tasks.filter(t => t.priority === task.priority && t.time === task.time).forEach(t => displayTask(t));

                        // Close the modal
                        viewTaskModal.style.display = "none";
                    };
                }
            });
        }
    }
}



