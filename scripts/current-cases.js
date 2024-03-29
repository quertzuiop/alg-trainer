let container = document.getElementById('current-cases-container');
let selectedCases = JSON.parse(localStorage.getItem('selectedCases')) || [];
import cases from './oll_cases.json' assert { type: 'json' };
let solveList = JSON.parse(localStorage.getItem('solveList')) || [];
console.log(solveList);
if (container != null) {
    for (let i = 0; i < selectedCases.length; i++) {
        (function (caseIndex) {
            let caseContainer = document.createElement('div');
            caseContainer.innerHTML += "<img src='oll_img/"+selectedCases[caseIndex]+".svg' alt=\"nefunguje\">";
            let avg = average(selectedCases[i]);
            caseContainer.innerHTML += "<p>"+(avg!=0 ? msToTime(avg) : "-")+"</p>";

            caseContainer.addEventListener('click', function () {
                let caseSolves = document.getElementById("case-solves");
                caseSolves.querySelector("h2").innerHTML = cases[selectedCases[caseIndex]]["name"];
                let solvesContainer = document.getElementById("case-solvelist");
                for (let i = 0; i < solveList.length; i++) {
                    if (solveList[i][2] == selectedCases[caseIndex]) {
                        let time = document.createElement('p');
                        time.innerHTML = msToTime(solveList[i][1]);
                        solvesContainer.appendChild(time);
                        let auf = document.createElement('p');
                        auf.innerHTML = "U2";
                        solvesContainer.appendChild(auf);
                    }
                }
                caseSolves.classList.remove('hidden');
            });
            container.insertBefore(caseContainer, container.firstChild);
        })(i);
    }
    let expandButton = document.getElementById("expand-button");
    expandButton.addEventListener('click', function () {
        container.classList.toggle('expanded')
        expandButton.classList.toggle('expanded')
    });
}
function average(caseNum) {
    let sum = 0;
    let count = 0;
    for (let i = 0; i < solveList.length; i++) {
        if (solveList[i][2] == caseNum) {
            sum += solveList[i][1];
            count++;
        }
    }
    return count != 0 ? sum/count : 0;
}
function msToTime(duration) {
    let milliseconds = parseInt((duration%1000)/10)
    let seconds = parseInt((duration/1000)%60)
    let minutes = parseInt((duration/(1000*60))%60)
    seconds = (seconds < 10) && minutes != 0 ? "0" + seconds : seconds
    milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds
    return (minutes>0 ? (minutes + ":") : " ")  + seconds + "." + milliseconds
}
document.getElementById("close-case-solves-button").addEventListener("click", function() {
    document.getElementById("case-solves").classList.add('hidden');
});