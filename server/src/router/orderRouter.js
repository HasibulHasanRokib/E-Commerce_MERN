const express = require('express');
const { handleAddOrders, getOrders, getOrderById, getOrderByUserId, getOrdersPlaced, getOrderByIdUpdate, handleDeleteOrder } = require('../controller/orderController');

const orderRouter = express.Router()

orderRouter.post('/add-order',handleAddOrders)
orderRouter.get('/get-orders',getOrders)
orderRouter.get('/placed-orders',getOrdersPlaced)
orderRouter.get('/get-order/:id',getOrderById)
orderRouter.post('/update-order/:id',getOrderByIdUpdate)
orderRouter.get('/user/get-order/:id',getOrderByUserId)
orderRouter.delete('/delete-order/:id',handleDeleteOrder)

module.exports=orderRouter;