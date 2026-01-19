/*
Dashboard Page:
- Displays 2 different dashboard cards based on user type (patient, staff, doctor)
- Patients: shows list of doctors and their bookings
-
- Uses shared booking logic from bookingUtils.js
*/

import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import DashboardCard from "../components/DashboardCard.jsx";
import ListCard from "../components/ListCard.jsx";
import BookButton from "../components/BookButton.jsx";

import { useAuth } from "../contexts/AuthContext";
import { getDoctors } from "../api/doctors";
import { getPatientBookings } from "../api/bookings";
import { createBookHandler, manageBooking, cancelBooking } from "../utils/bookingUtils";

export default function DashboardPage() {
  const navigate = useNavigate();
  const handleBook = createBookHandler(navigate);
  const { userId, userType, isAuthenticated } = useAuth();
  const [doctors, setDoctors] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (userType !== "patient") return;

    async function fetchData() {
      try {
        const [doctorsData, bookingsData] = await Promise.all([
          getDoctors(),
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
      <h1>{getDashboardHeading(userType)}</h1>
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
              />
            ))}
          </DashboardCard>
          <DashboardCard title="My Bookings">
            {bookings.map((booking) => (
              <ListCard
                key={booking.id}
                icon={booking.icon}
                title={booking.title}
                info={booking.info}
                actions={
                  <>
                    <button
                      type="button"
                      onClick={() => manageBooking(booking.id)}
                    >
                      Manage Booking
                    </button>
                    <button
                      type="button"
                      onClick={() => cancelBooking(booking.id)}
                    >
                      Cancel Booking
                    </button>
                  </>
                }
              />
            ))}
          </DashboardCard>
        </>
      )}
    </main>
  );
}
