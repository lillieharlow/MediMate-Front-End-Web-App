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
import BookButton from "../components/button/BookButton.jsx";
import StaffPatientManager from "../components/StaffPatientManager.jsx";
import DoctorManagerCard, {
  DoctorManagerListCard,
} from "../components/DoctorManagerCard.jsx";
import { DashboardCardRow } from "../style/componentStyles";

import { useAuth } from "../contexts/AuthContext";
import { getAllDoctors } from "../api/doctors";
import { getPatientBookings, getDoctorBookings } from "../api/bookings";
import {
  createBookHandler,
  manageBooking,
  cancelBooking,
} from "../utils/bookingUtils";
import ManageBookingButton from "../components/button/ManageBookingButton.jsx";
import CancelBookingButton from "../components/button/CancelBookingButton.jsx";

export default function DashboardPage() {
  const navigate = useNavigate();
  const { userId, userType, isAuthenticated } = useAuth();
  const handleBook = createBookHandler(navigate, userId);
  const [bookings, setBookings] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [doctorBookings, setDoctorBookings] = useState([]);

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
        console.log("Fetched doctor bookings:", bookingsData);
        setDoctorBookings(bookingsData);
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
            {doctors.map((doctor) => (
              <ListCard
                key={doctor.id}
                image={doctor.image}
                title={doctor.title}
                subtitle={doctor.subtitle}
                info={doctor.info}
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
            {/* Current booking list item */}
            {doctorBookings.length > 0 ? (
              <DoctorManagerListCard booking={doctorBookings[0]} />
            ) : (
              <div>No current booking.</div>
            )}
            <div>
              <strong>Patient Notes</strong>
              <div className="notes-block">
                <div>{doctorBookings[0]?.patientNotes || "No notes."}</div>
              </div>
            </div>
            <div>
              <strong>Appointment Notes</strong>
              <div className="notes-block">
                <textarea
                  placeholder="Add appointment notes..."
                  defaultValue={doctorBookings[0]?.appointmentNotes || ""}
                />
              </div>
            </div>
          </DashboardCard>
          <DashboardCard title="Today's Bookings">
            {doctorBookings.length === 0 ? (
              <div>No bookings for today.</div>
            ) : (
              doctorBookings.map((booking) => (
                <DoctorManagerListCard key={booking.id} booking={booking} />
              ))
            )}
          </DashboardCard>
        </DashboardCardRow>
      )}
    </main>
  );
}
