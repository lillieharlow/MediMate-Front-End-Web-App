/*
DoctorCurrentBookingCard component
- Displays the current booking for a doctor, including patient and appointment notes
- Used in the doctor dashboard
*/

// biome-ignore assist/source/organizeImports: manually ordered for clarity
import PropTypes from "prop-types";
import DoctorManagerListCard from "./DoctorManagerListCard.jsx";
import { NameBox, ColoredButton } from "../../style/componentStyles";

import { useState } from "react";
import { updateDoctorNotes } from "../../api/booking";
import NotesSection from "../NotesSection.jsx";

const CurrentBookingCard = ({ booking }) => {
  const [appointmentNotes, setAppointmentNotes] = useState(
    booking?.appointmentNotes || "",
  );
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");

  const handleSaveNotes = async () => {
    if (!booking) return;
    setSaving(true);
    setSaveMsg("");
    try {
      await updateDoctorNotes(booking._id, { notes: appointmentNotes });
      setSaveMsg("Notes saved!");
    } catch {
      setSaveMsg("Failed to save notes.");
    } finally {
      setSaving(false);
    }
  };

  if (!booking) return <div>No current booking.</div>;

  return (
    <>
      <NameBox>
        <DoctorManagerListCard booking={booking} />
      </NameBox>
      <NotesSection
        label="Patient Notes"
        value={booking?.patientNotes || "No notes."}
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
    </>
  );
};

CurrentBookingCard.propTypes = {
  doctorBookings: PropTypes.array.isRequired,
};

export default CurrentBookingCard;
