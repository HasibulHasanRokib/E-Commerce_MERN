const ordersModel = require("../model/ordersModel");
const productModel = require("../model/productModel");

const handleAddOrders = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      address,
      phone,
      subtotal,
      total,
      userId,
      products,
    } = req.body;

    const newOrder = new ordersModel({
      firstname,
      lastname,
      email,
      address,
      phone,
      subtotal,
      total,
      userId,
      products,
    });

    await newOrder.save();

    res
      .status(201)
      .json({success:true,message: "Order added successfully.", order: newOrder });
  } catch (error) {
    res.status(500).json({ error: "Failed to add order.",error });
  }
};

const getOrders=async(req,res)=>{
  try {
    const orders = await ordersModel.find().populate('products.product').populate('userId').sort({ createdAt: -1 })
    res
    .status(201)
    .json({ message: "Orders return successfully.", orders });
  } catch (error) {
    res.status(500).json({ error: "Failed to add order.",error });
  }
}

const getOrdersPlaced=async(req,res)=>{
  try {
    const orders = await ordersModel.find({ status:'order-placed'})
    res
    .status(201)
    .json({ message: "Orders return successfully.", orders });
  } catch (error) {
    res.status(500).json({ error: "Failed to add order.",error });
  }
}

const getOrderById =async(req,res)=>{
  try {
    const {id} = req.params;
    const order = await ordersModel.findOne({_id:id}).populate('products.product')
    if(!order){
       return res.status(404).json({success:false,message:"Order not found"})
    }
    return res.status(200).json({success:true,message:"Order returned",order})
  } catch (error) {
    res.status(500).json({ error: "Failed to find order.",error });
    
  }
}

const getOrderByIdUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updateOrder = await ordersModel.findById(id).populate('products.product');

    if (!updateOrder) {
      return res.status(404).json({ success: false, error: "Order not found." });
    }

  
    updateOrder.status = status;
    updateOrder.deliveryDate = status === 'delivered' ? Date.now() : null;
    await updateOrder.save();


    if (status === 'delivered') {
      await Promise.all(updateOrder.products.map(async (product) => {
        const { product: { _id }, quantity } = product;
        await productModel.findByIdAndUpdate(_id, {
          $inc: { sold: quantity, stock: -quantity }
        });
      }));
    }

    return res.status(202).json({ success: true, message: "Order update successful.", updateOrder });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to update order.", error });
  }
};

const getOrderByUserId =async(req,res)=>{
  try {
    const {id} = req.params;
    const order = await ordersModel.find({userId:id}).populate('products.product').sort({ createdAt: -1 })
    if(!order){
       return res.status(404).json({success:false,message:"Order not found"})
    }
    return res.status(200).json({success:true,message:"Order returned",order})
  } catch (error) {
    res.status(500).json({ error: "Failed to find order.",error });
    
  }
}

const handleDeleteOrder = async (req, res) => {
  try {
      const { id } = req.params;

      if (!id) {
          return res.status(404).json({ success: false, message: "Order id not found." })
      }

      const deleteOrder=await ordersModel.findByIdAndDelete({_id:id})

      if(!deleteOrder){
          return res.status(404).json({ success: false, message: "Order not found." })
      }

      res.status(202).json({success:true,message:"Order delete successful",deleteOrder})

  } catch (error) {
      return res.status(500).json({ success: false, message:error.message })
  }
}

module.exports={handleDeleteOrder,handleAddOrders,getOrders,getOrderById,getOrderByUserId,getOrdersPlaced,getOrderByIdUpdate}
