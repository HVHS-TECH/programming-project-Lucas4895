/*******************************************************/
//12COMP Game project:
//Written by Lucas Nguyen
//
//
/*******************************************************/
function preload() {
    catImg = loadImage("../images/cat2.png")
    carrotImg = loadImage("../images/carrot.png")
    bunnyImg = loadImage("../images/bunny.png")
    foodImg = loadImage("../images/food.png")
    bigBunnyImg = loadImage("../images/bigBunny2.png")
    bigCarrotImg = loadImage("../images/bigCarrot.png")
}

let gameState = 'start';
let score = 0;
let timeLeft = 30;
let runningTime = 0;

/*******************************************************/
//Setup
//
//
/*******************************************************/
function setup(){
    canvas = new Canvas(900,900)

//show time and score
    infoBox = new Sprite(70, 50, 120, 50, 'k')
    infoBox.collider = "none";
    infoBox.color = "#fff"


//walls
    wallLH  = new Sprite(0, height/2, 15, height, 'k');
    wallLH.color = "#ff8080"
	wallRH  = new Sprite(900, height/2, 15, height, 'k');
    wallRH.color = "#ff8080"
	wallTop = new Sprite(windowWidth/2, height, windowWidth, 15, 'k')
    wallTop.color = "#ff8080"
	wallBot = new Sprite(windowWidth/2, 0, windowWidth, 15, 'k');
    wallBot.color = "#ff8080"


//groups
bulletGroup = new Group();
collectibleGroup = new Group();


//start button
    startButton = new Sprite(width/2,height/2,150,50);
    startButton.color = "#fff";
    startButton.text = "Click anywhere to start";
    startButton.collider = "none";


//continue button
    continueButton = new Sprite(width/2,height/2,150,50);
    continueButton.color = "#fff";
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
    bigBunny = new Sprite(width/2, height/2 - 200, 100)
    bigCarrot = new Sprite(width/2 + 30, height/2 - 220, 80)
    bigBunny.image = (bigBunnyImg);
    bigCarrot.image = (bigCarrotImg)
    endBox.color = "#87CEEB";
    endBox.visible = false;
    endBox.collider = "none";
    bigBunny.collider = "none";
    bigCarrot.collider = "none";
    bigBunny.visible = false
    bigCarrot.visible = false


//2nd end screen
    timesOutBox = new Sprite(width/2, height/2 - 120, 500, 200)
    timesOutBox.color = "#87CEEB";
    timesOutBox.visible = false;
    timesOutBox.collider = "none";

//player
    player = new Sprite(width/2, 850, 32);
    player.visible = false
    player.image = (catImg);

//bunny
    bunny = new Sprite(width/2, 30, 32);
    bunny.visible = false
    bunny.collider = 'none';
    bunny.image = (bunnyImg);
}


/*******************************************************/
//drawStartScreen()
//Mouse presses --> startButton is hidden
//and gameState will be changed to 'instruction'
//
//
/*******************************************************/


function drawStartScreen() {
    if (mouse.presses()) {
        gameState = 'instruction'
        startButton.visible = false;
    } 
};


/*******************************************************/
//drawInstructionScreen()
//enable visibility of continueButton and continueBox
//If mouse presses --> gameState change to 'gamePlay'
//endBox being hidden is for when restarting the game,
//endBox will stay hidden
//
//
/*******************************************************/
function drawInstructionScreen() {
    bigBunny.visible = false
    bigCarrot.visible = false
    timeLeft = 30;
    score = 0;
    player.x = width/2
    player.y = 850    
    player.vel.x = 0;
    player.vel.y = 0;
    endBox.visible = false;
    timesOutBox.visible = false;
    continueButton.visible = true;
    instructionBox.visible = true;

    if (mouse.presses()) {       
     gameState = 'gameplay';     
    }
}

/*******************************************************/
//drawGameplayScreen()
//enable player's visibility
//instructionBox and continueButton --> hidden
//include player's movement so player could move around
//
//
/*******************************************************/
function drawGameplayScreen() {
    player.visible = true;
    bunny.visible = true;
    collectibleGroup.visible = true;
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


//how frequently the bullets and collectibles will spawn
    if (millis() - lastFire > 500) {
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
//
/*******************************************************/
let lastFire = 0;
let lastSpawn = 0;
function playerHit() {
    gameState = 'end';
}

function bulletRain() {
    let x = random(10, 890);
    bullet = new Sprite(x, 1, 8);
    bullet.color = ("#0278ff")
    bullet.vel.y = 7;
    bullet.image = (carrotImg);
    bulletGroup.add(bullet);
    bulletGroup.collides(player, playerHit);
    bullet.collider = "true";
}




//spawn collectibles
function spawnCollectibles() {
    let x = random(10, 880);
    let y = random(10, 850);
    collectible = new Sprite(x, y, 20, 20, 'k');
    collectible.color = "#8ea50c"
    collectible.life = 300;
    collectible.image = (foodImg);
    collectibleGroup.add(collectible);
    collectibleGroup.collides(player, gainScore);
    collectibleGroup.collides(bulletGroup);
}
//Gain score by collecting collectibles
function gainScore(collectible, player) {
    score++
    collectible.remove();
}



/*******************************************************/
//drawEndScreen()
//player is hidden, bullets are also hidden
//enable endBox visibility
//mouse presses --> change gameState to 'instruction'
//
//
/*******************************************************/
function drawEndScreen() {
    timeLeft = 30;
    player.visible = false;
    bunny.visible = false;
    bigBunny.visible = true;
    bigCarrot.visible = true;
    endBox.visible = true
    collectibleGroup.removeAll()
    bulletGroup.removeAll()
    if (mouse.presses()) {
        gameState = 'instruction'
    }
}

//similar to drawEndScreen but with different text
function drawTimesOutScreen() {
    timeLeft = 30;
    player.visible = false;
    bunny.visible = false;
    timesOutBox.visible = true
    collectibleGroup.removeAll()
    bulletGroup.removeAll()
    if (mouse.presses()) {
        gameState = 'instruction'
    }
}

//Draw
function draw() {

//timer
    infoBox.text = "time: " + timeLeft + "  score:" + score
    endBox.text = "End, click anywhere to restart. Score: " + score;
    timesOutBox.text = "You successfully escaped the bunny! You've collected " + score + " cans of tuna!!";

    if (millis() - runningTime > 1000) {
       timeLeft--;
       runningTime = millis();
    }

    if (timeLeft <= 0) {
       gameState = 'timesOut'
    }


    background('#87CEEB')
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

    if (gameState === 'timesOut') {
        drawTimesOutScreen();
    }
}