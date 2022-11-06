var randomNumber = Math.random();
randomNumber = Math.floor(randomNumber * (7 - 1) + 1);

var randomNumber2 = Math.random();
randomNumber2 = Math.floor(randomNumber2 * (7 - 1) + 1);

var dice1 = document.querySelector(".img1");
var newDice1 = "images/dice" + randomNumber + ".png";

var dice2 = document.querySelector(".img2");
var newDice2 = "images/dice" + randomNumber2 + ".png";

dice1.setAttribute("src", newDice1);
dice2.setAttribute("src", newDice2);

var winner = document.querySelector(".container h1");

if (randomNumber > randomNumber2){
  winner.textContent = "🚩Player1 Wins";
}
else if (randomNumber2>randomNumber){
  winner.textContent = "Player2 Wins🚩";
}
else{
  winner.textContent = "🚩Draw!🚩";
}
