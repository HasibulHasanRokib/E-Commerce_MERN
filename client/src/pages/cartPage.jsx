import { useContext, useState } from "react"
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../context/productContext";


const CartPage = () => {

const{cartItems,setCartItems}=useContext(ProductContext)
const navigate=useNavigate()

const handleRemove = (id) => {
    const newCart = cartItems?.filter((item) => item?.data?._id !== id);
    setCartItems(newCart);
  };

  const getTotalCost = () => {
    return cartItems.reduce((total, item) => total +(Math.floor(item?.data?.regularPrice - (item?.data?.regularPrice * item?.data?.discountPercentage) / 100))*item.count, 0);
  };


  
  
  const handleIncrement = (index) => {
    const newCartItems = [...cartItems];
    newCartItems[index].count += 1;
    setCartItems(newCartItems);
  };

  const handleDecrement = (index) => {
    const newCartItems = [...cartItems];
    if (newCartItems[index].count > 1) {
      newCartItems[index].count -= 1;
      setCartItems(newCartItems);
  };
  }

  return (
    <div className="max-w-7xl mx-auto">
    <h2 className="font-bold text-4xl text-center my-5">Cart Section</h2>
    {cartItems?.length===0?<h5 className="font-bold my-5 text-center py-20">Cart is empty</h5>:(
    <>
    <div className="">
    <table>
    <thead>
      <tr>
          <th>Product</th>
          <th>Title</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {cartItems?.map((item,index)=>{
          return <tr key={index}>
           <td><img className="w-12 mx-auto" src={item?.data?.imageUrls[0]} alt="" /></td>
           <td>{item?.data?.title}</td>
           <td>
            <samp>
            <spam className=" mr-1">৳</spam>
            {item?.data?.discountPercentage ? <samp>{Math.floor(item?.data?.regularPrice - (item?.data?.regularPrice * item?.data?.discountPercentage) / 100).toLocaleString()}</samp>:<spam>{item?.data?.regularPrice.toLocaleString()}</spam>}
            </samp>
            </td>

           <td>
           <div className="flex items-center gap-4 justify-center">
            <button disabled={item?.data.stock === item?.count} onClick={()=>handleIncrement(index)} className="px-2 w-14  border-2 shadow-sm hover:bg-slate-300 text-xl" type="button">+</button>
            <p>{item?.count}</p>
            <button disabled={item?.count===1}  onClick={()=>handleDecrement(index)} className="px-2 w-14 border-2 shadow-sm hover:bg-slate-300 text-xl" type="button">-</button>
          </div>
           </td>
           <td><button onClick={()=>handleRemove(item?.data?._id)} type="button"><MdDelete className="text-red-500" size={25} /></button></td>
          </tr>
      })}
   </tbody>
   </table>
   </div>
   <div className="max-w-2xl mx-auto bg-white my-10 py-10 border shadow-sm">
   <h5 className="font-bold text-xl text-center mb-4">Order Summary</h5>
   <div className="max-w-xl mx-auto">
      <span className="flex justify-between border p-2">
          <p>Subtotal</p>
          <samp>
          <spam className=" mr-1">৳</spam>
            {getTotalCost().toLocaleString()}
          </samp>
      </span>
      <span className="flex justify-between border p-2">
          <p>Shipping Fee</p>
          <p>Free</p>
      </span>
      <span className="flex justify-between border p-2">
          <p className="font-bold text-sky-800">Total</p>
          <samp className="font-bold text-sky-800">
          <spam className=" mr-1">৳</spam>
            {(getTotalCost()).toLocaleString()}
            </samp>
      </span>
      <button className="bg-sky-800 rounded-md w-full py-2 my-3 text-white border" type="button" onClick={()=>navigate('/checkout-page')}>PROCEED TO CHECKOUT</button>
    </div>
    </div>
    </>
    )}
      

  
    </div>
  )
}

export default CartPage
