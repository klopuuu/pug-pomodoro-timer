// variables

let workTittle = document.getElementById('work');
let breakTittle = document.getElementById('break');

let colorHead = document.getElementById('head');

let workTime = 25;
let breakTime = 5;

let switchTime = workTime;

let secondsStandart = "00";
let seconds = 0;

// display
window.onload = () => {
    document.getElementById('minutes').innerHTML = workTime;
    document.getElementById('seconds').innerHTML = secondsStandart;

    document.getElementById('head').style.background = '#987645'
    document.getElementById('ear-left').style.background = '#654321'
    document.getElementById('ear-right').style.background = '#654321'
    document.getElementById('face').style.background = '#654321'


    workTittle.classList.add('active');
}

// start timer
function start() {
    // change button
    document.getElementById('start').style.display = "none";
    document.getElementById('reset').style.display = "block";

    // change the time
    seconds = 59;
    secondsStandart = 59

    let workMinutes = workTime - 1;
    let breakMinutes = breakTime - 1;

    breakCount = 1;

    // countdown
    let timerFunction = () => {
        //change the display
        document.getElementById('minutes').innerHTML = workMinutes;
        document.getElementById('seconds').innerHTML = secondsStandart;

        // start
        seconds = seconds - 1;

        //changeColorPug

        if(breakCount % 2 === 0) {
            secondsStandart = seconds.toString().length === 1 ? "0" + seconds : seconds;

            let time = (workMinutes * 60) + secondsStandart
    
            let minuteInsecond = (switchTime * 60);
            
            let procent = 100 - ((time * 100)/minuteInsecond);
            procent = 100
            document.getElementById('head').style.background = `linear-gradient(to top, #987645 ${procent}%, white 0%)`
            document.getElementById('ear-left').style.background = `linear-gradient(to right, #654321 ${procent}%, white 0%)`
            document.getElementById('ear-right').style.background = `linear-gradient(to left, #654321 ${procent}%, white 0%)`
            document.getElementById('face').style.background = `linear-gradient(to bottom, #654321 ${procent}%, white 0%)`
        } else {
            secondsStandart = seconds.toString().length === 1 ? "0" + seconds : seconds;

            let time = (workMinutes * 60) + secondsStandart
    
            let minuteInsecond = (switchTime * 60);
            
            let procent = 100 - ((time * 100)/minuteInsecond);
        
            document.getElementById('head').style.background = `linear-gradient(to top, #987645 ${procent}%, white 0%)`
            document.getElementById('ear-left').style.background = `linear-gradient(to right, #654321 ${procent}%, white 0%)`
            document.getElementById('ear-right').style.background = `linear-gradient(to left, #654321 ${procent}%, white 0%)`
            document.getElementById('face').style.background = `linear-gradient(to bottom, #654321 ${procent}%, white 0%)`
    
        }

        //changeTime
        if(seconds === 0) {
            workMinutes = workMinutes - 1;
    
            if(workMinutes === -1 ){
                if(breakCount % 2 !== 0) {
                    // start break
                    workMinutes = breakMinutes;
                    switchTime = 0;
                    breakCount++
                    // change the painel

                    workTittle.classList.remove('active');
                    breakTittle.classList.add('active');
                }else {
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
    }
    

    // start countdown
    setInterval(timerFunction, 1000); // 1000 = 1s
}

let startTimer = document.getElementById('start');

startTimer.onclick = function() 
{
    start();
}