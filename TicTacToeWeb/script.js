const bord_items = document.querySelectorAll(".item")
const bord_zero = document.querySelectorAll(".zero")
const bord_x = document.querySelectorAll(".x")
const bord_element = document.querySelector(".bord")
const menu = document.querySelector(".menu")
const gameover_text = document.querySelector(".gameover_text")
const button = document.querySelector(".btn")
const X = 1
const zero = 2
const active_clr = "#FFFFFFDD"
const inactive_clr = "#FFFFFF4f"
const win_color = "#FE6254EE"

var turn = false
var gameover = false
var win_side = false
var lose = false
var bord = []
var wins = []

function init() {
    for (var i = 0; i < 9; i++)
        bord.push(0)
    for (var i = 0; i < 9; i++)
        wins.push(false)
    bord_items.forEach(item => {
        item.addEventListener("click", () => {
            if (!gameover) {
                var id = item.dataset.id - 1
                if (!turn && bord[id] == 0) {
                    bord[id] = zero
                    turn = true
                } else if (turn && bord[id] == 0) {
                    bord[id] = X
                    turn = false
                }
                checkForWin()
            }
            renderBord()
        })
    })
    renderBord()
}

function clear() {
    bord = []
    wins = []
    turn = false
    gameover = false
    win_side = false
    lose = false
    for (var i = 0; i < 9; i++)
        bord.push(0)
    for (var i = 0; i < 9; i++)
        wins.push(false)
    renderBord()
}

function checkForWin() {
    var to_return = false
    for (var i = 0; i < 3; i++) {
        //horizontal
        if (bord[i * 3] == zero && bord[i * 3 + 1] == zero && bord[i * 3 + 2] == zero) {
            gameover = true
            win_side = false
            for (var j = 0; j < 3; j++)
                wins[i * 3 + j] = true
            to_return = true
            lose = false
        }
        if (bord[i * 3] == X && bord[i * 3 + 1] == X && bord[i * 3 + 2] == X) {
            gameover = true
            win_side = true
            for (var j = 0; j < 3; j++)
                wins[i * 3 + j] = true
            to_return = true
            lose = false
        }
        //vertical
        if (bord[0 * 3 + i] == zero && bord[1 * 3 + i] == zero && bord[2 * 3 + i] == zero) {
            gameover = true
            win_side = false
            for (var j = 0; j < 3; j++)
                wins[j * 3 + i] = true
            to_return = true
            lose = false
        }
        if (bord[0 * 3 + i] == X && bord[1 * 3 + i] == X && bord[2 * 3 + i] == X) {
            gameover = true
            win_side = true
            for (var j = 0; j < 3; j++)
                wins[j * 3 + i] = true
            to_return = true
            lose = false
        }
    }
    //d1
    if (bord[0] == zero && bord[4] == zero && bord[8] == zero) {
        gameover = true
        win_side = false
        wins[0] = true
        wins[4] = true
        wins[8] = true
        to_return = true
        lose = false
    }
    if (bord[0] == X && bord[4] == X && bord[8] == X) {
        gameover = true
        win_side = true
        wins[0] = true
        wins[4] = true
        wins[8] = true
        to_return = true
        lose = false
    }
    //d2
    if (bord[2] == zero && bord[4] == zero && bord[6] == zero) {
        gameover = true
        win_side = false
        wins[2] = true
        wins[4] = true
        wins[6] = true
        to_return = true
        lose = false
    }
    if (bord[2] == X && bord[4] == X && bord[6] == X) {
        gameover = true
        win_side = true
        wins[2] = true
        wins[4] = true
        wins[6] = true
        to_return = true
        lose = false
    }
    if (to_return) {
        setTimeout(() => {
            button.style.opacity = "0"
            gameover_text.style.opacity = "0"
            bord_items.forEach(element => element.style.opacity = "0")
        }, 300)
        setTimeout(() => {
            bord_element.style.display = 'none'
            menu.style.display = 'flex'
        }, 1000)
        setTimeout(() => {
            button.style.opacity = "1"
            gameover_text.style.opacity = "1"
        }, 1100)
        setWinText()
        return
    }
    var count = 0
    for (var i = 0; i < 9; i++)
        if (bord[i] != 0)
            count++;
    if (count == 9) {
        for (var i = 0; i < 9; i++)
            wins[i] = true
        gameover = true
        lose = true
        setTimeout(() => {
            button.style.opacity = "0"
            gameover_text.style.opacity = "0"
            bord_items.forEach(element => element.style.opacity = "0")
        }, 300 - 500)
        setTimeout(() => {
            bord_element.style.display = 'none'
            menu.style.display = 'flex'
        }, 1000)
        setTimeout(() => {
            button.style.opacity = "1"
            gameover_text.style.opacity = "1"
        }, 1100)
        setWinText()
    }
}

function setWinText() {
    if (!gameover)
        return
    if (lose)
        gameover_text.innerHTML = "DRAW !!"
    else {
        if (win_side)
            gameover_text.innerHTML = "X WINS !!"
        else if (!win_side)
            gameover_text.innerHTML = "ZERO WINS !!"
    }
}

function renderBord() {
    for (var i = 0; i < 9; i++) {
        var buffer = bord[i]
        if (buffer == 0) {
            bord_x[i].classList.add("d_none")
            bord_zero[i].classList.add("d_none")
            bord_items[i].style.backgroundColor = inactive_clr
        } else if (buffer == zero) {
            bord_x[i].classList.add("d_none")
            bord_zero[i].classList.remove("d_none")
            bord_items[i].style.backgroundColor = active_clr
        } else if (buffer == X) {
            bord_x[i].classList.remove("d_none")
            bord_zero[i].classList.add("d_none")
            bord_items[i].style.backgroundColor = active_clr
        }
        if (wins[i]) {
            bord_items[i].style.backgroundColor = win_color
        }
    }
}

function reset() {
    clear()
    renderBord()
    setTimeout(() => {
        button.style.opacity = "0"
        gameover_text.style.opacity = "0"
    }, 300)
    setTimeout(() => {
        bord_element.style.display = 'grid'
        menu.style.display = 'none'
    }, 1000)
    setTimeout(() => {
        bord_items.forEach(element => element.style.opacity = "1")
    }, 1100)
}

button.addEventListener("click", () => {
    reset()
})
init()