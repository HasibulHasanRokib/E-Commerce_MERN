
import { FaFacebookF, FaInstagram, FaTrash, FaTwitter, FaYoutube } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import {useQuery,useMutation,useQueryClient} from "@tanstack/react-query"
import {toast } from 'react-toastify';
import { Link} from "react-router-dom"
import { deleteDesigner, fetchDesigners } from "../../../api/designerApi";

const AllDesigners = () => {


const {data,isLoading,isError,error}=useQuery({
queryKey:["designers"],
queryFn:fetchDesigners

})


const queryClient= useQueryClient()

const {mutate}=useMutation({
  mutationFn:deleteDesigner,
  onSuccess:(data)=>{
    queryClient.invalidateQueries({
      queryKey:["designers"]
     })
    if(data.success === false){
     return toast.warning(data.message)
    }else{
     toast.success(data.message)
     return;
    }
    }
   })

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="font-bold  text-2xl">Designers</h2>
        <Link to={"/admin/add-designer"} className="bg-slate-200 flex items-center  font-semibold py-2 px-3 rounded-md border">
          <FaCirclePlus size={20} className="inline-block mr-2" />
          <p>Add Designer</p>
        </Link>
      </div>
      

      <table className="table-fixed">
        <thead >
            <tr className="bg-slate-100">
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Address</th>
                <th>Status</th>
                <th>Contact</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
       {data?.designers.map((item)=>{
        return <tr key={item._id}>
          <td><img className="w-[4rem] h-[4rem] rounded-full border-2 mx-auto" src={item.avatar} alt="" /></td>
          <td>{item.name}</td>
          <td>{item.email}</td>
          <td className=" capitalize">{item.gender}</td>
          <td>{item.address}</td>
          <td className=" capitalize">{item.status}</td>
          <td>
          <ul className='flex gap-2 justify-center'>
                <li className='hover:text-blue-500'><a href={item.fbLink} target="_blank"><FaFacebookF/></a></li>
                <li className='hover:text-blue-500'><Link to={item.twitterLink}><FaTwitter/></Link></li>
                <li className='hover:text-blue-500'><Link to={item.instagramLink}><FaInstagram/></Link></li>
                <li className='hover:text-blue-500'><Link to={item.youtubeLink}><FaYoutube/></Link></li>
            </ul>
          </td>
          <td className="text-center">
          <button onClick={()=>mutate(item?._id)} className="text-red-500 ml-2"><FaTrash size={20} /></button>
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

export default AllDesigners

