import { useContext } from "react"
import { ProductContext } from "../context/productContext"

const Category = () => {

    const{setCategoryFilter}=useContext(ProductContext)

    const categoryOptions=[
      { label: 'All', value:'all' },
      { label: 'Sofa', value:'Sofa' },
      { label: 'Almirah', value:'Almirah' },
      { label: 'Bed', value:'Bed' },
      { label: 'Bulbs', value:'Bulbs' },
     
    ]

      return (
        <div id="category">
          <h2 className="text-xl font-bold mt-3">Category :</h2>
    
         <div className="price-section flex flex-col">
        
         {categoryOptions.map((item,index)=>{
            return <span key={index}>
             <input type="radio" className="cursor-pointer" onChange={(e)=>setCategoryFilter(e.target.value)} name="category" value={item.value} />
             <label className="text-sm ml-2">{item.label}</label>
            </span>
          })}
         </div>
        </div>
      )
    }
    
    export default Category