/*******************************************************/
//12COMP Game project:
//Written by Lucas Nguyen
//
//
/*******************************************************/


let gameState = 'start';


/*******************************************************/
//Setup
//
//
/*******************************************************/
function setup(){
    cnv = new Canvas(900,900)

//start button
    startButton = new Sprite(width/2,height/2,150,50);
    startButton.color = "#84b3b0";
    startButton.text = "Click anywhere to start";
    startButton,collider = "none";

//continue button
    continueButton = new Sprite(width/2,height/2,150,50);
    continueButton.color = "#84b3b0";
    continueButton.text = "Press 'Enter' to continue"
    continueButton.visible = false

//instruction box
    instructionBox = new Sprite(width/2, height/2 - 120, 500, 200)
    instructionBox.color = "#fff";
    instructionBox.text = "instruction";
    instructionBox.visible = false;
    instructionBox.collider = "none";

//player
    player = new Sprite(width/2, 850, 50);
    player.visible = false
}


/*******************************************************/
//drawStartScreen()
//
//
/*******************************************************/
function changeGameState() {
    gameState = 'instruction'
}

function drawStartScreen() {
    if (mouseIsPressed === true) {
        setTimeout(changeGameState, 500);  
        startButton.visible = false;
        startButton.collides = false;
    } 
};


/*******************************************************/
//drawInstructionScreen()
//
//
/*******************************************************/
function drawInstructionScreen() {
    continueButton.visible = true;
    instructionBox.visible = true;

    if (mouseIsPressed === true) {       
     gameState = 'gameplay';     
    }
}


/*******************************************************/
//drawGameplayScreen()
//
//
/*******************************************************/
function drawGameplayScreen() {
    player.visible = true;
    instructionBox.visible = false;
    continueButton.visible = false;

/*******************************************************/
//player's movements
//
/*******************************************************/
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
}

/*******************************************************/
//draw()
//if gameState = 'start', call drawStartScreen()
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
}