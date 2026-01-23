/*
DoctorManagerCard component
- Child component of DashboardCard for staff user type
- Card for staff to select a doctor and view the doctor's bookings for the day
- DoctorManagerListCard is a child component used to render each booking inside DoctorManagerCard
*/

// biome-ignore assist/source/organizeImports: false positive
import PropTypes from "prop-types";
import { FiClock } from "react-icons/fi";
import { useState, useEffect } from "react";

import { getAllDoctors } from "../api/doctor";
import { getDoctorBookings } from "../api/booking";
import { getPatientById } from "../api/patient";
import { getPatientFullName, isToday } from "../utils/patientUtils";

import { StyledLabel, StyledSelect, ListSeparator, NameBox, CenteredHeading } from '../style/componentStyles';

function DoctorManagerListCard({ booking }) {
  const [patientName, setPatientName] = useState("");
  useEffect(() => {
    let isMounted = true;
    if (booking.patientId) {
      getPatientById(booking.patientId).then((patient) => {
        if (isMounted && patient) {
          setPatientName(getPatientFullName(patient));
        }
      });
    }
    return () => {
      isMounted = false;
    };
  }, [booking.patientId]);
  const time = booking.datetimeStart ? new Date(booking.datetimeStart).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "";
  return (
    <>
      <FiClock style={{ marginRight: '0.7em', verticalAlign: 'middle' }} />
      <span style={{ marginRight: '1.2em', fontWeight: 500 }}>{time}</span>
      <span>{patientName}</span>
    </>
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
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <StyledLabel>
          <span style={{ minWidth: 110, textAlign: 'left' }}>Select doctor</span>
          <StyledSelect
            value={selectedDoctor}
            onChange={(e) => {
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
          </StyledSelect>
        </StyledLabel>
        <ListSeparator />
      </div>
      <CenteredHeading>Today's bookings</CenteredHeading>
      <div className="doctor-manager-bookings">
        {(() => {
          if (loadingBookings) return <div>Loading bookings...</div>;
          if (errorBookings) return <div>{errorBookings}</div>;
          if (!Array.isArray(todaysBookings) || todaysBookings.length === 0)
            return <div>No bookings for today.</div>;
          return todaysBookings.map((booking, idx) => {
            const key =
              booking._id || booking.id || `${idx}-${JSON.stringify(booking)}`;
            return (
              <NameBox $bg="#5cb9e7" key={key}>
                <DoctorManagerListCard booking={booking} />
              </NameBox>
            );
          });
        })()}
      </div>
    </div>
  );
}

DoctorManagerCard.propTypes = {};

export { DoctorManagerListCard };
export default DoctorManagerCard;
