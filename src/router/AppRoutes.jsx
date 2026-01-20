import { Route, Routes } from "react-router";
import DashboardPage from "../pages/DashboardPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import LogoutPage from "../pages/LogoutPage";
import SignupPage from "../pages/SignupPage";
import UserAdminPage from "../pages/UserAdminPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/useradmin" element={<UserAdminPage />} />
      <Route path="/logout" element={<LogoutPage />} />
    </Routes>
  );
}
