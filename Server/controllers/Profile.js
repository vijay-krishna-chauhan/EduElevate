const Profile=require("../models/Profile");
const User=require("../models/User");
const Course = require("../models/Course");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
exports.updateProfile=async (req, res)=>{
    try{
        //get data
        const {dateOfBirth="", about="", contactNumber, gender}=req.body;
        //get userID
        const userId=req.user.id;
        //validation
        if(!contactNumber || !gender || !userId){
            return res.status(404).json({
                success:false,
                message:'All field are required'
            });
        }
        //ufind profile
        const userDetails= await User.findById(userId);
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // const profileId=userDetails.additionalDetails;
        // //const profileId=await userDetails.additionalDetails;
        // const profileDetails=await Profile.findById(profileId);

        // Check if the user has a profile
        let profileDetails;
        if (userDetails.additionalDetails) {
            // If profile exists, fetch it
            profileDetails = await Profile.findById(userDetails.additionalDetails);
        } else {
            // If profile does not exist, create a new one
            profileDetails = new Profile();
            userDetails.additionalDetails = profileDetails._id;
            await userDetails.save();
        }

        if (!profileDetails) {
            return res.status(404).json({
                success: false,
                message: 'Profile not found'
            });
        }

        //update profile
        // profileDetails.dateOfBirth=dateOfBirth || profileDetails.dateOfBirth;
        // profileDetails.about=about;
        // profileDetails.contactNumber=contactNumber;
        // profileDetails.gender=gender;
        profileDetails.dateOfBirth = dateOfBirth || profileDetails.dateOfBirth;
        profileDetails.about = about;
        profileDetails.contactNumber = contactNumber;
        profileDetails.gender = gender;
        await profileDetails.save();
        
        //it is the another way to update profile. it is used because we already had created a profile in another file and null data is assigned to it. so we have to enter the data and save in the db.

        //return res
        return res.status(200).json({
            success:true,
            message:'Profile is updated successfully',
            profileDetails,
			userDetails
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Profile is not updated, please try again',
            error:error.message,
        });
    }
};

exports.deleteProfile=async (req, res)=>{
    try{
        //get id
        const profileId=req.user.id;
        //validation
        const userDetails=await User.findById({_id: profileId});
        //const userDetails=await User.findById(profileId);
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:'User not found'
            });
        }
        //delete profile
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});
        //delete user
        await User.findByIdAndDelete({_id:profileId});
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Profile cannot be deleted, please try again',
            error:error.message,
        });
    }
}


exports.getAllUserDetails= async (req, res) =>{
    try{
        const id= req.user.id;
        const userDetails=await User.findById(id).populate("additionalDetails").exec();
        return res.status(200).json({
            success:true,
            message:"User data fetched successfully",
            userDetails,
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'User data cannot be fetched',
            error:error.message,
        });
    }
}


//update display picture
exports.updateDisplayPicture = async (req, res) => {
	try {

		const id = req.user.id;
	const user = await User.findById(id);
	if (!user) {
		return res.status(404).json({
            success: false,
            message: "User not found",
        });
	}
	const image = req.files.pfp;
	if (!image) {
		return res.status(404).json({
            success: false,
            message: "Image not found",
        });
    }
	const uploadDetails = await uploadImageToCloudinary(
		image,
		process.env.FOLDER_NAME
	);
	console.log(uploadDetails);

	const updatedImage = await User.findByIdAndUpdate({_id:id},{image:uploadDetails.secure_url},{ new: true });

    res.status(200).json({
        success: true,
        message: "Image updated successfully",
        data: updatedImage,
    });
		
	} catch (error) {
		return res.status(500).json({
            success: false,
            message: error.message,
        });
		
	}



}