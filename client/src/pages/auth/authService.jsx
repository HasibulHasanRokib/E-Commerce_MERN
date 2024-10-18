import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { deleteService, userService } from "../../api/serviceApi"
import Project from "../../components/project"
import {toast } from 'react-toastify';
import Swal from 'sweetalert2'

const AuthService = () => {

   const {id}=useParams()

    const{data,isError,error}=useQuery({
     queryKey:['user-service',id],
     queryFn:()=>userService(id)
    })

    const queryClient= useQueryClient()

    const {mutate}=useMutation({
      mutationFn:deleteService,
      onSuccess:(data)=>{
        queryClient.invalidateQueries({
          queryKey:["user-service"]
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
            text: "Your request has been deleted.",
            icon: "success"
          });
        }
      });
    }

  return (
    <div>
      <h2 className='font-semibold text-3xl'>User Services</h2>
      {data?.length === 0 ? <p>No request added!</p>:data?.map((item)=>{
        return <div key={item._id} className="bg-white w-full grid grid-cols-2 p-4 mt-5 border rounded-md shadow-sm">
               <div>
                <p className="font-semibold text-2xl mb-2">Request for services:</p>
                {item?.servicesName?.map((data,index)=>{
                    return <div className="flex" key={index}>
                        <span className="my-2 font-semibold">{index+1}.</span>
                        <span className="my-2 font-semibold">{data}</span>
                    </div>
                })}
                <h5 className="text-blue-500 font-semibold">*Authority contact with you as soon as possible.</h5>
                <button onClick={()=>handleDelete(item._id)} className="bg-red-500 py-3 px-4 mt-3 font-semibold text-white border rounded uppercase shadow-sm hover:opacity-90 " type="button">Cancel</button>
               </div>

               {item?.portfolioId ? (
                  <div className="">
                  <p className="font-semibold text-xl mb-2">Request for Portfolio:</p>
                  <div className="w-80">
                  <Project project={item?.portfolioId}/>
                 </div>
                 </div>
                 ):null}

        </div>
      })}
      {isError && <p className="font-semibold text-red-500">{error.message}</p>}
    </div>
  )
}

export default AuthService
