const mongoose = require("mongoose") ;

const ratingAndReviewSchema = new mongoose.Schema({
    reviews : {
        type : String ,
    },
    rating : {
        type : Number,
    },
    owner : {
        type : mongoose.Schema.ObjectId,
        ref : "User",
        required: true ,
    } ,
    listing : {
        type : mongoose.Schema.ObjectId,
        ref : "Listing" ,
        required :true 
    }
})

module.exports = mongoose.model("RatingAndReview",ratingAndReviewSchema)