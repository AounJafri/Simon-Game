var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var level = 0;
var userClickedPattern = [];
var started =false;

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour =  buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

$(".btn").click(function(){
    var userChosenColour =  $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});



function playSound(name){
    var sound = new Audio(("./sounds/"+name+".mp3"));
    sound.play();
}

function animatePress(currentColour){

    $("."+currentColour).addClass("pressed");

    setTimeout(function(){
        $("."+currentColour).removeClass("pressed");
    },100);
}


$(document).keypress(function(){
  if(!started){
    $("h1").text("level "+ level);
    nextSequence();
    started = true;
 }
} );

function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel]===gamePattern[currentLevel]) {
        if (gamePattern.length===userClickedPattern.length) {
         setTimeout(function(){
            nextSequence();
         },1000)   
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function() {
            $("body").removeClass("game-over");
        },200);
        startOver();
    }
}

function startOver(){
    level=0;
    gamePattern = [];
    started = false;   
}