let timer;
let seconds = 0;
let isPaused = false;
let duration = 0; // The total duration of the timer in seconds

const timerForm = document.getElementById('timer-form');
const minutesInput = document.getElementById('minutes');
const timerDisplay = document.getElementById('timer-display');
const alertSound = document.getElementById('alert-sound');

// Function to start the timer
timerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (timer) {
        clearInterval(timer);
    }
    
    // Get the duration from the input and convert to seconds
    const minutes = parseInt(minutesInput.value);
    if (!isNaN(minutes) && minutes > 0) {
        duration = minutes * 60;
        seconds = 0; // Reset seconds for a new timer
        isPaused = false;
        updateDisplay();
        timer = setInterval(runTimer, 1000);
    }
});

// The core timer function that runs every second
function runTimer() {
    if (seconds < duration) {
        seconds++;
        updateDisplay();
    } else {
        clearInterval(timer);
        timer = null;
        alertSound.play();
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
    if (timer && !isPaused) {
        clearInterval(timer);
        timer = null;
        isPaused = true;
    }
}

// ▶️ Function to resume the timer
function resumeTimer() {
    if (!timer && isPaused) {
        // Resume the timer by restarting the interval
        timer = setInterval(runTimer, 1000);
        isPaused = false;
    }
}

// ⏹️ Function to stop and reset the timer
function stopTimer() {
    clearInterval(timer);
    timer = null;
    isPaused = false;
    seconds = 0;
    duration = 0;
    timerDisplay.textContent = "00:00";
    alertSound.pause();
    alertSound.currentTime = 0; // Rewind the sound
}