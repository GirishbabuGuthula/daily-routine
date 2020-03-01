//jshint esversion:6
alert("if you want to compose your daily routine add /compose at the end of the url in the top")
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ =require("lodash");

const homeStartingContent = "This is a web page that lets you keep track of your daily routines.";
const aboutContent = "My Name is Girish babu.I'm passionate about web development and android development";
const contactContent = "Follow me here";

const app = express();

let posts=[];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  res.render("home",{startingContent:homeStartingContent,posts:posts});
});

app.get("/about",function(req,res){
  res.render("about",{about:aboutContent});
});

app.get("/contact",function(req,res){
  res.render("contact",{contact:contactContent});
});

app.get("/compose",function(req,res){
  res.render("compose");
});

app.post("/compose",function(req,res){
  const post={
    title:req.body.postContent,
    content:req.body.postBody
  };
  posts.push(post);
  res.redirect("/");
});

app.get("/posts/:postId",function(req,res){
  const requestedTitle=_.lowerCase(req.params.postId);
  posts.forEach(function(post){
    var storedTitle=_.lowerCase(post.title);
    if(requestedTitle===storedTitle){
        res.render("post",{title:post.title,content:post.content});
    }
  });
  
});


app.listen(process.env.PORT||3000, function() {
  console.log("Server started on port 3000");
});
