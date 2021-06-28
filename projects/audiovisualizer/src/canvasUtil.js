"use strict"

export{trebleDots, bassDots, makeDots, createSpeakers};


let trebleDots = [], bassDots = [];

let canvas = document.querySelector("canvas");
let drawCtx = canvas.getContext('2d');

//function called in ain that creates the random dots for the background 
function makeDots(){
    if(trebleDots.length > 0 || bassDots.length > 0){
        for(let i = 0; i < trebleDots.length;){
            trebleDots.pop();
        }
        for(let i = 0; i < bassDots.length;){
            bassDots.pop();
        }
    }
    
    for(let i = 0; i < 10; i ++){
                let TrebleCircle = {
                    x:Math.random()*(canvas.width-50)+25,
                    y:Math.random()*(canvas.height-50)+25,
                    size:Math.random()*40 +10,
                    color:"rgb("+Math.random()*256+","+Math.random()*256+","+Math.random()*256+")",
                    speed:Math.random()*2+1,
                    moveX:Math.random(),
                    moveY:Math.random()
                }
                trebleDots.push(TrebleCircle);
                let BassCircle = {
                    x:Math.random()*(canvas.width-50)+25,
                    y:Math.random()*(canvas.height-50)+25,
                    size:Math.random()*40 +10,
                    color:"rgb("+Math.random()*256+","+Math.random()*256+","+Math.random()*256+")",
                    speed:Math.random()*2+1,
                    moveX:Math.random(),
                    moveY:Math.random()
                }
                bassDots.push(BassCircle);
            }
}

//fucnction to draw the speakers to the screen
function createSpeakers(){
    drawCtx.strokeStyle = "gray";
    drawCtx.fillStyle = "black";

    drawCtx.lineWidth = 5;

    drawCtx.fillRect(50,100, 100,200);
    drawCtx.strokeRect(50,100, 100,200);
    drawCtx.strokeRect(50,100, 100,50);

    drawCtx.lineWidth = 3;
    drawCtx.beginPath();
    drawCtx.moveTo(50,100);
    drawCtx.lineTo(80,75);
    drawCtx.lineTo(180, 75);
    drawCtx.lineTo(150,100);
    drawCtx.fill();
    drawCtx.stroke();

    drawCtx.beginPath();
    drawCtx.moveTo(150,100);
    drawCtx.lineTo(180,75);
    drawCtx.lineTo(180,275);
    drawCtx.lineTo(150, 300);
    drawCtx.fill();
    drawCtx.stroke();
    
    drawCtx.lineWidth = 5;
    
    drawCtx.fillRect(450,100, 100,200);
    drawCtx.strokeRect(450,100, 100,200);
    drawCtx.strokeRect(450,100, 100,50);

    drawCtx.lineWidth = 3;
    drawCtx.beginPath();
    drawCtx.moveTo(550,100);
    drawCtx.lineTo(520,75);
    drawCtx.lineTo(420, 75);
    drawCtx.lineTo(450,100);
    drawCtx.fill();
    drawCtx.stroke();

    drawCtx.beginPath();
    drawCtx.moveTo(450,100);
    drawCtx.lineTo(420,75);
    drawCtx.lineTo(420,275);
    drawCtx.lineTo(450, 300);
    drawCtx.fill();
    drawCtx.stroke();
    
    drawCtx.lineWidth = 5;
    
    drawCtx.fillRect(237,85, 125,225);
    drawCtx.strokeRect(237,85, 125,225);
    drawCtx.strokeRect(237,85, 125,50);
    
    
    drawCtx.lineWidth = 3;
    drawCtx.beginPath();
    drawCtx.moveTo(237,85);
    drawCtx.lineTo(260,55);
    drawCtx.lineTo(340, 55);
    drawCtx.lineTo(362,85);
    drawCtx.fill();
    drawCtx.stroke();

    
}