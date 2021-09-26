const dateDisplay=document.querySelector(".date-data h1")
const m1=document.querySelector(".month")

let value=1
let year=new Date().getFullYear()
let month1= new Date().getMonth()

console.log(new Date().getFullYear())
console.log(new Date().getMonth())

const leftBtn=document.querySelector("#left")
const rightBtn=document.querySelector("#right")

const months=[
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul", 
    "aug",
    "sep",
    "oct",
    "nov",
    "dec"
]

console.log(new Date(year,month1+value,0))

dateDisplay.innerHTML=months[(new Date(year,month1+value,0).getMonth())]+" "+ new Date(year,month1+value,0).getFullYear().toString()

console.log(new Date(new Date().getFullYear(), new Date().getDate(), 0).getDate())

let daysInMonth=new Date(new Date().getFullYear(), new Date().getDate(), 0).getDate()
let daysInPrevMonth=new Date(new Date().getFullYear(), new Date().getDate(), -1).getDate()

let month=""
let count=0

for(var i=daysInPrevMonth-new Date(new Date().getFullYear(),0,0).getDay(    );i<=daysInPrevMonth;i++){
    month+="<div class='prev'>"+i.toString()+"</div>"
    count+=1
}

for(var i=1;i<=daysInMonth;i++){
    if (i==new Date().getDate() ) {
        month+="<div class='today'>"+i.toString()+"</div>"
        count+=1
    }
    else{
        count+=1
        month+="<div>"+i.toString()+"</div>"
    }
}
for(var i=1;i<=100;i++){
    count+=1
    if(count<=42){
        month+="<div class='prev'>"+i.toString()+"</div>"
    }
}

m1.innerHTML=month

console.log(new Date(new Date().getFullYear(),31,0).getDay())

leftBtn.addEventListener("click", ()=>{
    count=0
    month=""
    console.log("left")
    value-=1
    console.log(value)
    console.log(new Date(year,month1+value,0))
    dateDisplay.innerHTML=months[(new Date(year,month1+value,0).getMonth())]+" "+ new Date(year,month1+value,0).getFullYear().toString()

    daysInMonth=new Date(year,month1+value,0).getDate()
    daysInPrevMonth=new Date(year,month1+value,0).getDate()

for(var i=daysInPrevMonth-new Date(new Date(year,month1+value,0).getFullYear(),0,0).getDay(year,month1+value,0);i<=daysInPrevMonth;i++){
    month+="<div class='prev'>"+i.toString()+"</div>"
    count+=1
}

for(var i=1;i<=daysInMonth;i++){
    if (i==new Date().getDate() && new Date().getMonth()==new Date(year,month1+value,0).getMonth() && new Date().getFullYear()==new Date(year,month1+value,0).getFullYear()) {
        month+="<div class='today'>"+i.toString()+"</div>"
        count+=1
    }
    else{
        month+="<div>"+i.toString()+"</div>"
        count+=1
    }
}
for(var i=1;i<=100;i++){
    count+=1
    if(count<=42){
        month+="<div class='prev'>"+i.toString()+"</div>"
    }
}
m1.innerHTML=month
})

rightBtn.addEventListener("click", ()=>{
    count=0
    month=""
    console.log("right")
    value+=1
    console.log(value)
    console.log(new Date(year,month1+value,0))
    dateDisplay.innerHTML=months[(new Date(year,month1+value,0).getMonth())]+" "+ new Date(year,month1+value,0).getFullYear().toString()

    daysInMonth=new Date(year,month1+value,0).getDate()
    daysInPrevMonth=new Date(year,month1+value,0).getDate()

for(var i=daysInPrevMonth-new Date(new Date(year,month1+value,0).getFullYear(),0,0).getDay(year,month1+value,0);i<=daysInPrevMonth;i++){
    month+="<div class='prev'>"+i.toString()+"</div>"
    count+=1
}

for(var i=1;i<=daysInMonth;i++){
    if (i==new Date().getDate() && new Date().getMonth()==new Date(year,month1+value,0).getMonth() && new Date().getFullYear()==new Date(year,month1+value,0).getFullYear()) {
        month+="<div class='today'>"+i.toString()+"</div>"
        count+=1
    }
    else{
        count+=1
        month+="<div>"+i.toString()+"</div>"
    }
}
for(var i=1;i<=100;i++){
    count+=1
    if(count<=42){
        month+="<div class='prev'>"+i.toString()+"</div>"
    }
}
m1.innerHTML=month
})