import { useContext } from "react";
import { VscArrowRight } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { ProductContext } from "../context/productContext";


const Hero = () => {
  const {setActive}=useContext(ProductContext)
  return (
    <>
  <section className="hero-section">
      <div className=" max-w-7xl ">
        <h2 className="text-6xl font-bold">Plan Interior</h2>
        <p className="text-lg max-w-lg my-2">Browse a selection of interior design ideas and modern layouts that will inspire every inch of your home - from the dining room and bedroom to the patio.</p>
        <Link to={'/services'}>
        <button onClick={()=>setActive('services')} className="border border-gray-600 px-5 py-2 font-semibold rounded-md mt-4 text-white bg-gray-600 shadow-sm hover:shadow-md">Services <VscArrowRight className="inline"/> </button>
        </Link>
      </div>
    </section>


    </>
  )
}

export default Hero
