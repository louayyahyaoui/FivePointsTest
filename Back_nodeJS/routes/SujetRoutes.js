const mongoose = require("mongoose");
const express = require("express");
var router = express.Router();

// Sujet model
let Sujet = require("../models/sujet.js");

// ADD SUJET
router.post("/", (req, res) => {
  
    console.log(req.body);
    let newSujet = new Sujet({   
      createdBy : req.body.createdBy,
      titre: req.body.titre,
      description: req.body.description,
      choixOui: 0,
      choixNon: 0,
    });
    console.log(newSujet);

    
    newSujet
      .save()
      .then((result) => {
        res.json({
          success: true,
          msg: `Sujet Successfully added!`,
          result: {
            _id: result._id,
            createdBy: result.createdBy,
            titre: result.titre,
            description: result.description,
            choixOui: result.choixOui,
            choixNon: result.choixNon,

          },
        });
      })
      .catch((err) => {
         
          res
            .status(500)
            .json({ success: false, msg: `Something went wrong. ${err}` });
        
      });
  });


  router.get("/", (req, res) => {
    Sujet.find({})
      .populate("createdBy")
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res
          .status(500)
          .json({ success: false, msg: `Something went wrong. ${err}` });
      });
  });


  


  module.exports = router;