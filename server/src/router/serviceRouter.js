const express = require('express');
const { handleAddService, handleDeleteService,getServicesByUserId ,handleGetServices} = require('../controller/serviceController');

const serviceRouter=express.Router()

serviceRouter.post('/add-services',handleAddService)
serviceRouter.get('/all-services',handleGetServices)
serviceRouter.get('/user/services/:id',getServicesByUserId)
serviceRouter.delete('/delete-services/:id',handleDeleteService)

module.exports=serviceRouter;