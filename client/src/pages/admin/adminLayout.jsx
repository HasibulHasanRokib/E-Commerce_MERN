import { useContext } from "react";
import Sidebar from "./sidebar";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";


const AdminLayout = () => {
  const {user} = useContext(AuthContext)
  return (
    <>
      {user?.isAdmin === true ? (
        <main className="py-4 px-2 grid grid-cols-5">
          <Sidebar />
          <div className="print:col-span-5 col-span-4 px-5">
            <Outlet />
          </div>
        </main>
     ) : ( 
        <Navigate to="/" />
     )}
    </>
  );
};

export default AdminLayout;
