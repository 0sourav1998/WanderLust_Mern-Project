const express = require("express");
const router = express.Router();

const {
  createListing,
  editListing,
  deleteListing,
  fetchAllListing,
  fetchSpecificListing,
  fetchListingsByUserId,
  addBookmark,
  fetchBookmarkListing,
  removeBookmark
} = require("../controllers/Listing");

router.get("/fetchAllListing", fetchAllListing);
router.post("/createListing", createListing);
router.put("/editListing", editListing);
router.delete("/deleteListing", deleteListing);
router.post("/specificListing", fetchSpecificListing);
router.post("/fetchListingsByUserId", fetchListingsByUserId);
router.post("/addBookmark", addBookmark);
router.post("/fetchBookmarkListing", fetchBookmarkListing);
router.post("/removeBookmark", removeBookmark);

module.exports = router;
