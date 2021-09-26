const card = document.querySelectorAll(".card");
const card_back_icons = document.querySelectorAll(".back_icon ");
const display_1 = document.querySelector(".display_1");
const game=document.querySelector(".game");
const reset_btn=document.querySelector("button");
const win_display=document.querySelector("h1");
const win_page=document.querySelector(".Win_Page");

var started = false;
var flippedCards = 0;
var paires_found = 0;
var moves=0

const icons_back = ["fa-spotify", "fa-apple",
    "fa-windows", "fa-android",
    "fa-audible", "fa-bitcoin",
    "fa-youtube", "fa-xbox"
]

var bord = []
var corrects = []

for (var i = 0; i < 16; i++) {
    bord.push("");
    corrects.push(false)
}

function reset() {
    window.location.reload(true);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function flipAll(value) {
    card.forEach((item, i) => {
        if (value == true) {
            item.classList.add("flip");
        } else {
            if (corrects[i] == false) {
                item.classList.remove("flip");
            }
            flippedCards = 0;
        }
    });
}


function generateBord() {
    for (var i = 0; i < 8; i++) {
        var count = 0
        while (true) {
            if (count == 2) {
                break;
            }
            var x = getRandomInt(16)
            if (bord[x] == "") {
                bord[x] = icons_back[i];
                count += 1;
            }
        }
    }
    for (var i = 0; i < 16; i++) {
        card_back_icons[i].classList.add(bord[i]);
    }
}

function checkForWin(){
    var is_win=true
    for (var i =0;i<16;i++){
        if (corrects[i]==false){
            is_win=false;
        }
    }
    if(is_win){
        game.classList.add("hide");
        win_page.classList.remove("hide");
        win_display.innerHTML="you Won in "+moves.toString()+" moves";
    }
}

flipAll(true);

card.forEach((item, j) => {
    item.addEventListener("click", () => {
        if (started && corrects[j] == false) {
            item.classList.add("flip");
            flippedCards++;
            moves++;
        }
        if (flippedCards == 2) {
            var buffer = "";
            let i1 = 0;
            let i2 = 0;
            for (var i = 0; i < 16; i++) {
                if (card[i].classList.contains("flip") == true && buffer == "" && corrects[i] == false) {
                    buffer = bord[i];
                    i1 = i;
                } else if (card[i].classList.contains("flip") == true && corrects[i] == false) {
                    if (buffer == bord[i]) {
                        i2 = i;
                        corrects[i2] = true;
                        corrects[i1] = true;
                        paires_found++;
                        flippedCards=0;
                    } else {
                        setTimeout(() => {
                            flipAll(false);
                        }, 1000);
                    }
                }
            }
        } else if (flippedCards > 2) {
            setTimeout(() => {
                flipAll(false);
            }, 1000)
        }
        display_1.innerHTML = "pairs left: " + paires_found.toString();

        checkForWin();
    });
});

generateBord();

setInterval(() => {
    if (started == false) {
        flipAll(false)
        started = true;
    }
}, 4000);

reset_btn.addEventListener("click", ()=>{
    reset();
});