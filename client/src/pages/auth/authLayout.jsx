import { useContext } from "react";
import AuthSidebar from "./authSidebar"
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

const AuthLayout = () => {
  const {user} = useContext(AuthContext)
  return (
    <>
      {user ? (
        <main className="py-4 px-2 grid grid-cols-5">
          <AuthSidebar />
          <div className="print:col-span-5 col-span-4 px-5">
            <Outlet />
          </div>
        </main>
     ) : ( 
        <Navigate to="/" />
     )}
    </>
  );
}

export default AuthLayout
