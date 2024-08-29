const { cloudinaryUpload } = require("../utils/cloudinaryUpload");
require("dotenv").config();
const Listing = require("../models/Listing");
const RatingAndReviewss = require("../models/RatingAndReviews");
const User = require("../models/User");

exports.createListing = async (req, res) => {
  try {
    const { name, description, price, location, owner, country } = req.body;
    const file = req.files ? req.files.file : null;
    const user = await User.findOne({ _id: owner });
    if (!owner) {
      return res.status(404).json({
        success: false,
        message: "Owner For the posting does not found or exists",
      });
    }
    const result = await cloudinaryUpload(file, process.env.CLOUD_FOLDER);
    const createdListing = await Listing.create({
      name,
      description,
      price,
      location,
      owner,
      country,
      image: result.secure_url,
    });
    await User.findByIdAndUpdate(user._id, {
      $push: { listings: createdListing._id },
    });
    return res.status(200).json({
      success: true,
      message: "Listing Created",
      createdListing,
    });
  } catch (error) {
    console.error(error.message);
  }
};

exports.editListing = async (req, res) => {
  try {
    const { listingId, name, description, price, location, country } = req.body;
    console.log(req.files)
    const file = req.files ? req.files.file : null;
    if(!listingId){
      return res.status(400).json({
        success : false ,
        message : "This field is required"
      })
    }
    const listing = await Listing.findById(listingId);
    if (name) {
      listing.name = name;
    }
    if (description) {
      listing.description = description;
    }
    if (price) {
      listing.price = price;
    }
    if (location) {
      listing.location = location;
    }
    if (price) {
      listing.country = country;
    }
    if(file){
      const res = await cloudinaryUpload(file,process.env.CLOUD_FOLDER);
      console.log(res)
      listing.image = res.secure_url ;
    }
    await listing.save();
    return res.status(200).json({
      success: true,
      message: "Listing Updated Successfully",
      listing,
    });
  } catch (error) {
    console.error(error.message);
  }
};

exports.deleteListing = async (req, res) => {
  try {
    const { listingId, userId } = req.body;
    if(!listingId || !userId){
      return res.status(400).json({
        suucees : false ,
        message : "All fileds are required"
      })
    }
    await Listing.findByIdAndDelete(listingId);
    await RatingAndReviewss.deleteMany({listing : listingId})
    const listings = await Listing.findById(listingId)
    await User.findByIdAndUpdate(userId, { $pull: { listings: listingId } } , {new : true});
    return res.status(200).json({
      success: true,
      message: "Listing Deleted",
      listings
    });
  } catch (error) {
    console.error(error.message);
  }
};

exports.fetchAllListing = async (req, res) => {
  try {
    const allListings = await Listing.find({});
    return res.status(200).json({
      success: true,
      message: "All Listings Fetched Successfully",
      allListings,
    });
  } catch (error) {
    console.error(error.message);
  }
};

exports.fetchSpecificListing = async (req, res) => {
  try {
    const { listingId } = req.body;
    const listing = await Listing.findById(listingId);
    return res.status(200).json({
      success: true,
      message: "Listing Fetched",
      listing,
    });
  } catch (error) {
    console.error(error.message);
  }
};

exports.fetchListingsByUserId = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.find({ _id: userId })
      .select("listings")
      .populate("listings");
    return res.status(200).json({
      success: true,
      message: "Listings Fetched",
      user,
    });
  } catch (error) {
    console.error(error.message);
  }
};

exports.addBookmark = async (req, res) => {
  try {
    const { userId, listingId } = req.body;
    if (!userId || !listingId) {
      return res.status(400).json({
        success: false,
        message: "All Fileds Are Required",
      });
    }
    const alreadyBookmarked = await User.findOne({
      bookmarkedListings: listingId,
    });
    if (alreadyBookmarked) {
      return res.status(400).json({
        success: false,
        message: "Listing Already Bookmarked",
      });
    }
    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { bookmarkedListings: listingId } },
      { new: true }
    )
      .select("bookmarkedListings")
      .populate("bookmarkedListings");
    return res.status(200).json({
      success: true,
      message: "Bookmark Added",
      user,
    });
  } catch (error) {
    console.error(error.message);
  }
};

exports.fetchBookmarkListing = async(req,res)=>{
    try{
    const {userId} = req.body ;
    const user = await User.findById(userId).select("bookmarkedListings").populate("bookmarkedListings") ;
    if(!user){
        return res.status(404).json({
            success : false ,
            message : "User Not Found"
        })
    }
    
    return res.status(200).json({
        success : true ,
        message : "Fetched Successfully",
        user
    })
    }catch(error){
        console.error(error.message)
    }
}

exports.removeBookmark = async(req,res)=>{
    try{
        const {userId,listingId} = req.body ;
        const user = await User.findByIdAndUpdate(userId,{$pull : {bookmarkedListings : listingId}},{new: true});
        if(!user){
            return res.status(404).json({
                success : false ,
                message : "User Not Found"
            })
        }
        console.log(user)
        return res.status(200).json({
            success : true ,
            message : "Bookmark Removed",
            user
        })
    }catch(error){
        console.error(error.message)
    }
}

