let container = document.getElementById('groups');
import cases from '../scripts/data/pll_cases.json' assert { type: 'json' };
import groups from "../scripts/data/pll_groups.json" assert { type: "json" };
let selectedCases = JSON.parse(localStorage.getItem('selectedCases')) || {"oll": [], "pll": []};
//localStorage.clear();
localStorage.setItem("algset", "pll")
if (container != null) {
    for (let group in groups) {
        let groupContainer = document.createElement("section");
        groupContainer.innerHTML = "<section class='group-header'><h2>" + group + "</h2><i class='fa-solid fa-caret-down'></i></section>";
        let unfurlButton = groupContainer.getElementsByClassName("fa-solid")[0];
        unfurlButton.addEventListener("click", function() {
            let groupCasesContainer = this.parentElement.nextElementSibling;
            if (groupCasesContainer.style.maxHeight == "0px") {
                groupCasesContainer.style.maxHeight = groupCasesContainer.scrollHeight +30+ "px"
                groupCasesContainer.style.margin = "-15px -15px";
                groupCasesContainer.style.padding = "15px 15px";
                this.style.transform = "translateY(-3px) rotate(0deg)";
            } else {
                groupCasesContainer.style.padding = "0 15px";
                groupCasesContainer.style.margin = "0 -15px";
                groupCasesContainer.style.maxHeight = 0;
                this.style.transform = "translateY(-3px) rotate(-90deg)";
            }
        }); 
        let groupCasesContainer = document.createElement('div');
        groupCasesContainer.classList.add("cases")
        // click h2 to select all cases in group
        groupContainer.querySelector('h2').addEventListener('click', function () {
            let cases = Array.from(groupCasesContainer.querySelectorAll('.case'));
            if (cases.every(element => element.classList.contains('selected'))) {
                cases.forEach(element => element.classList.remove('selected'));
                selectedCases["pll"] = selectedCases["pll"].filter(element => !groups[group].includes(element));
            } else {
                cases.forEach(element => {
                    if (!element.classList.contains('selected')) {
                        element.classList.add('selected');
                        selectedCases["pll"].push(groups[group][cases.indexOf(element)]);
                    }
                }
                );
            }
            localStorage.setItem('selectedCases', JSON.stringify(selectedCases));
        });
        for (let i = 0; i < Object.keys(cases).length; i++) {
            if (groups[group].includes(Object.keys(cases)[i])) {
                (function (caseIndex) {
                    let caseContainer = document.createElement('div');
                    caseContainer.classList.add('case');
                    if (selectedCases["pll"].includes(Object.keys(cases)[i])) {
                        caseContainer.classList.add('selected');
                    }
                    caseContainer.innerHTML = "<h3>" + Object.keys(cases)[i] + "</h3>";
                    let caseInfo = caseContainer.appendChild(document.createElement('div'));
                    caseInfo.innerHTML += "<img src='../../pll_img/"+Object.keys(cases)[i]+".svg' alt=\"nefunguje\">";
                    caseInfo.innerHTML += "<p>" + cases[Object.keys(cases)[i]][0] + "</p>";
                    groupCasesContainer.appendChild(caseContainer);

                    caseContainer.addEventListener('click', function () {
                        if (this.classList.contains('selected')) {
                            this.classList.remove('selected');
                            selectedCases["pll"].splice(selectedCases["pll"].indexOf(Object.keys(cases)[i]), 1);
                            localStorage.setItem('selectedCases', JSON.stringify(selectedCases));

                        } else {
                            this.classList.add('selected');
                            selectedCases["pll"].push(Object.keys(cases)[caseIndex]);
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
    window.location.href = "/timer/";
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