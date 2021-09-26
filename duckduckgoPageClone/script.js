const menuBtn = document.querySelector(".fa-bars")
const addToBrowserBtns = document.querySelectorAll(".add_btn")
const menu_bar = document.querySelector(".menu_bar");
const closeMenuBtn = document.querySelector(".fa-times");
const questionOpenCloseBtns = document.querySelectorAll(".qustion  h1")
const questions = document.querySelectorAll(".qustion ");
const arrowIcons=document.querySelectorAll(".fa-chevron-circle-up")

function init() {
    const buffer = "add duckduckgo to " + navigator.appCodeName;
    addToBrowserBtns.forEach(element => {
        element.innerText = buffer;
    });
    menuBtn.addEventListener("click", () => {
        menu_bar.classList.toggle("menu_bar_inactive");
    })
    closeMenuBtn.addEventListener("click", () => {
        menu_bar.classList.add("menu_bar_inactive");
    })
    questionOpenCloseBtns.forEach(function callback(value, index) {
        questions[index].classList.remove("open")
        value.addEventListener("click", () =>{
            questions[index].classList.toggle("open");
            arrowIcons[index].classList.toggle("rotateZ")
        })
    });
}

init();