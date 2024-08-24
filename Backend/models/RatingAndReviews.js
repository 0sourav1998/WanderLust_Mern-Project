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
        ref : "User"
    } ,
    listing : {
        type : mongoose.Schema.ObjectId,
        ref : "Listing"
    }
})

module.exports = mongoose.model("RatingAndReview",ratingAndReviewSchema)