let timer = document.getElementById("timer");
let scramble = document.getElementById("scramble");

let algset = localStorage.getItem("algset") || "oll";
let solveLists = JSON.parse(localStorage.getItem("solveLists")) ||{"oll": [], "pll": []};

let time = 0;
let running = 0;
let startTime;
let selectedCase;
let justStopped = false;
import oll_cases from "../scripts/data/oll_cases.json" assert { type: "json" };
import pll_cases from "../scripts/data/pll_cases.json" assert { type: "json" };
//localStorage.clear();
const selectedCases = JSON.parse(localStorage.getItem("selectedCases")) || {"oll": [], "pll": []};

try {
    newScramble();
} catch (error) {
    scramble.innerHTML = "Start by selecting some cases!";
    console.log(error);
}
    
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
    selectedCase = choose(selectedCases[algset].slice(1));
    if (algset == "oll") {
        scramble.innerHTML = oll_cases[selectedCase]["scrambles"][Math.floor(Math.random() * oll_cases[selectedCase]["scrambles"].length)];
    } else if (algset == "pll") {
        scramble.innerHTML = pll_cases[selectedCase][Math.floor(Math.random() * pll_cases[selectedCase].length)];
    }
}
function reset() {
    time = 0;
    running = 0;
    timer.innerHTML = "0.00";
}
document.addEventListener("keyup", function(event) {
    if (event.key == " "  && running == 0 && selectedCases[algset].length > 0) {
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
    if (event.key == " "  && selectedCases[algset].length > 0) {
        if (running == 1) {
            running = 0;
            solveLists[algset].push([scramble.innerHTML, time, selectedCase]);
            localStorage.setItem('solveLists', JSON.stringify(solveLists));
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
    solveLists[algset].pop();
    document.getElementById("delete-last-solve-button").classList.add('disabled');
});

let selCasesLink = document.getElementById("select-cases-link")
console.log(selCasesLink)
selCasesLink.innerHTML = "Select " + algset + " cases";
selCasesLink.href = "selection/"+algset + "/";