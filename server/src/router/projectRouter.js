const express = require('express');
const { handleAddProject, handleAllProjects,handleDeleteProject,handleGetProject,handleUpdateProject,handleGetProjectBySlug } = require('../controller/projectController');
const { isLoggedIn, isAdmin } = require('../middleware/auth');

const projectRouter= express.Router()

projectRouter.post("/admin/add-project",handleAddProject)
projectRouter.get("/all-projects",handleAllProjects)
projectRouter.get("/project/:id",handleGetProject)
projectRouter.get("/view/project/:slug",handleGetProjectBySlug)
projectRouter.delete("/admin/delete-project/:id",handleDeleteProject)
projectRouter.post("/admin/update-project/:id",handleUpdateProject)

module.exports=projectRouter;