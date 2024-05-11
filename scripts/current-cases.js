let container = document.getElementById("current-cases-container");
let timer = document.getElementById("timer")
let selectedCases = JSON.parse(localStorage.getItem("selectedCases")) || {"oll": [], "pll": []};
import cases from "../scripts/data/oll_cases.json" assert { type: "json" };
/*import Chart from 'chart.js/auto';*/
let algset = localStorage.getItem("algset") || "pll";
let solveList = JSON.parse(localStorage.getItem("solveLists")) ||{"oll": [], "pll": []};
solveList = solveList[algset];

function updateCases() {
    console.log("updating cases")
    solveList = JSON.parse(localStorage.getItem("solveLists")) ||{"oll": [], "pll": []};
    solveList = solveList[algset];
    container.innerHTML = ""
    if (container != null) {
        if (selectedCases[algset].length == 0) {
            container.innerHTML = "<div></div><p>No cases selected</p><div></div>" //divs for padding
        }
        for (let i = 0; i < selectedCases[algset].length; i++) {
            (function (caseIndex) {
                let caseContainer = document.createElement("div");
                caseContainer.innerHTML += "<img src='"+algset+"_img/"+selectedCases[algset][caseIndex]+".svg' alt="+selectedCases[algset][caseIndex]+">";

                let avg = average(selectedCases[algset][caseIndex], true);
                caseContainer.innerHTML += "<p>"+(avg!=0 ? avg : "-")+"</p>";
            
                caseContainer.addEventListener("click", function () {
                    let caseSolves = document.getElementById("case-solves");
                    document.getElementById("case-img").setAttribute("src", algset+"_img/"+selectedCases[algset][caseIndex]+".svg")
                    caseSolves.querySelector("div>p").innerHTML = average(selectedCases[algset][caseIndex], true)
                    if (algset == "oll") caseSolves.querySelector("h2").innerHTML = cases[selectedCases[algset][caseIndex]]["name"];
                    else if (algset == "pll") caseSolves.querySelector("h2").innerHTML = selectedCases[algset][caseIndex] + " Perm";
                    let solvesContainer = document.getElementById("case-solvelist");
                    solvesContainer.innerHTML = "<p class='grid-header'>Time</p><p class='grid-header'>AUF</p>";

                    let numSolves = 0;
                    for (let i = 0; i < solveList.length; i++) {
                        if (solveList[i][2] == selectedCases[algset][caseIndex]) {
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
            })(
                i
            );
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
    if (node.classList.contains("disabled")) {
        updateCases();
    };
});