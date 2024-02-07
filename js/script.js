// variables

let workTittle = document.getElementById('work');
let breakTittle = document.getElementById('break');

let workValue = document.querySelector('.painel__work span')
let breakValue = document.querySelector('.painel__break span')

let startBtn = document.getElementById('start');
let stopBtn = document.getElementById('stop');
let resetBtn = document.getElementById('reset');

let workTime = prompt('Введите время для работы в минутах', 25);
let breakTime = prompt('Введите время отдыха в минутах', 5);

let switchTime = workTime;

let seconds = "00";

let interval;

// display
window.onload = () => {
    document.getElementById('minutes').innerHTML = workTime;
    document.getElementById('seconds').innerHTML = seconds;

    document.getElementById('head').style.background = '#987645'
    document.getElementById('ear-left').style.background = '#654321'
    document.getElementById('ear-right').style.background = '#654321'
    document.getElementById('face').style.background = '#654321'

    localStorage.setItem('work', 0)
    localStorage.setItem('break', 0)

    workValue.innerHTML = localStorage.getItem('work')
    breakValue.innerHTML = localStorage.getItem('break')

    workTittle.classList.add('active');
}

function getNull(num) {

    if (num >= 0 && num < 10) {
        return `0${num}`;
    } else {
        return num;
    }
}

// const changeGradientColor = (procent = 100) => {

//     document.getElementById('head').style.background = `linear-gradient(to top, #987645 ${procent}%, white 0%)`;
//     document.getElementById('ear-left').style.background = `linear-gradient(to right, #654321 ${procent}%, white 0%)`;
//     document.getElementById('ear-right').style.background = `linear-gradient(to left, #654321 ${procent}%, white 0%)`;
//     document.getElementById('face').style.background = `linear-gradient(to bottom, #654321 ${procent}%, white 0%)`;

// }

let workMinutes = workTime - 1;
let breakMinutes = breakTime - 1;
let minutes = workTime;
localStorage.setItem('second', 59)

let countWork = 1;
let countBreak = 1;

var audio = new Audio('//www.w3schools.com/html/horse.mp3');

// start timer
function start() {
    // change button
    startBtn.style.display = "none";
    stopBtn.style.display = "block";
    resetBtn.style.display = "block"

    seconds = localStorage.getItem('second')
    breakCount = 1;
    // let procent, time, minuteInsecond = 0;
    audio.play();

    // countdown
    let timerFunction = () => {
        console.log(countBreak, 60 * breakTime + 1)
        console.log(countWork, 60 * workTime + 1)

        if(countWork === 60 * workTime - 1) {

            audio.play();

            localStorage.setItem('work',  parseInt(localStorage.getItem('work')) + workTime)
            workValue.innerHTML = localStorage.getItem('work')
   
            countWork = 1
        }


        if(countBreak === 60 * breakTime - 1) {

            audio.play();

            localStorage.setItem('break', parseInt(localStorage.getItem('break')) + breakTime)
            breakValue.innerHTML = localStorage.getItem('break')

            console.log(countBreak)
            countBreak = 1
        }



        //change the display
        document.getElementById('minutes').innerHTML = workMinutes;
        document.getElementById('seconds').innerHTML = seconds;

        // start
        seconds = getNull(seconds - 1);
        localStorage.setItem('second', seconds)


        console.log('Time', minutes, breakTime)
        if(minutes === workTime) {
            countWork++
        }
        else if(minutes === breakTime) {
            countBreak++
        }

        //changeTime
        if (seconds === '00') {
            workMinutes = workMinutes - 1;

            if (workMinutes === -1) {
                if (breakCount % 2 !== 0) {
                    minutes = breakTime
                    // start break
                    workMinutes = breakMinutes;
                    switchTime = 0;
                    breakCount++
                    // change the painel

                    workTittle.classList.remove('active');
                    breakTittle.classList.add('active');
                } else {
                    // continue work
                    minutes = workTime
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

        localStorage.setItem('second', seconds)


        // //changeColorPug
        // if (breakCount % 2 == 0) {
           
        //     changeGradientColor()

        // } else {

        //     time = (workMinutes * 60) + seconds

        //     minuteInsecond = (switchTime * 60);

        //     procent = 100 - ((time * 100) / minuteInsecond);
            
        //     // changeGradientColor(procent)

        // }
    }

    // start countdown
    interval = setInterval(timerFunction, 1000); // 1000 = 1s
}

function stop() {
    // change button
    startBtn.style.display = "block";

    stopBtn.style.display = "none";

    clearInterval(interval)


    // localStorage.setItem('work',  parseInt(localStorage.getItem('work')) - workTime)
    // localStorage.setItem('break', parseInt(localStorage.getItem('break')) - breakTime)

}


startBtn.onclick = function () {
    isStopped = false
    start();
}


stopBtn.onclick = function () {
    isStopped = true
    stop()
}