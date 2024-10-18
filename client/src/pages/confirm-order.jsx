import {useQuery} from '@tanstack/react-query'
import {Link, useParams} from "react-router-dom"
import {fetchOrderById} from "../api/orderApi"
import { useContext } from 'react'
import { ProductContext } from '../context/productContext'
import { FaPrint } from 'react-icons/fa6'

const ConfirmOrder = () => {

const {id}=useParams()
const {setActive}=useContext(ProductContext)

const{data}=useQuery({
queryKey:['order-by-id',id],
queryFn:()=>fetchOrderById(id)
})
const handlePrint=()=>{
  window.print()
}

  return (
    <div className="max-w-7xl mx-auto py-10">
      <article className='flex flex-col gap-2 justify-center items-center mb-10'>
        <span className='text-blue-600'>Order successful</span>
        <h1 className='font-bold text-4xl'>Thanks for ordering</h1>
        <p className='max-w-xl text-center'>We appreciate your order, we’re currently processing it. So hang tight and we’ll send you confirmation very soon!</p>
      </article >
   
      <h2 className='my-10 border-b-2 py-2'><span className='font-bold text-2xl'>Order code:</span> #{data?._id}</h2>
    <div className='grid grid-cols-3 print:grid-cols-1 print:gap-5'>
      <div className="">
        {data?.products.map((item)=>{
          return <div className="flex gap-2 items-center" key={item?.product._id}>
            <img className='w-20 h-30 object-cover border rounded' src={item?.product.imageUrls[0]} alt="" />
            <article className='flex flex-col gap-1 '>
            <h2 className='font-semibold'>{item?.product.title}</h2>
            <p className='text-sm'>X{item?.quantity}</p>
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
      <div className="flex flex-col gap-2">
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
        <p><span className='font-bold mr-2'>Payment method:</span><span className=' capitalize text-blue-500 font-bold'>{data?.payment}</span></p>
        <h5 className="font-bold text-sm text-green-500 mt-3">Product will arrive within 5 days.</h5>
      </div>
    </div>
    <div className=" print:hidden flex justify-center items-center mt-5">
      <button className="flex items-center gap-2 bg-red-500 p-3 text-white mt-3 border shadow-md shadow-red-500/20" onClick={handlePrint}><FaPrint />Print this page</button>
    </div>
    <div className="text-center my-10 print:hidden">
    <Link onClick={()=>setActive('products')} to={'/products'} className='text-blue-700 font-semibold' >Continue Shopping →</Link>
    </div>
    </div>
  )
}

export default ConfirmOrder
