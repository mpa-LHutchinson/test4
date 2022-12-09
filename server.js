/*********************************************************************************
* BTI325 – Test 4
* I declare that this test is my own work in accordance with Seneca Academic Policy.
* No part of this test has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Liam Hutchinson Student ID: 184017218 Date: 12/09/2022
*
* Online (Cyclic) URL:
*
********************************************************************************/ 
var express = require("express");
var app = express();
var path = require("path");
var dataService = require("./final");

var HTTP_PORT = process.env.PORT || 8080;

app.get("/", function(req,res){
    res.sendFile(path.join(__dirname, "/finalViews/home.html"));
  });

  app.get("/register", function(req,res){
    res.sendFile(path.join(__dirname, "/finalViews/register.html"));
  });

  app.post("/register", (req,res) =>{
    console.log(req.body);
    dataService.register(req.body)
    .then(() => { res.redirect("/") })
    .catch((err) => { res.json({message: err}) });
  });

  app.get("/signIn", function(req,res){
    res.sendFile(path.join(__dirname, "/finalViews/signIn.html"));
  });

  app.post("/signIn", (req,res)=>{
    dataService.signIn(req.body)
    .then(() => { res.redirect("/") })
    .catch((err) => { res.json({message: err}) });
  });

  app.get("*", function(req,res){
    res.send("Error 404: Page not found.");
  });

  dataService.startDB()
  .then(function(){
   app.listen(HTTP_PORT, function(){
   console.log("app listening on: " + HTTP_PORT)
   });
  }).catch(function(err){
   console.log("unable to start server: " + err);
  });
