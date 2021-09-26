const menu_btn=document.querySelector(".menu-icon");
const links_menu=document.querySelector(".links");
const cards=document.querySelector(".cards-holder")
var value=false

menu_btn.addEventListener("click",()=>{
    menu_btn.classList.toggle("rotate-90");
    links_menu.classList.toggle("show-menu");
    if (value==false){
        document.querySelector("*").style.overflow="hidden";
        value=true;
    }else{
        document.querySelector("*").style.overflow="auto";
        value=false;
    }
});

setInterval(()=>{
    var x= window.innerWidth
    if (x>840){
        menu_btn.classList.remove("rotate-90");
        links_menu.classList.remove("show-menu");  
        document.querySelector("*").style.overflow="auto";
        value=false;
    }
},5)