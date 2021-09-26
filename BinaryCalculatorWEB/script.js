const on_clr = "#4A00E099"
const off_clr = "#000000aa"
const display = document.getElementsByClassName("item")

var display_data = []
var display_value = 0

function init() {
    for (var i = 0; i < 8; i++)
        display_data.push(false)
}

function refrashDisplay() {
    for (var i = 0; i < 8; i++) {
        var value = display_data[i]
        if (value)
            display[i].style.backgroundColor = on_clr
        else
            display[i].style.backgroundColor = off_clr
    }
}

function generateBinaryArray() {
    var values = []
    for (var i = 0; i < 8; i++)
        values.push(false)
    for (var i = 0; i < 8; i++) {
        var value = (display_value >> i) & 0x1
        if (value == 1)
            values[i] = true
    }
    var buffer = []
    for (var i = 0; i < 8; i++)
        buffer.push(values[7 - i])
    return buffer
}

function processTick() {
    display_value += 1
    display_value = display_value % 256
    display_data = generateBinaryArray()
    refrashDisplay()
}

init()
refrashDisplay()

setInterval(processTick, 250)