const User = require("../models/User");
const bcrypt=require("bcrypt");
const mailSender = require("../utils/mailSender");
const crypto = require("crypto");
//resetPasswrod Token
exports.resetPasswordToken = async (req, res) => {
  try {
    //get email from req body
    const email = req.body.email;

    //check user for this email
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.json({
        success: false,
        message:  `This Email: ${email} is not Registered With Us Enter a Valid Email `,
      });
    }
    //generate token
    //const token = crypto.randomUUID();
    const token = crypto.randomBytes(20).toString("hex");
    //update user by adding token and expiration time
    const updatedDetails = await User.findOneAndUpdate(
      {
        email: email,
      },
      {
        token: token,
        resetPasswordExpires: Date.now() + 5 * 60 * 1000,
      },
      {
        new: true,
      }
    );

    //console.log("DETAILS", updatedDetails);
    // { email: email }: This is the filter to find the document where the email field matches the specified email.
    // { token: token, resetPasswordExpires: Date.now() + 5 * 60 * 1000 }: This is the update object specifying the fields to be updated (token and resetPasswordExpires).
    // { new: true }: This option specifies that the method should return the updated document.
    // So, with new: true, if a document is found and updated, updatedDetails will contain the updated version of the document. Without new: true, it would return the original document before the update.

    //create url
    const url = `http://localhost:3000/update-password/${token}`;

    //const url = `https://studynotion.fun/update-password/${token}`;

    //send mail containing the url
    await mailSender(
      email,
      "Password Reset Link",
      `Your Link for email verification is ${url}. Please click this url to reset your password.`
    );
    //reutn response
    return res.json({
      success: true,
      message:
        "Email sent successfully, please check email and change password",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "error while sending password reset link.",
    });
  }
};

//reset password

exports.resetPassword=async (req, res)=>{
    try{
    //data fetch
    const {password, confirmPassword, token}=req.body;

    //validation
    if(password !==confirmPassword){
        return res.json({
            success:false,
            messagee:"Password and ConfirmPassword not matching"
        });
    }
    //get usredetails from db using token
    const userDetails=await User.findOne({token:token});
    //if no response - invalid token
    if(!userDetails){
        return res.json({
            success:false,
            message:"token is invalid",
        });
    }
    //token time check
    if(userDetails.resetPasswordExpires > Date.now()){
        return res.json({
            success:false,
            message:"Token is expired, please regenerate a token"
        });
    }
    //hash pwd
const hashedPassword=await bcrypt.hash(password, 10);
    //passwordupdate
    await User.findOneAndUpdate(
        {token:token},
        {password:hashedPassword},
        {new:true},
    )
    ///return response
    return res.status(200).json({
        success:true,
        message:"password reset successful"
    })
}catch(error){
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "error while reseting the password.",
    });
}
}