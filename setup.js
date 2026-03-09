/*******************************************************/
//12COMP Game project:
//Written by Lucas Nguyen
//
//
/*******************************************************/


let gameState = 'start';
var score = 0;

/*******************************************************/
//Setup
//
//
/*******************************************************/
function setup(){
    cnv = new Canvas(900,900)

    wallLH  = new Sprite(0, height/2, 15, height, 'k');
    wallLH.color = "#000"
	wallRH  = new Sprite(900, height/2, 15, height, 'k');
    wallRH.color = "#321"
	wallTop = new Sprite(windowWidth/2, height, windowWidth, 15, 'k')
    wallTop.color = "#764"
	wallBot = new Sprite(windowWidth/2, 0, windowWidth, 15, 'k');
    wallBot.color = "#981"

bulletGroup = new Group();
collectibleGroup = new Group();
//start button
    startButton = new Sprite(width/2,height/2,150,50);
    startButton.color = "#84b3b0";
    startButton.text = "Click anywhere to start";
    startButton.collider = "none";

//continue button
    continueButton = new Sprite(width/2,height/2,150,50);
    continueButton.color = "#84b3b0";
    continueButton.text = "Click anywhere to continue"
    continueButton.visible = false
    continueButton.collider = "none";

//instruction box
    instructionBox = new Sprite(width/2, height/2 - 120, 500, 200)
    instructionBox.color = "#fff";
    instructionBox.text = "instruction";
    instructionBox.visible = false;
    instructionBox.collider = "none";

//End Screen Box
    endBox = new Sprite(width/2, height/2 - 120, 500, 200)
    endBox.color = "#fff";
    endBox.text = "End, click anywhere to restart";
    endBox.visible = false;
    endBox.collider = "none";


//player
    player = new Sprite(width/2, 850, 50);
    player.color = ("#775656")
    player.visible = false
}


/*******************************************************/
//drawStartScreen()
//So when mouse is pressed, startButton is hidden
//and gameState is changed to 'instruction'
//
/*******************************************************/
function changeGameState() {
    gameState = 'instruction'

}

function drawStartScreen() {
    if (mouseIsPressed === true) {
        setTimeout(changeGameState, 150);  
        startButton.visible = false;
    } 
};


/*******************************************************/
//drawInstructionScreen()
//enable visibility of continueButton and continueBox
//If mouse is pressed then gameState is changed to 'gamePlay'
//endBox being hidden is for when restarting the game,
//endBox will stay hidden
//
/*******************************************************/
function drawInstructionScreen() {
    endBox.visible = false;
    continueButton.visible = true;
    instructionBox.visible = true;

    if (mouseIsPressed === true) {       
     gameState = 'gameplay';     
    }
}


/*******************************************************/
//drawGameplayScreen()
//enable player's visibility
//instructionBox and continueButton is hidden
//include player's movement so player could move around
//
//
//
/*******************************************************/

function drawGameplayScreen() {
    player.visible = true;
    instructionBox.visible = false;
    continueButton.visible = false;


//player's movements
    if (kb.pressing('A')) {
        player.vel.x = -5;
    } else if (kb.pressing('D')){
        player.vel.x = +5;
    }
        if (kb.released('A')) {
        player.vel.x = 0;
    } else if (kb.released('D')){
        player.vel.x = 0;
    }
        if (kb.pressing('W')) {
        player.vel.y = -5;
    } else if (kb.pressing('S')){
        player.vel.y = +5;
    }
        if (kb.released('W')) {
        player.vel.y = 0;
    } else if (kb.released('S')){
        player.vel.y = 0;
    }

    if (millis() - lastFire > 1000) {
        bulletRain();
        lastFire = millis();
    }
    if (millis() - lastSpawn > 2000) {
        spawnCollectibles(); 
        lastSpawn = millis();
    } 
}

/*******************************************************/
//bulletRain()
//Spawn bullets in a rain-like pattern
//
/*******************************************************/

//Changes gameState to 'end'
let lastFire = 0;
let lastSpawn = 0;
function playerHit() {
    gameState = 'end';
}

function bulletRain() {
    let x = random(1, 899);
    bullet = new Sprite(x, 1, 8);
    bullet.color = ("#fff")
    bullet.vel.y = 5;
    bulletGroup.add(bullet);
    bulletGroup.collides(player, playerHit);
    bulletGroup.collides(wallBot, removeBullet);
}

//remove bullet's collider so they don't stacked in the box
function removeBullet() {
    bullet.collider = "true";
}


function spawnCollectibles() {
    let x = random(1, 899);
    let y = random(1, 899);
    collectible = new Sprite(x, y, 20, 20);
    collectible.color = "#8ea50c"
    collectible.life = 300;
    collectibleGroup.add(collectible);
    collectibleGroup.collides(player, gainScore);
}


function gainScore(collectible, player) {
    score++
    collectible.remove();
}

/*******************************************************/
//drawEndScreen()
//player is hidden, bullets are also hidden
//enable endBox visibility
//if mouse is pressed, change gameState to 'instruction'
//
//
/*******************************************************/
function drawEndScreen() {
    player.visible = false;
    bulletGroup.visible = false;
    bulletGroup.collider = "none";
    endBox.visible = true
    if (mouseIsPressed === true) {
        setTimeout(changeGameState, 150);  
    }
}



/*******************************************************/
//draw()
//draw different screen based on gameState
//
//
//
/*******************************************************/
function draw() {
    background('#000')
    if (gameState === 'start') {
        drawStartScreen();
    }

    if (gameState === 'instruction') {
        drawInstructionScreen();
    }

    if (gameState === 'gameplay') {
        drawGameplayScreen();
    }

    if (gameState === 'end') {
        drawEndScreen();
    }
}