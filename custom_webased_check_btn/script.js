var is_dark =window.matchMedia('(prefers-color-scheme: dark)').matches;
var is_active=false;

var body = document.querySelector("body");
var button = document.querySelector(".button");
var circle=document.querySelector(".circle_btn_part");

//colors

const dark_bg_color = "#403f3c";
const light_bg_color = "#999";
const light_bg_btn_color = "#fff";
const dark_bg_btn_color = "#222";
const light_iner_btn_color="#888";
const dark_iner_btn_color="#0c0c0c";

//active colors

const dark_bg_color_active = "#403f3c";
const light_bg_color_active = "#999";
const light_bg_btn_color_active = "#ad6349";
const dark_bg_btn_color_active = "#6e1d00";
const light_iner_btn_color_active="#e37d39";
const dark_iner_btn_color_active="#c95406";

if (is_dark) {
    body.style = "height:100vh;background-color:" + dark_bg_color + ";display: flex;justify-content: center;align-items: center;"
    button.style.backgroundColor = dark_bg_btn_color;
    circle.style.backgroundColor=dark_iner_btn_color;
    circle.style.borderColor=dark_bg_btn_color;
} else {
    body.style = "height:100vh;background-color:" + light_bg_color + ";display: flex;justify-content: center;align-items: center;"
    button.style.backgroundColor = light_bg_btn_color;
    circle.style.backgroundColor=light_iner_btn_color;
    circle.style.borderColor=light_bg_btn_color;
}

button.addEventListener("click",()=>{
    is_active=!is_active;
    if(is_active){
        circle.style.transform="translateX(calc(40rem - 17rem))";
        if (is_dark) {
            body.style = "height:100vh;background-color:" + dark_bg_color_active + ";display: flex;justify-content: center;align-items: center;"
            button.style.backgroundColor = dark_bg_btn_color_active;
            circle.style.backgroundColor=dark_iner_btn_color_active;
            circle.style.borderColor=dark_bg_btn_color_active;
        } else {
            body.style = "height:100vh;background-color:" + light_bg_color_active + ";display: flex;justify-content: center;align-items: center;"
            button.style.backgroundColor = light_bg_btn_color_active;
            circle.style.backgroundColor=light_iner_btn_color_active;
            circle.style.borderColor=light_bg_btn_color_active;
        }
    }else{
        circle.style.transform="translateX(calc(0rem))";
        if (is_dark) {
            body.style = "height:100vh;background-color:" + dark_bg_color + ";display: flex;justify-content: center;align-items: center;"
            button.style.backgroundColor = dark_bg_btn_color;
            circle.style.backgroundColor=dark_iner_btn_color;
            circle.style.borderColor=dark_bg_btn_color;
        } else {
            body.style = "height:100vh;background-color:" + light_bg_color + ";display: flex;justify-content: center;align-items: center;"
            button.style.backgroundColor = light_bg_btn_color;
            circle.style.backgroundColor=light_iner_btn_color;
            circle.style.borderColor=light_bg_btn_color;
        }
    }
});