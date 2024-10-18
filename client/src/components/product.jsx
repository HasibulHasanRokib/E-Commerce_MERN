import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { ProductContext } from '../context/productContext';
import { AuthContext } from '../context/authContext';
import {toast } from 'react-toastify';
import { IoCart } from "react-icons/io5";

const Product = ({product:data}) => {

const {addToCart}= useContext(ProductContext)
const {user}= useContext(AuthContext)
const offeredPrice=Math.floor(data?.regularPrice - (data?.regularPrice * data?.discountPercentage) / 100).toLocaleString()
const [count,setCount]=useState(1)

  return (
    <div  className='bg-white relative border-2   rounded-sm hover:shadow-lg flex flex-col gap-3'>
     <Link to={`/product-view/${data?.slug}`}>
      {data?.discountPercentage > 0 ? 
      <p className="bg-orange-600 text-white w-fit p-1 absolute right-0 text-sm border rounded">-{data?.discountPercentage}% Off</p>
      :null}
      {data?.stock === 0 ? 
      <p className="text-orange-600 font-semibold w-fit p-1 absolute left-0 text-sm bg-white">Out of stocks</p>
      :null}

      <img className=' w-full h-40 object-contain' src={data?.imageUrls[0]} alt="" />
      <article className='p-3 my-6'>
        <span className='font-semibold text-gray-400 capitalize text-sm'>{data?.brand}</span>
        <h4 className='font-semibold text-sm'>{data?.title.slice(0, 25)}</h4>

        {data?.discountPercentage > 0 ? 
        <div className="flex flex-col">
           <samp className="text-green-500 font-bold">
           <span className=" mr-1">৳</span>
           {offeredPrice}
           </samp>
           <samp>
           <del className='text-sm'>{data?.regularPrice.toLocaleString()}</del>
           </samp>
        </div>
        :
        <samp className="text-green-500 font-bold">
        <span className=" mr-1">৳</span>
        {data?.regularPrice.toLocaleString()}
        </samp>
        }
      </article>
      </Link>
      {user ? (  
          data?.stock === 0 ? (
            <button onClick={()=>toast.warning('Product not available!')} title='Add to cart' type='button' className='hover:text-green-600 hover:bg-green-100 p-2 w-fit rounded-full bg-slate-100 absolute right-0 m-2 bottom-0'><IoCart size={25} /></button>
           ) : (
            <button onClick={()=>addToCart({data,count})} title='Add to cart' type='button' className='hover:text-green-600 hover:bg-green-100 p-2 w-fit rounded-full bg-slate-100 absolute right-0 m-2 bottom-0'><IoCart size={25} /></button>
     )
     ) : (
        <button onClick={()=>toast.warning('Log in first!')} title='Add to cart' type='button' className='hover:text-green-600 hover:bg-green-100 p-2 w-fit rounded-full bg-slate-100 absolute right-0 m-2 bottom-0'><IoCart size={25} /></button>
         )}
    </div>
  )
}

export default Product
