const mongoose = require("mongoose");
const express = require("express");
var router = express.Router();

// User model
let User = require("../models/user.js");

// REGISTER
router.post("/register", (req, res) => {
  
    console.log(req.body);
    let newUser = new User({   
      fullName: req.body.fullName,
      email: req.body.email,
      password: req.body.password,
    });
    console.log(newUser);

    
    newUser
      .save()
      .then((result) => {
        res.json({
          success: true,
          msg: `User Successfully registred!`,
          result: {
            _id: result._id,
            fullName: result.fullName,
            email: result.email,
            password: result.password,
          },
        });
      })
      .catch((err) => {
         
          res
            .status(500)
            .json({ success: false, msg: `Something went wrong. ${err}` });
        
      });
  });


  // LOGIN
router.post("/login", (req, res) => {
  console.log(req.body);
   const email = req.body.email;
   const password = req.body.password;
 

   User.findOne({ email: email })
 
      .then((result) => {

          if (result.password == password) {
              
            res.json({
                success: true,
                msg: `User Successfully logined!`,
                result: {
                  _id: result._id,
                  fullName: result.fullName,
                  email: result.email,
                  password: result.password,
                },
              });
          }
          else {
            res.json({
                success: false,
                msg: `Check your password and try again!`,
                result:null,
              });
          }
        
      })
      .catch((err) => {
         
          res
            .status(500)
            .json({ success: false, msg: `Something went wrong. ${err}` });
        
      });
  });

  module.exports = router;