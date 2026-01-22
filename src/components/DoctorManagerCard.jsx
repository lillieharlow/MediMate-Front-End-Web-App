/*
DoctorManagerCard component
- Child component of DashboardCard for staff user type
- Card for staff to select a doctor and view the doctor's bookings for the day
- DoctorManagerListCard is a child component used to render each booking inside DoctorManagerCard
*/

// biome-ignore assist/source/organizeImports: false positive
import PropTypes from "prop-types";
import { useState, useEffect } from "react";

import { getAllDoctors } from "../api/doctor";
import { getDoctorBookings } from "../api/booking";
import { getPatientById } from "../api/patient";

import styled from "styled-components";

const BookingCard = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 0.75rem 1rem;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  background: #fafbfc;
`;

const BookingTime = styled.span`
  font-weight: bold;
  margin-right: 12px;
  color: #000000;
`;

const BookingPatient = styled.span`
  font-weight: bold;
  color: #3d3c3c;
`;

function DoctorManagerListCard({ booking }) {
  const [patientName, setPatientName] = useState(booking.patientId || "");
  useEffect(() => {
    let isMounted = true;
    if (booking.patientId) {
      getPatientById(booking.patientId).then((patient) => {
        if (isMounted && patient) {
          // Support both direct and populated user fields
          const user = patient.user && typeof patient.user === 'object' ? patient.user : {};
          const firstName = patient.firstName || user.firstName || '';
          const lastName = patient.lastName || user.lastName || '';
          setPatientName(`${firstName} ${lastName}`.trim());
        }
      });
    }
    return () => {
      isMounted = false;
    };
  }, [booking.patientId]);
  return (
    <BookingCard>
      <span role="img" aria-label="clock">
        ⏰
      </span>
      <BookingTime>
        {booking.datetimeStart
          ? new Date(booking.datetimeStart).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          : ""}
      </BookingTime>
      <BookingPatient>{patientName}</BookingPatient>
    </BookingCard>
  );
}

DoctorManagerListCard.propTypes = {
  booking: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    time: PropTypes.string.isRequired,
    patientName: PropTypes.string.isRequired,
  }).isRequired,
};

function DoctorManagerCard() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [todaysBookings, setTodaysBookings] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(true);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [errorDoctors, setErrorDoctors] = useState("");
  const [errorBookings, setErrorBookings] = useState("");

  useEffect(() => {
    setLoadingDoctors(true);
    setErrorDoctors("");
    getAllDoctors()
      .then((res) => {
        setDoctors(res);
      })
      .finally(() => setLoadingDoctors(false));
  }, []);

  useEffect(() => {
    if (selectedDoctor) {
      setLoadingBookings(true);
      setErrorBookings("");
      getDoctorBookings(selectedDoctor)
        .then((bookings) => {
          let bookingsArr = bookings;
          if (
            bookings &&
            typeof bookings === "object" &&
            !Array.isArray(bookings)
          ) {
            bookingsArr = Object.values(bookings);
          }
          if (!Array.isArray(bookingsArr)) bookingsArr = [];
          const today = new Date();
          const isToday = (dateString) => {
            if (!dateString) return false;
            const date = new Date(dateString);
            return (
              date.getFullYear() === today.getFullYear() &&
              date.getMonth() === today.getMonth() &&
              date.getDate() === today.getDate()
            );
          };
          const todays = bookingsArr.filter((b) => isToday(b.datetimeStart));
          setTodaysBookings(todays);
        })
        .finally(() => setLoadingBookings(false));
    } else {
      setTodaysBookings([]);
    }
  }, [selectedDoctor]);

  return (
    <div>
      <div className="doctor-manager-select">
        <div>Select doctor</div>
        <select
          value={selectedDoctor}
          onChange={(e) => {
            // Always set as string
            setSelectedDoctor(e.target.value);
          }}
        >
          <option value="">-- Select Doctor --</option>
          {(() => {
            if (loadingDoctors) return <option disabled>Loading...</option>;
            if (errorDoctors) return <option disabled>{errorDoctors}</option>;
            return (doctors || []).map((doctor) => {
              const userId = doctor.user && typeof doctor.user === 'object' ? doctor.user._id : doctor.user;
              return (
                <option key={String(userId)} value={String(userId)}>
                  {doctor.firstName} {doctor.lastName}
                </option>
              );
            });
          })()}
        </select>
      </div>
      <h4>Today's bookings</h4>
      <div className="doctor-manager-bookings">
        {(() => {
          if (loadingBookings) return <div>Loading bookings...</div>;
          if (errorBookings) return <div>{errorBookings}</div>;
          if (!Array.isArray(todaysBookings) || todaysBookings.length === 0)
            return <div>No bookings for today.</div>;
          return todaysBookings.map((booking, idx) => {
            const key =
              booking._id || booking.id || `${idx}-${JSON.stringify(booking)}`;
            return <DoctorManagerListCard key={key} booking={booking} />;
          });
        })()}
      </div>
    </div>
  );
}

DoctorManagerCard.propTypes = {};

export { DoctorManagerListCard };
export default DoctorManagerCard;
