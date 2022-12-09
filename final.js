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
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
var User;

var finalUsers = new Schema({

    "email": {
        type: String,
        unique: true
    },
    "password": String

})

exports.startDB = function(){
    return new Promise(function(resolve, reject){
        var tempConnection = mongoose.createConnection("mongodb+srv://liamhutch:fatratcat@btiassignment6.cbrbjgz.mongodb.net/test")
        User = mongoose.model("finalUsers", finalUsers)
        resolve("initialize success!")

    });
}

exports.register = function(userData){
    return new Promise(function(resolve, reject){
        console.log("register called");
        console.log(userData.email);
        console.log(userData.password);

        if (userData.password == "" || userData.email == "" || userData.password.trim() == "" || userData.email.trim() == ""){
            reject("Error: user name cannot be empty or only white spaces!");
        }
        else{
            let newUser = new User(userData);
            console.log("created new user");

            bcrypt.hash((newUser.password, 10).then(hash=>{
                newUser.password = hash;
                newUser.save().then(()=>{
                    resolve(newUser);
                }).catch(err=>{
                    if(err.code == 11000){
                        reject("User Name already taken");
                    }
                    else{
                        reject("There was an error creating the user: " + err);
                    }
                });
            }).catch(err=>{
                reject("There was an error encrypting the password");
            }));
                

            
        }
    });
}

exports.signIn = function(userData){
    return new Promise(function(resolve, reject){
        User.findOne({ email: userData.email })
        .exec()
        .then((foundUser) => {
            if(!foundUser){
                reject("Unable to find user: " + userData.email);
            }
            else{

                bcrypt.compare(userData.password, foundUser.password).then((res) => {
                    if(!res){
                        reject("Incorrect Password for user: " + userData.email);
                    }
                    else{
                        resolve(foundUser);
                    }
                });
                
            }
        })
        .catch(err=>{
            reject("Unable to find user: " + userData.email);
        })
    });
}