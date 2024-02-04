var timer = document.getElementById('timer');
var scramble = document.getElementById('scramble');
var scrambleList = [];
var time = 0;
var running = 0;
var startTime;
var selectedCase;
var justStopped = false;
import oll_cases from '../scripts/oll_cases.json' assert { type: 'json' };
//localStorage.clear();
const selectedCases = JSON.parse(localStorage.getItem('selectedCases')) || [];
console.log(selectedCases)
newScramble();

function choose(choices) {
    var index = Math.floor(Math.random() * choices.length);
    return choices[index];
}
function msToTime(duration) {
    var milliseconds = parseInt((duration%1000)/10)
    var seconds = parseInt((duration/1000)%60)
    var minutes = parseInt((duration/(1000*60))%60)
    seconds = (seconds < 10) && minutes != 0 ? "0" + seconds : seconds
    milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds
    return (minutes>0 ? (minutes + ":") : " ")  + seconds + "." + milliseconds
}
function update() {
    if (running == 1) {
        var currentTime = new Date().getTime();
        var timePassed = currentTime - startTime;
        time = timePassed;
        timer.innerHTML = msToTime(time);
    }
    setTimeout(update, 10);
}
function newScramble() {
    selectedCase = choose(selectedCases);
    scramble.innerHTML = oll_cases[selectedCase]["scrambles"][Math.floor(Math.random() * oll_cases[selectedCase]["scrambles"].length)];
    scrambleList.push(scramble.innerHTML);
}
function reset() {
    time = 0;
    running = 0;
    timer.innerHTML = "0.00";
}
document.addEventListener("keyup", function(event) {
    if (event.key == " "  && running == 0) {
        if (!justStopped) {
            running = 1;
            startTime = new Date().getTime();
            update();
            document.getElementById("delete-last-solve-button").classList.add('disabled');
        } else {
            justStopped = false;
        }
    }
});
document.addEventListener("keydown", function(event) {
    if (event.key == " ") {
        if (running == 1) {
            running = 0;
            newScramble();
            document.getElementById("delete-last-solve-button").classList.remove('disabled');
            justStopped = true;
        }
    }
});
document.getElementById("delete-last-solve-button").addEventListener("click", function() {
    reset();
    scrambleList.pop();
    document.getElementById("delete-last-solve-button").classList.add('disabled');
});