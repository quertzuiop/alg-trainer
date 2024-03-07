let container = document.getElementById('groups');
import cases from '../scripts/oll_cases.json' assert { type: 'json' };
import groups from "../scripts/oll_groups.json" assert { type: "json" };
let selectedCases = JSON.parse(localStorage.getItem('selectedCases')) || [];
//localStorage.clear();
if (container != null) {
    for (let group in groups) {
        let groupContainer = document.createElement("section");
        groupContainer.innerHTML = "<h2>" + group + "</h2>";
        let groupCasesContainer = document.createElement('div');
        groupCasesContainer.classList.add("cases")
        // click h2 to select all cases in group
        groupContainer.querySelector('h2').addEventListener('click', function () {
            let cases = Array.from(groupCasesContainer.querySelectorAll('.case'));
            if (cases.every(element => element.classList.contains('selected'))) {
                cases.forEach(element => element.classList.remove('selected'));
                selectedCases = selectedCases.filter(element => !groups[group].includes(element));
            } else {
                cases.forEach(element => {
                    if (!element.classList.contains('selected')) {
                        element.classList.add('selected');
                        selectedCases.push(groups[group][cases.indexOf(element)]);
                    }
                }
                );
            }
            localStorage.setItem('selectedCases', JSON.stringify(selectedCases));
        });
        for (let i = 1; i < Object.keys(cases).length + 1; i++) {
            if (groups[group].includes(i)) {
                (function (caseIndex) {
                    let caseContainer = document.createElement('div');
                    caseContainer.classList.add('case');
                    if (selectedCases.includes(caseIndex)) {
                        caseContainer.classList.add('selected');
                    }
                    caseContainer.innerHTML = "<h3>" + cases[caseIndex]["name"] + "</h3>";
                    let caseInfo = caseContainer.appendChild(document.createElement('div'));
                    caseInfo.innerHTML += "<img src='oll_img/"+i+".svg' alt=\"nefunguje\">";
                    caseInfo.innerHTML += "<p>" + cases[caseIndex]["a"] + "</p>";
                    groupCasesContainer.appendChild(caseContainer);

                    caseContainer.addEventListener('click', function () {
                        if (this.classList.contains('selected')) {
                            this.classList.remove('selected');
                            selectedCases.splice(selectedCases.indexOf(caseIndex), 1);
                            localStorage.setItem('selectedCases', JSON.stringify(selectedCases));
                        } else {
                            this.classList.add('selected');
                            selectedCases.push(caseIndex);
                            localStorage.setItem('selectedCases', JSON.stringify(selectedCases));
                        }
                    });
                })(i);
            }
        }
        fixCaseColumns(groupCasesContainer, group);
        groupContainer.appendChild(groupCasesContainer);
        container.appendChild(groupContainer);
    }
}
document.getElementById("done-button").addEventListener("click", function() {
    window.location.href = "timer.html";
});
function fixCaseColumns(groupCasesContainer, group) {
    while (groupCasesContainer.lastChild && !groupCasesContainer.lastChild.hasChildNodes()) {
        groupCasesContainer.removeChild(groupCasesContainer.lastChild);
    }
    for (let i = 0; i < Math.max(0, Math.floor(container.offsetWidth/280) - groups[group].length); i++) {
        groupCasesContainer.appendChild(document.createElement('div'));
    }
}
window.addEventListener("resize", function() {
    for (let group in groups) {
        let groupCasesContainer = Array.from(container.querySelectorAll('section h2')).find(element => element.innerHTML == group).nextElementSibling;
        fixCaseColumns(groupCasesContainer, group);
    }
});