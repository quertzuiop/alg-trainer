let timer = document.getElementById('timer');
let scramble = document.getElementById('scramble');
let solveList = JSON.parse(localStorage.getItem('solveList')) || [];
let time = 0;
let running = 0;
let startTime;
let selectedCase;
let justStopped = false;
import oll_cases from '../scripts/oll_cases.json' with { type: 'json' };
//localStorage.clear();
const selectedCases = JSON.parse(localStorage.getItem('selectedCases')) || [];
newScramble();

function choose(choices) {
    let index = Math.floor(Math.random() * choices.length);
    return choices[index];
}
function msToTime(duration) {
    let milliseconds = parseInt((duration%1000)/10)
    let seconds = parseInt((duration/1000)%60)
    let minutes = parseInt((duration/(1000*60))%60)
    seconds = (seconds < 10) && minutes != 0 ? "0" + seconds : seconds
    milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds
    return (minutes>0 ? (minutes + ":") : " ")  + seconds + "." + milliseconds
}
function update() {
    if (running == 1) {
        let currentTime = new Date().getTime();
        let timePassed = currentTime - startTime;
        time = timePassed;
        timer.innerHTML = msToTime(time);
    }
    setTimeout(update, 10);
}
function newScramble() {
    selectedCase = choose(selectedCases);
    scramble.innerHTML = oll_cases[selectedCase]["scrambles"][Math.floor(Math.random() * oll_cases[selectedCase]["scrambles"].length)];
}
function reset() {
    time = 0;
    running = 0;
    timer.innerHTML = "0.00";
}
document.addEventListener("keyup", function(event) {
    if (event.key == " "  && running == 0) {
        if (!justStopped) {
            timer.classList.remove("ready");
            running = 1;
            startTime = new Date().getTime();
            update();
            document.getElementById("delete-last-solve-button").classList.add('disabled');
            timer.classList.add("running")
        } else {
            justStopped = false;
        }
    }
});
document.addEventListener("keydown", function(event) {
    if (event.key == " ") {
        if (running == 1) {
            running = 0;
            solveList.push([scramble.innerHTML, time, selectedCase]);
            localStorage.setItem('solveList', JSON.stringify(solveList));
            newScramble();
            document.getElementById("delete-last-solve-button").classList.remove('disabled');
            justStopped = true;
            timer.classList.remove("running")
        } else {
            timer.classList.add("ready")
        }
    }
});
document.getElementById("delete-last-solve-button").addEventListener("click", function() {
    reset();
    solveList.pop();
    document.getElementById("delete-last-solve-button").classList.add('disabled');
});