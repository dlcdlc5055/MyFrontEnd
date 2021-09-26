const bordContainer = document.querySelector(".bord");
const bomb_icon_html = '<i class="fas fa-bomb"></i>'
const flag_icon_html = '<i class="fas fa-flag"></i>'
const h1_start = '<h1>'
const h1_end = "</h1>"
const default_bombs = 10
const nr_color_array = ['green', 'red', 'blue', 'purple', 'orange', 'skyblue', 'darkblue', 'limegreen', 'pink']
const reset_btn = document.querySelector(".reset_btn")

var bord_elements;
var bord;
var bord_marked;
var bord_show;
var game_over = false
var time_counter_sec = 0;

const randInt = (min, max) => Math.floor(min + Math.random() * (max - min + 1));

function generateArray(m, n) {
    let arr = new Array(m); // create an empty array of length n
    for (var i = 0; i < m; i++) {
        arr[i] = new Array(n); // make each element an array
    }
    return arr;
}

function getNrOfBombsLeft() {
    var count = 0;
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            if (bord[i][j] == -1) {
                count += 1;
            }
        }
    }
    return count;
}

function generateBord() {
    bord = generateArray(10, 10);
    bord_marked = generateArray(10, 10);
    bord_show = generateArray(10, 10);
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            bord_show[i][j] = false
            bord_marked[i][j] = false
            bord[i][j] = 0;
        }
    }
    while (true) {
        if (getNrOfBombsLeft() >= default_bombs) {
            break
        } else {
            var x = randInt(0, 9);
            var y = randInt(0, 9);
            bord[x][y] = -1;
        }
    }
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            if (bord[i][j] == 0) {
                bord[i][j] = getNrOfNaiborBombs(i, j);
            }
        }
    }
    bord_elements = document.querySelectorAll(".bord_element")
}

function getBordPoint(x, y) {
    if (x > -1 && y > -1 && x < 10 && y < 10) {
        if (bord[x][y] == -1) {
            return -1
        }
    }
    return 0
}

function getNrOfNaiborBombs(x, y) {
    var count = 0
    //vert
    var buffer = getBordPoint(x - 1, y)
    buffer += getBordPoint(x + 1, y)
    //horz
    buffer += getBordPoint(x, y - 1)
    buffer += getBordPoint(x, y + 1)
    //d1
    buffer += getBordPoint(x - 1, y - 1)
    buffer += getBordPoint(x + 1, y + 1)
    //d2
    buffer += getBordPoint(x + 1, y - 1)
    buffer += getBordPoint(x - 1, y + 1)
    count += buffer * -1;
    return count;
}

function getNrOfMarks() {
    var count = 0;
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            if (bord_marked[i][j] == true) {
                count += 1;
            }
        }
    }
    return count;
}

function renderBord() {
    bord_elements = document.querySelectorAll(".bord_element")
    const bomb_left_txt = document.querySelector(".bomb_left")
    bomb_left_txt.innerText = "bombs left: " + (default_bombs - getNrOfMarks()).toString()
    for (var i = 0; i < 100; i++) {
        const y = Math.floor(i / 10);
        const x = i % 10;
        const buffer = bord[x][y];
        const show = bord_show[x][y];
        const marked = bord_marked[x][y];
        bord_elements[i].className = "bord_element "
        bord_elements[i].innerHTML = ''
        bord_elements[i].style.color = "#fff"
        bord_elements[i].style.fontSize = "1.25rem"
        if (marked == true) {
            bord_elements[i].classList.add("marked_element");
            bord_elements[i].innerHTML = flag_icon_html
        } else if (show == true) {
            if (bord[x][y] == -1) {
                bord_elements[i].classList.add("red");
                bord_elements[i].innerHTML = bomb_icon_html
            } else if (bord[x][y] == 0) {
                bord_elements[i].classList.add("empty");
            } else {
                bord_elements[i].classList.add("empty");
                bord_elements[i].innerHTML = h1_start + buffer + h1_end
                bord_elements[i].style.color = nr_color_array[buffer - 1]
                bord_elements[i].style.fontSize = "1.4rem"
            }
        }
    }
    console.log("renderBord");
}

