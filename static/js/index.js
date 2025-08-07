let timer;
let seconds = 0;
let duration = 0; // The total duration of the timer in seconds

const timerForm = document.getElementById('timer-form');
const minutesInput = document.getElementById('minutes');
const timerDisplay = document.getElementById('timer-display');
const alertSound = document.getElementById('alert-sound');

// Function to start the timer
function startTimer() {
    // Get the duration from the input and convert to seconds
    const minutes = parseInt(minutesInput.value, 10); // Use radix 10 for safety
    if (!isNaN(minutes) && minutes > 0) {
        duration = minutes * 60;
        seconds = 0; // Reset seconds for a new timer
        updateDisplay();
        
        // Clear any existing timer before starting a new one
        if (timer) {
            clearInterval(timer);
        }
        timer = setInterval(runTimer, 1000);
    }
}

// Event listener for the form submission
timerForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent the page from reloading
    startTimer();
});

// The core timer function that runs every second
function runTimer() {
    if (seconds < duration) {
        seconds++;
        updateDisplay();
    } else {
        // Timer has finished
        clearInterval(timer);
        timer = null;
        alertSound.play();
        // You can add more actions here, like a visual alert
    }
}

// Function to update the timer display (e.g., 00:00)
function updateDisplay() {
    const remainingSeconds = duration - seconds;
    const minutes = Math.floor(remainingSeconds / 60);
    const secs = remainingSeconds % 60;
    
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(secs).padStart(2, '0');
    
    timerDisplay.textContent = `${formattedMinutes}:${formattedSeconds}`;
}

// ⏸️ Function to pause the timer
function pauseTimer() {
    if (timer) {
        clearInterval(timer);
        timer = null; // Set to null to indicate it's paused
    }
}

// ▶️ Function to resume the timer
function resumeTimer() {
    // Check if a timer is not running but has been paused
    if (!timer && seconds < duration) {
        timer = setInterval(runTimer, 1000);
    }
}

// ⏹️ Function to stop and reset the timer
function stopTimer() {
    clearInterval(timer);
    timer = null;
    seconds = 0;
    duration = 0;
    timerDisplay.textContent = "00:00";
    alertSound.pause();
    alertSound.currentTime = 0; // Rewind the sound
}