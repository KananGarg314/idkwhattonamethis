// A variable to hold the timer's ID
let timer;

// A variable to store the elapsed time
let seconds = 0;

// Get the element where the time will be displayed
const timerDisplay = document.getElementById('timer-display');

// Function to start the timer (you would call this on page load or with a start button)
function startTimer() {
    // Only start a new timer if one isn't already running
    if (!timer) {
        timer = setInterval(() => {
            seconds++;
            timerDisplay.textContent = seconds;
        }, 1000); // Update every 1000 milliseconds (1 second)
    }
}

// ⏸️ Function to pause the timer
function pauseTimer() {
    // Check if the timer is running before clearing it
    if (timer) {
        clearInterval(timer);
        timer = null; // Set timer to null to indicate it's paused
    }
}

// ▶️ Function to resume the timer
function resumeTimer() {
    // If the timer is not running, start it again
    if (!timer) {
        startTimer(); // Simply call the start function to resume
    }
}

// ⏹️ Function to stop and reset the timer
function stopTimer() {
    // Pause the timer first
    pauseTimer();
    // Reset the seconds count and update the display
    seconds = 0;
    timerDisplay.textContent = seconds;
}

// Example of how to start the timer initially
window.onload = startTimer;