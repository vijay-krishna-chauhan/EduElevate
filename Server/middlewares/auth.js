const jwt=require("jsonwebtoken");
require("dotenv").config();
const User=require("../models/User");

//auth- isme token extract hoga
exports.auth=async (req, res, next)=>{
    try{
        //extract token
        const token=req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ","");
        //if token missing
        if(!token){
            return res.status(401).json({
                success:false,
                message: "Token is missing",
            });
        }

        //verify the token
        try{
            const decode=jwt.verify(token, process.env.JWT_SECRET);
            console.log("Token decoded successfully:", decode);
            req.user=decode; //decode is added to user of Auth.js in controllers folder
        }catch(error){

            console.log("Token verification failed:", error.message);
            //verification issue
            return res.status(401).json({
                success:false,
                message:" token is invalid"
            })
        }
        next();

    }catch(error){

    console.log("Error in auth middleware:", error.message);
    return res.status(401).json({
      success: false,
      message: "Something went wrong while validating tokens",
    });
    }
}


//isStudent

exports.isStudent=async (req, res, next)=>{
    try{
        if(req.user.accountType !== "Student"){
            return res.status(401).json({
                success:false,
                message:"This is protected route for Student only",
            })
            
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified, p[lease try again"
        })
    }
}


//isInstructor

exports.isInstructor=async (req, res, next)=>{
    try{
        if(req.user.accountType !== "Instructor"){
            return res.status(401).json({
                success:false,
                message:"This is protected route for Instructor only",
            })
            
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified, please try again"
        })
    }
}

//isAdmin
exports.isAdmin=async (req, res, next)=>{
    try{
        if(req.user.accountType !== "Admin"){
            return res.status(401).json({
                success:false,
                message:"This is protected route for Admin only",
            })
            
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified, please try again"
        })
    }
}
