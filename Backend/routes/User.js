const express = require("express") ;
const router = express.Router();

const {signup,login, uploadImage} = require("../controllers/User");

router.post("/signup",signup) ;
router.post("/login",login) ;
router.post("/uploadImage",uploadImage)

module.exports = router ;