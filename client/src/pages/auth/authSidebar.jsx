import { Link } from "react-router-dom"
import { VscAccount } from "react-icons/vsc";
import { VscOutput } from "react-icons/vsc";
import { FaUserEdit } from "react-icons/fa";
import { useContext, } from "react";
import {AuthContext} from '../../context/authContext'
import { ProductContext } from "../../context/productContext";
import { FaListCheck } from "react-icons/fa6";

const AuthSidebar = () => {
const{user}=useContext(AuthContext)
const {active, setActive} = useContext(ProductContext)

  return (
    <div className=" relative print:hidden">
      <div className="fixed bg-white w-[18rem] border rounded p-3 h-screen ">
      <h2 className=" font-bold text-center text-lg mb-4 mt-3 border-b py-1">User Profile</h2>
        <ul className="flex flex-col gap-2 px-2">
        <li className={`py-3 hover:bg-slate-200 px-5  rounded-md ${active==='profile'?'bg-slate-200 shadow-sm border':null}`} onClick={()=>setActive("profile")}><Link to={`/profile/${user._id}`}><VscAccount className="inline-block mr-2" size={20}/>Profile</Link></li>
        <li className={`py-3 hover:bg-slate-200 px-5  rounded-md ${active==='order'?'bg-slate-200 shadow-sm border':null}`} onClick={()=>setActive("order")}><Link to={`/orders/user/${user._id}`}><VscOutput className="inline-block mr-2" size={20}/>Orders</Link></li>
        <li className={`py-3 hover:bg-slate-200 px-5   rounded-md ${active==='update'?'bg-slate-200 shadow-sm border':null}`} onClick={()=>setActive("update")}><Link to={`/update-profile/${user._id}`}><FaUserEdit className="inline-block mr-2" size={20}/>Update Profile</Link></li>
        <li className={`py-3 hover:bg-slate-200 px-5   rounded-md ${active==='userService'?'bg-slate-200 shadow-sm border':null}`} onClick={()=>setActive("userService")}><Link to={`/service/user/${user._id}`}><FaListCheck className="inline-block mr-2" size={20}/>Service</Link></li>
       </ul>
      </div>
    </div>
  )
}

export default AuthSidebar
