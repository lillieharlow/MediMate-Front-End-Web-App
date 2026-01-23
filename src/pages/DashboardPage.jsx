/*
Dashboard Page:
- Displays 2 different dashboard cards based on user type (patient, staff, doctor)
- Patients: shows "Our Doctos" and "My Bookings"
- Staff: shows "Patient Manager" and Doctor Manager"
- Doctor: shows "Current Booking" and "Todays Bookings"
- Uses shared booking logic from bookingUtils.js
*/

// biome-ignore assist/source/organizeImports: false positive
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";

import DashboardCard from "../components/dashboard/DashboardCard.jsx";
import PatientOurDoctorsCardList from "../components/dashboard/PatientOurDoctorsCardList.jsx";
import PatientMyBookingsCard from "../components/dashboard/PatientMyBookingsCard.jsx";
import StaffPatientManager from "../components/dashboard/StaffPatientManager.jsx";
import DoctorManagerCard from "../components/dashboard/DoctorManagerCard.jsx";
import CurrentBookingCard from "../components/dashboard/DoctorCurrentBookingCard.jsx";
import TodaysBookingsCard from "../components/dashboard/DoctorTodaysBookingsCard.jsx";
import { DashboardCardRow } from "../style/componentStyles";

import { useAuth } from "../contexts/AuthContext";
import { getAllDoctors } from "../api/doctor.js";
import {
  getPatientBookings,
  getDoctorBookings,
  getBookingById,
} from "../api/booking.js";
import { createBookHandler } from "../utils/bookingUtils";

export default function DashboardPage() {
  const navigate = useNavigate();
  const { userId, userType, isAuthenticated } = useAuth();
  const handleBook = createBookHandler(navigate, userId);
  const [bookings, setBookings] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [doctorBookings, setDoctorBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    if (userType !== "patient") return;

    async function fetchData() {
      try {
        const [doctorsData, bookingsData] = await Promise.all([
          getAllDoctors(),
          getPatientBookings(userId),
        ]);
        console.log("Fetched doctors:", doctorsData);
        console.log("Fetched patient bookings:", bookingsData);
        setDoctors(doctorsData);
        setBookings(bookingsData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    }

    fetchData();
  }, [userType, userId]);

  useEffect(() => {
    if (userType === "doctor") {
      async function fetchDoctorBookings() {
        const bookingsData = await getDoctorBookings(userId);
        setDoctorBookings(bookingsData);
        if (bookingsData && bookingsData.length > 0) {
          setSelectedBooking(bookingsData[0]);
        } else {
          setSelectedBooking(null);
        }
      }
      fetchDoctorBookings();
    }
  }, [userType, userId]);

  // Helper function to get dashboard heading based on user type
  function getDashboardHeading(type) {
    if (type === "patient") return "Patient Dashboard";
    if (type === "staff") return "Staff Dashboard";
    if (type === "doctor") return "Doctor Dashboard";
    return "Dashboard";
  }

  return !isAuthenticated ? (
    <Navigate to="/login" replace />
  ) : (
    <main>
      <h1 data-testid="app-dashboard-heading">
        {getDashboardHeading(userType)}
      </h1>
      {userType === "patient" && (
        <DashboardCardRow>
          <DashboardCard title="Our Doctors">
            <PatientOurDoctorsCardList doctors={doctors} onBook={handleBook} />
          </DashboardCard>
          <DashboardCard title="My Bookings">
            <PatientMyBookingsCard bookings={bookings} doctors={doctors} />
          </DashboardCard>
        </DashboardCardRow>
      )}
      {userType === "staff" && (
        <DashboardCardRow>
          <DashboardCard title="Patient Manager">
            <StaffPatientManager />
          </DashboardCard>
          <DashboardCard title="Doctor Manager">
            <DoctorManagerCard />
          </DashboardCard>
        </DashboardCardRow>
      )}
      {userType === "doctor" && (
        <DashboardCardRow>
          <DashboardCard title="Current Booking">
            <CurrentBookingCard booking={selectedBooking} />
          </DashboardCard>
          <TodaysBookingsCard
            doctorBookings={doctorBookings}
            containerClassName="doctor-manager-bookings"
            onBookingSelect={async (booking) => {
              if (booking?._id) {
                setSelectedBooking(await getBookingById(booking._id));
              } else {
                setSelectedBooking(booking);
              }
            }}
            selectedBooking={selectedBooking}
          />
        </DashboardCardRow>
      )}
    </main>
  );
}
