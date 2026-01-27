/*
PatientOurDoctorsCardList component
- Lists all doctors for the patient dashboard
- Each doctor is shown in its own outlined card with icon, name, and Book button
*/

// biome-ignore assist/source/organizeImports: import order handled manually
import { NameBox } from "../../style/componentStyles.js";
import { FaUserMd } from "react-icons/fa";

import BookButton from "../button/BookButton.jsx";
import { getDoctorBookings } from "../../api/booking";

function PatientOurDoctorsCardList({ doctors = [], patientId, onBookingCreated }) {

  // Handler to force refresh bookings for a doctor from backend, always returns a Promise
  const handleBookButtonClick = async (doctorId) => {
    if (!doctorId) return [];
    const freshBookings = await getDoctorBookings(doctorId);
    return freshBookings;
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {doctors.length === 0 ? (
        <div data-testid="no-doctors-found" style={{ textAlign: "center", color: "#e0e0e0" }}>
          ---------- No doctors found ----------
        </div>
      ) : (
        doctors.map((doctor) => {
          // Filter bookings for this doctor
          return (
            <NameBox
              key={doctor._id}
              $bg="#fff"
              style={{
                display: "flex",
                alignItems: "center",
                padding: "0.7rem 2.5rem",
                gap: "3.5rem",
              }}
            >
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  minWidth: 44,
                  justifyContent: "center",
                }}
              >
                <FaUserMd style={{ fontSize: 50, color: "#222" }} />
              </span>
              <span
                style={{
                  flex: 1,
                  textAlign: "center",
                  fontSize: "0.98rem",
                  letterSpacing: "0.2px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  lineHeight: 1.1,
                }}
              >
                <span>Dr. {doctor.firstName} {doctor.lastName}</span>
              </span>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  minWidth: 110,
                  justifyContent: "center",
                }}
              >
                <BookButton
                  doctor={doctor}
                  patientId={patientId}
                  existingBookings={[]}
                  onBookingCreated={onBookingCreated}
                  onBookButtonClick={() => handleBookButtonClick(doctor._id)}
                />
              </span>
            </NameBox>
          );
        })
      )}
    </div>
  );
}

export default PatientOurDoctorsCardList;
