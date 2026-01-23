/*
DoctorCurrentBookingCard component
- Displays the current booking for a doctor, including patient and appointment notes
- Used in the doctor dashboard
*/

// biome-ignore assist/source/organizeImports: manually ordered for clarity
import PropTypes from "prop-types";
import DoctorManagerListCard from "./DoctorManagerListCard.jsx";
import { NameBox, ColoredButton } from "../../style/componentStyles";

import { useState, useEffect } from "react";
import { updateDoctorNotes, getDoctorNotes } from "../../api/booking";
import NotesSection from "../NotesSection.jsx";

const CurrentBookingCard = ({ booking }) => {
  const [appointmentNotes, setAppointmentNotes] = useState("");
  const [currentBooking, setCurrentBooking] = useState(booking);

  useEffect(() => {
    setCurrentBooking(booking);
    setSaveMsg(""); // Clear save message when booking changes
    async function fetchDoctorNotes() {
      if (booking?._id) {
        const res = await getDoctorNotes(booking._id);
        setAppointmentNotes(res?.data?.doctorNotes || "");
      } else {
        setAppointmentNotes("");
      }
    }
    fetchDoctorNotes();
  }, [booking]);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");

  const handleSaveNotes = async () => {
    if (!currentBooking) return;
    setSaving(true);
    setSaveMsg("");
    try {
      await updateDoctorNotes(currentBooking._id, appointmentNotes);
      // Fetch updated doctor notes
      const notesRes = await getDoctorNotes(currentBooking._id);
      setAppointmentNotes(notesRes?.data?.doctorNotes || "");
      setSaveMsg("Notes saved!");
      setTimeout(() => setSaveMsg(""), 2000); // Hide message after 2 seconds
    } catch {
      setSaveMsg("Failed to save notes.");
      setTimeout(() => setSaveMsg(""), 2000);
    } finally {
      setSaving(false);
    }
  };

  if (!currentBooking) return <div data-testid="doctor-current-booking-card">No current booking.</div>;

  return (
    <div data-testid="doctor-current-booking-card">
      <NameBox>
        <DoctorManagerListCard booking={currentBooking} />
      </NameBox>
      <NotesSection
        label="Patient Notes"
        value={currentBooking?.patientNotes || "No notes."}
        readOnly
      />
      <NotesSection
        label="Appointment Notes"
        value={appointmentNotes}
        onChange={(e) => setAppointmentNotes(e.target.value)}
        placeholder="Add appointment notes..."
        style={{ marginTop: "1rem" }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <ColoredButton
          type="button"
          $bg="#388bff"
          style={{
            marginTop: "0.7rem",
            minWidth: 160,
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
          }}
          onClick={handleSaveNotes}
          disabled={saving}
        >
          {saving ? "Saving..." : "Save Notes"}
        </ColoredButton>
        {saveMsg && (
          <div
            style={{
              color: saveMsg.includes("saved") ? "#111" : "red",
              marginTop: 4,
              textAlign: "center",
            }}
          >
            {saveMsg}
          </div>
        )}
      </div>
    </div>
  );
};

CurrentBookingCard.propTypes = {
  doctorBookings: PropTypes.array.isRequired,
};

export default CurrentBookingCard;
