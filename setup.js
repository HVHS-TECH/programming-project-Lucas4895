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

    
    startButton = new Sprite(100,100,100,100);
    startButton.color = "#84b3b0";
    continueButton = new Sprite(200,200,100,100);

}


/*******************************************************/
//drawStartScreen()
//
//
/*******************************************************/
function drawStartScreen() {
    if (mouseIsPressed === true) {
        gameState = 'instruction';     
    } 
};


/*******************************************************/
//drawStartScreen()
//
//
/*******************************************************/
function drawInstructionScreen() {
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
    startButton.visible = "false";
}

/*******************************************************/
//draw()
//if gameState is 'start', call drawStartScreen()
//else call drawGameplayScreen()
//
//
/*******************************************************/
function draw() {
    background('#000');
    if (gameState === 'start') {
        drawStartScreen();
    } else {
        drawGameplayScreen();
    }
}