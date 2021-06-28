"use strict"

window.onload = preInit;

let backgroundControl = 0;
let foregroundControl = 0;
let alien;
let playerX;
let playerY;
let paused = false;
let bulletArray = [];
let stopShoot = true;
let lifeCounter;
let alienArray = [];
let level = 1;
let levelBreak = false;
const finalLevel = 5;
let gameOverTimer;
let timeRun = false;
let timeInterval = 0;

function preInit(){
    setupCanvas();
    setupUI();
    setupPlayerMove();
    setInterval(timer, 1000);
    init();
}

function init(){
    playerX = playerY = 200;
    lifeCounter = 3;
    
    setupBackground(backgroundControl, foregroundControl);
    setupPlayer(playerX, playerY);
    //createAlien();
    ctx.fillStyle = "#53E5FF";
    ctx.textAlign = "center";
    ctx.font = "bolder 30px Roboto";
    ctx.fillText("Shoot all the aliens in each wave to advance.", canvas.width/2, 250);
    ctx.fillText("Use the arrow keys to move and space to shoot.",canvas.width /2,300);
    ctx.fillText("Press space to start!",canvas.width /2,350);
    document.addEventListener('keydown', start);
}

function start(e){
    if(e.keyCode == 32){
        timeRun = true;
        document.removeEventListener('keydown',start);
        document.addEventListener('keydown', shoot);
        document.addEventListener('keyup', function(e){if(e.keyCode == 32){stopShoot = true;}});
        spawnWave();
        update();
    }
}




function update(){
    if(!paused && !levelBreak && lifeCounter >= 0){
        window.requestAnimationFrame(update);
    }
    
    
    if(breakTimer && !levelBreak){
        clearInterval(breakTimer);   
    }
    if(gameOverTimer){
        clearInterval(gameOverTimer);   
    }
    setupBackground(backgroundControl, foregroundControl);
    setupPlayer(playerX, playerY);
    
    
    
    if(bulletArray.length > 0){
        moveBullets();
    }
    
    ctx.font = "bold 10px Roboto";
    ctx.fillText("Press Esc to pause", 50,20);
    
    backgroundControl+= 2;
    foregroundControl +=3;
    if(backgroundControl >= canvas.width +100){
        backgroundControl = 0;
    }
    if(foregroundControl >= canvas.width + 100){
        foregroundControl = 0;
    }
    
    if(Keys.left){
        movePlayerLeft();
    }
    if(Keys.right){
        movePlayerRight();
    }
    if(Keys.up){
        movePlayerUp();
    }
    if(Keys.down){
        movePlayerDown();
    }
    drawLives();
    
    playerWrap();
    
    if(timeInterval >= 10/level){
        for(let i = 0; i < level; i++){

        alienArray[Math.floor(Math.random()*alienArray.length)].attack();
        }
        timeInterval = 0;
    }
    
    
    for(let a of alienArray){
        if(a.x +100 < 0){
            a.wrap();
        }
        else if(!a.attacking){
            a.returnHome();   
        }
        else if(a.attacking){
            a.attack();   
        }
    }
    if(alienArray.length == 0 && !levelBreak && lifeCounter >= 0){
        winLevel();   
    }
    testCollisions();
    if(levelBreak){
        ctx.font = "bolder 30px Roboto"
        if(level <= finalLevel){
            
            ctx.fillText("Prepare for wave " + level,canvas.width /2,300);
        }
        else{
            timeRun = false;
            ctx.fillText("Winner!",canvas.width /2,300);
        }
    }
    
    if(lifeCounter < 0){
        ctx.font = "bolder 30px Roboto"
        ctx.fillText("Game Over!",canvas.width /2,300);
    }
}

