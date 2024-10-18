const express = require('express')
const {addDesigner,getDesigners,getDesignerById,updateDesigner,deleteDesigner} = require('../controller/designerController')

const designerRouter = express.Router()

designerRouter.post('/designers/create-designer',addDesigner)
designerRouter.get('/designers',getDesigners)
designerRouter.get('/designer/:id',getDesignerById)
designerRouter.post('/designers/update-designer/:id',updateDesigner)
designerRouter.delete('/designers/delete-designer/:id',deleteDesigner)

module.exports=designerRouter;