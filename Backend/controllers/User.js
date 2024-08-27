const User = require("../models/User")
const bcrypt = require("bcryptjs") ;
const jwt = require("jsonwebtoken");
const { cloudinaryUpload } = require("../utils/cloudinaryUpload");
require("dotenv").config()

exports.signup = async(req,res)=>{
    try{
        const {email,password,confirmPassword} = req.body ;
        if(!email || !password || !confirmPassword){
            return res.status(400).json({
                success : false ,
                message : "All Fields are required"
            })
        }
        if(password !== confirmPassword){
            return res.status(400).json({
                success : false ,
                message : "Password And Confirm Password Does Not Match"
            })
        }
        const hashedPassword = await bcrypt.hash(password,10);
        await User.create({
            email : email ,
            password :hashedPassword
        })
        return res.status(200).json({
            success : true ,
            message : "User Created Successfully"
        })
    }catch(error){
        console.error(error.message)
    }
}

exports.login = async(req,res)=>{
    try{
        const {email,password} = req.body;
        console.log(email,password)
        if(!email || !password){
            return res.status(400).json({
                success : false ,
                message : "All Fields are required"
            })
        }
        const user = await User.findOne({email : email});
        if(!user){
            return res.status(400).json({
                success : false ,
                message : "User Not Exists"
            })
        }
        if(await bcrypt.compare(password,user.password)){
            const payload = {
                id : user._id ,
                email : user.email
            }
            const token = jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn : "2h"
            })

            const options = {
                expires : new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly : true
            } 
            return res.cookie("token",token,options).status(200).json({
                success : true ,
                message : "Logged In Successfully",
                token ,
                user,
            })
        }else{
            return res.status(400).json({
                success : false ,
                messsage : "Password Does Not Match"
            })
        }
    }catch(error){
        console.log(error.message)
    }
}

exports.uploadImage = async(req,res)=>{
    try{
        console.log("One")
        console.log(req.files)
        const {File} = req.files; 
        const {userId} = req.body ;
        console.log(File)
        const user = await User.findById(userId);
        console.log(user)
        if(!user){
            return res.status(404).json({
                success : false ,
                message : "User not found"
            })
        }
        const result = await cloudinaryUpload(File,process.env.CLOUD_FOLDER);
        user.image = result.secure_url;
        await user.save() ;
        return res.status(200).json({
            success : true ,
            message : "Image Uploaded" ,
            image : user.image
        })
    }catch(error){
        console.error(error.message)
    }
}