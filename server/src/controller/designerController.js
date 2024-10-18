const designerModel = require("../model/designersModel");

const addDesigner = async(req,res)=>{
try {
    const{name,email,description,address,avatar,gender,status,fbLink,twitterLink,instagramLink,youtubeLink}=req.body;

    const designerExist = await designerModel.findOne({email})

    if(designerExist){
        return res.status(409).json({success:false,message:'This designer email already registered.'})
    }

     await designerModel.create({name,email,description,address,avatar,gender,status,fbLink,twitterLink,instagramLink,youtubeLink})
    
    return res.status(201).json({success:true,message:"Designer created successful."})

} catch (error) {
    return res
    .status(500)
    .json({success:false,
        message:"Internal Server Error",
        error:error.message})
    
}
}
const getDesignerById =async (req,res)=>{
    try {
    const {id} = req.params;

    const designerExist = await designerModel.findOne({_id:id})

    if(designerExist){
        return res.status(404).json({success:false,message:'Designer not found'})
    }

    return res.status(200).json({success:true,message:"Designer return.",designerExist})

    } catch (error) {
        return res
        .status(500)
        .json({success:false,
            message:"Internal Server Error",
            error:error.message})
        
    }
}
const getDesigners = async(req,res)=>{
    try {
    const designers = await designerModel.find()

    if(!designers){
        return res.status(404).json({success:false,message:'Designers not found'})
    }

    return res.status(200).json({success:true,message:"Designers return.",designers})

    } catch (error) {
        return res
        .status(500)
        .json({success:false,
            message:"Internal Server Error",
            error:error.message})
        
    }
}
const updateDesigner = async(req,res)=>{
    try {
     const {id}=req.params;
     const updateDesigner = await designerModel.findByIdAndUpdate({_id:id},{
        $set:{
            name:req.body.name,
            email:req.body.email,
            description:req.body.description,
            address:req.body.address,
            avatar:req.body.avatar,
            gender:req.body.gender,
            status:req.body.status,
            fbLink:req.body.fbLink,
            twitterLink:req.body.twitterLink,
            instagramLink:req.body.instagramLink,
            youtubeLink:req.body.youtubeLink
        }
     },{new:true})

     return res.status(202).json({success:true,message:"Designers update successful.",updateDesigner})

    } catch (error) {
        return res
        .status(500)
        .json({success:false,
            message:"Internal Server Error",
            error:error.message})
        
    }
}
const deleteDesigner = async(req,res)=>{
    try {
        const {id}=req.params;
        await designerModel.findByIdAndDelete({_id:id})

        return res.status(202).json({success:true,message:"Designers delete successful."})

    } catch (error) {
        return res
        .status(500)
        .json({success:false,
            message:"Internal Server Error",
            error:error.message})
        
    }
}


module.exports={addDesigner,getDesigners,getDesignerById,updateDesigner,deleteDesigner}