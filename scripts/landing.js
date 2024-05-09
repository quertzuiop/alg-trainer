ollImg = document.getElementById("oll")
pllImg = document.getElementById("pll")

ollImg.addEventListener("click", function () {
    localStorage.setItem("algset", "oll")
    window.location.href = "selection/oll"
})
pllImg.addEventListener("click", function () {
    localStorage.setItem("algset", "pll")
    window.location.href = "selection/pll"
})