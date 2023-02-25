//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
const { functions } = require("lodash");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.connect("mongodb+srv://nishantsingh9412ns:IntmyxPFNinkthjh@cluster0.uelmcqh.mongodb.net/composeDB");


//--------------------------------------- Compose model -------------------
const composeSchema = new mongoose.Schema({
  title:String,
  posts:String
});

const Compose = mongoose.model('compose',composeSchema);

const c1 = new Compose({
    title:"compose 1",
    posts:"Loreum Ipsum"
});

const c2 = new Compose({
  title:"compose 2",
  posts:"Loreum Ipsum Dolor Color"
})


// let posts = [];
const postsArr = [c1,c2];

app.get("/", function(req, res){
  Compose.find({}, function(err,results){
      if(err){
        console.log(err);
      }
      else{
        res.render("home", {
          startingContent: homeStartingContent,
          posts: results
          });
      }

  });
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){


  //   Compose.insertMany(postsArr,function(err){
  //   if(err){
  //     console.log(err);
  //   }else{
  //     console.log("----------------- >>>>   Insertion Done   <<<<<<<<--------------------");
  //     // res.redirect("/");
  //   }
  // });
  res.render("compose");
});

app.post("/compose", function(req, res){
  // const post = {
  //   title: req.body.postTitle,
  //   content: req.body.postBody
  // };
  const compose1 = new Compose({
    title:req.body.postTitle,
    posts:req.body.postBody
  });
  // posts.push(post);
  compose1.save(function(err){
    if(!err){
      res.redirect("/");
    }
  });


  // res.redirect`("/");

});

app.get("/posts/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);

  // posts.forEach(function(post){
  //   const storedTitle = _.lowerCase(post.title);

  //   if (storedTitle === requestedTitle) {
  //     res.render("post", {
  //       title: post.title,
  //       content: post.content
  //     });
  //   }
  // });

  Compose.find({}, function(err,results){
    if(err){
      console.log(err);
    }
    else{
      // console.log(results);
      results.forEach(function(post){
        const storedTitle = _.lowerCase(post.title);
        if(storedTitle === requestedTitle){
          res.render("post",{
            title:post.title,
            content:post.posts
          })
        }
      });
      // res.render("home", {
      //   startingContent: homeStartingContent,
      //   posts: results
      //   });
    }

});


});

let port = process.env.PORT;
if(port == null || port == ""){
  port = 3000;
}

app.listen(port,function(){
  console.log("Server Started Successfully Yipppee !!!!!! " );
});


// app.listen(3000, function() {
//   console.log("Server started on port 3000");
// });
