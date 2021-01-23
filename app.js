const canvas=document.getElementById("jsCanvas");
const color=document.querySelectorAll(".jsColor");
const range=document.getElementById("jsRange");
const mode=document.getElementById("jsMode");
const save=document.getElementById("jsSave");

const ctx=canvas.getContext('2d');

canvas.width = document.getElementsByClassName("canvas")[0].offsetWidth;
canvas.height = document.getElementsByClassName("canvas")[0].offsetHeight;

ctx.fillStyle="white";
ctx.fillRect(0,0,canvas.width,canvas.height);



ctx.strokeStyle = "#2c2c2c";
ctx.fillStyle="#2c2c2c";
ctx.lineWidth = 2.5;

let painting=false;
let filling=false;

function handleColorClick(e){
    const color=e.target.style.backgroundColor;
    ctx.strokeStyle=color;
    ctx.fillStyle=color;
}
function handleRangeChange(e){
    const value=e.target.value;
    ctx.lineWidth=value;
}
function modeChange(){
    if(!filling){
        filling=true;
        mode.innerText="PAINTING"
    }else{
        filling=false;
        mode.innerText="FILL"
    }
}
function fillingChange(){
    if(filling){
        ctx.fillRect(0,0,canvas.width,canvas.height);
    }
}
function handleCM(e){
    e.preventDefault();
}
function handleSaveClick(){
    const image=canvas.toDataURL("image/jpeg");
    const link=document.createElement("a");
    link.href=image;
    link.download="PaintJS";
    link.click();
}
function onMouseMove(e){
    const x=e.offsetX;
    const y=e.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    }else{
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}
function startPainting(){
    painting=true;
}
function stopPainting(){
    painting=false;
}

if(canvas){
    canvas.addEventListener("mousemove",onMouseMove)
    canvas.addEventListener("mousedown",startPainting)
    canvas.addEventListener("mouseup",stopPainting)
    canvas.addEventListener("mouseleave",stopPainting)
    canvas.addEventListener("click",fillingChange)
    canvas.addEventListener("contextmenu",handleCM);
}
color.forEach(color=>color.addEventListener("click",handleColorClick))

if(range){
    range.addEventListener("input",handleRangeChange);
}
mode.addEventListener("click",modeChange);
save.addEventListener("click",handleSaveClick);