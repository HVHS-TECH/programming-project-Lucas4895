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

    startButton.visible = "hidden";


}


/*******************************************************/
//drawStartScreen()
//
//
/*******************************************************/
function drawStartScreen() {
    startButton.visible = 'visible';
    if (mouseIsPressed === true) {
        startButton.fill = '#33767a';
        gameState = 'gameplay';     
    } 
};


/*******************************************************/
//drawGameplayScreen()
//
//
/*******************************************************/
function drawGameplayScreen() {
    startButton.visible = 'hidden';
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