import { useContext, useState } from "react"
import Category from "../components/category"
import Price from "../components/price"
import Product from "../components/product"
import { useQuery } from "@tanstack/react-query"
import { fetchProducts } from "../api/productApi"
import Loading from "../components/loading"
import { ProductContext } from "../context/productContext"
import { CiSearch } from "react-icons/ci";

const Products = () => {

const [page,setPage]=useState(1)

const{filteredProducts,setProducts,setSearchFilter}=useContext(ProductContext)
const {isError,isLoading,error,data}=useQuery({
  queryKey:['products',{page}],
  queryFn:()=>fetchProducts(page),
  })
 
   setProducts(data?.products)

  return (
  <div className="max-w-7xl mx-auto py-3 px-2 ">
   
  <section className="grid grid-cols-5 gap-4">
    <div className="border-r-2 bg-white p-10">
      <Category/>
      <Price/>
    </div>
   
    <div className="col-span-4">
      <div className=" mb-4 flex items-center justify-between">
        <h2 className="inline-block font-bold text-3xl">Our Products</h2>
        <label className="relative block">
        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
        <CiSearch />
        </span>
        <input className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-gray-100 focus:ring-gray-200 focus:ring-1 sm:text-sm"  onChange={(e)=>setSearchFilter(e.target.value)}  placeholder="Search for anything..." type="text" name="search"/>
       </label>
      </div>
      <div className="grid grid-cols-4 gap-4">
         {filteredProducts?.length===0?<p>No product available.</p>:filteredProducts?.map((item)=>{
          return <Product product={item} key={item._id}/>
        })}
      </div> 

      {isLoading && <h5 className="text-center my-20"><Loading title={'fetching products'}/></h5>}
      {isError && <p className="text-red-500 text-center my-20">Error:{error.message}</p>}

       <div className="flex gap-3 items-center justify-center my-10">
         <button className="bg-white text-sm px-3 py-1 border shadow-sm" disabled={page <= 1 ?true :false} onClick={()=>setPage(page-1)} type="button">Previous</button>
           <span>{page}/{data?.totalPage}</span>
         <button className="bg-white text-sm px-3 py-1 border shadow-sm"  disabled={data?.totalPage===page?true:false} onClick={()=>setPage(page+1)} type="button">Next</button>
       </div>
   
    </div>
  </section>
  </div>
  )
}

export default Products