function reset(){
    const GAME_END = document.querySelector(".GAME_END")
    GAME_END.classList.remove("GAME_END_SHOW")
    time_counter_sec = 0
    game_over = false
    generateBord()
    renderBord()
}

function initBord() {
    const GAME_END = document.querySelector(".GAME_END")
    GAME_END.classList.remove("GAME_END_SHOW")
    time_counter_sec = 0
    game_over = false
    generateBord()
    var elements = []
    bordContainer.innerHTML = ''
    for (var i = 0; i < 100; i++) {
        var element = document.createElement("div");
        element.classList.add("bord_element")
        element.innerHTML = ""
        elements.push(element)
        bordContainer.appendChild(element);
    }
    renderBord()
    bord_elements = document.querySelectorAll(".bord_element")
    bord_elements.forEach((item, i) => {
        item.addEventListener("contextmenu", (item) => {
            if (game_over == false) {
                const y = Math.floor(i / 10);
                const x = i % 10;
                if (bord_show[x][y] == false) {
                    bord_marked[x][y] = !bord_marked[x][y];
                }
                renderBord()
                if (checkIfGameEnd()) {
                    processGameEnd()
                }
            }
        })
        item.addEventListener("click", (item) => {
            if (game_over == false) {
                const y = Math.floor(i / 10);
                const x = i % 10;
                if (bord_marked[x][y] == false) {
                    if (bord[x][y] > 0 || bord[x][y] == -1) {
                        bord_show[x][y] = true
                    }
                    if (bord[x][y] == 0) {
                        fillEmpty(x, y)
                    }
                }
                renderBord()
                if (checkIfGameEnd()) {
                    processGameEnd()
                }
            }
        })
    })
}

function fillEmpty(x, y) {
    if (x > -1 && y > -1 && x < 10 && y < 10 && bord_show[x][y] == false) {
        if (bord[x][y] == 0) {
            bord_show[x][y] = true
            fillEmpty(x - 1, y)
            fillEmpty(x + 1, y)
            fillEmpty(x, y + 1)
            fillEmpty(x, y - 1)
        } else if (bord[x][y] > 0) {
            bord_show[x][y] = true
            return
        }
    }
}

function checkIfGameEnd() {
    for (var x = 0; x < 10; x++) {
        for (var y = 0; y < 10; y++) {
            if (bord[x][y] == -1 && bord_show[x][y] == true) {
                return true;
            }
        }
    }
    return false;
}

function getBombsDisarmed() {
    var count = 0;
    for (var x = 0; x < 10; x++) {
        for (var y = 0; y < 10; y++) {
            if(bord_marked[x][y]==true && bord[x][y]==-1){
                count+=1;
            }
        }
    }
    return count;
}

function processGameEnd() {
    const bombs_left = document.querySelector(".b_left")
    const bombs_disarmed = document.querySelector(".b_disarmed")
    const GAME_END = document.querySelector(".GAME_END")
    game_over = true;
    bombs_left.innerText="left: "+(default_bombs-getBombsDisarmed()).toString()
    bombs_disarmed.innerText="disarmed: "+getBombsDisarmed().toString()
    GAME_END.classList.add("GAME_END_SHOW")
}

setInterval(() => {
    time_counter_sec += 1;
    const time_counter = document.querySelector(".time_counter")
    if (time_counter_sec % 60 > 9) {
        time_counter.innerText = "TIME: " + (Math.floor(time_counter_sec / 60)).toString() + ":" + (time_counter_sec % 60).toString()
    } else {
        time_counter.innerText = "TIME: " + (Math.floor(time_counter_sec / 60)).toString() + ":0" + (time_counter_sec % 60).toString()
    }
}, 1000)

initBord()

reset_btn.addEventListener("click", () => {
    reset();
})