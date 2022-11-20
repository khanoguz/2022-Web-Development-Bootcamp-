const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.post("/", function(req, res){

  const city = req.body.cityName;
  const apiKey = "72606ad3b6087882c0f86f354a6018ad"
  const units = "metric"
  const url = 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid='+apiKey+'&units='+units;
  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weather_data = JSON.parse(data);
      const temp =  weather_data.main.temp;
      const desc = weather_data.weather[0].description;
      const icon = weather_data.weather[0].icon
      const iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write("<h1>The temprature in " + city + " is " + temp + " degrees Celcius.</h1>");
      res.write("<h2>The weather is currently " + desc + "</h2>");
      res.write("<img src=" +iconURL+">")
      res.send();
    })
  });
});


app.get("/", function(req,res){
  res.sendFile(__dirname + "/index.html");
});

app.listen(3000, function(){
  console.log("Server is running on port 3000");
});
