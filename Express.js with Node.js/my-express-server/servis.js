const express = require("express");
const app = express();
app.get("/", function(request, response){
  response.send("<h1>Hello there!</h1>")
}); // to make request

app.get("/contact", function(req, res){
  res.send("Contact with me: oguzkaganbilici1@gmail.com")
});

app.get("/about", function(req, res){
  res.send("<h1> Welcome! </h1> <p> Hi, Im Oguz Kagan. I'm an engineer and software developer. I'm learning Express.js with Node.js today. </p>")
})

app.get("/hobbies", function(req, res){
  res.send("My hobbies:")
})

app.listen(3000, function(){ // to listen port-3000
  console.log("Server started on port 3000");
});
