

let timer;
let seconds = 0;
let duration = 0;

window.addEventListener('DOMContentLoaded', () => {
    const timerForm = document.getElementById('timer-form');
    const minutesInput = document.getElementById('minutes');
    const timerDisplay = document.getElementById('timer-display');
    const alertSound = document.getElementById('alert-sound');

    function updateDisplay() {
        const remainingSeconds = duration - seconds;
        const minutes = Math.floor(remainingSeconds / 60);
        const secs = remainingSeconds % 60;
        timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

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

    function startTimer() {
        const minutes = parseInt(minutesInput.value, 10);
        if (!isNaN(minutes) && minutes > 0) {
            duration = minutes * 60;
            seconds = 0;
            updateDisplay();

            if (timer) clearInterval(timer);
            timer = setInterval(runTimer, 1000);
        }
    }

    timerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        startTimer();
    });

    window.pauseTimer = function () {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
    };

    window.resumeTimer = function () {
        if (!timer && seconds < duration) {
            timer = setInterval(runTimer, 1000);
        }
    };

    window.stopTimer = function () {
        clearInterval(timer);
        timer = null;
        seconds = 0;
        duration = 0;
        timerDisplay.textContent = "00:00";
        alertSound.pause();
        alertSound.currentTime = 0;
    };
});
