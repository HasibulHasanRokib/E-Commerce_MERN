import { Navigate, Outlet } from "react-router-dom";
import Banner from "../components/banner";
import Footer from "../layout/footer";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
const HomeLayout = () => {
  return (
    <div>
      <Outlet />
      <Banner />
      <Footer />
    </div>
  );
};

export default HomeLayout;
