// biome-ignore assist/source/organizeImports: <explanation>
import { Routes, Route } from "react-router";
import DashboardPage from "../pages/DashboardPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import LogoutPage from "../pages/LogoutPage";
import SignupPage from "../pages/SignupPage";
import UserAdminPage from "../pages/UserAdminPage";
import PatientBookingsPage from "../pages/booking/PatientBookingsPage";
import CreateBookingPage from "../pages/booking/CreateBookingPage";
import BookingPage from "../pages/booking/BookingPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/useradmin" element={<UserAdminPage />} />
      <Route path="/logout" element={<LogoutPage />} />
      <Route path="/patients/:patientId/bookings" element={<PatientBookingsPage />} />
      <Route path="/patients/:patientId/bookings/create" element={<CreateBookingPage />} />
      <Route path="/bookings/:bookingId" element={<BookingPage />} />
    </Routes>
  );
}
