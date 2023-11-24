
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

// snake Head
var snakeX = blockSize * 10; 
var snakeY = blockSize * 5; 

// console.log(snakeX,snakeY);

// food
var foodX;
var foodY;

// bodySnake
var snakeBody = []

// food more than four
var foodEaten = 0;

var gameOver = false;

window.onload = function(){
    board = document.getElementById("board")
    board.height = rows * blockSize;
    board.width = cols * blockSize;

    context = board.getContext('2d') 

    placeFood();
    document.addEventListener('keyup', changeDirection)
    update();

    setInterval(update, 1000/10)
}

function update(){

    if(gameOver){
        return;
    }
    context.fillStyle = 'black';
    context.fillRect(0,0, board.width, board.height);

    context.fillStyle = 'red',
    context.fillRect(foodX,foodY,blockSize,blockSize)

    if(snakeX === foodX && snakeY === foodY){
        snakeBody.push([foodX,foodY])
        foodEaten++;
 
        if(foodEaten % 2 == 0 ){
        context.fillStyle = 'pink';
            placeFood(true)
        }
        else {
            placeFood(false)
        }
 
        // placeFood();
    }
    
    //
    for(let i = snakeBody.length-1; i>0; i--){
        snakeBody[i] = snakeBody[i-1]
    } 
    if(snakeBody.length){
        snakeBody[0] = [snakeX, snakeY]
    }


    context.fillStyle = 'lime',
    snakeX += speedX * blockSize ;
    snakeY += speedY * blockSize  ;
    context.fillRect(snakeX,snakeY,blockSize,blockSize)

    for(let i = 0; i < snakeBody.length; i++){
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize)
    }

    // game over check-- out of canvas
    if(snakeX < 0 || snakeX >= cols * blockSize || snakeY < 0 || snakeY >= cols * blockSize ){
        gameOver = true;
        alert("game over")
    }

    // intersecting its own body
    for(let i =0 ; i < snakeBody.length; i++){
        if(snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
            gameOver = true;
            alert("game over")
        }
    }

}

// function place food

// function placeFood(){
//  foodX = Math.floor(Math.random()  * cols ) * blockSize
//  foodY = Math.floor(Math.random()  * rows ) * blockSize
// }

// snake speed 
var speedX = 0;
var speedY = 0;
function changeDirection(e){
    if(e.code == 'ArrowUp' && speedY !== 1 ){
          speedX = 0;
          speedY = -1;
    }
    else if(e.code == 'ArrowDown' && speedY !== -1){
          speedX = 0;
          speedY = 1;
    }
    else if(e.code == 'ArrowLeft' && speedX !== 1){
          speedX = -1;
          speedY = 0;
    }
    else if(e.code == 'ArrowRight' && speedX !== -1){
          speedX = 1;
          speedY = 0;
    }
    // console.log(e.code);
}


// function to handle double size food

function placeFood(doubleSize){
    if(doubleSize){
         
        foodX = Math.floor(Math.random() * cols) * blockSize;
        foodY = Math.floor(Math.random() * rows) * blockSize;
        console.log(foodX,foodY);
        console.log(foodEaten,context.fillStyle);
    }
    else{
        foodX = Math.floor(Math.random() * cols) * blockSize;
        foodY = Math.floor(Math.random() * rows) * blockSize;
    }
}