/*
DoctorManagerCard component
- Child component of DashboardCard for staff user type
- Card for staff to select a doctor and view the doctor's bookings for the day
- DoctorManagerListCard is a child component used to render each booking inside DoctorManagerCard
*/

// biome-ignore assist/source/organizeImports: manually ordered for clarity
import { useState, useEffect } from "react";
import { getAllDoctors } from "../../api/doctor";
import {
  StyledLabel,
  StyledSelect,
  ListSeparator,
} from "../../style/componentStyles";
import TodaysBookingsCard from "./DoctorTodaysBookingsCard";
import { isToday } from "../../utils/patientUtils";

function DoctorManagerCard({
  selectedDoctor,
  setSelectedDoctor,
  doctorBookings,
  disablePointer,
}) {
  const [doctors, setDoctors] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(true);
  const [errorDoctors, setErrorDoctors] = useState("");

  useEffect(() => {
    setLoadingDoctors(true);
    setErrorDoctors("");
    getAllDoctors()
      .then((res) => {
        setDoctors(res);
      })
      .catch(() => {
        setErrorDoctors("Failed to load doctors");
      })
      .finally(() => setLoadingDoctors(false));
  }, []);

  // Only show today's bookings
  const todaysBookings = Array.isArray(doctorBookings)
    ? doctorBookings.filter((b) => isToday(b.datetimeStart))
    : [];

  return (
    <div>
      <StyledLabel
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <span style={{ minWidth: 110, textAlign: "center", marginBottom: 4 }}>
          Select doctor
        </span>
        <StyledSelect
          id="doctor-manager-select"
          name="doctor-manager-select"
          autoComplete="off"
          value={selectedDoctor}
          onChange={(e) => {
            setSelectedDoctor(e.target.value);
          }}
          style={{
            width: 240,
            maxWidth: "90%",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <option value="">-- Select Doctor --</option>
          {loadingDoctors && <option disabled>Loading...</option>}
          {!loadingDoctors && errorDoctors && (
            <option disabled>{errorDoctors}</option>
          )}
          {!(loadingDoctors || errorDoctors) &&
            (doctors || []).map((doctor) => (
              <option key={String(doctor._id)} value={String(doctor.user?._id)}>
                {doctor.firstName} {doctor.lastName}
              </option>
            ))}
        </StyledSelect>
      </StyledLabel>
      <ListSeparator />
      <TodaysBookingsCard
        doctorBookings={todaysBookings}
        containerClassName="doctor-manager-bookings"
        cardStyle={{
          border: "none",
          boxShadow: "none",
          padding: 0,
          background: "transparent",
        }}
        disablePointer={disablePointer}
      />
    </div>
  );
}

import PropTypes from "prop-types";
DoctorManagerCard.propTypes = {
  selectedDoctor: PropTypes.string.isRequired,
  setSelectedDoctor: PropTypes.func.isRequired,
  doctorBookings: PropTypes.array.isRequired,
  onBookingCreated: PropTypes.func,
  disablePointer: PropTypes.bool,
};

export default DoctorManagerCard;
