import { Link } from "react-router-dom"
import Hero from "../components/hero"
import Product from "../components/product"
import Project from "../components/project"
import {useQuery} from "@tanstack/react-query"
import { getProjectsByLimit } from "../api/projectApi"
import { fetchNewProducts } from "../api/productApi"

const Home = () => {
  const{data:projects}=useQuery({
    queryKey:['projectsByLimit'],
    queryFn:getProjectsByLimit,
  })
  const{data:products}=useQuery({
    queryKey:['new-products'],
    queryFn:fetchNewProducts,
  })

  

  return (
    <>
     <Hero/>
     
    {/* Projects */}
  <section className="p-3 max-w-7xl mx-auto">
    <h2 className="font-bold text-4xl text-center py-10">Our Projects </h2>
        <div className="grid grid-cols-3 gap-5">
         {projects?.map((item)=>{
          return <Project key={item._id} project={item}/>
         })}
        </div>
    </section> 

    {/* Products */}
    <section className="p-3 max-w-7xl mx-auto ">
    <h2 className="font-bold text-4xl text-center py-10">Our Products </h2>
    <div className="grid grid-cols-4 gap-5">
      {products?.map((item)=>{
        return <Product key={item._id} product={item}/>
      })} 
    </div>
    <div className="my-4 text-center">
    <Link to={'/products'} className="px-4  py-3 rounded shadow-sm font-semibold"></Link>
    </div>
    </section>
  
    </>
  )
}

export default Home
