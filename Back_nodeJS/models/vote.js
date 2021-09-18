const mongoose = require('mongoose');


const VoteSchema = mongoose.Schema({

    votedBy :{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    sujet : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Sujet'
    },
    choix : {
        type : Number,
    },
    date: { 
        type: Date, 
        default: Date.now() 
    },

})
module.exports = mongoose.model('Vote', VoteSchema);
