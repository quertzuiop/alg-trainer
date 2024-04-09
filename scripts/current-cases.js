let container = document.getElementById("current-cases-container");
let timer = document.getElementById("timer")
let selectedCases = JSON.parse(localStorage.getItem("selectedCases")) || [];
import cases from './oll_cases.json' with { type: "json" };
let solveList = JSON.parse(localStorage.getItem("solveList")) || [];

function updateCases() {
    solveList = JSON.parse(localStorage.getItem("solveList")) || [];
    container.innerHTML = ""
    if (container != null) {
        for (let i = 0; i < selectedCases.length; i++) {
            (function (caseIndex) {
                let caseContainer = document.createElement("div");
                caseContainer.innerHTML += "<img src='oll_img/"+selectedCases[caseIndex]+".svg' alt=\"nefunguje\">";

                let avg = average(selectedCases[caseIndex], true);
                caseContainer.innerHTML += "<p>"+(avg!=0 ? avg : "-")+"</p>";
            
                caseContainer.addEventListener("click", function () {
                    let caseSolves = document.getElementById("case-solves");

                    document.getElementById("case-img").setAttribute("src", "oll_img/"+selectedCases[caseIndex]+".svg")
                    caseSolves.querySelector("div>p").innerHTML = average(selectedCases[caseIndex], true)
                    caseSolves.querySelector("h2").innerHTML = cases[selectedCases[caseIndex]]["name"];
                    let solvesContainer = document.getElementById("case-solvelist");
                    solvesContainer.innerHTML = "<p class='grid-header'>Time</p><p class='grid-header'>AUF</p>";

                    let numSolves = 0;
                    for (let i = 0; i < solveList.length; i++) {
                        if (solveList[i][2] == selectedCases[caseIndex]) {
                            let time = document.createElement("p");
                            time.innerHTML = msToTime(solveList[i][1]);
                            solvesContainer.appendChild(time);
                            let auf = document.createElement("p");
                            auf.innerHTML = "U2";
                            solvesContainer.appendChild(auf);

                            numSolves++;
                            solvesContainer.classList.remove("no-solves");
                        }
                    }
                    if (numSolves == 0) {
                        solvesContainer.innerHTML = "<p>No solves yet</p>"
                        solvesContainer.classList.add("no-solves");
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
};

updateCases()

function average(caseNum, toReadable=false) {
    let sum = 0;
    let count = 0;
    for (let i in solveList) {
        if (solveList[i][2] == caseNum) {
            sum += solveList[i][1];
            count++;
        }
    }
    let ms = count != 0 ? sum/count : 0;
    if (toReadable) { return msToTime(ms) };
    return ms;
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

function onClassChange(element, callback) {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === "attributes" && mutation.attributeName === "class") {
                callback(mutation.target);
            }
        });
    });
    observer.observe(element, { attributes: true });
    return observer.disconnect;
}

// update solves on timer stop or last solve deletetion
onClassChange(timer, (node) => {
    if (!node.classList.contains("running") && !node.classList.contains("ready")) {
        updateCases();
    };
});
onClassChange(document.getElementById("delete-last-solve-button"), (node) => {
    if (!node.classList.contains("disabled")) {
        updateCases();
    };
});