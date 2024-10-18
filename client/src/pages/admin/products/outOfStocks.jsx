import { useQuery } from "@tanstack/react-query"
import { fetchOutOfStockProducts } from "../../../api/productApi"
import { useNavigate } from "react-router-dom"

const OutOfStocks = () => {

const {data,isError,error,isLoading}=useQuery({
queryKey:['out-of-stock'],
queryFn:fetchOutOfStockProducts,      
})

const navigate = useNavigate()

  return (
    <div>
        <div className="">
            <h2 className="font-semibold text-xl">Stock out products</h2>
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
            </tr>
        </thead>
        <tbody>
        {data && data?.length === 0 ? (<p className="mt-3 text-center">No Product found.</p>): data?.map((item)=>{
               return<tr key={item._id}>
               <td className=""><img className="w-full h-16 object-cover p-1" src={item.imageUrls[0]} alt="" /></td>
               <td className=" capitalize hover:underline cursor-pointer" onClick={()=>navigate(`/product-view/${item.slug}`)}>{(item.title.slice(0,10)).toLowerCase()}</td>
               <td>{item?.brand}</td>
               <td className={`${item?.stock <=5 ? "text-red-600 font-semibold":"text-gray-700 font-semibold"}`}> {item?.stock=== 0 ? "Out of stock" : item?.stock}</td>
               <td> {item?.sold}</td>
               <td>{item?.category}</td>
               <td><span className="text-xl mr-1">৳</span>{item?.regularPrice.toLocaleString()}</td>
               <td>{item?.discountPercentage}%</td>
            
           </tr>
          })}
        
        </tbody>
      </table>

      {isLoading && <h5 className="text-center">Loading...</h5>}
      {isError && <p className="text-red-500 text-center">Error:{error.message}</p>}
    </div>
  )
}

export default OutOfStocks
