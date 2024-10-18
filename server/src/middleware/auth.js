const jwt = require("jsonwebtoken");
const userModel = require("../model/userModel");
require("dotenv").config();

const isLoggedIn = async(req, res, next) => {

    const { authorization} = req.headers;

    if(authorization){
      let token=authorization.split(' ')[1]

      try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        if(decoded){
        const userExist = await userModel.findOne({_id:decoded.id})
          if(userExist){
            req.userId = userExist._id;
            next();
          }else{
             return res.status(404).json({success:false,message:"User not found!"})
          }
        }else{
          return res.status(401).json({success:false,message:"No authorization header found!"})
        }
      } catch (error) {
        return res.status(401).json({success:false,message:"Token has been tampered!"})
        
      }

    }else{
      return res.status(401).json({success:false,message:"No authorization header found!"})
    }


};

const isAdmin = async (req, res, next) => {
  try {
    const adminExist = await userModel.findOne({ _id: req.userId });
    if (adminExist.isAdmin === false) {
      return res
        .status(403)
        .json({ success: false, message: "Only admin can access this." });
    }
    next();
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { isLoggedIn, isAdmin };
