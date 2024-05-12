let ollImg = document.getElementById("oll");
let pllImg = document.getElementById("pll");

ollImg.addEventListener("click", function () {
    localStorage.setItem("algset", "oll");
    window.location.href = "selection/oll";
})
pllImg.addEventListener("click", function () {
    localStorage.setItem("algset", "pll");
    window.location.href = "selection/pll";
})

let helpButton = document.getElementById("help-button");
console.log(helpButton);
let closeButton = document.getElementById("close-button");
let help = document.getElementById("help-blur");

helpButton.addEventListener("click", function () {
    console.log(help);
    help.classList.remove("hidden");
    window.scrollTo(0, 0);
    document.querySelector("body").classList.add("no-scroll");
});
closeButton.addEventListener("click", function () {
    console.log(help);
    help.classList.add("hidden");
    document.querySelector("body").classList.remove("no-scroll");
});

