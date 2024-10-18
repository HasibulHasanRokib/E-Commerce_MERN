import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { deleteOrderByUserId, fetchOrderByUserId } from "../../api/orderApi"
import {toast } from 'react-toastify';
import Swal from 'sweetalert2'
import { FaPrint } from "react-icons/fa6";

const OrderPage = () => {

  const {id}=useParams()
  const{data}=useQuery({
    queryKey:['user-orders',id],
    queryFn:()=>fetchOrderByUserId(id)
  })

  const queryClient= useQueryClient()

  const {mutate}=useMutation({
    mutationFn:deleteOrderByUserId,
    onSuccess:(data)=>{
      queryClient.invalidateQueries({
        queryKey:["user-orders"]
       })
      if(data.success === false){
       return toast.warning(data.message)
      }else{
       toast.success(data.message)
       return;
      }
      }
     })

  const handleDelete=(id)=>{
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        mutate(id)
        Swal.fire({
          title: "Deleted!",
          text: "Your order has been deleted.",
          icon: "success"
        });
      }
    });
  }

  const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  const isThisWeek = (date) => {
    const now = new Date();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    const endOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 6));
    return date >= startOfWeek && date <= endOfWeek;
  };

  const isThisMonth = (date) => {
    const now = new Date();
    return date.getMonth() === now.getMonth() &&
           date.getFullYear() === now.getFullYear();
  };

  const todayEarnings = data?.filter(order => isToday(new Date(order.orderDate)))
                                   .reduce((acc, order) => acc + order.total, 0);

  const thisWeekEarnings = data?.filter(order => isThisWeek(new Date(order.orderDate)))
                                     .reduce((acc, order) => acc + order.total, 0);

  const thisMonthEarnings = data?.filter(order => isThisMonth(new Date(order.orderDate)))
                                      .reduce((acc, order) => acc + order.total, 0);

  const totalEarnings = data?.reduce((acc, order) => acc + order.total, 0);

  const handlePrint=()=>{
    window.print()
  }



  return (
    <div className="px-5">
      <h2 className="font-bold text-2xl mb-5">Order Details</h2>
      <div className="bg-white flex justify-between mt-4 border shadow-md p-4 gap-4 w-full">

<span>
<h2 className='font-semibold text-xl'>Order Summary</h2>
<p className='text-sm text-slate-400'>Overview of Latest Month</p>
</span>

<span>
<samp>৳</samp><samp className='font-bold text-2xl ml-2'>{todayEarnings?.toLocaleString()}</samp>
 <p className='text-sm'>Today's total orders</p>
</span>

<span>
<samp>৳</samp><samp className='font-bold text-2xl ml-2'>{thisWeekEarnings?.toLocaleString()}</samp>
 <p className='text-sm'>This Week total orders</p>
</span>

<span>
<samp>৳</samp><samp className='font-bold text-2xl ml-2'>{thisMonthEarnings?.toLocaleString()}</samp>
 <p className='text-sm'>This Month total orders</p>
</span>

<span>
<samp>৳</samp><samp className='font-bold text-2xl ml-2'>{totalEarnings?.toLocaleString()}</samp>
 <p className='text-sm'>Total </p>
</span>

</div>
      <div className="flex flex-col gap-3">
      {data?.length===0 ?<p className="my-10 text-center">No order history!</p>:data?.map((items)=>{
        return <div className=" bg-white p-4 border shadow-md"  key={items?._id}>
            <div className='py-2 mb-2 border-b-2 flex justify-between items-center'>
          <h2 ><span className='font-bold text-2xl'>Order code:</span> #{items?._id}</h2>
           <h2 ><span className='font-bold text-2xl'>Order status:<span className="ml-2 text-blue-700 capitalize">{items?.status==='delivered'?<samp className="text-green-500">Received</samp>:items?.status}</span></span> </h2>
          </div>
       
    <div className='grid grid-cols-3'>
      <div className="">
        {items?.products.map((item)=>{
          return <div className="flex gap-2 items-center" key={item?._id}>
            <img className='w-20 h-30 object-cover border rounded' src={item?.product?.imageUrls[0]} alt="" />
            <article className='flex flex-col gap-1 '>
            <h2 className='font-semibold'>{item?.product?.title}</h2>
            <p className='text-sm'>X{item?.quantity}</p>
            </article>
          </div>
        })}
      </div>
      <div className="flex flex-col gap-3">
        <article className='flex flex-col gap-2'>
         <p className=' capitalize'><span className='font-bold mr-2'>Name:</span>{items?.firstname} {items?.lastname}</p>
         <p><span className='font-bold mr-2'>Email:</span>{items?.email}</p>
         <p><span className='font-bold mr-2'>Phone:</span>{items?.phone}</p>
         <p><span className='font-bold mr-2'>Address:</span>{items?.address}</p>
         <p><span className='font-bold mr-2'>Order Date:</span>{items?.orderDate.slice(0,10)}</p>
        </article>
      </div>
      <div className="flex flex-col gap-1">
      <samp>
            <samp className='font-semibold'>Subtotal:</samp>
            <spam className=" mr-1">৳</spam>
             {items?.subtotal.toLocaleString()}
        </samp>
      <samp>
            <samp className='font-semibold'>Total:</samp>
            <spam className=" mr-1">৳</spam>
             {items?.total.toLocaleString()}
        </samp>
        <p><span className='font-bold mr-2'>Payment method:</span><span className=' capitalize text-blue-500 font-bold'>{items?.payment}</span></p>
       
        {items.status==='delivered'?
        <h5 className="font-bold text-sm text-green-500 mt-3">Product delivered successful.</h5>
        :<h5 className="font-bold text-sm text-green-500 mt-3">Product will arrive within 5 days</h5>}
         {items.status!=='confirmed' && items.status!=='delivered'?
        <button onClick={()=>handleDelete(items?._id)} className="bg-red-500 text-white font-semibold shadow-sm rounded-sm border py-2 mt-3">Cancel order</button>
        :null}
        {items?.deliveryDate ? <p><span className='font-bold mr-2 text-green-500'>Delivery Date:</span>{items?.deliveryDate.slice(0,10)}</p>:null}
      </div>
    </div>
        </div>
      })}
      </div>

<div className=" print:hidden">
<button className="flex items-center gap-2 bg-red-500 p-3 text-white mt-3 border shadow-md shadow-red-500/20" onClick={handlePrint}><FaPrint />Print this page</button>
</div>
    </div>
  )
}

export default OrderPage
