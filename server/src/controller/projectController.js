const projectModel = require("../model/projectModel");
const slugify = require('slugify')

const handleAddProject = async(req,res)=>{
    try {
      const {title,location,type,architect,photography,imageUrls,description}=req.body;

      if(!title || !location || !photography || !imageUrls){
        return res.status(401).json({success:false,message:'Fill the required field.'}) 
      } 
      const projectExist= await projectModel.findOne({title})

      if(projectExist){
       return res.status(409).json({success:false,message:'This project already created.'})
      }
     
     await projectModel.create({
        title:title.toLowerCase(),
        slug:slugify(title),
        type,
        location,
        architect,
        photography,
        imageUrls,
        description
      })

      res.status(201).json({success:true,message:'New Project create successful.'})

    } catch (error) {
        return res.status(500).json({success:false,message:error.message}) 
    }
}

const handleAllProjects=async(req,res)=>{
  try {
    const limit = Number(req.query.limit)
    const projects = await projectModel.find().limit(limit)
    if(!projects){
      return res.status(404).json({success:false,message:'No project created.'})
    }
    return res.status(200).json({success:true,message:"Projects are returned",projects})
  } catch (error) {
    return res.status(500).json({success:false,message:error.message}) 
  }
}

const handleGetProjectBySlug =async(req,res)=>{
  try {
    const {slug}= req.params;
    const project = await projectModel.findOne({slug:slug})
    if(!project){
      return res.status(404).json({success:false,message:'No project found.'})
    }
    return res.status(202).json({ success: true, message: "Project returned successful.",project })
  } catch (error) {
    return res.status(500).json({success:false,message:error.message}) 
  }
}

const handleGetProject =async(req,res)=>{
  try {
    const project = await projectModel.findById(req.params.id)
    if(!project){
      return res.status(404).json({success:false,message:'No project found.'})
    }
    return res.status(202).json({ success: true, message: "Project returned successful.",project })
  } catch (error) {
    return res.status(500).json({success:false,message:error.message}) 
  }
}

const handleUpdateProject=async(req,res)=>{
  try {
    const {id}=req.params;
    
    const project = await projectModel.findOne({_id:id})

    if(!project){
      return res.status(404).json({success:false,message:"project not found."})
    }

    const{title,location,type,architect,photography,imageUrls}=req.body;
    const updateProject = await projectModel.findByIdAndUpdate({_id:id},{
      $set:{
        title:title,
        slug:slugify(title),
        location:location,
        type:type,
        architect:architect,
        photography:photography,
        imageUrls:imageUrls
      }
    },{new:true})
    res.status(202).json({success:true,message:"Project update successful.",updateProject})
  } catch (error) {
    return res.status(500).json({success:false,message:error.message}) 
  }
}

const handleDeleteProject =async(req,res)=>{
  try {
    const project = await projectModel.findById(req.params.id)
    if(!project){
      return res.status(404).json({success:false,message:'No project found.'})
    }
    await projectModel.findByIdAndDelete(req.params.id)
    return res.status(202).json({ success: true, message: "Project delete successful." })
  } catch (error) {
    return res.status(500).json({success:false,message:error.message}) 
  }
}
module.exports={handleAddProject,handleUpdateProject,handleAllProjects,handleDeleteProject,handleGetProject,handleGetProjectBySlug}