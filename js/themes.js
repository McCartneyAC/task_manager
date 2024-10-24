
// Function to switch themes
function switchTheme(themeId) {
    // Disable all theme stylesheets
    const themeLinks = document.querySelectorAll('link[id$="Theme"]');
    themeLinks.forEach(link => {
        link.disabled = true;
    });

    // Enable the selected theme
    const selectedTheme = document.getElementById(themeId);
    if (selectedTheme) {
        selectedTheme.disabled = false;
        // Save the selected theme in local storage
        localStorage.setItem('selectedTheme', themeId);
    }
}

// Load the default theme (flat.css) on page load
function loadDefaultTheme() {
    const linkElement = document.createElement("link");
    linkElement.rel = "stylesheet";
    linkElement.href = "flat.css";
    linkElement.id = "flatTheme";
    document.head.appendChild(linkElement);

    // Load saved theme from local storage if any
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme && savedTheme !== 'flatTheme') {
        switchTheme(savedTheme);
    }
}

// Event listener for the change aesthetic button
document.getElementById("changeAestheticButton").addEventListener("click", () => {
    const themes = ["academiaTheme", "cottagecoreTheme", "cyberpunkTheme", "flatTheme", "ideTheme", "kidTheme", "newspaperTheme"];
    let currentThemeIndex = themes.indexOf(localStorage.getItem("selectedTheme") || "flatTheme");
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
    switchTheme(themes[currentThemeIndex]);
});

// Load the default theme on page load
document.addEventListener("DOMContentLoaded", loadDefaultTheme);