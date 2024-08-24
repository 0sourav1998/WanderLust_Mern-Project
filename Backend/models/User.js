const mongoose = require("mongoose") ;

const userSchema = new mongoose.Schema({
    email : {
        type : String ,
        required :true ,
    },
    password : {
        type : String ,
        required : true
    },
    listings : [{
        type : mongoose.Schema.ObjectId,
        ref : "Listing"
    }]
})

module.exports = mongoose.model("User",userSchema)