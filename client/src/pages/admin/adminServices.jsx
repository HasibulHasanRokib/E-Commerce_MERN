import { useState } from "react"
import { services } from "../../components/services"

const AdminServices = () => {
  const [data,setData]=useState(services)

  return (
    <div>
    <h2 className="font-bold text-3xl">All Services</h2>
    <table className="table-fixed">
        <thead >
            <tr className="bg-slate-100">
                <th>#</th>
                <th>Image</th>
                <th>Title</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
        {data && data?.length === 0 ? (<p>No Product Added.</p>): data?.map((item,index)=>{
               return<tr key={item._id}>
                <td>{index+1}</td>
               <td className=""><img className="w-full h-16 object-contain p-1" src={item?.image} alt="" /></td>
               <td className=" capitalize hover:underline cursor-pointer">{item?.title}</td>
               <td>{item?.desc.slice(0,80)}</td>
           </tr>
          })}
        
        </tbody>
      </table>
    </div>
  )
}

export default AdminServices
