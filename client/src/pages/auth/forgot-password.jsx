import { useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { forgotPassword } from '../../api/authApi'
import Swal from 'sweetalert2'

const ForgotPassword = () => {

const [email,setEmail]=useState()


const {mutate,isError,error,isPending,reset} = useMutation({
    mutationFn:forgotPassword,
    onSuccess:(data)=>{
    if(data.success){
        Swal.fire({
            position: "top-center",
            icon: "success",
            title:'Token sent successfully.',
            showConfirmButton: true,
         
          });  
    }else{
        Swal.fire(data.message);  
    }
    }
})

const handleSubmit = (e)=>{
e.preventDefault()
mutate(email)
e.target.reset();
}




  return (
    <div className=" flex flex-col h-[60vh] justify-center items-center" >
    <h1 className="font-bold text-2xl text-center uppercase ">Forgot Password</h1>
   
    <form className='flex flex-col gap-4 sm:w-3/5 md:w-2/5 p-4 mx-auto w-full' onSubmit={handleSubmit}>
    <input  className='py-2.5 px-2 outline-none rounded-md  shadow-sm border ' onChange={(e)=>setEmail(e.target.value)}  type="text" name="email" id="email" placeholder='Enter your email' required />
    <button  className='shadow-sm py-2.5 px-2 rounded-md outline-slate-300 bg-sky-800 border font-semibold text-white hover:opacity-90 disabled:opacity-80' type="submit" >{isPending?"Loading...":"Submit"}</button>
    <div className="flex justify-between items-center">
    <p className="text-xs">Don&apos;t have an account? <Link className="font-semibold " to={"/auth/register"}>SignUp</Link></p>
    </div>
  </form>
  {isError && <p onClick={()=>reset()} className='text-center text-red-500 mt-3'>{error?.message}</p>}
  </div>
  )
}

export default ForgotPassword
