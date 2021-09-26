var display = []
const input = document.getElementsByTagName("input")[0]
const container = document.getElementsByClassName("container")[0]

var id_count = 0
var class_count = 0
var element_count = 0

display.push(document.getElementsByClassName("id")[0])
display.push(document.getElementsByClassName("class")[0])
display.push(document.getElementsByClassName("element")[0])

var alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');

var data = []

function display_data() {
    container.innerHTML = "<h1>Selector list</h1>"
    display[0].innerHTML = id_count.toString()
    display[1].innerHTML = class_count.toString()
    display[2].innerHTML = element_count.toString()
    for (var i = 0; i < data.length; i++) {
        var buffer = data[i]
        var div = document.createElement('div')
        div.classList.add("element_display")
        if (buffer[0] == 0) {
            div.classList.add("id_bg")
        } else if (buffer[0] == 1) {
            div.classList.add("class_bg")
        } else if (buffer[0] == 2) {
            div.classList.add("element_bg")
        }
        var h2=document.createElement("h2")
        h2.classList.add("white_txt")
        h2.innerText=buffer[1]
        div.appendChild(h2)
        container.appendChild(div)
    }
}


function onInputChange() {
    data = []
    id_count = 0
    class_count = 0
    element_count = 0
    var input_data = input.value
    var words = input_data.split(" ")
    for (var i = 0; i < words.length; i++) {
        var buffer = words[i].toUpperCase()
        var first_letter = buffer.charAt(0)
        if (alphabet.includes(first_letter)) {
            data.push([2, buffer])
            element_count += 1
        } else if (first_letter == "#" && buffer.length > 1) {
            data.push([0, buffer])
            id_count += 1
        } else if (first_letter == "." && buffer.length > 1) {
            data.push([1, buffer])
            class_count += 1
        }
    }
    display_data()
}

input.addEventListener("input", onInputChange)

display_data()