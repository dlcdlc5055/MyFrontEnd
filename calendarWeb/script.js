const prevMonthBtn = document.querySelector(".left")
const nextMonthBtn = document.querySelector(".right")
const calendarDisplay=document.querySelector(".days_show")
const dateDisplay=document.querySelector(".year_and_month_text")
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
const daysOfWeek=["Monday","Tuesday","Wednesday","thursday","friday","saturday","sunday"]

var date=new Date()

const currYear=date.getFullYear()
const currMonth=date.getMonth()
const currDay= date.getDate()

console.log(currDay);

function daysInMonth (month, year) {
    return new Date(year, month, 0).getDate();
}

function clearCalendar(){
    dateDisplay.innerText=""
    calendarDisplay.innerHTML=""
}

function generateCalendar(){
    clearCalendar();
    const monthIndex=date.getMonth()
    const currentYear=date.getFullYear()
    const dayOfMonth=date.getDate()
    const dayIndex=date.getDay()
    const monthLenght=daysInMonth(monthIndex+1,currentYear)

    var days_count=0

    dateDisplay.innerHTML = months[monthIndex]+" "+ currentYear;

    buffer1=new Date(currentYear,monthIndex,0)

    for(i=0;i<date.getDay()-1;i++){
        const buffer=daysInMonth(monthIndex,currentYear)-date.getDay()+2
        var day=document.createElement("div")
        day.classList.add("day")
        var h4_day = document.createElement("h4")
        h4_day.innerText=(buffer+i).toString();
        day.appendChild(h4_day)
        day.classList.add("inactive")
        calendarDisplay.appendChild(day)
        days_count+=1
    }

    for(var i=1;i<=monthLenght;i++){
        var day=document.createElement("div")
        day.classList.add("day")
        var h4_day = document.createElement("h4")
        h4_day.innerText=i.toString();
        day.appendChild(h4_day)
        console.log(currYear);
        if(currDay == i && monthIndex==currMonth && currYear==currentYear){
            day.classList.add("current")
        }
        calendarDisplay.appendChild(day)
        days_count+=1
    }

    var i=0
    while(true){
        if(days_count>1000||days_count%7==0){
            break;
        }
        i+=1
        var day=document.createElement("div")
        day.classList.add("day")
        var h4_day = document.createElement("h4")
        h4_day.innerText=i.toString();
        day.appendChild(h4_day)
        day.classList.add("inactive")
        if(dayOfMonth == i){
            day.classList.add("current")
        }
        calendarDisplay.appendChild(day)
        days_count+=1
    }
}

function calculateNewDateByOffset(side){
    const monthIndex=date.getMonth()
    const currentYear=date.getFullYear()
    const dayOfMonth=date.getDate()
    const dayIndex=date.getDay()

    offset=0
    if(side){
        offset=1
    }else{
        offset=-1
    }
    const newYear = currentYear
    const newMonth =  monthIndex+offset+1
    var buffer_date=new Date(newYear,newMonth,0)

    return buffer_date  
}

prevMonthBtn.addEventListener("click",()=>{
    date=calculateNewDateByOffset(false)
    generateCalendar()
})

nextMonthBtn.addEventListener("click",()=>{
    date=calculateNewDateByOffset(true)
    generateCalendar()
})

dateDisplay.addEventListener("click",()=>{
    window.location.reload(false);
})

generateCalendar()