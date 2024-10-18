import { useContext, useState } from "react"
import { ProductContext } from "../context/productContext"
import { AuthContext } from "../context/authContext"
import { RiDeleteBinLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { addOrder } from "../api/orderApi";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const CheckoutPage = () => {

const navigate=useNavigate()

const {cartItems,setCartItems,setActive}=useContext(ProductContext)
const {user} = useContext(AuthContext)

if(cartItems.length === 0){
    navigate('/products')
    setActive('products')
    return;
}

const handleRemove = (id) => {
    const newCart = cartItems?.filter((item) => item?.data?._id !== id);
    setCartItems(newCart);
  };

  const getTotalCost = () => {
    return cartItems.reduce((total, item) => total +(Math.floor(item?.data?.regularPrice - (item?.data?.regularPrice * item?.data?.discountPercentage) / 100))*item.count, 0);
  };

  const [formData,setFormData]=useState({
    firstname:"",
    lastname:"",
    email:"",
    phone:"",
    address:"",
    subtotal:getTotalCost(),
    total:getTotalCost(),
    products: cartItems.map((item) => ({
      product: item.data._id,
      quantity: item.count,
    })),
    userId:user._id
  })

const handleChange = (e)=>{
setFormData({...formData,[e.target.id]:e.target.value})
}

const {mutate,isError,error,isPending,reset}=useMutation({
  mutationFn:addOrder,
  onSuccess:(data)=>{
  if(data.success === false){
    return toast.error(data.message)
  }else{
   navigate(`/confirm-order/${data.order._id}`)
   toast.success(data.message)
   setCartItems([])
   return;
  }}
})

const handleSubmit = (e)=>{
  e.preventDefault()
  mutate(formData)
}


  return (
    <div className="max-w-7xl mx-auto">
      <h3 className="font-semibold text-2xl py-5">Shipping information</h3>

      <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
        <div className="">
        <div className="flex flex-col my-6 gap-4">
            <div className="flex gap-3">
            <samp className="flex flex-col font-sans w-full">
            <label>First name:</label>
            <input onChange={handleChange} className="py-2 px-3 outline-blue-500 border rounded-md shadow-sm" type="text" name="firstname" id="firstname" placeholder="required*" required />
            </samp>   
            <samp className="flex flex-col font-sans w-full">
            <label>Last name:</label>
            <input onChange={handleChange} className="py-2 px-3 outline-blue-500 border rounded-md shadow-sm" type="text" name="lastname" id="lastname" placeholder="required*" required/>
            </samp>   
            </div>
            <samp className="flex flex-col font-sans">
            <label>Email address:</label>
            <input onChange={handleChange} className="py-2 px-3 outline-blue-500 border rounded-md shadow-sm" type="email" name="email" id="email" placeholder="required*" required/>
            </samp>
            <span className="flex flex-col">
                <label>Phone:</label>
                <input onChange={handleChange} className="py-2 px-3 outline-blue-500 border rounded-md shadow-sm" type="text" name="phone" id="phone" placeholder="required*" required/>
            </span> 
            <span className="flex flex-col">
                <label>Address:</label>
                <textarea onChange={handleChange} className="py-2 px-3 outline-blue-500 border rounded-md shadow-sm" name="address" id="address" cols="10" rows="8" placeholder="required*" required></textarea>
            </span>
        
        </div>
        <h2 className="font-bold mb-3">Payment</h2>
        <div className="flex items-center gap-4">
            <input type="radio" checked name="payment" id="cash" /><span className="font-semibold">Cash on delivery</span>
        </div>
        </div>
         
        <div className="bg-white py-10 border shadow-sm h-fit px-4">
    <div className="border px-4 py-2">
        {cartItems?.map((item,index)=>{
            return <div className="flex justify-between my-2" key={index}>
                 <div className="flex gap-4">
                    <img className="w-36 h-36 border object-cover" src={item?.data?.imageUrls[0]} alt="" />
                    <article>
                        <h2 className="font-semibold text-sm">{item?.data?.title}</h2>
                        <samp>
                         <spam className=" mr-1">৳</spam>
                         {item?.data?.discountPercentage ? <samp>{Math.floor(item?.data?.regularPrice - (item?.data?.regularPrice * item?.data?.discountPercentage) / 100).toLocaleString()}</samp>:<spam>{item?.data?.regularPrice.toLocaleString()}</spam>}
                         </samp>
                         <p>X{item?.count}</p>
                    </article>
                 </div>
                 <div className="">
                    <button type="button" onClick={()=>handleRemove(item?.data?._id)}><RiDeleteBinLine className="text-red-500" size={30} /></button>
                 </div>
            </div>
        })}
    </div>
   <h5 className="font-bold text-sm text-sky-800 text-center mb-4 mt-3">Product will arrive within 5 days</h5>
   <div className="">
    
   </div>
   <div className="max-w-xl mx-auto">
      <span className="flex justify-between border p-2">
          <p>Subtotal</p>
          <p>${getTotalCost().toLocaleString()}</p>
      </span>
      <span className="flex justify-between border p-2">
          <p>Shipping Fee</p>
          <p>Free</p>
      </span>
      <span className="flex justify-between border p-2">
          <p className="font-bold text-sky-800">Total</p>
          <p className="font-bold text-sky-800">${(getTotalCost()).toLocaleString()}</p>
      </span>
      <button className="bg-sky-800 w-full py-2 my-3 text-white border rounded-md font-bold" type="submit" >{isPending?"Loading...":"Confirm order"}</button>
    </div>
        </div>
        {isError && <p onClick={()=>reset()} className='text-center text-red-500 mt-3'>{error?.message}</p>}
      </form>
    </div>
  )
}

export default CheckoutPage
