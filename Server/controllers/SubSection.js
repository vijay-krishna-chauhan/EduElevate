const SubSection= require("../models/subSection");
const Section=require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const subSection = require("../models/subSection");

exports.createSubSection=async (req, res)=>{
    try{
        //fetch data from req body
        //const {sectionId, title, timeDuration, description}= req.body;
        const {sectionId, title, description, timeDuration}= req.body;
        //extract file/video 
        const video=req.files?.videoFile; //when i take key as videoFile in postman it executes.
        //const video=req.files?.videoFile;
        //const video=req.files?.video; //and now if i write videoFile as video then there in postmman i have to write key as : video
        //main thing is that what is at end is the key name.

        
        //validation
        if(!sectionId|| !title || !timeDuration || !description || !video){
            return res.status(400).json({
                success:false,
                message:'All details are required1'
            });
        };

        const ifsection= await Section.findById(sectionId);
		if (!ifsection) {
            return res
                .status(404)
                .json({ success: false, message: "Section not found" });
        }

        //upload video to cloudinary
        const uploadDetails=await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
        console.log(uploadDetails);
        //create a subsection
        const newSubsectionDetails= await subSection.create({
            title:title,
            timeDuration:timeDuration,
            description:description,
            videsoUrl:uploadDetails.secure_url
        });

        //update section with this sub section objectid
        const updatedSection=await Section.findByIdAndUpdate({_id:sectionId},
            {
                $push:{
                    subSection:newSubsectionDetails._id,
                }
            },
            {new:true}
        ).populate("subSection").exec();

        // Respond with the updated section
        return res.status(200).json({
            success: true,
            message: 'Subsection created and added to section successfully',
            updatedSection: updatedSection
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'An error occurred while creating the subsection',
            error: error.message
        });
    }
} 

exports.updateSubsection=async (req, res)=>{
    try{
        const {subSectionId, title, timeDuration, description}=req.body;
        if(!subSectionId|| !title || !timeDuration || !description || !video){
            return res.status(400).json({
                success:false,
                message:'All details are required'
            });
        };
        const updatedSubSection=await SubSection.findByIdAndUpdate(
            subSectionId, 
            {
                title:title,
                timeDuration:timeDuration,
                description:description,
                
            },
            {new:true} //return the updated document
        )
        //check if subsection was found and updated
        if(!updatedSubSection){
            return res.status(404).json({
                success:false,
                message:'SUbsection not found',
            });
        };
        //return success response
        return res.status(200).json({
            success: true,
            message: 'Subsection updated successfully',
            updatedSubSection,
        });
    }catch(error){
        return res.status(500).json({
            success:false,
            message:'Error while updating the subsection',
            error:error.message,

        });
    }
};

//delete subsecion
exports.deleteSubsection= async (req, res)=>{
    try{
        const {subSectionId} = req.params;
        if(!subSectionId){
            return res.status(400).json({
                success:false,
                message:'Subsecion id not found'
            });
        }

        await SubSection.findByIdAndDelete({subsectionId});
        return res.status(200).json({
            success:true,
            message:'SubSection deleted successfully',
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Unable to delete Sub-section, please try again',
            error:error.message,
        })
        
    }
}