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

function DoctorManagerListCard({ booking }) {
  return (
    <div className="doctor-manager-listcard">
      <span role="img" aria-label="clock">
        ⏰
      </span>
      <span>{booking.time}</span>
      <span>{booking.patientName}</span>
    </div>
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
      .then((result) => {
        if (Array.isArray(result)) {
          setDoctors(result);
        } else {
          setDoctors([]);
          setErrorDoctors(result?.message || "Failed to load doctors.");
        }
      })
      .finally(() => setLoadingDoctors(false));
  }, []);

  useEffect(() => {
    if (selectedDoctor) {
      setLoadingBookings(true);
      setErrorBookings("");
      getDoctorBookings(selectedDoctor)
        .then(setTodaysBookings)
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
          onChange={(e) => setSelectedDoctor(e.target.value)}
        >
          <option value="">-- Select Doctor --</option>
          {(() => {
            if (loadingDoctors) return <option disabled>Loading...</option>;
            if (errorDoctors) return <option disabled>{errorDoctors}</option>;
            if (!Array.isArray(doctors)) return <option disabled>Failed to load doctors.</option>;
              return doctors.map((doctor, idx) => (
                <option key={doctor._id || idx} value={doctor._id}>
                  {doctor.firstName} {doctor.lastName}
                </option>
              ));
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
            return todaysBookings.map((booking) => (
              <DoctorManagerListCard key={booking.id} booking={booking} />
            ));
        })()}
      </div>
    </div>
  );
}

DoctorManagerCard.propTypes = {};

export { DoctorManagerListCard };
export default DoctorManagerCard;
