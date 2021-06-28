"use strict"

export{manipulatePixels};

//importing variables from other files as needed
import{bassBased, audioCtx, lofi} from './setup.js';

//function to create and draw the filters to the canvas
function manipulatePixels(audioData, drawCtx){
    
    let imageData = drawCtx.getImageData(0,0,drawCtx.canvas.width, drawCtx.canvas.height);
            
    let data = imageData.data;
    let length = data.length;
    let width = imageData.width;
    
    let bassCount = 0;
    
    for(let i = 0; i < 20; i++){
        bassCount += audioData[i];
    }
    

    //looping through all the image pixels
    for(let i = 0;i < data.length; i+=4){
        //setting up a tint based on amount of bass the song has
        if(bassBased){
            data[i] -= Math.floor(bassCount/50);
            data[i+1] -= Math.floor(bassCount/50);
            data[i+2] -= Math.floor(bassCount/50);
        }
        
        if(lofi){
            if(Math.random() < .02){
                data[i] = data[i+1] = data[i+2] = 128;
            }
            data[i] -=10;
            data[i+1] -=10;
            data[i+2] -=10;
        }
        
        //if any color value is too high, setting it to the correct value
        if(data[i] > 255){
            data[i] = 255;
        }
        if(data[i+1] > 255){
            data[i+1] = 255;
        }
        if(data[i+2] > 255){
            data[i+2] = 255;
        }
    }
    
    
    drawCtx.putImageData(imageData, 0, 0);
}
