// (Intermediate) Random world generated when loading the page
function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

var world = [
    [1,1,1,1,1,1,1,1],
    [1,randomNum(0,4),randomNum(0,4),randomNum(0,4),randomNum(0,4),randomNum(0,4),randomNum(0,4),1],
    [1,randomNum(0,4),randomNum(0,4),randomNum(0,4),randomNum(0,4),randomNum(0,4),randomNum(0,4),1],
    [1,randomNum(0,4),randomNum(0,4),randomNum(0,4),randomNum(0,4),randomNum(0,4),randomNum(0,4),1],
    [1,randomNum(0,4),randomNum(0,4),randomNum(0,4),randomNum(0,4),randomNum(0,4),randomNum(0,4),1],
    [1,randomNum(0,4),randomNum(0,4),randomNum(0,4),randomNum(0,4),randomNum(0,4),randomNum(0,4),1],
    [1,randomNum(0,4),randomNum(0,4),randomNum(0,4),randomNum(0,4),randomNum(0,4),randomNum(0,4),1],
    [1,1,1,1,1,1,1,1]
];

var worldDict = {
    0: 'blank',
    1: 'wall',
    2: 'sushi',
    3: 'onigiri'
}

function drawWorld(){
    output = "";
    for(var row = 0; row < world.length; row++){
      output += "<div class = 'row'>";      
      for(var col = 0; col < world[row].length; col++){        
        output += "<div class = '" + worldDict[world[row][col]] + "'></div>"
      }
      output += "</div>";
    }
    document.getElementById("world").innerHTML = output;
}
drawWorld();

var ninjaman = {
    row: 1,
    col: 1
}

function drawNinjaman(){
    document.getElementById("ninjaman").style.left = (40 * ninjaman.row) + "px"
    document.getElementById("ninjaman").style.top = (40 * ninjaman.col) + "px"
    }
drawNinjaman();

// (Basic) Keep Score of how many Sushi's NinjaMan eats
var scoreCount = 0;
function scoreCounter(){
    document.getElementById('score').textContent = "Score: " + scoreCount;
}
scoreCounter();

//Add score seperately for sushi and onigiri
function sushiOnigiri(){
    if (world[ninjaman.col][ninjaman.row] == 2){
        scoreCount += 10;    
    }
    else if (world[ninjaman.col][ninjaman.row] == 3){
        scoreCount += 5;
    }
}

document.onkeydown = function(e){    
    if(e.keyCode == 37){ //LEFT        
        if(world[ninjaman.col][ninjaman.row-1] != 1){
            ninjaman.row--;
        }        
    }
    if(e.keyCode == 39){ //Right        
        if (world[ninjaman.col][ninjaman.row+1] != 1){
            ninjaman.row++;
        }        
    }
    if (e.keyCode == 40){ //DOWN        
        if (world[ninjaman.col+1][ninjaman.row] != 1){            
        ninjaman.col++;
        }
    }
    if (e.keyCode == 38){ //UP        
        if (world[ninjaman.col-1][ninjaman.row] != 1){
        ninjaman.col--;
        }
    }
    sushiOnigiri();
    world[ninjaman.col][ninjaman.row] = 0    
    scoreCounter();
    ghostWins();  
    drawWorld();
    drawNinjaman();
}

// (Advanced) Add Ghosts that chase NinjaMan around
//Creating ghosts' positions
var ghosts = {
    x: 3,
    y: 3,
}

//Initial drawing of ghosts'
function drawGhosts(){
    document.getElementById("ghosts").style.left = (40 * ghosts.x) + "px";
    document.getElementById("ghosts").style.top = (40 * ghosts.y) + "px";
}
drawGhosts();

function chase(){
    var ghostMove = randomNum(0,4)
    if (ghostMove === 0 && (world[ghosts.x-1][ghosts.y] != 1)){ //LEFT 
        ghosts.x--;
    }
    if (ghostMove === 1 && (world[ghosts.x+1][ghosts.y] != 1)){ //RIGHT 
        ghosts.x++;
    }
    if (ghostMove === 2 && (world[ghosts.x][ghosts.y-1] != 1)){ //UP 
        ghosts.y--;
    }
    if (ghostMove === 3 && (world[ghosts.x][ghosts.y +1] != 1)){ //DOWN
        ghosts.y++;
    }
}

function ghostRepeat(){
    chase();
    drawGhosts();
    ghostWins();   
}

function interval(){
    ghostInterval = setInterval(ghostRepeat, 500);
}
interval();


// (Advanced) Give NinjaMan 3 lives where Game Over occurs when a ghost hits NinjaMan 3 times

//Initial lives
var ninjaManLives = 3;
document.getElementById("lives").innerHTML = "Total Lives: " + ninjaManLives;

//When the ghost wins against the Ninja Man
function ghostWins(){
    if (ghosts.x === ninjaman.row && ghosts.y === ninjaman.col){
        ninjaManLives--;
    }
    document.getElementById("lives").innerHTML = "Total Lives: " + ninjaManLives;

    //Game Over
    if (ninjaManLives === 0){
        document.getElementById("world").innerHTML = "Game Over! Try Again!";  
        document.getElementById("world").classList.add("loserToggle");
        document.getElementById("ninjaman").classList.add("hide");
        document.getElementById("ghosts").classList.add("hide");
        document.getElementById("score").classList.add("hide");
        document.getElementById("lives").classList.add("hide");
        
        clearInterval(interval);
        setTimeout("location.reload(true);", 3000);
        }
}





