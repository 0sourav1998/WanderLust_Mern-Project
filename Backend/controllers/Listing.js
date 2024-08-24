const {cloudinaryUpload} =  require("../utils/cloudinaryUpload")
require("dotenv").config();
const Listing = require("../models/Listing");
const RatingAndReviewss = require("../models/RatingAndReviews");
const User = require("../models/User");

exports.createListing = async(req,res)=>{
    try{
        const {name , description ,price ,location , owner , country} = req.body ;
        const file = req.files.file ;
        const user = await User.findOne({_id : owner});
        if(!owner){
            return res.status(404).json({
                success : false ,
                message : "Owner For the posting does not found or exists"
            })
        }
        const result = await cloudinaryUpload(file,process.env.CLOUD_FOLDER);
        const createdListing = await Listing.create({
            name ,
            description,
            price ,
            location ,
            owner ,
            country ,
            image : result.secure_url
        })
        console.log("User............................",user);
        await User.findByIdAndUpdate(user._id,{$push : {listings : createdListing._id}})
        return res.status(200).json({
            success : true ,
            message : "Listing Created",
            createdListing
        })
    }catch(error){
        console.error(error.message)
    }
}

exports.editListing = async(req,res)=>{
    try{
        const {listingId , name , description ,price ,location , country} = req.body ;
        const listing = await Listing.findById(listingId) ;
        if(name){
            listing.name = name ;
        }
        if(description){
            listing.description = description ;
        }
        if(price){
            listing.price = price ;
        }
        if(location){
            listing.location = location ;
        }
        if(price){
            listing.country = country ;
        }
        await listing.save();
        return res.status(200).json({
            success : true ,
            message : "Listing Updated Successfully",
            listing
        })
    }catch(error){
        console.error(error.message)
    }
}

exports.deleteListing = async(req,res)=>{
    try{
        const {listingId,userId} = req.body;
        const listing = await Listing.findByIdAndDelete(listingId);
        await User.findByIdAndUpdate(userId,{$pull : {listings : listingId}})
        return res.status(200).json({
            success : true ,
            message : "Listing Deleted",
            listing
        })
    }catch(error){
        cnsole.error(error.message)
    }
}

exports.fetchAllListing = async(req,res)=>{
    try{
        const allListings = await Listing.find({});
        return res.status(200).json({
            success : true ,
            message : "All Listings Fetched Successfully" ,
            allListings
        })
    }catch(error){
        console.error(error.message)
    }
}

exports.fetchSpecificListing = async(req,res)=>{
    try{
        const {listingId} = req.body;
        const listing = await Listing.findById(listingId);
        return res.status(200).json({
            success : true ,
            message : "Listing Fetched",
            listing
        })
    }catch(error){
        console.error(error.message)
    }
}