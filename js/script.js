// variables

let workTittle = document.getElementById('work');
let breakTittle = document.getElementById('break');

let colorHead = document.getElementById('head');

let workTime = 25;
let breakTime = 5;

let switchTime = workTime;

let seconds = "00";

// display
window.onload = () => {
    document.getElementById('minutes').innerHTML = workTime;
    document.getElementById('seconds').innerHTML = seconds;

    document.getElementById('head').style.background = '#987645'
    document.getElementById('ear-left').style.background = '#654321'
    document.getElementById('ear-right').style.background = '#654321'
    document.getElementById('face').style.background = '#654321'


    workTittle.classList.add('active');
}

function getNull(num) {

    if (num >= 0 && num < 10) {
        return `0${num}`;
    } else {
        return num;
    }
}

const changeGradientColor = (procent = 100) => {

    document.getElementById('head').style.background = `linear-gradient(to top, #987645 ${procent}%, white 0%)`;
    document.getElementById('ear-left').style.background = `linear-gradient(to right, #654321 ${procent}%, white 0%)`;
    document.getElementById('ear-right').style.background = `linear-gradient(to left, #654321 ${procent}%, white 0%)`;
    document.getElementById('face').style.background = `linear-gradient(to bottom, #654321 ${procent}%, white 0%)`;

}
// start timer
function start() {
    // change button
    document.getElementById('start').style.display = "none";
    document.getElementById('reset').style.display = "block";

    // change the time
    seconds = 59;

    let workMinutes = workTime - 1;
    let breakMinutes = breakTime - 1;

    breakCount = 1;
    let procent, time, minuteInsecond = 0;

    // countdown
    let timerFunction = () => {
        //change the display
        document.getElementById('minutes').innerHTML = workMinutes;
        document.getElementById('seconds').innerHTML = seconds;

        // start
        seconds = getNull(seconds - 1);

        //changeTime
        if (seconds === '00') {
            workMinutes = workMinutes - 1;

            if (workMinutes === -1) {
                if (breakCount % 2 !== 0) {
                    // start break
                    workMinutes = breakMinutes;
                    switchTime = 0;
                    breakCount++
                    // change the painel

                    workTittle.classList.remove('active');
                    breakTittle.classList.add('active');
                } else {
                    // continue work
                    workMinutes = workTime - 1;
                    switchTime = workTime;
                    breakCount++;
                    // change the painel
                    breakTittle.classList.remove('active');
                    workTittle.classList.add('active');
                }
            }
            seconds = 59;
        }

        //changeColorPug
        if (breakCount % 2 == 0) {
           
            changeGradientColor()

        } else {

            time = (workMinutes * 60) + seconds

            minuteInsecond = (switchTime * 60);

            procent = 100 - ((time * 100) / minuteInsecond);
            
            changeGradientColor(procent)

        }
    }

    // start countdown
    setInterval(timerFunction, 1000); // 1000 = 1s
}

let startTimer = document.getElementById('start');

startTimer.onclick = function () {
    start();
}