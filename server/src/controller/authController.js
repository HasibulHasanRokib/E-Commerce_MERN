const userModel = require("../model/userModel");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const htmlTemplate = require("../helper/emailView");
const emailWithNodeMailer = require("../helper/email");
const salt = bcrypt.genSaltSync(10);


const handleSignUp = async(req,res)=>{
    try {
        const {name , email , password}=req.body;

        if(!name || !email || !password){
            return res.status(404).json({
                success:false,
                message:"Fill the required field."
            });
        }
        
        const userExist = await userModel.findOne({email})

        if(userExist){
           return res.status(401).json({
               success:false,
               message:"This email already registered"
           })
        }   
        const newUser = await userModel.create({
           name,
           email,
           password:bcrypt.hashSync(password,salt)
       })
       const {password:pass,...user}=newUser._doc;

       return res.status(201).json({success:true,message:"Registration successful.",user})
   
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:'Registration failed.'
        })
    }
}

const handleLogin = async(req,res)=>{
    try {
        const { email,password} = req.body;

        if(!email || !password){
            return res.status(404).json({
                success:false,
                message:"Fill the required field."
            });
        }
    
        const userExist = await userModel.findOne({email})

        if(!userExist){
            return res.status(404).json({success:false,message:"Email not register"}) 
        }

        const passOk = bcrypt.compareSync(password,userExist.password)

        if(!passOk){
            return res.status(401).json({ success: false, message: "Wrong credentials." })  
        }

        const token = jwt.sign({id:userExist._id},process.env.JWT_KEY,{expiresIn:'1h'})
        res.cookie('accessToken', token,{httpOny:true,maxAge:360000}).json({ success: true, message: 'Login successful.' ,token,userExist})

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:'Login failed.',
            error:error.message
        })  
    }
}

const handleLogOut = async (req, res) => {
    try {
        res.clearCookie('accessToken').json({ success: true, message: "Log out successful." })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:'Internal problem.',
            error:error.message
        })  
    }
}

const handleGetUser = async(req,res)=>{
    try {
      const id = req.userId;  
      if(!id){
        return res.status(404).json({ success: false, message: "Id not found." })  
      }
      const userExist = await userModel.findOne({_id:id})
      if(!userExist){
        return res.status(404).json({
            success:false,
            message:"user not found."
        })
      }
      const {password:pass,...user}=userExist._doc;

      return res.status(200).json({success:true,message:"User return.",user})

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:'Internal problem.',
            error:error.message
        }) 
    }
}

const handleAllUsers=async(req,res)=>{
    try { 
        const users = await userModel.find()
        
        if(!users){
          return res.status(404).json({
              success:false,
              message:"users not found."
          })
        }
  
        return res.status(200).json({success:true,message:"Users return.",users})
  
      } catch (error) {
          return res.status(500).json({
              success:false,
              message:'Internal problem.',
              error:error.message
          }) 
      }
}

const handleUpdateUser=async(req,res)=>{
    try {
        const {id}=req.params;
    
        const userExist = await userModel.findOne({_id:id})
     
            if(!userExist){
            return res.status(404).json({
             success:false,
             message:'User not found.'
            })
            }
    
            const updateUser = await userModel.findByIdAndUpdate({_id:id},{
                $set:{
                 name:req.body.name,
                 gender:req.body.gender,
                 address:req.body.address,
                 phone:req.body.phone,
                 avatar:req.body.avatar,
                }
            },{new:true})
           
           return res.status(200).json({
            success:true,
            message:"User update successful.",
            updateUser
           }) 
        
   
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:'Internal problem.',
            error:error.message
        })   
    }
}

const handleForgetPassword = async (req, res) => {
    try {

        const { email } = req.body;
       

        if (!email) {
            return res.status(404).json({ success: false, message: "Email not found." })
        }

        const userExist = await userModel.findOne({ email })

        if (!userExist) {
            return res.status(404).json({ success: false, message: "This email are not register. Please register first." })
        }

        const token = jwt.sign({ id: userExist._id }, process.env.JWT_KEY, { expiresIn: "120s" })

        const emailData = {
            email,
            subject: 'Forgot password email',
            html: htmlTemplate(userExist.name, token)
        }

        emailWithNodeMailer(emailData)

        res.status(200).json({ success: true, message: `For reset your password check your email: ${email}`, token })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:'Internal problem.',
            error:error.message
        })   
    }
}

const handleRestPassword = async (req, res) => {
    try {
        const { token } = req.params;

        if (!token) {
            return res.status(404).json({ success: false, message: "Rest token not found." })
        }



        const decoded = jwt.verify(token, process.env.JWT_KEY)

        const userExist = await userModel.findOne({ _id: decoded.id })

        if (!userExist) {
            return res.status(404).json({ success: false, message: "User not found" })
        }

        const { newPassword, confirmPassword } = req.body;

        if (!newPassword || !confirmPassword) {
            return res.status(400).json({ success: false, message: "Fill the required field" })
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ success: false, message: "Confirm password not match" })
        }

        const hashedPassword = bcrypt.hashSync(confirmPassword, salt)

        const updatePassword = await userModel.findByIdAndUpdate({ _id: userExist._id }, {
            $set: {
                password: hashedPassword
            }
        })

        const { password: pass, ...user } = updatePassword._doc;

        res.status(201).json({ success: true, message: "Password update successful.", user })

    } catch (error) {
       
        return res.status(500).json({ success: false, message: error.message })
    }
}



module.exports = {handleSignUp,handleLogin,handleLogOut,handleUpdateUser,handleGetUser,handleAllUsers,handleForgetPassword,handleRestPassword}