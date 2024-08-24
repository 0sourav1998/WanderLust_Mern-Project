const express = require("express") ;
const router = express.Router();

const {createRatingReviews , deleteRatingReviews , editRatingAndReview} = require("../controllers/RatingAndReview");

router.post("/create",createRatingReviews) ;
router.put("/edit",editRatingAndReview) ;
router.delete("/delete",deleteRatingReviews)

module.exports = router ;