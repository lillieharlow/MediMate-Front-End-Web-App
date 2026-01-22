import { Routes, Route } from "react-router";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import DashboardPage from "../pages/DashboardPage";
import UserAdminPage from "../pages/UserAdminPage";
import ProfilePage from "../pages/ProfilePage";
import PatientBookingsPage from "../pages/booking/PatientBookingsPage";
import CreateBookingPage from "../pages/booking/CreateBookingPage";
import BookingPage from "../pages/booking/BookingPage";
import LogoutPage from "../pages/LogoutPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/useradmin" element={<UserAdminPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/patients/:patientId/bookings" element={<PatientBookingsPage />} />
      <Route path="/patients/:patientId/bookings/create" element={<CreateBookingPage />} />
      <Route path="/bookings/:bookingId" element={<BookingPage />} />
      <Route path="/logout" element={<LogoutPage />} />
    </Routes>
  );
}
