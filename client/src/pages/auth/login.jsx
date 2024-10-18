import {useMutation} from '@tanstack/react-query'
import { Link , useNavigate } from "react-router-dom"
import {toast } from 'react-toastify';
import {login} from '../../api/authApi';
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import { ProductContext } from '../../context/productContext';

const Login = () => {
const navigate = useNavigate();
const {dispatch} = useContext(AuthContext)
const {setActive} = useContext(ProductContext)

  const{mutate,reset,isError,isPending,error}=useMutation({
    mutationFn:login,
   onSuccess:(data)=>{
   if(data.success ){
    toast.success(data.message)
    dispatch({type:"Login",payload:data.userExist})
    localStorage.setItem('jsonwebtoken',data.token)
    localStorage.setItem('user',JSON.stringify(data.userExist))
    if(data.userExist.isAdmin===true){
     navigate("/admin/dashboard")
     setActive("dashboard")
    }else{
      navigate('/') 
      setActive('home')
    }
  
   }else{
    return toast.warning(data.message)
   }
   }
  })

  const handleLogin=(e)=>{
    e.preventDefault()
    const formData = new FormData(e.target)
    const email = formData.get('email')
    const password = formData.get('password') 
    mutate({email,password})
    e.target.reset();
  }


  return (
    <div className=" flex flex-col h-[60vh] justify-center items-center" >
    <h1 className="font-bold text-2xl text-center uppercase ">log in to your account</h1>
   
    <form className='flex flex-col gap-4 sm:w-3/5 md:w-2/5 p-4 mx-auto w-full' onSubmit={handleLogin}>
    <input  className='py-2.5 px-2 outline-none rounded-md  shadow-sm border '  type="text" name="email" id="email" placeholder='Enter your email' />
    <input  className='py-2.5 px-2 rounded-md outline-none  shadow-sm border'  type="password" name="password" id="password" placeholder='Enter your password' />
    <button  className='shadow-sm py-2.5 px-2 rounded-md outline-slate-300 bg-sky-800 border font-semibold text-white hover:opacity-90 disabled:opacity-80' type="submit" >{isPending?"Loading...":"Log In"}</button>
    <div className="flex justify-between items-center">
    <p className="text-xs">Don&apos;t have an account? <Link className="font-semibold " to={"/auth/register"}>SignUp</Link></p>
    <Link to={'/auth/forgot-password'} className="text-xs hover:underline">Forgot password?</Link>
    </div>
  </form>
  {isError && <p onClick={()=>reset()} className='text-center text-red-500 mt-3'>{error?.message}</p>}
  </div>
  )
}

export default Login
