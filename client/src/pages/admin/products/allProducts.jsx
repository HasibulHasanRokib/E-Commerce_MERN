
import { LiaEdit } from "react-icons/lia";
import { FaTrash } from "react-icons/fa";
import { FaCirclePlus, FaPrint } from "react-icons/fa6";
import {useQuery,useMutation,useQueryClient} from "@tanstack/react-query"
import {toast } from 'react-toastify';
import { Link , useNavigate } from "react-router-dom"
import { deleteProduct, fetchProducts } from "../../../api/productApi";
import Swal from 'sweetalert2'

const AllProducts = () => {
  const navigate = useNavigate()

const {data,isLoading,isError,error}=useQuery({
  queryKey:['products'],
  queryFn:fetchProducts,

})



const queryClient= useQueryClient()

const {mutate}=useMutation({
  mutationFn:deleteProduct,
  onSuccess:(data)=>{
    queryClient.invalidateQueries({
      queryKey:["products"]
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
          text: "Your product has been deleted.",
          icon: "success"
        });
      }
    });
  }

  const handlePrint=()=>{
    window.print()
  }



  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="font-bold  text-2xl">Products</h2>
        <div className="flex items-center gap-3">
        <Link to={"/admin/add-product"} className="bg-slate-200 print:hidden flex items-center  font-semibold p-3 rounded-md border">
          <FaCirclePlus size={20} className="inline-block mr-2" />
          <p>Add New Product</p>
        </Link>
        <div className=" print:hidden">
        <button className="flex items-center gap-2 bg-red-500 p-3 text-white  border shadow-md shadow-red-500/20" onClick={handlePrint}><FaPrint />Print this page</button>
         </div>
        </div>
      
      </div>
      

      <table className="table-fixed">
        <thead >
            <tr className="bg-slate-100">
                <th>#</th>
                <th>Title</th>
                <th>Brand Name</th>
                <th>In Stock</th>
                <th>Sold</th>
                <th>Category</th>
                <th>Regular Price</th>
                <th>Discount Percentage</th>
                <th className=" print:hidden">Actions</th>
            </tr>
        </thead>
        <tbody>
        {data?.products && data?.products?.length === 0 ? (<p>No Product Added.</p>): data?.products.map((item)=>{
               return<tr key={item._id}>
               <td className=""><img className="w-full h-16 object-contain p-1" src={item.imageUrls[0]} alt="" /></td>
               <td className=" capitalize hover:underline cursor-pointer" onClick={()=>navigate(`/product-view/${item.slug}`)}>{(item.title.slice(0,10)).toLowerCase()}</td>
               <td>{item?.brand}</td>
               <td className={`${item?.stock <=5 ? "text-red-600 font-semibold":"text-gray-700 font-semibold"}`}> {item?.stock=== 0 ? "Out of stock" : item?.stock}</td>
               <td> {item?.sold}</td>
               <td>{item?.category}</td>
               <td><span className="text-xl mr-1">৳</span>{item?.regularPrice.toLocaleString()}</td>
               <td>{item?.discountPercentage}%</td>
               <td className=" print:hidden">
                   <Link to={`/admin/update-product/${item._id}`} className="text-blue-500 inline-block mr-4"><LiaEdit size={26}/></Link>
                   <button onClick={()=>handleDelete(item?._id)} className="text-red-500"><FaTrash size={20} /></button>
               </td>
           </tr>
          })}
        
        </tbody>
      </table>

      {isLoading && <h5 className="text-center">Loading...</h5>}
      {isError && <p className="text-red-500 text-center">Error:{error.message}</p>}
    </>
  )
}

export default AllProducts
