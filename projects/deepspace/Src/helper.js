"use strict";


function createAlien(x,y){
    let startX = canvas.width + 5;
    let startY = Math.random()*canvas.height;
    ctx.drawImage(document.querySelector("#alien"), startX,startY,100,50);
    let alien = {
        x: startX,
        y: startY,
        spotX: x,
        spotY: y,
        attacking: false,
        attack(){
            this.attacking = true;
            this.x-=8;
            if(playerY > this.y){
                this.y++;
            }
            else if(playerY < this.y){
                this.y--;   
            }
            ctx.drawImage(document.querySelector("#alien"), this.x,this.y,100,50);
        },
        wrap(){
            this.x = startX;
            this.y = startY;
            this.returnHome();
            this.attacking = false;
        },
        returnHome(){
            if(this.x < this.spotX){
                this.x++;   
            }
            else if(this.x > this.spotX){
                this.x--;   
            }
            
            if(this.y < this.spotY){
                this.y++;   
            }
            else if(this.y > this.spotY){
                this.y--;   
            }
            ctx.drawImage(document.querySelector("#alien"), this.x,this.y,100,50);
        }
    }
    alien.returnHome();
    alienArray.push(alien);
}


//Need to fix movement
function movePlayerRight(){
          playerX+=2;
}
function movePlayerLeft(){
          playerX-=2;
}
function movePlayerUp(){
          playerY-=2;
}
function movePlayerDown(){
          playerY+=2;
}

function shoot(e){
    if(!paused && !levelBreak && lifeCounter >= 0){
    if(e.keyCode == 32){
        if(stopShoot){
            stopShoot = false;
            let x = playerX+50;
            let y = playerY+15;
            ctx.drawImage(document.querySelector("#bullet"), x,y);
            let bullet = {
                x: x,
                y: y
            };
            bulletArray.push(bullet);
        }
    }
    }
}

function moveBullets(){
    for(let i = 0; i < bulletArray.length; i++){
        if(bulletArray[i].x > canvas.width){
            bulletArray.splice(i, 1);
        }
        else{
            bulletArray[i].x+=10;
            ctx.drawImage(document.querySelector("#bullet"), bulletArray[i].x, bulletArray[i].y);
        }
    }
}


//need to setup this function
function restart(){
    timeRun = false;
    gameOverTimer = setInterval(function(){init();}, 5000);
    
    bulletArray = [];
    alienArray = [];
    level = 1;
    
}


//need to setup this function
function testCollisions(){
    
    for(let x = 0; x < alienArray.length; x++){
        for(let i = 0; i < bulletArray.length; i++){
            if((bulletArray[i].x + 10) > alienArray[x].x &&
               bulletArray[i].x < (alienArray[x].x + 100) &&
              (bulletArray[i].y + 10) > alienArray[x].y &&
              bulletArray[i].y < (alienArray[x].y + 40)) {
               bulletArray.splice(i, 1);
                alienArray.splice(x, 1);
            }
        }
        if(playerX < (alienArray[x].x + 95) && 
           (playerX + 70) > alienArray[x].x && 
           playerY < (alienArray[x].y + 45) &&
           (playerY + 45) > alienArray[x].y)
        {
            playerX = playerY = 200;
            lifeCounter--;
            alienArray.splice(x, 1);
        }
    }
        
    if(lifeCounter < 0){
        playerX = playerY = -100;
        restart();
    }
    
}

let breakTimer;
//need to setup this function
function winLevel(){
    levelBreak = true;
    timeRun = false;
    level++;
    if(level <= finalLevel){
        bulletArray = [];
        if(breakTimer){
            clearInterval(breakTimer);   
        }
        breakTimer = setInterval(function(){levelBreak = false;nextLevel();
        }, 5000);
        
    }

}


function spawnWave(){
            for(let i = 0; i < level; i++){
                for(let x = 0; x < 10; x++){
                    createAlien(700 - (i *100), (x*60)+10);   
                }
            }
}

function nextLevel(){
    timeRun = true;
    spawnWave();
    update();
}

function drawLives(){
    ctx.save();
    
    ctx.rotate(-Math.PI/2);
    
    for(let i = 0; i < lifeCounter; i++){
        ctx.drawImage(player, -595, (i *30), 35, 25);
    }
    
    
    ctx.restore();
}

function playerWrap(){
    if(playerX < 0){
        playerX = 0;
    }
    else if(playerX+70 > canvas.width){
        playerX = canvas.width - 70;
    }
    
    if(playerY+70 < 0){
        playerY = canvas.height +10;
    }
    else if(playerY-20 > canvas.height){
        playerY = -60;
    }
    
}

function timer(){
    if(timeRun){
        timeInterval++;   
    }
}