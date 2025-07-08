alert("Please play the game slowly for a better UX");

var level = 0;

var colors = ["red", "green", "blue", "yellow"];

var gamePattern = [];

var playerPattern = [];

var gameOver = false;

$(document).keydown(function(event){

    if(event.key == 'a' && level === 0 ){

        nextSequence();
    }

    if( gameOver === true ){

        level = 0;
        gamePattern = [];
        nextSequence();
    }

});

function nextSequence(){
    level++;
    $("h1").text("Level "+level);
    var randomNum = Math.floor(Math.random()*4);
    var randomTile = colors[randomNum];
    $("#"+randomTile).fadeOut(100).fadeIn(100);
    gamePattern.push(randomTile);
    console.log(gamePattern);
    playSound(randomTile);

    playerPattern = [];
}

$(".btn").click(function(){

    var currentButton = this;
    var currentTile = $(currentButton).attr("id");
    if( currentTile !== gamePattern[playerPattern.length] ){

        playSound('wrong');
        $("body").addClass("game-over");
        setTimeout(function() { $("body").removeClass("game-over")}, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        gameOver = true;
        return;
    }
    playerPattern.push(currentTile);
    console.log(playerPattern);
    $(currentButton).addClass("pressed");
    setTimeout(function() { $(currentButton).removeClass("pressed") }, 100);
    
    if( playerPattern.length === gamePattern.length ){

        nextSequence();
    }
});

function playSound(Tile){

    var audio = new Audio('./sounds/'+Tile+'.mp3');
    audio.play();
}