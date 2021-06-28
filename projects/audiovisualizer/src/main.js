"use strict";

import{setupUI, setupWebaudio, audioElement, audioCtx, audioLength, currentTime, requestFullscreen, NUM_SAMPLES, analyserNode, curvePercent, backgroundChange, dots, speaker, frequency, waveform} from './setup.js';
import{manipulatePixels} from './filters.js';
import{trebleDots, bassDots, makeDots, createSpeakers} from './canvasUtil.js';

export{init};


//creating the canvas variables
let canvas;
let drawCtx;

let audioData = new Uint8Array(NUM_SAMPLES/2); 

let waveFormData = new Uint8Array(NUM_SAMPLES/2); 

let gradientOne, gradientTwo;

let red=255, green = 255, blue = 255;

let counterOne = -1, counterTwo = -1, counterThree = -1;

let trebleWave = [], bassWave = [];







//function that calls all teh other functions
function init(){
    
    canvas = document.querySelector('canvas');
    drawCtx = canvas.getContext("2d");
    
    gradientOne = drawCtx.createLinearGradient(0, canvas.height/2, 0,canvas.height/2-50);
    gradientOne.addColorStop(0,"#00FF50");
    gradientOne.addColorStop(1,"#FF0400");
    
    gradientTwo = drawCtx.createLinearGradient(0, canvas.height/2, 0,canvas.height/2+50);
    gradientTwo.addColorStop(0,"#00FF50");
    gradientTwo.addColorStop(1,"#FF0400");
    
    
    setupWebaudio();
    setupUI();
    update();
}




