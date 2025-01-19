import { Outlet } from "react-router-dom";
import Navbar from "../components/Layouts/Navbar";
import { ToastContainer } from "react-toastify";

const RootLayout = () => {
  return (
    <div className="w-full h-full">
      <Navbar />
      <main className="px-10 sm:px-48 xl:px-48">
        <Outlet />
        <ToastContainer />
      </main>
    </div>
  );
};

export default RootLayout;
