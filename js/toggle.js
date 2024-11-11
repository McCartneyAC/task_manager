document.addEventListener('DOMContentLoaded', () => {
    console.log("DOMContentLoaded event fired - toggle.js");

    // Function to switch between grid and list layouts
    function toggleGridLayout() {
        console.log("toggleGridLayout function called");

        // Get current view state from local storage or default to 'grid'
        let currentView = localStorage.getItem('currentView') || 'grid';
        console.log("Current view from local storage:", currentView);

        // Determine new view state
        let newView = currentView === 'grid' ? 'list' : 'grid';
        console.log("Determined new view:", newView);

        // Update CSS files based on the new view state
        const gridLink = document.getElementById('gridCss');
        const listLink = document.getElementById('listCss');
        console.log("Grid CSS Link:", gridLink);
        console.log("List CSS Link:", listLink);

        if (newView === 'list') {
            gridLink.disabled = true;
            listLink.disabled = false;
        } else {
            gridLink.disabled = false;
            listLink.disabled = true;
        }

        // Save new view state to local storage
        localStorage.setItem('currentView', newView);
        console.log("New view state saved to local storage:", newView);

        // Update button text
        const toggleButton = document.getElementById('toggleGridListViewButton');
        if (toggleButton) {
            toggleButton.textContent = newView === 'list' ? 'Grid View' : 'List View';
            console.log("Updated button text to:", toggleButton.textContent);
        } else {
            console.warn("Toggle button element not found!");
        }
    }

    // Event listener for the toggle button
    const toggleButton = document.getElementById('toggleGridListViewButton');
    if (toggleButton) {
        toggleButton.addEventListener('click', toggleGridLayout);
        console.log("Event listener added to toggle button:", toggleButton);
    } else {
        console.warn("Toggle button element not found during event listener setup!");
    }

    // Set default view on page load
    const gridLink = document.getElementById('gridCss');
    const listLink = document.getElementById('listCss');
    let currentView = localStorage.getItem('currentView') || 'grid';
    console.log("Setting initial view on page load. Current view:", currentView);

    if (currentView === 'grid') {
        gridLink.disabled = false;
        listLink.disabled = true;
        console.log("Grid view set as default");
    } else {
        gridLink.disabled = true;
        listLink.disabled = false;
        console.log("List view set as default");
    }

    // Set the initial button text
    if (toggleButton) {
        toggleButton.textContent = currentView === 'list' ? 'Grid View' : 'List View';
        console.log("Initial button text set to:", toggleButton.textContent);
    }
});
