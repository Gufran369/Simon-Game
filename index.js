const buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;
var level = 0;

$(document).on('keypress', function(){
    if(!started){
        $('#level-title').text('level ' + level);
        nextsequence();
        started = true;
    }
});

$('.btn').on('click', function(){
    var userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);

});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel] ){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextsequence();
            }, 1000)
        };
    }else{
        playSound('wrong');
        $('body').addClass('game-over');
        $('#level-title').text('Game Over, press any key to start ');

        setTimeout(function(){
            $('body').removeClass('game-over');
        }, 200);

        startOver();
    };
};

function nextsequence(){
    userClickedPattern = [];

    level++;

    $("#level-title").text("Level " + level);
    
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColours[randomNumber];
    gamePattern.push(randomChosenColor)

    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    
};


function playSound(name){
    var audio = new Audio('sounds/' + name + ".mp3");
    audio.play();
};



function animatePress(currentColor){
    $('#' + currentColor).addClass('pressed');
    setTimeout(() => {
        $('#' + currentColor).removeClass('pressed')
    }, 100);
}


function startOver(){
    started = false;
    level = 0;
    gamePattern = [];
}
