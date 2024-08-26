const Listing = require("../models/Listing");
const RatingAndReviews = require("../models/RatingAndReviews");
const User = require("../models/User");

exports.createRatingReviews = async(req,res)=>{
    try{
        const {listingId,rating,reviews} = req.body ;
        if(!listingId || !rating || !reviews){
            return res.status(400).json({
                success : true ,
                message : "All fields are required"
            })
        }
        const owner = await User.findOne({listings : listingId})
        const createdRatingsAndReviews = await RatingAndReviews.create({
            rating : rating ,
            reviews : reviews,
            listing : listingId ,
            owner : owner._id
        })
        await Listing.findByIdAndUpdate(listingId,{$push : {ratingReviews : createdRatingsAndReviews._id}},{new:true});
        return res.status(200).json({
            success : true ,
            message : "Rating And Review Created"
        })
    }catch(error){
        console.log(error.message)
    }
}

exports.deleteRatingReviews = async(req,res)=>{
    try{
        const {listingId,ratingReviewId}=req.body;
        if(!listingId || !ratingReviewId){
            return res.status(400).json({
                success: false ,
                message : "All Fields Are Required"
            })
        }
        await RatingAndReviews.findByIdAndDelete(ratingReviewId);
        const ratingAndReviews =  await RatingAndReviews.find({})
        const listing = await Listing.findByIdAndUpdate(listingId,{$pull : {ratingReviews : ratingReviewId}},{new:true});
        return res.status(200).json({
            success : true ,
            message : "Rating and Review Deleted",
            ratingAndReviews
        })
    }catch(error){
        console.error(error.message)
    }
}

exports.editRatingAndReview = async(req,res)=>{
    try{
        const {ratingReviewId,rating,reviews} = req.body;
        const ratingAndReview = await RatingAndReviews.findById(ratingReviewId);
        if(rating){
            ratingAndReview.rating = rating
        }
        if(reviews){
            ratingAndReview.reviews = reviews
        }
        await ratingAndReview.save()
        return res.status(200).json({
            success : true ,
            message : "Rating And Review Updated Successfully",
            ratingAndReview
        })
    }catch(error){
        console.error(error.message)
    }
}

exports.fetchAllReviews = async(req,res)=>{
    try{
        const result = await RatingAndReviews.find({});
        return res.status(200).json({
            success : true ,
            message : "Rating Reviews Fetched" ,
            result
        })
    }catch(error){
        console.error(error.message)
    }
}

exports.fetchReviewForSpecificListing = async(req,res)=>{
    try{
        const {listingId} = req.body ;
        console.log(listingId)
        const response = await RatingAndReviews.find({ listing : listingId});
        console.log("RESPONSE",response)
        return res.status(200).json({
            success : true ,
            message : "Reviews Fetched Successfully",
            response
        })
    }catch(error){
        console.error(error.message)
    }
}