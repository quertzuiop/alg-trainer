var container = document.getElementById('cases');
import cases from '../scripts/oll_cases.json' assert { type: 'json' };
var selectedCases = JSON.parse(localStorage.getItem('selectedCases')) || [];
//localStorage.clear();
if (container != null) {
    for (var i = 1; i < Object.keys(cases).length + 1; i++) {
        (function (caseIndex) {
            var caseDiv = document.createElement('div');
            caseDiv.classList.add('case');
            if (selectedCases.includes(caseIndex)) {
                caseDiv.classList.add('selected');
            }
            caseDiv.innerHTML = "<h3>" + cases[caseIndex]["name"] + "</h3>";
            caseDiv.innerHTML += "<p>" + cases[caseIndex]["a"] + "</p>";
            container.appendChild(caseDiv);
            caseDiv.addEventListener('click', function () {
                if (this.classList.contains('selected')) {
                    this.classList.remove('selected');
                    selectedCases.splice(selectedCases.indexOf(caseIndex), 1);
                    localStorage.setItem('selectedCases', JSON.stringify(selectedCases));
                } else {
                    this.classList.add('selected');
                    console.log(caseIndex)
                    selectedCases.push(caseIndex);
                    localStorage.setItem('selectedCases', JSON.stringify(selectedCases));
                }
            });
        })(i);
    }
}
