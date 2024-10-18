import { useContext } from "react"
import { ProductContext } from "../context/productContext"

const Price = () => {

const{setPriceRangeFilter}=useContext(ProductContext)

const priceRangeOptions=[
    { label: 'Any Price', value: 'any' },
    { label: '0 - 1,000 ৳', value: '0-1000' },
    { label: '1,001 ৳ - 3,000 ৳', value: '1000-3000' },
    { label: '3,001 ৳- 5,000 ৳', value: '3001-5000' },
    { label: '5,001 ৳- 8,000 ৳', value: '5001-8000' },
    { label: '8,001 ৳- 10,000 ৳', value: '8001-10000' },
    { label: 'Over-100,000 ৳', value: '10001-1000000' },
  ]



  return (
    <div id="price">
      <h2 className="text-xl font-bold mt-3">Price Range :</h2>

     <div className="price-section flex flex-col">
     {priceRangeOptions.map((item,index)=>{
        return <span key={index}>
         <input type="radio" className="cursor-pointer" name="price" onChange={(e)=>setPriceRangeFilter(e.target.value)} value={item.value} />
         <label className="text-sm ml-2">{item.label}</label>
        </span>
      })}
     </div>
    </div>
  )
}

export default Price