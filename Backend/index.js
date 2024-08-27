const express = require("express");
const app =express() ;
require("dotenv").config();
const {connectToDB} = require("./config/DbConfig")
const userRouter = require("./routes/User")
const {cloudinaryConfig} = require("./config/CloudinaryConfig")
const listingRouter = require("./routes/listing")
const fileUpload = require("express-fileupload")
const ratingReviewRouter = require("./routes/ratingAndReview")
const cors = require("cors")

const PORT = process.env.PORT || 4000 ;

connectToDB();
cloudinaryConfig().then(()=>console.log("Cloudinary Connected Successfully"))

app.use(express.json({limit : "10mb"}))
app.use(express.urlencoded({ extended: true }));

app.use(cors({
	origin : "*"
}))

app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",
	})
)

app.use("/auth",userRouter)
app.use("/listing",listingRouter)
app.use("/ratingAndReview",ratingReviewRouter)

app.listen(PORT,()=>{
    console.log(`App is Listening to PORT : ${PORT}`)
})

