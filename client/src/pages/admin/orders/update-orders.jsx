import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {  useNavigate, useParams } from "react-router-dom"
import { fetchOrderById, updateOrderById } from "../../../api/orderApi"
import { useState } from "react"
import { toast } from "react-toastify"

const UpdateOrders = () => {
const {id}=useParams()
const navigate = useNavigate()
const{data}=useQuery({
    queryKey:['order-by-id',id],
    queryFn:()=>fetchOrderById(id)
    })


const [status,setStatus]=useState(data?.status)
const queryClient = useQueryClient()
const {mutate,isError,error,isPending,reset}=useMutation({
    mutationFn:updateOrderById,
    onSuccess:(data)=>{
        queryClient.invalidateQueries({
            queryKey:["all-orders"]
           })
      if(data.success === false){
       return toast.warning(data.message)
      }else{
       toast.success(data.message)
       navigate('/admin/all-orders')
       return;
      }
      }
  })

const handleSubmit = (e)=>{
    e.preventDefault()
    mutate({id,status})
}

  return (
    <div className="bg-white px-3 py-5">
      <h2 className="text-center text-xl font-bold">Update orders</h2>
      <h2 className='my-10 border-b-2 py-2'><span className='font-bold text-2xl'>Order code:</span> #{data?._id}</h2>
    <div className='grid grid-cols-3 '>
      <div className="">
        {data?.products.map((item)=>{
          return <div className="flex gap-2 items-center" key={item?.product._id}>
            <img className='w-20 h-30 object-cover border rounded' src={item?.product.imageUrls[0]} alt="" />
            <article className='flex flex-col gap-1 '>
            <h2 className='font-semibold'>{item?.product.title}</h2>
            <p className='text-sm'>X{item.quantity}</p>
            </article>
          </div>
        })}
      </div>
      <div className="flex flex-col gap-3">
        <article className='flex flex-col gap-2'>
         <p className=' capitalize'><span className='font-bold mr-2'>Name:</span>{data?.firstname} {data?.lastname}</p>
         <p><span className='font-bold mr-2'>Email:</span>{data?.email}</p>
         <p><span className='font-bold mr-2'>Phone:</span>{data?.phone}</p>
         <p><span className='font-bold mr-2'>Address:</span>{data?.address}</p>
         <p><span className='font-bold mr-2'>Order Date:</span>{data?.orderDate.slice(0,10)}</p>
        </article>
      </div>
      <div className="flex flex-col gap-1">
      <samp>
            <samp className='font-semibold'>Subtotal:</samp>
            <spam className=" mr-1">৳</spam>
             {data?.subtotal.toLocaleString()}
        </samp>
      <samp>
            <samp className='font-semibold'>Total:</samp>
            <spam className=" mr-1">৳</spam>
             {data?.total.toLocaleString()}
        </samp>
        <p><span className='font-bold mr-2'>Payment method:</span><span className=' capitalize text-red-500 font-bold'>{data?.payment}</span></p>
        
         <select onChange={(e)=>setStatus(e.target.value)} value={status} name="status" id="status" className="mt-5 p-3 border-2 outline-none">
            <option value="">Select</option>
            <option value="order-placed">Order Placed</option>
            <option value="confirmed">Confirmed</option>
            <option value="delivered">Delivered</option>
         </select>
      </div>
    </div>
      <button type="submit" onClick={handleSubmit} className="bg-sky-800 py-2 border shadow-sm rounded-md text-white font-bold w-full mt-5">{isPending?'Loading...':'Update'}</button>
      {isError && <p onClick={()=>reset()} className='text-center text-red-500 mt-3'>{error?.message}</p>}
    
    </div>
  )
}

export default UpdateOrders