//jshint esversion:6
require("dotenv").config(); //it has to be in the top
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
//const encrypt = require("mongoose-encryption"); not using after md5
//const md5 = require("md5"); not using after bcrypt

//const bcrypt = require("bcrypt"); not using after passport-local
//const saltRounds = 10 not using after passport-local

const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));

app.use(session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


mongoose.connect("mongodb://127.0.0.1:27017/userDB");


const userSchema = new mongoose.Schema({
    email: {
        require: true,
        type: String
    },
    password: {
        require: true,
        type: String
    },
    secret:{
        type: Array
    }
});

userSchema.plugin(passportLocalMongoose);

/*for encrypting password */
//const secret = "ThisIsOurLittleSecret.";
//userSchema.plugin(encrypt,{secret:process.env.SECRET, encryptedFields:["password"]}); not using after md5


const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.get("/", function(req,res){
    res.render("home");
});

app.get("/login", function(req, res){
    res.render("login");
});

app.get("/register", function(req,res){
    res.render("register");
});


app.post("/register", function(req,res){
    /*
    bcrypt.hash(req.body.password, saltRounds, function(err,hash){

        const newUser = new User({
            email: req.body.username,
            password: hash
        });
    
        newUser.save(function(err){
            if(err){
                console.log(err);
            }
            else{
                res.render("secrets")
            }
        })

    })
*/
//passport-local-mongoose part

User.register({username:req.body.username}, req.body.password, function(err,user){
    if(err){
        console.log(err);
        res.redirect("/register");
    }
    else{
        passport.authenticate("local")(req, res, function(){
            res.redirect("/secrets")
        })
    }
})
    
})

app.post("/login", function(req,res){
    /*
    const uName = req.body.username
    const password = req.body.password

    User.find({email: uName},function(err, result){
        if(err){
          console.log(err);
        }
        else{
            if(result){
                bcrypt.compare(password, result[0].password, function(err, rez){
                    if(rez == true){
                        res.render("secrets");
                    }
                    else{
                        console.log("Wrong password or e mail");
                    }   
                })
            }
        }
    })
    */
   // passport local

   const user = new User({
    username: req.body.username,
    password: req.body.password 
   });

   req.login(user, function(err){
    if(err){
        console.log(err);
    }
    else{
        passport.authenticate("local")(req, res, function(){
            res.redirect("/secrets");
        })
    }
   })
});

app.get("/secrets", function(req,res){
    User.find({"secret": {$ne: null}}, function(err, foundUser){
        if(err){
            console.log(err);
        }
        else{
            if(foundUser){
                res.render("secrets",{userWithSecrets: foundUser});
            }
        }
    });
})


app.get("/submit",function(req,res){
    if(req.isAuthenticated()){
        res.render("submit");
    }
    else{
        res.redirect("/login");
    }
})

app.post("/submit", function(req,res){
    const submitSecret = req.body.secret;

    console.log(req.user._id)  ;

    User.findById(req.user._id, function(err,foundUser){
        if(err){
            console.log(err);
        }
        else{
            if(foundUser){
                foundUser.secret.push(submitSecret);
                foundUser.save(function(){
                    res.redirect("/secrets");
                });
                
            }
        }

    })
})

app.get("/logout",function(req,res){
    req.logout(function(err){
        if(!err){
            res.redirect("/");
        }
    });
    
})



app.listen(3000, function(){
    console.log("Server is running on server 3000.");
})