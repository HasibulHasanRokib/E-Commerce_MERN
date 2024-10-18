import {useMutation} from '@tanstack/react-query'
import { Link , useNavigate } from "react-router-dom"
import { signUp } from '../../api/authApi'
import {toast } from 'react-toastify';

const Register = () => {

const navigate = useNavigate(); 
const{mutate,reset,isError,isPending,error}=useMutation({
  mutationFn:signUp,
 onSuccess:(data)=>{
 if(data.success === false){
  return toast.warning(data.message)
 }else{
  toast.success(data.message)
  navigate('/auth/login')
  return;
 }
 }
})

const handleSignUp=(e)=>{
  e.preventDefault()
  const formData = new FormData(e.target)
  const name = formData.get('name')
  const email = formData.get('email')
  const password = formData.get('password')

  mutate({name,email,password})
  e.target.reset();
}

  return (
    <div className=" flex flex-col h-[60vh] justify-center items-center" >
    <h1 className="font-bold text-2xl text-center uppercase ">Sign up</h1>
   
    <form className='flex flex-col gap-2 sm:w-3/5 md:w-2/5 p-4 mx-auto w-full' onSubmit={handleSignUp}>
    <input  className='py-2.5 px-2 outline-none rounded-md  shadow-sm border'  type="text" name="name" id="name" placeholder='Enter your name' />
    <input  className='py-2.5 px-2 outline-none rounded-md  shadow-sm border'  type="email" name="email" id="email" placeholder='Enter your email' />
    <input  className='py-2.5 px-2 rounded-md outline-none  shadow-sm border'  type="password" name="password" id="password" placeholder='Enter your password' />
    <button  className='shadow-sm py-2.5 px-2 rounded-md outline-slate-300 border bg-sky-800 font-semibold text-white hover:opacity-90 disabled:opacity-80' type="submit" >{isPending ?"Loading":"Submit"}</button>
    <div className="flex justify-between items-center">
    <p className="text-xs">Already have an account? <Link className="font-semibold " to={"/auth/login"}>Login</Link></p>
    </div>
  </form>
  {isError && <p onClick={()=>reset()} className='text-center text-red-500 mt-3'>{error?.message}</p>}
  </div>
  )
}

export default Register

