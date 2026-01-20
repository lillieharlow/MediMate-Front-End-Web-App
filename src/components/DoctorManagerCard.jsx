/*
DoctorManagerCard component
- Card for staff to select a doctor and view today's bookings
- Handles doctor dropdown, booking list, and booking click actions
*/

// biome-ignore assist/source/organizeImports: false positive
import { useState, useEffect } from "react";
import { getDoctors, getDoctorBookings } from "../api/doctors";
import { useNavigate } from "react-router-dom";

function DoctorManagerCard() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [todaysBookings, setTodaysBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getDoctors().then(setDoctors);
  }, []);

  useEffect(() => {
    if (selectedDoctor) {
      getDoctorBookings(selectedDoctor).then(setTodaysBookings);
    } else {
      setTodaysBookings([]);
    }
  }, [selectedDoctor]);

  return (
    <div>
      <div className="doctor-manager-select">
        <div>Select doctor:</div>
        <select
          value={selectedDoctor}
          onChange={e => setSelectedDoctor(e.target.value)}
        >
          <option value="">-- Select Doctor --</option>
          {doctors.map(doc => (
            <option key={doc.id} value={doc.id}>{doc.title}</option>
          ))}
        </select>
      </div>
      <h4>Today's bookings</h4>
      <div className="doctor-manager-bookings">
        {todaysBookings.length === 0 ? (
          <div>No bookings for today.</div>
        ) : (
          todaysBookings.map(booking => (
            <button
              key={booking.id}
              className="doctor-booking-listcard"
              type="button"
              onClick={() => navigate(`/bookings/${booking.id}`)}
            >
              <span role="img" aria-label="clock">⏰</span>
              <span>{booking.time}</span>
              <span>{booking.patientName}</span>
            </button>
          ))
        )}
      </div>
    </div>
  );
}

DoctorManagerCard.propTypes = {};

export default DoctorManagerCard;
