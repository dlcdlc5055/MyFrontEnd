const light_on_color = "#2980B9";
const light_off_color = "#111";

const pices = document.querySelectorAll(".pice");
const count_display = document.querySelector(".lights_counter");

var state_bord = [];

var moves = 0;
const max_moves = 125;

for (var i = 0; i < 25; i++) {
    state_bord.push(false);
}

function setPices() {
    for (var i = 0; i < 25; i++) {
        if (state_bord[i]) {
            pices[i].style.backgroundColor = light_on_color;
        } else {
            pices[i].style.backgroundColor = light_off_color;
        }
    }
}

function getPiceValue(x, y) {
    return state_bord[y * 5 + x];
}

function setPiceValue(x, y, value) {
    state_bord[y * 5 + x] = value;
    setPices()
}

function calcPiceId(x, y) {
    return y * 5 + x
}

function getPiceX(id) {
    return (id) % 5;
}

function getPiceY(id) {
    return Math.floor(id / 5)
}

function processMove(x, y) {
    moves = moves + 1;

    if (x <= 3) {
        setPiceValue(x + 1, y, !getPiceValue(x + 1, y))
    }
    if (x >= 1) {
        setPiceValue(x - 1, y, !getPiceValue(x - 1, y))
    }
    if (y <= 3) {
        setPiceValue(x, y + 1, !getPiceValue(x, y + 1))
    }
    if (y >= 1) {
        setPiceValue(x, y - 1, !getPiceValue(x, y - 1))
    }
}

function checkForWin() {
    var count = 0

    for (var i = 0; i < 25; i++) {
        if (state_bord[i] == true) {
            count = count + 1;
        }
    }

    if (count == 25) {
        return true;
    } else {
        return false;
    }
}

function checkForLose() {

    if (checkForWin()) {
        return false;
    } else {
        if (moves > max_moves) {
            console.log(moves);
            return true;
        } else {
            return false
        }
    }
}

function getLightsCount() {
    var count = 0;

    for (var i = 0; i < 25; i++) {
        if (state_bord[i] == true) {
            count = count + 1;
        }
    }

    return count;
}

setPices();

pices.forEach((pice, i) => {
    pice.addEventListener("click", () => {
        state_bord[i] = !state_bord[i];
        setPices();
        var x = getPiceX(i);
        var y = getPiceY(i);
        processMove(x, y);
        if (checkForWin()) {
            document.querySelector(".game").style.display = "none";
            document.querySelector(".win-page").style.display = "flex";
        } else if (checkForLose()) {
            document.querySelector(".game").style.display = "none";
            document.querySelector(".lose-page").style.display = "flex";
        } else {
            document.querySelector(".game").style.display = "flex";
            document.querySelector(".lose-page").style.display = "none";
        }
        var str_lights = "lights: " + getLightsCount().toString();
        count_display.innerHTML=str_lights
    })
})

document.querySelectorAll(".reset_btn").forEach((item) => {
    item.addEventListener("click", () => {
        window.location.reload();
    });
});