//function that analysises the audio and draws to the screen base off it
function update(){
    
    
    
    //requesting animatiofor the update function
    requestAnimationFrame(update);
    
    analyserNode.getByteFrequencyData(audioData);
    analyserNode.getByteTimeDomainData(waveFormData);
    
    //clearing last frame
    drawCtx.clearRect(0,0,canvas.width, canvas.height);
    
    let bassAvg  = 0, trebleAvg = 0;
    let length = audioData.length/2;
    //finding bass average and treble average
    for(let i = 0; i < length; i++){
        
        bassAvg += audioData[i];
        trebleAvg += audioData[length+i];
    }
    bassAvg/= length;
    trebleAvg/=length;
    
    //making a slowly changing background
    if(backgroundChange)
    {
        switch(Math.floor(Math.random()*100)%3){
            case 0:
                red += counterOne;
                break;
            case 1:
                green += counterTwo;
                break;
            case 2:
                blue += counterThree;
                break;
                
        }
        
        if(red >= 255){
            red = 255; 
            counterOne = -1;
        }
        else if (red <= 0){
            red = 0;
             counterOne = 1;
        }
        
        if(green >= 255){
            green = 255; 
            counterTwo = -1;
        }
        else if (green <= 0){
            green = 0;
             counterTwo = 1;
        }
        
        if(blue >= 255){
            blue = 255; 
            counterThree = -1;
        }
        else if (blue <= 0){
            blue = 0;
             counterThree = 1;
        }
        
        drawCtx.fillStyle = 'rgb('+red+','+green+','+blue+')';
        
    }
    else
    {
        //making the background white
        drawCtx.fillStyle = "white";
        
    }
    
    drawCtx.fillRect(0,0,canvas.width, canvas.height);
    
    
    
    if(dots){
        if (trebleDots.length == 0 && bassDots.length == 0){
            makeDots();
        }
        
        

        for(let i = 0; i < trebleDots.length; i++){
            trebleDots[i].x+= trebleDots[i].moveX * trebleDots[i].speed;
            
            if(trebleDots[i].x < 0+trebleDots[i].size+trebleAvg/2 || trebleDots[i].x > canvas.width-trebleDots[i].size+trebleAvg/2){
                trebleDots[i].moveX *= -1;
            }
            if(trebleDots[i].y < 0+trebleDots[i].size+trebleAvg/2 || trebleDots[i].y > canvas.height-trebleDots[i].size+trebleAvg/2){
                trebleDots[i].moveY *= -1;
            }
            trebleDots[i].y+= trebleDots[i].moveY * trebleDots[i].speed;
            drawCtx.fillStyle = trebleDots[i].color;
            
            drawCtx.beginPath();
            
            drawCtx.arc(trebleDots[i].x, trebleDots[i].y, trebleDots[i].size + trebleAvg/2, 0, Math.PI*2);
            drawCtx.closePath();
            
            drawCtx.fill();
        }
        
        for(let i = 0; i <bassDots.length; i++){
            
            bassDots[i].x+= bassDots[i].moveX * bassDots[i].speed;
            bassDots[i].y+= bassDots[i].moveY * bassDots[i].speed;
            
            let bass = bassDots[i].size - bassAvg/10;
            if(bass <= 0){
                bass = 1;
            }
            
            if(bassDots[i].x < 0+bass || bassDots[i].x > canvas.width-bass){
                bassDots[i].moveX *= -1;
            }
            if(bassDots[i].y < 0+bass || bassDots[i].y > canvas.height-bass){
                bassDots[i].moveY *= -1;
            }
            drawCtx.fillStyle = bassDots[i].color;
            
            drawCtx.beginPath();
            
            drawCtx.arc(bassDots[i].x, bassDots[i].y, bass, 0, Math.PI*2);
            drawCtx.closePath();
            
            drawCtx.fill();
        }
        
    }
    
    //drawing the speakers
    if(speaker){
        createSpeakers(); 
        //adding top speakers
        drawCtx.strokeStyle = "black";
        drawCtx.fillStyle = "gray";


        drawCtx.beginPath();
        drawCtx.arc(80,125,15+trebleAvg/8,0,Math.PI*2);
        drawCtx.fill();

        drawCtx.beginPath();
        drawCtx.arc(120,125,15+trebleAvg/8,0,Math.PI*2);
        drawCtx.fill();

        //adding bass speakers
        drawCtx.beginPath();
        drawCtx.arc(100,190,30+bassAvg/6,0,Math.PI*2);
        drawCtx.fill();

        drawCtx.beginPath();
        drawCtx.arc(100,260,30+bassAvg/6,0,Math.PI*2);
        drawCtx.fill();
        
        
        drawCtx.beginPath();
        drawCtx.arc(480,125,15+trebleAvg/8,0,Math.PI*2);
        drawCtx.fill();

        drawCtx.beginPath();
        drawCtx.arc(520,125,15+trebleAvg/8,0,Math.PI*2);
        drawCtx.fill();

        //adding bass speakers
        drawCtx.beginPath();
        drawCtx.arc(500,190,30+bassAvg/6,0,Math.PI*2);
        drawCtx.fill();

        drawCtx.beginPath();
        drawCtx.arc(500,260,30+bassAvg/6,0,Math.PI*2);
        drawCtx.fill();
        
        
        drawCtx.beginPath();
        drawCtx.arc(270,110,20+trebleAvg/7,0,Math.PI*2);
        drawCtx.fill();

        drawCtx.beginPath();
        drawCtx.arc(330,110,20+trebleAvg/7,0,Math.PI*2);
        drawCtx.fill();

        //adding bass speakers
        drawCtx.beginPath();
        drawCtx.arc(300,185,35+bassAvg/5,0,Math.PI*2);
        drawCtx.fill();

        drawCtx.beginPath();
        drawCtx.arc(300,265,35+bassAvg/5,0,Math.PI*2);
        drawCtx.fill();
        
        //making sound waves that orignate from each speaker
        
        
        
        if(trebleAvg > 50){
            let Wave = {
                size:0,
                color:"rgb("+Math.random()*256+","+Math.random()*256+","+Math.random()*256+")"
            }
            trebleWave.push(Wave);
        }
        if(bassAvg > 150){
            let Wave = {
                size:0,
                color:"rgb("+Math.random()*256+","+Math.random()*256+","+Math.random()*256+")"
            }
            bassWave.push(Wave);
        }
        for(let i = 0; i < trebleWave.length; i++){
            drawCtx.strokeStyle = trebleWave[i].color;
            if(trebleWave[i].size<25){
                drawCtx.lineWidth = 3;
                drawCtx.globalAlpha = .6;
            }
            else if(trebleWave[i].size<50){
                drawCtx.lineWidth = 2;
                drawCtx.globalAlpha = .4;
            }
            else if(trebleWave[i].size<100){
                drawCtx.lineWidth = 1;
                drawCtx.globalAlpha = .2;
            }
            else if(trebleWave[i].size >= 100){
                trebleWave.splice(i,1);
                continue;
            }
            drawCtx.beginPath();
            drawCtx.arc(80,125,trebleWave[i].size+15,0,Math.PI*2);
            drawCtx.stroke();

            drawCtx.beginPath();
            drawCtx.arc(120,125,trebleWave[i].size+15,0,Math.PI*2);
            drawCtx.stroke();
            
            drawCtx.beginPath();
            drawCtx.arc(480,125,trebleWave[i].size+15,0,Math.PI*2);
            drawCtx.stroke();

            drawCtx.beginPath();
            drawCtx.arc(520,125,trebleWave[i].size+15,0,Math.PI*2);
            drawCtx.stroke();
            
            drawCtx.beginPath();
            drawCtx.arc(270,110,trebleWave[i].size+20,0,Math.PI*2);
            drawCtx.stroke();

            drawCtx.beginPath();
            drawCtx.arc(330,110,trebleWave[i].size+20,0,Math.PI*2);
            drawCtx.stroke();
            trebleWave[i].size+=1;
            
        }
        for(let i = 0; i < bassWave.length; i++){
            drawCtx.strokeStyle = bassWave[i].color;
            if(bassWave[i].size<25){
                drawCtx.lineWidth = 3;
                drawCtx.globalAlpha = .6;
            }
            else if(bassWave[i].size<50){
                drawCtx.lineWidth = 2;
                drawCtx.globalAlpha = .4;
            }
            else if(bassWave[i].size<100){
                drawCtx.lineWidth = 1;
                drawCtx.globalAlpha = .2;
            }
            else if(bassWave[i].size >= 100){
                bassWave.splice(i,1);
                continue;
            }
            drawCtx.beginPath();
            drawCtx.arc(100,190,bassWave[i].size+30,0,Math.PI*2);
            drawCtx.stroke();

            drawCtx.beginPath();
            drawCtx.arc(100,260,bassWave[i].size+30,0,Math.PI*2);
            drawCtx.stroke();
            
            drawCtx.beginPath();
            drawCtx.arc(500,190,bassWave[i].size+30,0,Math.PI*2);
            drawCtx.stroke();

            drawCtx.beginPath();
            drawCtx.arc(500,260,bassWave[i].size+30,0,Math.PI*2);
            drawCtx.stroke();
            
            drawCtx.beginPath();
            drawCtx.arc(300,185,bassWave[i].size+35,0,Math.PI*2);
            drawCtx.stroke();

            drawCtx.beginPath();
            drawCtx.arc(300,265,bassWave[i].size+35,0,Math.PI*2);
            drawCtx.stroke();
            bassWave[i].size+=1;
        }
        drawCtx.globalAlpha = 1;
        
    }
    
    
    
    let barWidth = ((canvas.width/2) / NUM_SAMPLES)*2.5;
    let barHeight;
    let x = canvas.width/2;
    
    let y = canvas.width/2;
    
    
    
    
    //making the rectangle visualizer in the middle
    for(let i = 0; i < NUM_SAMPLES/2; i++){
        barHeight = audioData[i]/4;
        drawCtx.fillStyle = gradientOne;
        
        drawCtx.fillRect(x, canvas.height/2-barHeight, barWidth, barHeight);
        drawCtx.fillRect(y, canvas.height/2 - barHeight, barWidth, barHeight);
        
    
        
    
        drawCtx.fillStyle = gradientTwo;
        
        drawCtx.fillRect(y, canvas.height/2, barWidth, barHeight);
        drawCtx.fillRect(x, canvas.height/2, barWidth, barHeight);
        
        x+=barWidth
        y -= barWidth;
    }
    
    //setting up curves
    drawCtx.lineWidth = 2;
    drawCtx.strokeStyle = "#3C20FF";
    
    drawCtx.save();
    
    let audioVolume = 0;
    
    let inverse = 1;
    
    for(let i = 0; i < audioData.length; i++){
        audioVolume += audioData[i];
    }
    
    drawCtx.translate(0, 50);
    
    for(let i = 0; i < curvePercent; i++){
        drawCtx.save();
        drawCtx.translate(canvas.width*(i/curvePercent), 0);
        drawCtx.beginPath();
        drawCtx.moveTo(0,0); drawCtx.quadraticCurveTo(canvas.width/(curvePercent*2),audioVolume/1000*inverse,canvas.width/curvePercent,0);
        drawCtx.stroke();
        drawCtx.restore();
        inverse*=-1;
    }
    drawCtx.restore();
    drawCtx.save();
    
    drawCtx.translate(0, canvas.height-50);
    
    inverse = -1;
    
    for(let i = 0; i < curvePercent; i++){
        drawCtx.save();
        drawCtx.translate(canvas.width*(i/curvePercent), 0);
        drawCtx.beginPath();
        drawCtx.moveTo(0,0); 
        drawCtx.quadraticCurveTo(canvas.width/(curvePercent*2),audioVolume/1000*inverse,canvas.width/curvePercent,0);
        drawCtx.stroke();
        drawCtx.restore();
        inverse*=-1;
    }
    
    
    drawCtx.restore();
    
    
    
    
    
    //setting up progress bar on bottom of canvas
    drawCtx.save();
    
    drawCtx.lineWidth = 5;
    drawCtx.strokeStyle = "red";
    
    
    drawCtx.beginPath();
    drawCtx.moveTo(0, canvas.height - 2);
    
    
    drawCtx.lineTo((currentTime*canvas.width)/audioLength, canvas.height-2);
    
    drawCtx.closePath();
    
    drawCtx.stroke();
    
    drawCtx.restore();
    
    
    manipulatePixels(audioData, drawCtx);
    
    if(frequency){
        document.querySelector("#tableOneSec").style.display = "";
        //Frequency Data
        let htmlR1="<tr>";
        let htmlR2="<tr>";
        let sum = 0;
        for(let i = 0; i < audioData.length; i+=32){
            htmlR1 += `<th>${i}-${i+32}</th>`;
            let byte = 0;
            for(let x = 0; x < 32; x++){
                byte+= audioData[x+i];
            }
            htmlR2 += `<td>${byte}</td>`;
            sum += byte;
        }
        htmlR1 += "<th><i>Average of Samples</i></th>";
        htmlR1 += "</tr>";
        htmlR2 += `<td><i>${Math.floor(sum/audioData.length)}</i></td>`;
        htmlR2 += "</tr>";
        document.querySelector("#tableOne").innerHTML = htmlR1 + htmlR2;
    }
    else{
        document.querySelector("#tableOneSec").style.display = "none";
    }
    
    if(waveform){
        document.querySelector("#tableTwoSec").style.display = "";
        //Waveform data
        let row1="<tr>";
        let row2="<tr>";
        let sum2 = 0;
        for(let i = 0; i < waveFormData.length; i+=32){
            row1 += `<th>${i}-${i+32}</th>`;
            let byte = 0;
            for(let x = 0; x < 32; x++){
                byte+= audioData[x+i];
            }
            row2 += `<td>${byte}</td>`;
            sum2 += byte;
        }
        row1 += "<th><i>Average of Samples</i></th>";
        row1 += "</tr>";
        row2 += `<td><i>${Math.floor(sum2/audioData.length)}</i></td>`;
        row2 += "</tr>";
        document.querySelector("#tableTwo").innerHTML = row1 + row2;
    }
    else{
        document.querySelector("#tableTwoSec").style.display = "none";
    }
}