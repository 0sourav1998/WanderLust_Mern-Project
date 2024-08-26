const express = require("express") ;
const router = express.Router();

const {createRatingReviews , deleteRatingReviews , editRatingAndReview, fetchAllReviews, fetchReviewForSpecificListing} = require("../controllers/RatingAndReview");

router.post("/create",createRatingReviews) ;
router.put("/edit",editRatingAndReview) ;
router.delete("/delete",deleteRatingReviews)
router.get("/fetchAllReviews",fetchAllReviews)
router.post("/specificreview",fetchReviewForSpecificListing)

module.exports = router ;