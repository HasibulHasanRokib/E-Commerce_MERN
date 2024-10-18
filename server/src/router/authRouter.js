const express = require ('express');
const { handleSignUp,handleAllUsers, handleLogin, handleLogOut, handleGetUser, handleUpdateUser, handleForgetPassword, handleRestPassword } = require('../controller/authController');
const { isLoggedIn } = require('../middleware/auth');

const authRouter = express.Router();

authRouter.post('/signup',handleSignUp)
authRouter.post('/login',handleLogin)
authRouter.get('/users',handleAllUsers)
authRouter.get('/profile',isLoggedIn,handleGetUser)
authRouter.post('/profile-update/:id',handleUpdateUser)
authRouter.get('/logout',isLoggedIn,handleLogOut)
authRouter.post('/forgot-password',handleForgetPassword)
authRouter.post('/reset-password/:token',handleRestPassword)

module.exports=authRouter;
