import {useQuery} from "@tanstack/react-query"
import { fetchProductBySlug } from "../api/productApi"
import {useParams} from "react-router-dom"
import { useContext, useState } from "react"
import {toast } from 'react-toastify';
import { ProductContext } from "../context/productContext";
import { AuthContext } from "../context/authContext";


const ProductView = () => {

const {addToCart}= useContext(ProductContext)
const {user} = useContext(AuthContext)
const {slug} = useParams()
const [count,setCount]=useState(1)

const[index,setIndex]=useState(0)
const handleImage =(index)=>{
  setIndex(index)
}

const{data}=useQuery({
  queryKey:["product-view",slug],
  queryFn:()=>fetchProductBySlug(slug)
})

const offeredPrice=Math.floor(data?.regularPrice - (data?.regularPrice * data?.discountPercentage) / 100).toLocaleString()

  return (
    <div className="max-w-7xl mx-auto px-3 py-10">
       
      <section className="grid grid-cols-2">
        <div className="w-full flex flex-col items-center">
         <img className="w-[25rem] border shadow-md" src={data?.imageUrls[index]} alt="" />
         <div className="flex flex-wrap gap-4 mt-5">
          {data?.imageUrls.map((img,index)=>{
            return <button  type="button" onClick={()=>handleImage(index)} className="w-20 border-2 shadow-md" key={index}>
              <img src={img} alt="" />
            </button>
          })}
         </div>
        </div>
        <div className=" relative">
          <div className="flex flex-col gap-4">
          <span className="font-extrabold text-slate-400 capitalize">{data?.brand}</span>
          <h2 className="font-bold text-3xl">{data?.title}</h2>
          {data?.discountPercentage > 0 ? 
         <p className="bg-orange-600 text-white w-fit p-1 absolute right-0 text-sm border rounded">-{data?.discountPercentage}% Off</p>
         :null}
          <p className="font-semibold text-xl">Available: {data?.stock}</p>
          {data?.discountPercentage > 0 ? 
        <div className="flex flex-col">

          <p className="font-semibold text-xl">Offered Price:<samp className="text-green-500 ml-2">৳{offeredPrice}</samp></p>

           <samp className="mt-1">
            Regular Price: <samp>৳</samp>
           <del className='text-sm ml-1'>{data?.regularPrice.toLocaleString()}</del>
           </samp>
        </div>
        :
        <samp className="text-green-500 font-bold text-xl">
          Price: 
        <span className=" mr-1">৳</span>
        {data?.regularPrice.toLocaleString()}
        </samp>
        }
        {data?.stock===0?<h2 className="font-semibold text-xl text-red-500">Out of stock</h2>:
          <div className="flex items-center gap-4">
            <button disabled={data?.stock===count} className="px-2 w-14 border-2 shadow-sm hover:bg-slate-300 text-xl" onClick={()=>setCount(count+1)} type="button">+</button>
            <p>{count}</p>
            <button disabled={count===1}  className="px-2 w-14 border-2 shadow-sm hover:bg-slate-300 text-xl" onClick={()=>setCount(count-1)} type="button">-</button>
          </div>
          }
          </div>
          <div className="">
            <h5 className="font-bold text-lg my-3">Description:</h5>
            <p>{data?.description.slice(0,400)}...</p>
          </div>
          {user ? (  
          data?.stock === 0 ? (
          <button onClick={() => toast.warning('Out of stock.')} className="bg-sky-800 w-full mt-5 rounded-md text-white px-3 py-2 border ">
         Add to Cart
         </button>
           ) : (
        <button onClick={() => addToCart({ data, count })} className="bg-sky-800 rounded-md w-full mt-5 text-white px-3 py-2 border ">
      Add to Cart
      </button>
     )
     ) : (
      <button onClick={() => toast.warning('Please Log in first!')} className="bg-sky-800 w-full mt-5 rounded-md text-white px-3 py-2 border ">
       Add to Cart
      </button>
         )}
        </div>
      </section>
   
    </div>
  )
}

export default ProductView
