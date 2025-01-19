import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home";
import RootLayout from "./Layouts/RootLayout";
import AdminLayout from "./Layouts/AdminLayout";
import AdminLoginPage from "./pages/Admin/Login";
import AdminPage from "./pages/Admin";

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<AdminLoginPage />} />
      </Route>

      <Route element={<AdminLayout />} path="/admin">
        <Route path="/admin" element={<AdminPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
