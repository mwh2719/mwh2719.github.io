"use strict"

let canvas;
let ctx;

let player;

var Keys = {
        up: false,
        down: false,
        left: false,
        right: false
    };

function setupUI(){
    window.addEventListener('keydown', function(e){
       if(e.keyCode == 27){
           paused = !paused;
           timeRun = !timeRun;
           if(!paused){
               update();
           }
       }
    });
}

function setupCanvas(){
    canvas = document.querySelector('canvas');
    ctx = canvas.getContext('2d');
    player = document.querySelector("#ship");
}

function setupBackground(x, x2){
    ctx.drawImage(document.querySelector("#space"), 0-x,0, canvas.width+100, canvas.height);
    ctx.drawImage(document.querySelector("#space"), canvas.width+100-x,0, canvas.width+100, canvas.height);
    
    
    ctx.drawImage(document.querySelector("#spaceForeground"), 0-x2,0, canvas.width+120, canvas.height);
    ctx.drawImage(document.querySelector("#spaceForeground"), canvas.width+100-x2,0, canvas.width+120, canvas.height);
    
}

function setupPlayer(x,y){
    ctx.drawImage(player, x, y, 70, 50);
}

//Need to setup movement
function setupPlayerMove(){
    window.onkeydown = function(e) {
        var kc = e.keyCode;
        e.preventDefault();

        if      (kc === 37) Keys.left = true;  // only one key per event
        else if (kc === 38) Keys.up = true;    // so check exclusively
        else if (kc === 39) Keys.right = true;
        else if (kc === 40) Keys.down = true;
    };

    window.onkeyup = function(e) {
        var kc = e.keyCode;
        e.preventDefault();

        if      (kc === 37) Keys.left = false;
        else if (kc === 38) Keys.up = false;
        else if (kc === 39) Keys.right = false;
        else if (kc === 40) Keys.down = false;
    };
}