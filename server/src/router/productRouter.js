const express = require('express')
const { handleCreateProduct,handleGetProducts,handleGetProduct,handleUpdateProduct,handleDeleteProduct ,handleNewArrivals,handleGetProductById,handleGetProductsByCategory, outOfStock } = require('../controller/productController')

const productRouter=express.Router()

productRouter.post('/admin/create-product',handleCreateProduct)
productRouter.post('/admin/update-product/:id',handleUpdateProduct)
productRouter.delete('/admin/delete-product/:id',handleDeleteProduct)
productRouter.get('/products',handleGetProducts)
productRouter.get('/out-of-stocks',outOfStock)
productRouter.get('/view/product/:slug',handleGetProduct)
productRouter.get('/product/:id',handleGetProductById)
productRouter.get('/products/new-arrivals',handleNewArrivals)
productRouter.get('/products/:category',handleGetProductsByCategory)

module.exports=productRouter
