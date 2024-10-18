const serviceModel = require("../model/serviceModel");

const handleAddService = async (req, res) => {
  try {
    const { name, email, phone, address, userId, servicesName, portfolioId } = req.body;
    
    if (!name || !email || !phone || !address || !userId || !servicesName) {
      return res.status(400).json({ success: false, message: 'Fill the required fields.' });
    }

    const addserviceData = { name, email, phone, address, userId, servicesName };
    if (portfolioId) {
      addserviceData.portfolioId = portfolioId;
    }

    const addservice = await serviceModel.create(addserviceData);
    return res.status(200).json({ success: true, message: 'Successfully sent.', addservice });
   
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


const handleDeleteService = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(404).json({ success: false, message: "Service id not found." })
        }

        const deleteService=await serviceModel.findByIdAndDelete({_id:id})

        if(!deleteService){
            return res.status(404).json({ success: false, message: "Service not found." })
        }

        res.status(202).json({success:true,message:"Service delete successful",deleteService})

    } catch (error) {
        return res.status(500).json({ success: false, message:error.message })
    }
}

const handleGetServices=async(req,res)=>{
  try {
    const services = await serviceModel.find().populate('portfolioId').populate('userId').sort({ createdAt: -1 })
    res
    .status(201)
    .json({ message: "All services  return successfully.", services });
  } catch (error) {
    res.status(500).json({ error: "Failed to get services data.",error });
  }
}

const getServicesByUserId =async(req,res)=>{
  try {
    const {id} = req.params;
    const services = await serviceModel.find({userId:id}).populate('portfolioId').sort({ createdAt: -1 })
    if(!services){
       return res.status(404).json({success:false,message:"Services not found"})
    }
    return res.status(200).json({success:true,message:"Services returned",services})
  } catch (error) {
    res.status(500).json({ error: "Failed to find services data.",error });
    
  }
}


module.exports = {handleAddService,handleDeleteService,handleGetServices,getServicesByUserId}