//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/todolistDB");

const itemSchema = {
  name: {
    require: true,
    type: String
  },
}
const Item = mongoose.model("Item", itemSchema);
const studyEnglish = new Item({
  name: "Do not forget study English."
});
const studySoftware = new Item({
  name: "Make software practise too."
});
const defaultItems = [studyEnglish, studySoftware];

const listSchema = {
  name: String,
  items: [itemSchema]
};

const List = mongoose.model("List", listSchema);


app.get("/", function(req, res) {

  Item.find({}, function(err, result) {

    if (result.length === 0) {
      Item.insertMany(defaultItems, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully added items");
        }
        res.redirect("/")
      });
    } else {
      res.render("list", {
        listTitle: day,
        newListItems: result
      });
    }

  })
  const day = date.getDate();
});



app.post("/", function(req, res) {

  const item = req.body.newItem;
  let listName = req.body.buttonList;

  const newItem = new Item({
    name: item
  });

  const day = date.getDate();
  if (listName === day) {
    newItem.save();
    res.redirect("/");
  } else {
    listName = req.body.buttonList.replace(" ", "");
    console.log("Listname:" + listName);
    console.log("len:" + listName.length);
    List.findOne({name: listName}, function(err, foundList){

    foundList.items.push(item);

    foundList.save(function(){

      res.redirect("/" + listName);
    })

  })
}
});

app.post("/delete", function(req, res) {
  const itemID = req.body.checkbox;
  const listName = req.body.listName;

  const day = date.getDate();
  if(listName === day){
    Item.findByIdAndRemove(itemID, function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Deleted Successfully");
      }
    });
  }
  else{
    List.findOneAndUpdate(
      {name:listName},
      {$pull:{items:{_id: itemID}}},
      function(err, foundList){
        if(!err){
          res.redirect("/"+listName);
        }
      }
    )
  }
  Item.findByIdAndRemove(itemID, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Deleted Successfully");
    }
  });

  res.redirect('/');
});


app.get("/:customListName", function(req, res) {
  const customListName = req.params.customListName;

  List.findOne({
    name: customListName
  }, function(err, foundList) {
    if (err) {
      console.log(err);
    } else {
      if (!foundList) {
        const list = new List({
          name: customListName,
          items: defaultItems
        });
        list.save();

        res.redirect("/" + customListName)
      } else {

        res.render("list", {
          listTitle: foundList.name,
          newListItems: foundList.items
        });
      }
    }
  })


})
app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work List",
    newListItems: workItems
  });
});

app.get("/about", function(req, res) {
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
