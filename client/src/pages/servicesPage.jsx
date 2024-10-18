import { useContext, useState } from "react"
import { services } from "../components/services"
import { FaCircleExclamation, FaXmark } from "react-icons/fa6";
import { allProjects } from "../api/projectApi";
import { useMutation, useQuery } from "@tanstack/react-query";
import {AuthContext} from "../context/authContext"
import { toast } from "react-toastify";
import { addService } from "../api/serviceApi";
import Swal from 'sweetalert2'

const ServicesPage = () => {

  const{user}=useContext(AuthContext)
  const [data,setData]=useState(services)
  const [show,setShow]=useState(false)



const{data:portfolio}=useQuery({
  queryKey:['projects'],
  queryFn:allProjects,
})

 const [formData,setFormData]=useState({
  name:user?.name,
  email:user?.email,
  phone:user?.phone,
  address:user?.address,
  userId:user?._id,
  portfolioId:'',
  servicesName:[]
 })

const handleChange = (e) => {
  const { name, value, checked } = e.target;
  if (name === "portfolio") {
    setFormData({ ...formData, portfolioId: value });
  } else if (name === "services") {

    if (checked) {
        setFormData({ ...formData, servicesName: [...formData.servicesName, value] });
     
    } else {
      setFormData({
        ...formData,
        servicesName: formData.servicesName.filter((service) => service !== value),
      });
    }

  } else {
    setFormData({ ...formData, [name]: value });
  }
};

const {mutate,isError,error,isPending,reset}=useMutation({
  mutationFn:addService,
  onSuccess:(data)=>{
    if(data.success === false){
     return toast.warning(data.message)
    }else{
    Swal.fire({
    position: "center",
    icon: "success",
    title: "Your request has been saved",
    showConfirmButton: false,
    timer: 1500
     });
     setFormData({name:"",email:"",phone:"",address:"",portfolioId:"",servicesName:[]})
     toast.success(data.message)
     setShow(false)
     return;
    }
    }
})


 const handleSubmit=(e)=>{
  e.preventDefault()
  mutate(formData)

 }


  return (
    <>
    <div className="max-w-7xl mx-auto ">
      <h2 className="font-semibold text-4xl text-center py-10">Our Services</h2>

    <div className="px-28">
        {data && data.map((item,index)=>{
            return <div className="grid grid-cols-2 mt-10 last:mb-10 items-center" key={index}>
                <div className="w-3/4 mx-auto">
                    <img className="w-full h-[300px] object-cover rounded-md" src={item.image} alt="image" />
                </div>
                <article className="max-w-lg">
                    <h5 className="font-bold text-xl my-3">{item.title}</h5>
                    <p className="text-slate-500">{item.desc}</p>
                    {user ? 
                    <button onClick={()=>setShow(true)} className="my-2 bg-gray-700 text-white px-4 py-2 hover:opacity-90 shadow-md rounded-md" type="button">Get Services</button>
                    :null  
                  }
                </article>
            </div>
        })}
    </div>
    </div>
    {show && (
    <div className="bg-gray-800/60 h-full z-50 w-full fixed top-0 left-0 bottom-0 right-0">
      <div className="relative flex justify-center items-center ">
        <div className="bg-white  overflow-y-scroll  h-screen w-2/4 fixed bottom-0 shadow-md border-2 ">

           <div className="bg-gray-500  text-white flex justify-between items-center py-5 px-2">
            <h2 className="font-bold uppercase text-2xl">Choose services you  wanted</h2>
            <button onClick={()=>setShow(false)} type="button"><FaXmark size={25} /></button>
           </div>
           
           <form onSubmit={handleSubmit}>
           <div className="">
           <h2 className="font-bold text-cyan-500 text-xl uppercase mb-8 bg-gray-100 py-4 px-6"><FaCircleExclamation  className="inline-block mr-2"/>Services <samp className="text-xs lowercase font-thin text-cyan-400">(*required)</samp></h2>

           </div>

           <div className="grid grid-cols-2 gap-4 py-4 px-6 my-10">
            {data && data.map((item)=>{
              return <div className="flex gap-2 items-start" key={item._id}>
                    <input onChange={handleChange} value={item.title} className="mt-2 h-4 w-6"  type="checkbox" id={item.title} name="services"  />
                    <span>
                    <h5 className="font-semibold">{item.title}</h5>
                    <p className="text-slate-500 text-xs">{item.desc.slice(0,100)}...</p>
                    </span>
                   
                </div>
            })}
           </div>

           <div className="">
            <h2 className="font-bold text-cyan-500 text-xl uppercase mb-8 bg-gray-100 py-4 px-6"><FaCircleExclamation  className="inline-block mr-2"/>Portfolio <samp className="text-xs lowercase font-thin text-cyan-400">(if you have any choice.)</samp></h2>
            
            <div className="">
              {portfolio && portfolio?.map((item)=>{
                   return <div className="flex gap-2 items-start mt-2 px-6" key={item._id}>
                   <input onChange={handleChange} value={item?._id}  className="mt-2 h-4 w-6" type="radio" name='portfolio' id={item?.title} />
                   <span className="flex gap-2">
                    <img className="w-12 h-12 object-cover rounded-md" src={item?.imageUrls[0]} alt="" />
                    <span>
                   <h5 className="font-semibold capitalize">{item?.title}</h5>
                   <p className="text-xs text-slate-400">{item?.location}</p>
                    </span>
                   </span>
               </div>
              })}
            </div>
           </div>
           <div className="mt-4">
            <h2 className="font-bold text-cyan-500 text-xl uppercase mb-8 bg-gray-100 py-4 px-6"><FaCircleExclamation  className="inline-block mr-2"/>Personal Information <samp className="text-xs lowercase font-thin text-cyan-400">(*required)</samp></h2>
            <div className="flex flex-col gap-2 px-5">
              <label>Name:</label>
              <input onChange={handleChange} value={formData.name} className="p-3 bg-slate-100 shadow-sm border outline-slate-200" type="text" name="name" id="name" placeholder="Enter name" required />
              <label>Email:</label>
              <input onChange={handleChange} value={formData.email} className="p-3 shadow-sm border bg-slate-100 outline-slate-200" type="email" name="email" id="email" placeholder="abc@example.com" required />
              <label>Phone:</label>
              <input onChange={handleChange} value={formData.phone} className="p-3 shadow-sm border bg-slate-100 outline-slate-200" type="text" name="phone" id="phone" placeholder="+8801*****" required />
              <label>Address:</label>
              <input onChange={handleChange} value={formData.address} className="p-3 shadow-sm border bg-slate-100 outline-slate-200" type="text" name="address" id="address" placeholder="Enter address" required/>
            </div>
            
            </div>

              <div className="bg-slate-300 mt-10 py-6 px-4 flex items-end justify-end">
                <button className="font-semibold bg-cyan-500 text-white py-2 px-4 shadow-sm" type="submit">{isPending ? "Loading...":"Book Now"}</button>
              </div>
           </form>
        </div>
      </div>
    </div>
    )}
    </>
  )
}

     
export default ServicesPage
