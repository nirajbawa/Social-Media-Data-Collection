import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/Layouts/Navbar";
import { ToastContainer } from "react-toastify";
import useAuth from "../hooks/useAuth";

const AdminLayout = () => {
  const [authData] = useAuth();

  return (
    <div className="w-full h-full">
      <Navbar />
      <main className="px-10 sm:px-48 xl:px-48">
        {authData.isAuthenticated ? <Outlet /> : <Navigate to="/login" />}
        <ToastContainer />
      </main>
    </div>
  );
};

export default AdminLayout;
