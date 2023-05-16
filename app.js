const orderArr=[],
functionByColor={
    "blue":clickTopRigth,
    "red":clickTopLeft,
    "yellow":clickBottomRigth,
    "green":clickBottomLeft
}
let currentPosition=0;
function makeSound(sound="fail"){
    const audio=new Audio(`./audio/${sound}.wav`);
    audio.play();
}
function init(){
    document.getElementById("topleft").addEventListener('click',()=>{colorClickHandler("red")})
    document.getElementById("toprigth").addEventListener('click',()=>{colorClickHandler("blue")})
    document.getElementById("bottmleft").addEventListener('click',()=>{colorClickHandler("green")})
    document.getElementById("bottomrigth").addEventListener('click',()=>{colorClickHandler("yellow")})
}
function start(){
    currentPosition=0;
    orderArr.length=0;
    game();
    document.querySelector("#count span").innerHTML=0;
}
function colorClickHandler(color){
    if(checkClick(color)){
        switch(color){
            case "red":
                clickTopLeft();
                break;
            case "blue":
                clickTopRigth();
                break;
            case "yellow":
                clickBottomRigth();
                break;
            case "green":
                clickBottomLeft();
                break;
        }
        if((currentPosition+1)===orderArr.length){
            document.querySelector("#count span").innerHTML=orderArr.length;
            game();
            currentPosition=0;
            
        }else{
            currentPosition++;
        }
    }else{
        makeSound();
        currentPosition=0;
        playByOrder();
    }
   
   

}
function clickTopRigth(){
    changeColorOnClick("toprigth","toprigthclick")
    makeSound("blue")
}

function clickTopLeft(){
    changeColorOnClick("topleft","topleftclick")
    makeSound("red")
}

function clickBottomRigth(){
    changeColorOnClick("bottomrigth","bottomrigthclick")
    makeSound("yellow")
}

function clickBottomLeft(){
    changeColorOnClick("bottmleft","bottmleftclick")
    makeSound("green")
}
function changeColorOnClick(element,animationClass){
    document.getElementById(element).classList.add(animationClass)
    setTimeout(() => {
        document.getElementById(element).classList.remove(animationClass)
    }, 100);
}
function checkClick(click){
    return click===orderArr[currentPosition]
}
function makeRandomClick(){
    const random=Math.floor(Math.random()*4);
    switch(random){
        case 0:
            return "red";
            break;
        case 1:
            return "blue";
            break;
        case 2:
            return "yellow";
            break;
        case 3:
            return "green";
            break;
    }
}
function game(){
    orderArr.push(makeRandomClick());
    playByOrder();
}
function playByOrder(){
    for(let i=0;i<orderArr.length;i++){
        const colorFunc=functionByColor[orderArr[i]]
        setTimeout(() => {
            colorFunc();
        }, 1000*(i+1));
    }
}
init();