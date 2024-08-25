const express = require("express") ;
const router = express.Router();

const {createListing, editListing, deleteListing, fetchAllListing} = require("../controllers/Listing");

router.get("/fetchAllListing",fetchAllListing)
router.post("/createListing",createListing) ;
router.put("/editListing",editListing) ;
router.delete("/deleteListing",deleteListing)

module.exports = router ;