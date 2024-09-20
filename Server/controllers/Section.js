const Section=require("../models/Section");
const Course= require("../models/Course");

exports.createSection=async (req, res)=>{
    try{
        //data fetch
        const {sectionName, courseId}=req.body;
        //data validation
        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:'Missing Properties',
            });
        }

        //course validation
        const ifcourse= await Course.findById(courseId);
		if (!ifcourse) {
			return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }
        //create section
        const newSection=await Section.create({sectionName});
        //update course with section and objectID
        const updatedCourseDetails=await Course.findByIdAndUpdate(
            courseId,
            {
                $push:{
                    courseContent:newSection._id,
                }
            },
            {new:true},
        ) .populate({
            path: 'courseContent',
            populate: {
                path: 'subSection',
                model: 'subSection'
            }
        }) // Populate sections and their sub-sections
        .exec();
        //use populate to replace section/subsectuion both in the updatedCourseDetails
        //reutn response
        return res.status(200).json({
            success:true,
            message:'Section added Successfully',
            updatedCourseDetails,
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Adding Section failed',
            error:error.message,
        })
    }
}

//update section
exports.updateSection=async (req, res)=>{
    try{

        //data input
        const {sectionName, sectionId}=req.body;
        //data validation
        if(!sectionName || !sectionId){
            return res.status(400).json({
                success:false,
                message:'Missing Properties',
            });
        }
        //update data
        const section=await Section.findByIdAndUpdate(sectionId, {sectionName}, {new:true});

        return res.status(200).json({
            success:true,
            message:'Section Updated Successfully',
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Unable to update section, please try again',
            error:error.message,
        })
    }
};


//deletesection
exports.deleteSection=async (req, res)=>{
    try{
        //get id
        const {sectionId}=req.body;
        //const {sectionId}=req.params; check for it
 
        //findByid and delete
        await Section.findByIdAndDelete({sectionId});
//??todo: Do we need to delete the entry from the course schema??
        return res.status(200).json({
            success:true,
            message:'Section deleted successfully',
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Unable to delete section, please try again',
            error:error.message,
          })
        }
}