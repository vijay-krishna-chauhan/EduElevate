const Tag=require("../models/Tag");

exports.Tag=async (req, res) => {
    try{
        //fetch data
        const {name, description}=req.body;
        //validation
        if(!name || !description){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            });
        }

        //create entry in db
        const tagDetails= await Tag.create({
            name:name,
            description:description,
        })
        console.log(tagDetails);

        //return response
        return res.status(200).json({
            success:true,
            message:'Tag created successfully'
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Error in adding tags"
        })
    }
}

//getAllRags handler fuction

exports.showAllTags=async (req, res)=>{
    try{
        //const {name}=req.body;

        const allTags=await Tag.find({},{name:true, description:true});
        //means we don't have any condtion. show me all the tags which has namwe and description
        res.status(200).json({
            success:true,
            message:"All tags returned successfully",
            allTags,
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Error while showing all tags"
        })
    }
}