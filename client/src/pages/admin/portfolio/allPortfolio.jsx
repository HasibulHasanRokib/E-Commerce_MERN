import { LiaEdit } from "react-icons/lia";
import { FaTrash } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import {useQuery,useMutation,useQueryClient} from "@tanstack/react-query"
import { allProjects, deleteProject } from "../../../api/projectApi";
import {toast } from 'react-toastify';
import { Link , useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'

const AllPortfolio = () => {

const queryClient=useQueryClient()
const navigate = useNavigate()

const{data:projects,isLoading,isError,error}=useQuery({
  queryKey:['projects'],
  queryFn:allProjects,
})



const {mutate}=useMutation({
  mutationFn:deleteProject,
  onSuccess:(data)=>{
    queryClient.invalidateQueries({
      queryKey:["projects"]
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
          text: "Your portfolio has been deleted.",
          icon: "success"
        });
      }
    });
  }


  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="font-bold  text-2xl">Portfolio</h2>
        <Link to={"/admin/add-portfolio"} className="bg-slate-200 flex items-center  font-semibold py-2 px-3 rounded-md border">
          <FaCirclePlus size={20} className="inline-block mr-2" />
          <p>Add New</p>
        </Link>
      </div>
      

      <table className="table-fixed">
        <thead >
            <tr className="bg-slate-100">
                <th>#</th>
                <th>Title</th>
                <th>Location</th>
                <th>Type</th>
                <th>Architect</th>
                <th>Photography</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
          {projects && projects.map((item)=>{
               return<tr key={item._id}>
               <td className=""><img className="w-20 h-16  object-cover p-0.5 mx-auto" src={item.imageUrls[0]} alt="" /></td>
               <td className=" capitalize hover:underline cursor-pointer" onClick={()=>navigate(`/portfolio/${item.slug}`)}>{item.title.slice(0,15)}</td>
               <td>{item?.location.slice(0,18)}</td>
               <td> {item?.type.slice(0,18)}</td>
               <td>{item?.architect.slice(0,18)}</td>
               <td>{item.photography.slice(0,18)}</td>
               <td className="text-center">
                   <Link to={`/admin/update-portfolio/${item._id}`} className="text-blue-500 inline-block"><LiaEdit size={26}/></Link>
                   <button onClick={()=>handleDelete(item?._id)} className="text-red-500 ml-2"><FaTrash size={20} /></button>
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

export default AllPortfolio
