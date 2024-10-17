 let timer;
        let totalSeconds = 0;
        let isRunning = false;
        let alarmSound = new Audio('https://cdn.freesound.org/previews/80/80921_1022651-lq.mp3');

        const display = document.getElementById('display');
        const startBtn = document.getElementById('startBtn');
        const pauseBtn = document.getElementById('pauseBtn');
        const stopBtn = document.getElementById('stopBtn');
        const hoursInput = document.getElementById('hours');
        const minutesInput = document.getElementById('minutes');
        const secondsInput = document.getElementById('seconds');
        const alarmBell = document.getElementById('alarmBell');

        function updateDisplay() {
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;
            display.textContent = ${pad(hours)}:${pad(minutes)}:${pad(seconds)};
        }

        function pad(num) {
            return num.toString().padStart(2, '0');
        }

        function startTimer() {
            if (!isRunning) {
                if (totalSeconds === 0) {
                    totalSeconds = (parseInt(hoursInput.value) || 0) * 3600 +
                                   (parseInt(minutesInput.value) || 0) * 60 +
                                   (parseInt(secondsInput.value) || 0);
                }
                timer = setInterval(() => {
                    if (totalSeconds > 0) {
                        totalSeconds--;
                        updateDisplay();
                    } else {
                        clearInterval(timer);
                        isRunning = false;
                        ringAlarm();
                    }
                }, 1000);
                isRunning = true;
            }
        }

        function pauseTimer() {
            clearInterval(timer);
            isRunning = false;
        }

        function stopTimer() {
            clearInterval(timer);
            isRunning = false;
            totalSeconds = 0;
            updateDisplay();
            hoursInput.value = '';
            minutesInput.value = '';
            secondsInput.value = '';
            checkInputs();
            stopAlarm();
        }

        function ringAlarm() {
            alarmBell.classList.add('ringing');
            alarmSound.loop = true;
            alarmSound.play();
        }

        function stopAlarm() {
            alarmBell.classList.remove('ringing');
            alarmSound.pause();
            alarmSound.currentTime = 0;
        }

        function checkInputs() {
            if (hoursInput.value || minutesInput.value || secondsInput.value) {
                startBtn.style.display = 'inline-block';
            } else {
                startBtn.style.display = 'none';
            }
        }

        [hoursInput, minutesInput, secondsInput].forEach(input => {
            input.addEventListener('input', checkInputs);
        });

        startBtn.addEventListener('click', startTimer);
        pauseBtn.addEventListener('click', pauseTimer);
        stopBtn.addEventListener('click', stopTimer);
        alarmBell.addEventListener('click', stopAlarm);

        // Initial check
        checkInputs();