/*
DoctorManagerCard component
- Child component of DashboardCard for staff user type
- Card for staff to select a doctor and view the doctor's bookings for the day
- DoctorManagerListCard is a child component used to render each booking inside DoctorManagerCard
*/

// biome-ignore assist/source/organizeImports: manually ordered for clarity
import { useState, useEffect } from "react";
import { getAllDoctors } from "../../api/doctor";
import { getDoctorBookings } from "../../api/booking";
import { isToday } from "../../utils/patientUtils";
import {
  StyledLabel,
  StyledSelect,
  ListSeparator,
  NameBox,
} from "../../style/componentStyles";
import DoctorManagerListCard from "./DoctorManagerListCard";
import TodaysBookingsCard from "./DoctorTodaysBookingsCard";

function DoctorManagerCard() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [todaysBookings, setTodaysBookings] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(true);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [errorDoctors, setErrorDoctors] = useState("");
  const [errorBookings, setErrorBookings] = useState("");

  // Add a new booking to today's bookings instantly
  const addBookingToList = (newBooking) => {
    if (!newBooking) return;
    if (isToday(newBooking.datetimeStart) &&
        !todaysBookings.some((b) => b._id === newBooking._id)) {
      setTodaysBookings((prev) => [...prev, newBooking]);
    }
  };

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
    // Only depends on selectedDoctor, which is stable
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDoctor]);

  return (
    <div data-testid="doctor-manager-card">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <StyledLabel>
          <span style={{ minWidth: 110, textAlign: "left" }}>
            Select doctor
          </span>
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
                // Always use doctor._id for value
                return (
                  <option key={String(doctor._id)} value={String(doctor._id)}>
                    {doctor.firstName} {doctor.lastName}
                  </option>
                );
              });
            })()}
          </StyledSelect>
        </StyledLabel>
        <ListSeparator />
      </div>
      {(() => {
        if (loadingBookings) return <div>Loading bookings...</div>;
        if (errorBookings) return <div>{errorBookings}</div>;
        return (
          <TodaysBookingsCard
            doctorBookings={todaysBookings}
            containerClassName="doctor-manager-bookings"
            cardStyle={{
              border: "none",
              boxShadow: "none",
              padding: 0,
              background: "transparent",
            }}
            renderBooking={(booking) => (
              <NameBox
                $bg="#5cb9e7"
                key={booking._id}
                style={{ cursor: "default" }}
              >
                <DoctorManagerListCard booking={booking} />
              </NameBox>
            )}
            addBookingToList={addBookingToList}
          />
        );
      })()}
    </div>
  );
}

DoctorManagerCard.propTypes = {};

export default DoctorManagerCard;
