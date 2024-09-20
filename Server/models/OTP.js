const mongoose=require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");
const OTPSchema=mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60,
    }
});

//a ffucntion to sendd email
async function sendVerificationEmail(email, otp){
    try{
        const mailResponse=await mailSender(
            email,
            "Verification email from EduElevate", 
            emailTemplate(otp)
        );
        console.log("Email sent successfully", mailResponse);

    }
    catch(error){
        console.log("Error occured in email verification", error);
        throw error;
    }
}

OTPSchema.pre("save", async function(next){
    console.log("New document saved to database");

	// Only send an email when a new document is created
	if (this.isNew) {
		await sendVerificationEmail(this.email, this.otp);
	}
	next();
    //await sendVerificationEmail(this.email, this.otp);
    //next();
    //next() means whene this middleware complete it automatically transferred or calls the next middleware.
});

module.exports=mongoose.model("OTP", OTPSchema); 