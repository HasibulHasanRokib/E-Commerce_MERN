import { useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { resetPassword } from '../../api/authApi'
import { toast } from 'react-toastify'

const ResetPassword = () => {
const {token}=useParams()
const [formData,settFormData]=useState({
  newPassword:"",
  confirmPassword:""
})
const navigate = useNavigate()
const [show,setShow]=useState(false)

const {mutate,isError,reset,error,isPending}=useMutation({
mutationFn:resetPassword,
onSuccess:(data)=>{
  if(data.success){
     toast.success(data.message)
     navigate('/auth/login')
  }else{
    toast.error(data.message)
  }
}
})

const handleChange=(e)=>{
  settFormData({...formData,[e.target.name]:e.target.value})
}

const handleSubmit=(e)=>{
  e.preventDefault()
  console.log(formData)
  mutate({token,...formData})
}

  return (
    <div className=" flex flex-col h-[60vh] justify-center items-center" >
    <h1 className="font-bold text-2xl text-center uppercase ">Reset your password</h1>
   
    <form className='flex flex-col gap-4 sm:w-3/5 md:w-2/5 p-4 mx-auto w-full' onSubmit={handleSubmit}>
    <input onChange={handleChange} value={formData.newPassword}  className='py-2.5 px-2 rounded-md outline-none  shadow-sm border'  type={show ? 'text':'password'} name="newPassword" id="newPassword" placeholder='New password' required/>
    <input onChange={handleChange} value={formData.confirmPassword} className='py-2.5 px-2 rounded-md outline-none  shadow-sm border'  type={show ? 'text':'password'} name="confirmPassword" id="confirmPassword" placeholder='Confirm password' required />
    <div className="flex gap-2">
    <input type="checkbox" onClick={()=>setShow(!show)} />
    <p className='text-sm'>{show ? "Hide":"Show"} password</p>
    </div>
    
    <button  className='shadow-sm py-2.5 px-2 rounded-md outline-slate-300 bg-sky-800 border font-semibold text-white hover:opacity-90 disabled:opacity-80' type="submit" >{isPending?"Loading...":"Update"}</button>
    </form>
  {isError && <p onClick={()=>reset()} className='text-center text-red-500 mt-3'>{error?.message}</p>}
  </div>
  )
}

export default ResetPassword
