import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { allService, deleteService } from "../../api/serviceApi";
import Project from "../../components/project";
import { toast } from "react-toastify";
import Swal from 'sweetalert2'
import { FaPrint } from "react-icons/fa6";

const Requests = () => {

  const { data:services} = useQuery({
    queryKey: ["services"],
    queryFn:allService,
  });

  const queryClient= useQueryClient()

    const {mutate}=useMutation({
      mutationFn:deleteService,
      onSuccess:(data)=>{
        queryClient.invalidateQueries({
          queryKey:["services"]
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

    const handlePrint=()=>{
      window.print()
    }
  

  return (
    <div>
        <div className="flex justify-between items-center">
      <h2 className="font-bold text-2xl mb-5">Service requests</h2>
      <button className="flex print:hidden items-center gap-2 bg-red-500 p-3 text-white  border shadow-md shadow-red-500/20" onClick={handlePrint}><FaPrint />Print this page</button>
      </div>
      <div className="flex flex-col gap-3 mt-6">
      {services?.length === 0 ? (
          <p>No services data!</p>
        ) : (
          services?.map((items) => {
            return (
              <div className=" bg-white p-4 border shadow-sm" key={items?._id}>
                <div className="py-2 mb-2 border-b-2 flex justify-between items-center">
                  <div className="flex justify-between items-center w-full px-5">
                    <p><span className="font-bold text-2xl">Services code:</span> {items?._id}</p>
                    <button onClick={()=>handleDelete(items._id)} className="bg-red-500 py-3 px-4 mt-3 font-semibold text-white border rounded uppercase print:hidden shadow-sm hover:opacity-90 " type="button">Delete</button>
                  </div>
                  <h2>

                  </h2>
                </div>

                <div className="grid grid-cols-3">
                  <div className="">
                    <h2 className="font-bold text-xl">Chosen services:</h2>
                    {items?.servicesName.map((item,index) => {
                    return <div className="flex" key={index}>
                    <span className="my-2 font-semibold">{index+1}.</span>
                    <span className="my-2 font-semibold">{item}</span>
                  </div>
                    })}
                  </div>
                  <div className="flex flex-col gap-3">
                    <article className="flex flex-col gap-2">
                      <p className=" capitalize">
                        <span className="font-bold mr-2">Name:</span>
                        {items?.userId.name}
                      </p>
                      <p>
                        <span className="font-bold mr-2">Email:</span>
                        {items?.userId.email}
                      </p>
                      <p>
                        <span className="font-bold mr-2">Phone:</span>
                        {items?.phone}
                      </p>
                      <p>
                        <span className="font-bold mr-2">Address:</span>
                        {items?.address}
                      </p>
                    
                 
                    </article>
                  </div>

                 {items?.portfolioId ? (
                  <div className="">
                  <p className="font-semibold text-xl mb-2">Request for Portfolio:</p>
                  <div className="w-80">
                  <Project project={items?.portfolioId}/>
                 </div>
                 </div>
                 ):null}
               


                </div>

              </div>
            );
          })
        )}
      </div>
    </div>
  )
}

export default Requests
