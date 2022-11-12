var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var flag = false;
var level = 0;
$(document).keydown(function(){
  if(!flag){
      $("h1").text("level "+ level);
      nextSequence();
      flag = true;
}
});


$(".btn").click(function(){
  playSound(this);
  animatePress(this);
  userClickedPattern.push(this.id);
  checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){
  userClickedPattern = [];
  level++;
  $("h1").text("level "+ level);
  var randomNumber = Math.floor(Math.random() * (3-0) + 1);
  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);
  pressEffect($("#" + randomChosenColour));
}

function pressEffect(newButt){
  var newAudio = new Audio("sounds/"+newButt[0].id + ".mp3");
  newAudio.play();
  newButt.fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}

function playSound(names){
  var buttonAudio = new Audio("sounds/" + names.id + ".mp3");
  buttonAudio.play();
}

function animatePress(currentColor){
  currentColor.classList.add("pressed");
  setTimeout(function(){
    currentColor.classList.remove("pressed")
  }, 100);
}

function checkAnswer(currentLevel){
  console.log(currentLevel);
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    console.log("success");
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(nextSequence, 1000);
    }
  }
  else {
    $("#level-title").text("Game Over, Press Any Key to Restart");
    var wrongAudio = new Audio("sounds/wrong.mp3");
    wrongAudio.play();
    $("body")[0].classList.add("game-over");
    setTimeout(function(){
      $("body")[0].classList.remove("game-over");
    }, 200)
    startOver();
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  flag = false;

}
