import { useQuery } from "@tanstack/react-query"
import { fetchDesigners } from "../api/designerApi"
import Designer from "../components/designer"
import Loading from "../components/loading"

const Designers = () => {

  const {data,isLoading,isError,error}=useQuery({
    queryKey:["designers"],
    queryFn:fetchDesigners
 })


  return (
    <>
      <article className=" px-16 mt-5 text-center">
        <h2 className="text-5xl font-bold ">Havenly Designers</h2>
        <p className=" max-w-2xl mx-auto mt-5 text-md">With degrees from certified interior design programs around the country, and memberships and certifications like LEED and ASID, our online interior designers are here to help you create your dream home.</p>
      </article>
      {isLoading && <h5 className="text-center my-20"><Loading title={'Loading'}/></h5>}
      {isError && <p className="text-red-500 text-center my-20">Error:{error.message}</p>}      
      <section className='max-w-7xl mx-auto p-4 my-10 grid grid-cols-4 gap-3'>
        {data?.designers.map((item)=>{
          return <Designer item={item} key={item._id}/>
        })} 
      
      </section>
    
    </>
  )
}

export default Designers
