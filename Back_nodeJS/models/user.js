const mongoose = require("mongoose");

var UserSchema =new mongoose.Schema({
    fullName : {
        type : String,
    },
    email : {
        type : String,
    },
    password : {
        type : String,
    },
});


module.exports =  mongoose.model('User', UserSchema)

