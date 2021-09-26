const arrayPoints = document.querySelectorAll(".point");
const item_size = 80;
const minValue = 100
const incrementValue = 48;

var array = []

arrayPoints.forEach((item, i) => {
    var buffer = i * item_size
    item.style.transform = "translateX(" + buffer.toString() + "px)";
    buffer = i * incrementValue + minValue;
    item.style.height = buffer.toString() + "px";
    array.push(buffer);
    item.classList.remove("green")
});

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function swapPoints(x1, x2) {
    var buffer_array = array[x1]
    array[x1] = array[x2]
    array[x2] = buffer_array
    var buffer = arrayPoints[x1].style.transform;
    arrayPoints[x1].style.transform = arrayPoints[x2].style.transform
    arrayPoints[x2].style.transform = buffer
    arrayPoints[x1].classList.add("green");
    arrayPoints[x2].classList.add("green");
}

function shuffleArray(){
    for (var i = 0;i<1000;i++){
        var x1=getRandomInt(15);
        var x2=getRandomInt(15);
        swapPoints(x1,x2)
    }
}

function clearGreen(){
    for(var i=0;i<15;i++){
        arrayPoints[i].classList.remove("green");
    }
}

function checkIfSorted(){
    var count=0
    for(var i=1;i<15;i++){
        if(array[i-1]<array[i]){
            count++;
        }
    }
    if(count==14){
        return true
    }
    return false 
}

function updateStage(){
    if(!checkIfSorted()){
        for(var i=0;i<14;i++){
            if (array[i]>array[i+1]){
                swapPoints(i,i+1);
                break;
            }
        }
    }
}

function updateStages(stages){
    for(var i=0;i<stages;i++){
        updateStage()
    }
}

setInterval(() => {
    clearGreen();
    if(checkIfSorted()){
        shuffleArray()
    }else{
        updateStages(2);
    }
}, 1500)