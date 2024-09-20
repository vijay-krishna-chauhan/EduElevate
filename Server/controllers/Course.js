const Category = require("../models/Category");
const Course=require("../models/Course");
const Tag=require("../models/Tag");
const User=require("../models/User");

const {uploadImageToCloudinary}=require("../utils/imageUploader");

//create  course handler
exports.createCourse= async (req, res) => {
    try{
        //ftech data
        const {courseName, courseDescription, whatWillYouLearn, price, tag, category}=req.body;
        //here tag is id whic can be seen in models
        //get thumbnail
        const thumbnail=req.files.thumbnailImage;

        //validation
        if(!courseName || !courseDescription || !whatWillYouLearn || !price || !tag || !category){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            });
        }

        //check for instructor
        const userId=req.user.id;
        const instructorDetails=await User.findById(userId);
        console.log("Instructor Details: ",instructorDetails);

        if(!instructorDetails){
            return res.status(404).json({
                success:false,
                message:"Intructor Details not found",
            })
        }

        //check whether the tag is valid or not
        const categoryDetails=await Category.findById(category);
        if(!categoryDetails){
            return res.status(404).json({
                success:false,
                message:"category Details not found",
            });
        }

        //uplod image to clloudinary
        const thumbnailImage=await uploadImageToCloudinary(
            thumbnail,
            process.env.FOLDER_NAME
        );
        console.log(thumbnailImage);
        //create an entry for new course
        const newCourse= await Course.create({
            courseName,
            courseDescription,
            instructor:instructorDetails._id,
            whatWillYouLearn,
            price,
            tag:tag,
            category: categoryDetails._id,
            thumbnail:thumbnailImage.secure_url,
        })

        //add the new course to the user schema of instructor
        await User.findByIdAndUpdate(
            {_id: instructorDetails._id},
            {
                $push:{
                    courses:newCourse._id,
                }
            },
            {new:true},
        );

        //update the tag ka schema

        // Add the new course to the Categories
		await Category.findByIdAndUpdate(
			{ _id: category },
			{
				$push: {
					course: newCourse._id,
				},
			},
			{ new: true }
		);


        //return response
        return res.status(200).json({
            success: true,
			data: newCourse,
			message: "Course Created Successfully",
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Failed to create course',
            error:error.message,
        })

    }
}


//get all cources handlerfunction
exports.getAllCourses= async (req, res)=>{
    try{
        const allCourses= await Course.find({}, {courseName:true,
            price:true,
            thumbnail:true,
            instructor:true,
            ratingAndReviews:true,
            studentsEnrolled:true,
        })
        .populate("instructor")
        .exec();
        
        return res.status(200).json({
            success:true,
            message:'Data for all the courses is fetched successfully',
            details: allCourses,
        })

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Failed to fetch course data',
            error:error.message,
        })

    }
}

//getCourseDetails
exports.getCourseDetails = async (req, res)=>{
    try{
        //get id
        const {courseId}=req.body;
        //find coures details
        const courseDetails = await Course.find(
            {_id:courseId}
        )
        .populate({
            path:"instructor",
            populate:{
                path:"additionalDetails",
            }
        })
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
            path:"courseContent",
            populate:{
                path:"subSection",
             }
        })
        .exec();

        //validation
        if(!courseDetails){
            return res.status(400).json({
                success:false,
                message:`Could not find the course with ${courseId}`,
            })
        }
        return res.status(200).json({
            success:true,
            message:"Course Details fetched successfully",
            data:courseDetails,
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}