const express = require("express") ;
const router = express.Router();

const {createListing, editListing, deleteListing} = require("../controllers/Listing");

router.post("/createListing",createListing) ;
router.put("/editListing",editListing) ;
router.delete("/deleteListing",deleteListing)

module.exports = router ;