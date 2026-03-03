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

    startButton = new Sprite(width/2,height/2,250,100);
    startButton.color = "#84b3b0";
    continueButton = new Sprite(width/2,height/2,100,100);
    continueButton.visible = false

    player = new Sprite(width/2, 850, 50);
    player.visible = false
}


/*******************************************************/
//drawStartScreen()
//
//
/*******************************************************/
function drawStartScreen() {
    if (startButton.onMousePressed === true) {
        gameState = 'instruction';  
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
     continueButton.visible = false;
    player.visible = true;
    

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
//if gameState is 'start', call drawStartScreen()
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