const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html"); // to send a html file we use sendFile()
  // we used __dirname cause we dont need file path in future. __dirname gives its current file path.
});

app.post("/", function(req, res){
  var num1 = Number(req.body.num1); // we turned int with Number cuz it was string
  var num2 = Number(req.body.num2);

  var result = num1 + num2;

  res.send("result of calculation: " + result);
});

app.get("/bmicalculator", function(req, res){
  res.sendFile(__dirname + "/bmiCalculator.html");
});

app.post("/bmicalculator", function(req, res){
  var weight = Number(req.body.weight);
  var height = Number(req.body.height);

  var bmi = weight / (height * height);

  res.send("Your BMI is " + bmi);
})

app.listen(3000, function(){
  console.log("Server started on port-3000");
});
