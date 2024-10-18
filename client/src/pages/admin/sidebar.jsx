import { Link } from "react-router-dom"
import { FaAddressBook, FaBagShopping,  FaCartPlus,  FaCartShopping, FaChartLine, FaClapperboard, FaRegUser,FaListCheck,FaCircleExclamation  } from "react-icons/fa6";
import { useContext } from "react";
import { ProductContext } from "../../context/productContext";

const Sidebar = () => {
const {active,setActive}=useContext(ProductContext)
  
  return (
    <div className="relative print:hidden">
      <div className=" fixed bg-white p-4 w-72">
      <h2 className=" font-bold text-lg mb-4 mt-3 border-b py-1">Dashboard</h2>

<ul className="flex flex-col gap-2 px-2 overflow-y-scroll h-[70vh] pb-6">
   <li className={`py-3 px-4 hover:bg-slate-200  rounded-md ${active==='dashboard'?'bg-slate-200':null}`} onClick={()=>setActive("dashboard")}><Link to={"/admin/dashboard"}><FaChartLine className="inline-block mr-2"/>Dashboard</Link></li>
   <li className={`py-3 px-4 hover:bg-slate-200  rounded-md ${active==='portfolios'?'bg-slate-200':null}`} onClick={()=>setActive("portfolios")}><Link to={"/admin/all-portfolio"}><FaClapperboard className="inline-block mr-2" />Portfolio</Link></li>
   <li className={`py-3 px-4 hover:bg-slate-200  rounded-md ${active==='products'?'bg-slate-200':null}`} onClick={()=>setActive("products")}><Link to={"/admin/all-products"}><FaBagShopping className="inline-block mr-2" />Products</Link></li>
   <li className={`py-3 px-4 hover:bg-slate-200  rounded-md ${active==='out-of-stocks'?'bg-slate-200':null}`} onClick={()=>setActive("out-of-stocks")}><Link to={"/admin/stock-out-products"}><FaBagShopping className="inline-block mr-2" />Out of Stocks</Link></li>
   {/* <li className={`py-3 px-4 hover:bg-slate-200  rounded-md ${active==='designers'?'bg-slate-200':null}`} onClick={()=>setActive("designers")}><Link to={"/admin/all-designers"}><FaAddressBook className="inline-block mr-2" />Designers</Link></li> */}
   <li className={`py-3 px-4 hover:bg-slate-200  rounded-md ${active==='users'?'bg-slate-200':null}`} onClick={()=>setActive("users")}><Link to={'/admin/all-users'}><FaRegUser className="inline-block mr-2" />Users</Link></li>
   <li className={`py-3 px-4 hover:bg-slate-200  rounded-md ${active==='admin-orders'?'bg-slate-200':null}`} onClick={()=>setActive("admin-orders")}><Link to={"/admin/all-orders"}><FaCartShopping className="inline-block mr-2" />Total Orders</Link></li>
   <li className={`py-3 px-4 hover:bg-slate-200  rounded-md ${active==='confirm'?'bg-slate-200':null}`} onClick={()=>setActive("confirm")}><Link to={"/admin/confirmed-orders"}><FaCartShopping className="inline-block mr-2" />Confirm Orders</Link></li>
   <li className={`py-3 px-4 hover:bg-slate-200  rounded-md ${active==='delivered'?'bg-slate-200':null}`} onClick={()=>setActive("delivered")}><Link to={"/admin/delivered-orders"}><FaCartPlus  className="inline-block mr-2" />Delivered</Link></li>
   <li className={`py-3 px-4 hover:bg-slate-200  rounded-md ${active==='admin-services'?'bg-slate-200':null}`} onClick={()=>setActive("admin-services")}><Link to={"/admin/services"}><FaListCheck  className="inline-block mr-2" />Services</Link></li>
   <li className={`py-3 px-4 hover:bg-slate-200  rounded-md ${active==='admin-request'?'bg-slate-200':null}`} onClick={()=>setActive("admin-request")}><Link to={"/admin/request"}><FaCircleExclamation  className="inline-block mr-2" />Requests</Link></li>
</ul>
      </div>
 
     
    </div>
  )
}

export default Sidebar
