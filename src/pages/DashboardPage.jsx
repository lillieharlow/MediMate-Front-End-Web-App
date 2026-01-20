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
import { Navigate, useNavigate } from "react-router-dom";

import DashboardCard from "../components/DashboardCard.jsx";
import ListCard from "../components/ListCard.jsx";
import BookButton from "../components/BookButton.jsx";
import StaffPatientManager from "../components/StaffPatientManager.jsx";
import DoctorManagerCard from "../components/DoctorManagerCard.jsx";

import { useAuth } from "../contexts/AuthContext";
import { getAllDoctors } from "../api/doctors";
import { getPatientBookings } from "../api/bookings";
import {
  createBookHandler,
  manageBooking,
  cancelBooking,
} from "../utils/bookingUtils";
import ManageBookingButton from "../components/ManageBookingButton.jsx";
import CancelBookingButton from "../components/CancelBookingButton.jsx";

export default function DashboardPage() {
  const navigate = useNavigate();
  const handleBook = createBookHandler(navigate);
  const { userId, userType, isAuthenticated } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    if (userType !== "patient") return;

    async function fetchData() {
      try {
        const [doctorsData, bookingsData] = await Promise.all([
          getAllDoctors(),
          getPatientBookings(userId),
        ]);
        setDoctors(doctorsData);
        setBookings(bookingsData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    }

    fetchData();
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
      <h1 data-testid="app-dashboard-heading">{getDashboardHeading(userType)}</h1>
      {userType === "patient" && (
        <>
          <DashboardCard title="Our Doctors">
            {doctors.map((doc) => (
              <ListCard
                key={doc.id}
                image={doc.image}
                title={doc.title}
                subtitle={doc.subtitle}
                info={doc.info}
                actions={<BookButton onBook={handleBook} />}
                layout="our-doctors"
              />
            ))}
          </DashboardCard>
          <DashboardCard
            title="My Bookings"
            actions={<BookButton onBook={handleBook} />}
          >
            {bookings.length === 0 ? (
              <div className="no-bookings-message">
                You don’t have any more bookings.
              </div>
            ) : (
              bookings.map((booking) => (
                <ListCard
                  key={booking.id}
                  icon={booking.icon}
                  title={booking.title}
                  info={booking.info}
                  bookingDate={booking.date}
                  bookingTime={booking.time}
                  doctorName={booking.doctorName}
                  actions={
                    <>
                      <ManageBookingButton
                        bookingId={booking.id}
                        onManage={manageBooking}
                      />
                      <CancelBookingButton
                        bookingId={booking.id}
                        onCancel={cancelBooking}
                      />
                    </>
                  }
                  layout="my-bookings"
                />
              ))
            )}
          </DashboardCard>
        </>
      )}
      {userType === "staff" && (
        <>
          <DashboardCard title="Patient Manager">
            <StaffPatientManager />
          </DashboardCard>
          <DashboardCard title="Doctor Manager">
            <DoctorManagerCard />
          </DashboardCard>
        </>
      )}
      {/* TODO: Add doctor dashboard with different info */}
    </main>
  );
}
