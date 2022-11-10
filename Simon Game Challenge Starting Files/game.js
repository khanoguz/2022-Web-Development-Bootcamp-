var buttonColors = ["red", "blue", "green", "yellow"];
var randomChosenColour = buttonColors[nextSequence()];

var gamePattern = [];
gamePattern.push(randomChosenColour);

console.log(randomChosenColour);
var newButt = $("#" + randomChosenColour)[0];
newButt.onclick = setTimeout(function(){
  newButt.classList.add("pressed");
}, 100);



function nextSequence(){
  var randomNumber = Math.floor(Math.random() * (3-0) + 1);
  return randomNumber;
}
