import {Link,  useNavigate} from "react-router-dom"
import Logo from '../assets/img/logo.jpg';
import { FaBagShopping,FaUser  } from "react-icons/fa6";
import { IoNotifications } from "react-icons/io5";
import {  useContext, useEffect} from "react";
import { AuthContext } from "../context/authContext";
import { ProductContext } from "../context/productContext";
import { useQuery } from "@tanstack/react-query";
import {  fetchOrders } from "../api/orderApi";

const Navbar = () => {

const{cartItems,setCartItems,active,setActive}=useContext(ProductContext)
const {user,dispatch} = useContext(AuthContext)
const navigate = useNavigate();

const handleLogout =async()=>{
localStorage.removeItem('jsonwebtoken')
localStorage.removeItem('user')
dispatch({type:"Logout"})
setCartItems([])
setActive('login')
navigate('/auth/login')
}

const { data:orders} = useQuery({
  queryKey: ["all-orders"],
  queryFn: fetchOrders,
});

const placeOrder = orders?.filter(data => data.status === 'order-placed');

  return (
    <div className="w-full print:hidden sticky inline-block top-0 left-0 right-0 z-10 py-3 px-10 bg-white shadow-sm">
    <div className="max-w-7xl mx-auto flex justify-between items-center">

        <Link onClick={()=>setActive("home")} to={user && user?.isAdmin===true ?"/admin/dashboard":"/"} className="h-16 w-16">
        <img className="w-full h-full" src={Logo} alt="" />
        </Link>

      <ul className="flex gap-10 items-center">
        {user && user?.isAdmin===true ?(<>
          <ul className="flex items-center gap-6">
          <li onClick={()=>setActive("admin-orders")}><Link className="flex items-center gap-1" to={"/admin/all-orders"}><IoNotifications size={25}/>
          <span className=" font-bold text-red-500">{placeOrder?.length}</span>
          </Link></li>
          <li><button type="button" onClick={handleLogout}>Logout</button></li>
          <li onClick={()=>setActive("dashboard")}><Link to={"/admin/dashboard"}><img className="w-10 h-10  rounded-full object-cover" src={user?.avatar} alt="avatar" /></Link></li>
          </ul>
         

         </>):( 
          <>
        <li className={`${active==="home"?"border-b-[1px] font-bold border-red-800 text-red-800":null}`} onClick={()=>setActive("home")}><Link to={'/'}>Home</Link></li>
        <li className={`${active==="portfolio"?"border-b-[1px] font-bold border-red-800 text-red-800":null}`} onClick={()=>setActive("portfolio")}><Link to={'/portfolio'}>Portfolio</Link></li>
        <li className={`${active==="products"?"border-b-[1px] font-bold border-red-800 text-red-800":null}`} onClick={()=>setActive("products")}><Link to={'/products'}>Products</Link></li>
        <li className={`${active==="services"?"border-b-[1px] font-bold border-red-800 text-red-800":null}`} onClick={()=>setActive("services")}><Link to={'/services'}>Services</Link></li>
        <li className={`${active==="about"?"border-b-[1px] font-bold border-red-800 text-red-800":null}`} onClick={()=>setActive("about")}><Link to={'/about'}>About</Link></li>
        <li className={`${active==="contact"?"border-b-[1px] font-bold border-red-800 text-red-800":null}`} onClick={()=>setActive("contact")}><Link to={'/contact'}>Contact</Link></li>
        <li className={`${active==="cart"?"text-red-800":null}`} onClick={()=>setActive("cart")}><Link to={'/cart'} className="flex items-center gap-1"><FaBagShopping /><span className=" font-bold">{cartItems?.length}</span></Link></li>
        {user ? (
          <>
          <li><button type="button" onClick={handleLogout}>Logout</button></li>
          <li className="w-10" onClick={()=>setActive("profile")}><Link to={`/profile/${user._id}`}><img  className="w-10 h-10  rounded-full object-cover" src={user?.avatar} alt="avatar" /></Link></li>
          </>
          ):( 
          <li className={`${active==="login"?"text-red-800":null}`} onClick={()=>setActive("login")}><Link to={'/auth/login'}><FaUser /></Link></li>
         )}   
          </>
        )} 
      </ul> 
    </div>
  </div>
  )
}

export default Navbar
