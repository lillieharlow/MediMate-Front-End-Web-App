/*
DoctorManagerListCard component
- Displays a single booking for a doctor in a compact row style
- Used in staff and doctor dashboards for today's bookings
*/

// biome-ignore assist/source/organizeImports: manually ordered for clarity
import PropTypes from "prop-types";
import { FiClock } from "react-icons/fi";
import { useState, useEffect } from "react";
import { getPatientById } from "../../api/patient";
import { getPatientFullName } from "../../utils/patientUtils";

const DoctorManagerListCard = ({ booking }) => {
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
  }, [booking?.patientId]);
  const time = booking.datetimeStart
    ? new Date(booking.datetimeStart).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";
  return (
    <div data-testid="doctor-manager-list-card">
      <FiClock style={{ marginRight: "0.7em", verticalAlign: "middle" }} />
      <span style={{ marginRight: "1.2em", fontWeight: 500 }}>{time}</span>
      <span>{patientName}</span>
    </div>
  );
};

DoctorManagerListCard.propTypes = {
  booking: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    datetimeStart: PropTypes.string,
    patientId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
};

export default DoctorManagerListCard;
