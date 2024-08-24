const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
    name : {
        type : String ,
        required : true
    } ,
    description : {
        type : String ,
        required : true ,
    } ,
    price : {
        type :String ,
        required : true ,
    } ,
    image : {
        type : String ,
        required : true
    },
    location : {
        type : String,
        required : true
    } ,
    owner : {
        type : mongoose.Schema.ObjectId,
        ref : "User"
    },
    country : {
        type: String
    },
    ratingReviews : [{
        type : mongoose.Schema.ObjectId,
        ref : "RatingAndReviews"
    }]
})

module.exports = mongoose.model("Listing",listingSchema)