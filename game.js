var gamePattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var started = false;
var level = 0;

//This nextSequence function is used to get random number using random function and store it in the gamePattern array.
function nextSequence(){
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level "+level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);
}

//In this the class with btn is clicked and tigger a handler function and to store the user click button to array called userClickedPattern.
$(".btn").click(function (){
  var userChosenColor =$(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length-1);
});

//This playSound() function is used to play sound corresponding to the button got clicked.
function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

//This animatePress() function is used to add .pressed class and then remove it after 100 miliseconds.
function animatePress(currentColor){
  $("#"+currentColor).addClass(".pressed");
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  }, 100);
}

//
$(document).keydown(function(){
  if(!started){
    $("#level-title").text("Level "+level);
    nextSequence();
    started = true;
  }
});

// Check the user's and game pattern are check. So that the level increase if matches.
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}

// This function is used to start the game again once the Game is over.
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
