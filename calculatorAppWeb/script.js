const darkmode_toggle = document.querySelector(".darkmode-toggle")
const toggle_inner = document.querySelector(".toggle-inner")
const mobile_page = document.querySelector(".mobile")
const mobile_btns = document.querySelectorAll(".mobile-btn")
const button_mobile_data_text = ["pow2", "sqrt", "clr", "/", "7", "8", "9", "*", "4", "5", "6", "-", "1", "2", "3", "+", ".", "0", "del", "="]
const button_mobile_data_bool = [true, true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true]
const display_mobile = document.querySelector(".mobile-display h1")
var dark_mode = true
var is_mobile = true
var values_buffer = []
var display_buffer = "0"
var latest_value = ""
var calculated = false

darkmode_toggle.addEventListener("click", () => {
    toggle_inner.classList.toggle("active-toggle")
    dark_mode = !dark_mode
    if (dark_mode == true) {
        mobile_page.classList.add("dark-background")
    } else {
        mobile_page.classList.remove("dark-background")
    }
})

mobile_btns.forEach((element, index) => {
    element.addEventListener("click", () => {
        var buffer_bool = button_mobile_data_bool[index]
        var buffer_text = button_mobile_data_text[index]
        if (display_buffer == "Infinity" || display_buffer == "NAN") {
            display_buffer = "0"
        }
        if(calculated == true){
            calculated = false
            display_buffer = "0"
        }
        if (!buffer_bool) {
            if (!checkIfLastIsSign(buffer_text) && is_sing(buffer_text) && display_buffer != "") {
                display_buffer += buffer_text
            } else if (!is_sing(buffer_text)) {
                if (display_buffer == "0") {
                    display_buffer = buffer_text
                } else {
                    display_buffer += buffer_text
                }
            }
            if (is_sing(buffer_text) && !checkIfLastIsSign(buffer_text) && display_buffer == "" && buffer_text == "-") {
                display_buffer = "-"
            }
            latest_value = buffer_text
            render_display()
            if(is_sing(buffer_text) && buffer_text == "."){

            }
        } else {
            if (buffer_text == "clr") {
                display_buffer = ""
                display_mobile.innerHTML = "0"
                latest_value = ""
            } else if (buffer_text == "=") {
                console.log(eval(display_buffer));
                display_buffer = eval(display_buffer)
                render_display()
                calculated=true
            } else if (buffer_text == "del") {
                display_buffer = deleate(display_buffer)
                if (display_buffer == "") {
                    display_buffer = "0"
                }
                render_display()
            } else if (buffer_text == "sqrt") {
                var buffer = eval(display_buffer)
                buffer = Math.sqrt(buffer)
                if (buffer != "NAN") {
                    display_buffer = buffer
                }
                render_display()
            } else if (buffer_text == "pow2") {
                var buffer = eval(display_buffer)
                buffer = buffer * buffer
                if (buffer != "NAN") {
                    display_buffer = buffer
                }
                render_display()
            }
        }
    })
})

function deleate(str) {
    var buffer = str.substring(0, str.length - 1);
    return buffer
}

function render_display() {
    display_mobile.innerHTML = display_buffer
    console.log(display_buffer);
}

function is_sing(buffer_text) {
    if (buffer_text == "/" || buffer_text == "+" || buffer_text == "-" || buffer_text == "*" || buffer_text == ".") {
        return true
    } else {
        return false
    }
}

function checkIfLastIsSign(buffer_text) {
    if (is_sing(buffer_text)) {
        if (latest_value == "/" || latest_value == "+" || latest_value == "-" || latest_value == "*" || latest_value == ".") {
            return true
        }
    }
    return false
}