import {useQuery} from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { getProjectBySlug } from "../../../api/projectApi"

const Portfolio = () => {

const {slug}=useParams()
const {data,isLoading,isError,error}=useQuery({
  queryKey:['view-project',slug],
  queryFn:()=>getProjectBySlug(slug),
})

  
  return (
    <div className="max-w-6xl mx-auto py-5">
      <h2 className="font-semibold capitalize my-6 text-2xl tracking-widest text-orange-400">{data?.project?.title}</h2>

      <article className="flex flex-col gap-4 mb-5">
      <p className="text-sm font-bold"> {data?.project?.location} </p>
      <p className="text-sm text-slate-400">As seen in:<span className="font-semibold  ml-2 underline text-slate-700">{data?.project?.type}</span> </p>
      <p className="text-sm text-slate-400">Architect: <span className="font-semibold  ml-2 underline text-slate-700">{data?.project?.architect} </span></p>
      <p className="text-sm text-slate-400">Photography: <span className="font-semibold  ml-2 underline text-slate-700">{data?.project?.photography} </span></p>
      </article>


      <div className="flex flex-col gap-3">
        <div className="">
          <img className="w-full object-contain rounded-md" src={data?.project?.imageUrls[0]} alt="" />
        </div>
        <div className="grid grid-cols-3 gap-2">
          <img className="w-full rounded-md min-h-96 object-cover" src={data?.project?.imageUrls[1]} alt="" />
          <img className="w-full rounded-md min-h-96 object-cover" src={data?.project?.imageUrls[2]} alt="" />
          <img className="w-full rounded-md min-h-96 object-cover" src={data?.project?.imageUrls[3]} alt="" />
        </div>
        <div className="">
          <img className="w-full object-contain rounded-md" src={data?.project?.imageUrls[4]} alt="" />
        </div>
      </div>

      <div className="my-5">
        <h3 className="font-bold text-2xl text-orange-500 my-5">Description:</h3>
        <p className="text-sm">{data?.project.description}</p>
      </div>
   
      {isLoading && <h5 className="text-center">Loading...</h5>}
      {isError && <p className="text-red-500 text-center">Error:{error.message}</p>}
    </div>
  )
}

export default Portfolio
