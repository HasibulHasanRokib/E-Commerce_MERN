import { allProjects } from "../api/projectApi"
import Loading from "../components/loading"
import Project from "../components/project"
import {useQuery} from "@tanstack/react-query"
const PortfolioPage = () => {

  const{data,isLoading,isError,error}=useQuery({
    queryKey:['projects'],
    queryFn:allProjects,
  })

  return (
    <>
    <article className=" px-16 mt-8 text-center">
    <h2 className="text-4xl font-bold ">Interior Design Ideas To Inspire Every Room In Your Home</h2>
    <p className=" max-w-2xl mx-auto mt-5 text-md">Browse a selection of interior design ideas and modern layouts that will inspire every inch of your home - from the dining room and bedroom to the patio.</p>
    </article>
    {isLoading && <h5 className="my-20"><Loading title={'fetching portfolio'}/></h5>}
    {isError && <p className="text-red-500 text-center my-20">Error:{error.message}</p>}
    <section className="grid grid-cols-3 max-w-7xl mx-auto gap-3 my-10 ">
    {data && data.map((item)=>{
      return  <div key={item._id} >
              <Project project={item}/>
              </div>
    })}
   
    </section>
     
    </>
  )
}

export default PortfolioPage
