const bord_items = document.querySelectorAll(".bord-item")
const bord_items_text = document.querySelectorAll(".bord-item h1")
const bord = document.querySelector(".bord")
const win_screen = document.querySelector(".win_show")
const bord_mark = document.querySelector(".bord_mark")

var bord_data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
var bord_selected = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
var selected = [1, 1]
var nr_turn = 0
var win = false

function init() {
    bord_data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
    bord_selected = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
    selected = [1, 1]
    nr_turn = 0
    win = false

    RademizeBord(3)
    setSelected()
}

function setSelected() {
    bord_selected = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]

    for (var x = selected[0]; x < selected[0] + 2; x++) {
        for (var y = selected[1]; y < selected[1] + 2; y++) {
            bord_selected[y * 4 + x] = true
        }
    }
}

function renderBord() {
    if (!win) {
        bord.classList.remove("d_none")
        win_screen.classList.add("d_none")
        for (var i = 0; i < 16; i++) {
            var buffer = bord_data[i]
            bord_items_text[i].innerHTML = buffer
            if (bord_selected[i]) {
                bord_items[i].classList.add("selected")
            } else {
                bord_items[i].classList.remove("selected")
            }
        }
        var translate_buffer = "translate(calc((90vh/4)*" + (selected[0] + 1).toString() + " - 3.5rem), calc((90vh/4)*" + (selected[1] + 1).toString() + " - 3.5rem))"
        bord_mark.style.transform = translate_buffer
    } else {
        bord.classList.add("d_none")
        win_screen.classList.remove("d_none")
    }
}

function getIdFromCord(x, y) {
    return (y * 4 + x)
}

function processRotation() {
    const buffer = [bord_data[getIdFromCord(selected[0], selected[1])], bord_data[getIdFromCord(selected[0] + 1, selected[1])], bord_data[getIdFromCord(selected[0], selected[1] + 1)], bord_data[getIdFromCord(selected[0] + 1, selected[1] + 1)]]

    console.log(buffer);

    bord_data[getIdFromCord(selected[0], selected[1])] = buffer[1]
    bord_data[getIdFromCord(selected[0] + 1, selected[1])] = buffer[3]
    bord_data[getIdFromCord(selected[0], selected[1] + 1)] = buffer[0]
    bord_data[getIdFromCord(selected[0] + 1, selected[1] + 1)] = buffer[2]
}

function checkForWin() {
    for (var i = 1; i <= 16; i++) {
        if (bord_data[i - 1] != i) {
            return false
        }
    }
    return true;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function RademizeBord(value) {
    for (var i = 0; i < value; i++) {
        var x = getRandomInt(0, 3)
        var y = getRandomInt(0, 3)
        var times = getRandomInt(0, 3)
        selected = [x, y]
        for (var j = 0; j < times; j++) {
            processRotation()
        }
    }
    selected = [1, 1]
}

document.addEventListener('keypress', ProcessKeyPressed);

function ProcessKeyPressed(e) {
    var key = e.key

    if (key == "s") {
        selected[1] += 1
    }
    if (key == "w") {
        selected[1] -= 1
    }
    if (key == "a") {
        selected[0] -= 1
    }
    if (key == "d") {
        selected[0] += 1
    }
    if (key == " ") {
        if (!win) {
            processRotation()
            win = checkForWin()
        } else {
            init()
        }
    }

    if (selected[0] > 2) {
        selected[0] = 2
    }

    if (selected[1] > 2) {
        selected[1] = 2
    }

    if (selected[0] < 0) {
        selected[0] = 0
    }

    if (selected[1] < 0) {
        selected[1] = 0
    }

    setSelected()
    renderBord()
}

init()
renderBord()