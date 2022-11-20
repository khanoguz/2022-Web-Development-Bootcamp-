const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

app.set("view engine", "ejs"); // for ejs

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public")); //to implement css or other static codes

const items = ["Study software", "Study English"]; // let is safer than var for scope
const workItems = [];
app.get("/", function(req, res) {


  let day = date.getDate()
  res.render("list", {
    listTitle: day,
    allWorks: items
  }) //list is name of the ejs file
});

app.post("/", function(req, res){
  console.log(req.body)
  let item = req.body.newWork;
  if (req.body.list === "Work"){
    workItems.push(item);
    res.redirect("/work");
  }
  else{
    items.push(item);
    res.redirect("/")
  }
});

app.get("/work", function(req, res){
  res.render("list", {listTitle:"Work List", allWorks: workItems});
})

app.get("/about", function(req,res){
  res.render("about");
})

app.listen(3000, function() {
  console.log("server is running on port-3000");
});
