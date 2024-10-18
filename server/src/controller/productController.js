const slugify = require('slugify');
const productModel = require('../model/productModel');


const handleCreateProduct =async (req, res) => {
    try {

       const { title,description,brand,regularPrice,discountPercentage,stock,category,imageUrls} = req.body;

       if(!title || !description || !regularPrice || !stock || !category || !imageUrls ) {
        return res.status(401).json({success:false,message:'Fill the required field.'})
       }

       const productExist= await productModel.findOne({title})

       if(productExist){
        return res.status(409).json({success:false,message:'This product already created.'})
       }
       
       const newProduct= await productModel(
        { 
        title,
        slug:slugify(title),   
        description,
        brand,
        regularPrice,
        discountPercentage,
        stock,
        category,
        imageUrls
    } 
       )

       await newProduct.save();

       res.status(201).json({success:true,message:'New Product create successful.',newProduct})



    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
    }
}

const handleGetProducts=async(req,res)=>{
    try {
        const limit = Number(req.query.limit)              
        const page = Number(req.query.page)              
        const products = await productModel.find().limit(limit).skip((page-1)*limit)
        const count = await productModel.find().countDocuments()

        res.status(201).json({
            success: true,
            message: 'Products were return.',
            products,
            totalPage:Math.ceil(count/limit)
            
        })

    } catch (error) {
        return res.status(500).json({success:false,message:"Internal Server Error",error:error.message})
    }
}
 
const handleGetProduct=async(req,res)=>{
    try {
        const {slug} = req.params;
        const product= await productModel.findOne({slug:slug})

        if(!product){
            return res.status(404).json({success:false,message:"Product not found."})
        }

        res.status(201).json({success:true,message:"Product return.",product})

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({success:false,message:error.message})
    }
}
const handleGetProductById=async(req,res)=>{
    try {
        const { id } = req.params;
       
        const productInfo=await productModel.findById({_id:id})

        if(!productInfo){
            return res.status(404).json({success:false,message:"Product not found."})
        }

        res.status(200).json({success:true,message:"Product return.",productInfo})

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({success:false,message:error.message})
    }
}

const handleUpdateProduct=async(req,res)=>{
    try {
        const {id}=req.params;

        const updateProduct= await productModel.findByIdAndUpdate({_id:id},{
            $set:{
                title:req.body.title,
                slug:slugify(req.body.title),
                description:req.body.description,
                regularPrice:req.body.regularPrice,
                discountPercentage:req.body.discountPercentage,
                imageUrls:req.body.imageUrls,
                stock:req.body.stock,
                category:req.body.category,
                brand:req.body.brand,
                
            }
        },{new:true})

      res.status(202).json({success:true,message:"Product update successful.",updateProduct})

    } catch (error) {
        return res.status(500).json({success:false,message:error.message})       
    }
}

const handleDeleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(404).json({ success: false, message: "Product id not found." })
        }

        const deleteProduct=await productModel.findByIdAndDelete({_id:id})

        if(!deleteProduct){
            return res.status(404).json({ success: false, message: "Product not found." })
        }

        res.status(202).json({success:true,message:"Product delete successful",deleteProduct})

    } catch (error) {
        return res.status(500).json({ success: false, message:error.message })
    }
}

const handleNewArrivals=async(req,res)=>{
    try {
        const newArrivals = await productModel.find({}).sort({ createdAt: -1 }).limit(4);

        res.status(200).json({
            success: true,
            message: 'New arrivals fetched successfully.',
            newArrivals,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

const handleGetProductsByCategory=async(req,res)=>{
    try {
        const {category}=req.params;
        if(!category){
            return res.status(404).json({success:false,message:"Category not found."})
        }
        const products=await productModel.find({category})
        if(!products){
            return res.status(404).json({success:false,message:"Products not found."})    
        }
        res.status(200).json({success:true,message:"Products return",products})
    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
    }
}

const outOfStock = async(req,res)=>{
    try {
      const products = await productModel.find()

      const outOfStockProducts = products.filter(product => product.stock === 0);

      return res.status(200).json({ success: true, outOfStockProducts });

    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
    }
}

module.exports = { handleCreateProduct,handleGetProducts,handleGetProduct,handleUpdateProduct,handleDeleteProduct ,handleNewArrivals,handleGetProductById,handleGetProductsByCategory,outOfStock}