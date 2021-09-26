const red = 0;
const orange = 1;
const purple = 2;
const yellow = 3;
const green = 4;
const blue = 5;

var moves = 0

function getElement(str) {
    return document.querySelector(str);
}

function getElements(str) {
    return document.querySelectorAll(str);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

const container = getElement(".container");

var bordHTML = "";
var piceBaseDivHTML = '<div class="pice"></div>';

for (var i = 0; i < 12 * 12; i++) {
    bordHTML = bordHTML + piceBaseDivHTML;
}

container.innerHTML = bordHTML;

const bordPices = getElements(".pice");
var bord = [];

function generateBord() {
    bord=[];
    for (var i = 0; i < 12 * 12; i++) {
        bord.push(getRandomInt(6));
        if (bord[i] == red) {
            bordPices[i].style.backgroundColor = "red";
        } else if (bord[i] == orange) {
            bordPices[i].style.backgroundColor = "orange";
        } else if (bord[i] == green) {
            bordPices[i].style.backgroundColor = "green";
        } else if (bord[i] == purple) {
            bordPices[i].style.backgroundColor = "purple";
        } else if (bord[i] == yellow) {
            bordPices[i].style.backgroundColor = "yellow";
        } else if (bord[i] == blue) {
            bordPices[i].style.backgroundColor = "blue";
        }
    }
}

function refreshScreen() {
    for (var i = 0; i < 12 * 12; i++) {
        if (bord[i] == red) {
            bordPices[i].style.backgroundColor = "red";
        } else if (bord[i] == orange) {
            bordPices[i].style.backgroundColor = "orange";
        } else if (bord[i] == green) {
            bordPices[i].style.backgroundColor = "green";
        } else if (bord[i] == purple) {
            bordPices[i].style.backgroundColor = "purple";
        } else if (bord[i] == yellow) {
            bordPices[i].style.backgroundColor = "yellow";
        } else if (bord[i] == blue) {
            bordPices[i].style.backgroundColor = "blue";
        }
    }
}

function setPiceBord(x, y, value) {
    var id = y * 12 + x;
    bord[id] = value;
}

function getPiceBord(x, y) {
    var id = y * 12 + x;
    return bord[id];
}

function getPiceId(x, y) {
    var id = y * 12 + x;
    return id;
}

function getPiceX(id) {
    return id % 12;
}

function getPiceY(id) {
    return Math.floor(id / 12);
}

function floodfill(x, y, colorold, colornew) {
    if (getPiceBord(x, y) == colorold) {
        setPiceBord(x, y, colornew)
    } else {
        return
    }
    if (x > 0) {
        floodfill(x - 1, y, colorold, colornew)
    }
    if (y > 0) {
        floodfill(x, y - 1, colorold, colornew)
    }
    if (x + 1 < 12) {
        floodfill(x + 1, y, colorold, colornew)
    }
    if (y + 1 < 12) {
        floodfill(x, y + 1, colorold, colornew)
    }
}


function init() {
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

    if (vw > vh) {
        container.style.height = "100%";
        container.style.width = vh + "px";
        for (var i = 0; i < 12 * 12; i++) {
            bordPices[i].style.width = vh / 12 + "px";
            bordPices[i].style.height = vh / 12 + "px";
        }
    } else if (vw < vh) {
        container.style.height = vw + "px";
        container.style.width = "100%";
        for (var i = 0; i < 12 * 12; i++) {
            bordPices[i].style.width = vw / 12 + "px";
            bordPices[i].style.height = vw / 12 + "px";
        }
    } else {
        container.style.height = "100%";
        container.style.width = "100%";
        for (var i = 0; i < 12 * 12; i++) {
            bordPices[i].style.width = vh / 12 + "px";
            bordPices[i].style.height = vh / 12 + "px";
        }
    }
}
init();

generateBord();

function checkIfWin() {
    var count = 0;
    var buffer = bord[0];
    for (var i = 0; i < 12 * 12; i++) {
        if (bord[i] == buffer) {
            count += 1;
        }
    }
    if (count == 12 * 12) {
        return true
    }
    return false;
}

setInterval(() => {
    init();
    if (checkIfWin()) {
        setTimeout(()=>{
            generateBord();
            refreshScreen();
        },1700);
    }
}, 333)

bordPices.forEach((item, id) => {
    item.addEventListener("click", () => {
        var c2 = bord[id];
        var c1 = bord[0];
        var x = getPiceX(id);
        var y = getPiceY(id);
        floodfill(0, 0, c1, c2)
        refreshScreen();
    });
});