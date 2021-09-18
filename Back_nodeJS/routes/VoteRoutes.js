const mongoose = require("mongoose");
const express = require("express");
var router = express.Router();

// Vote model
let Vote = require("../models/vote.js");

// Sujet model
let Sujet = require("../models/sujet.js");

// ADD Vote
router.post("/", (req, res) => {
  
 
    let newVote = new Vote({   
      votedBy : req.body.votedBy,
      sujet: req.body.sujet,
      choix: req.body.choix,
      Date: Date.now(),
    });
    console.log(newVote);

    
    newVote
      .save()
      .then((result) => {
          console.log(result.sujet);
          Sujet.findById(result.sujet)
          .then((resultSujet) => {
            let updatedSujet = new Sujet({   
              _id: resultSujet._id,
                createdBy : resultSujet.createdBy,
                titre : resultSujet.titre,
                description : resultSujet.description,
                choixOui : resultSujet.choixOui,
                choixNon : resultSujet.choixNon,
              });
              if (newVote.choix === 1) {
                updatedSujet.choixOui = updatedSujet.choixOui + 1;
            }
            if (newVote.choix === 0) {
                updatedSujet.choixNon = updatedSujet.choixNon + 1;
            }
            
            Sujet.findOneAndUpdate({ _id: resultSujet._id }, updatedSujet, {
                context: "query",
              })
              .then(() =>{
                res.json({
                    success: true,
                    msg: `Vote Successfully added!`,
                    result: {
                      _id: result._id,
                      votedBy: result.votedBy,
                      sujet: result.sujet,
                      choix: result.choix,
                      Date: result.Date,
                
          
                    },
                  });
              })
          })
        
      })
      .catch((err) => {
         
          res
            .status(500)
            .json({ success: false, msg: `Something went wrong. ${err}` });
        
      });
  });


  router.get("/", (req, res) => {
    Vote.find({})
      .populate("votedBy")
      .populate("sujet")
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res
          .status(500)
          .json({ success: false, msg: `Something went wrong. ${err}` });
      });
  });


  router.get("/checkVote/:id", (req, res) => {
    let numberOfVote = 0;
    Vote.find({ votedBy : req.params.id})
      .then((result) => {
        for (let i = 0; i < result.length; i++) {
          if( i !== result.length - 1 )
          {
            const d1 = result[i].date;
            const d2 = result[i+1].date;
           if(d1.getFullYear() === d2.getFullYear() &&
           d1.getMonth() === d2.getMonth() &&
           d1.getDate() === d2.getDate())
           {
            numberOfVote ++;
           
           }
          
          }
         
          
        }
        res.json(numberOfVote);
      })
      .catch((err) => {
        res
          .status(500)
          .json({ success: false, msg: `Something went wrong. ${err}` });
      });
  });


  module.exports = router;