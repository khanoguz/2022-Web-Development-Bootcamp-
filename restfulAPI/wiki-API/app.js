const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

mongoose.connect("mongodb://127.0.0.1:27017/wikiDB")
const wikiSchema = {
    title:{
        require:true,
        type:String
    },
    content:{
        require:true,
        type:String
    }
};

const Article = mongoose.model("Arcticle", wikiSchema);

app.route("/articles")
.get(function(req, res){
    Article.find(function(err, result){
        if(!err){
            res.send(result)
        }
        else{
            res.send(err)
        }
    });
})

.post(function(req, res){

    const newArticle = new Article({
        title:"Oguz Kagan Bilici",
        content:"an engineer and developer"
    });
    newArticle.save(function(err){
        if(!err){
            res.send("Successfully added new article");
        }
        else{
            res.send(err);
        }
    });
})

.delete(function(req, res){
    Article.deleteMany(function(err){
        if(!err){
            res.send("Succesfully deleted all articles");
        }
        else{
            res.send(err);
        }
    })
});



app.route("/articles/:_Article")

.get(function(req,res){
    Article.findOne({title:req.params._Article}, function(err, result){
        if(!err){
            res.send(result);
        }
        else{
            res.send("There is not the articles matched");
        }
    })
})

.put(function(req,res){
    
    Article.updateOne({title:req.params._Article},{title:req.body.title, content:req.body.content},
        {overwrite:true}, function(err){
        if(!err){
            res.send("Succesfully updated the article");
        }
        else{
            res.send(err);
        }
    })
})

.patch(function(req,res){
    Article.updateOne({title: req.params._Article},{$set:{title: req.body}},
        function(err){
            if(!err){
                res.send("succesfully updated");
            }
            else{
                res.send(err);
            }
        })
})

.delete(function(req,res){
    Article.deleteOne({title:req.params._Article}, function(err){
        if(!err){
            res.send("the articles is deleted successfully");
        }
        else{
            res.send(err);
        }
    })
});


app.listen(3000, function(){
    console.log("Server is started on port 3000");
});
