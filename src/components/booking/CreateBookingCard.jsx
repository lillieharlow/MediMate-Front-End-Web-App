/*
 * CreateBookingCard.jsx
 *
 * Displays a modal popup for patients and staff to create a new booking with a doctor.
 * - Fetches all bookings for the selected doctor from the backend before showing available slots.
 * - Filters out any time slots that are already booked by the doctor or the patient for the selected date and time.
 * - Only allows booking for future dates and times within the doctor's shift.
 * - Handles form state, validation, and error messages.
 * - Uses styled-components for consistent UI.
 *
 * Usage:
 * <CreateBookingCard open={true} doctor={doctorObj} patientId={patientId} onClose={closeFn} onBookingCreated={refreshFn} />
 */

import { useState, useEffect } from "react";

import {
  StyledForm,
  StyledInput,
  ColoredButton,
  PopupCard,
  ModalOverlay,
  ErrorMessage,
} from "../../style/componentStyles";
import {
  getDoctorBookings,
  getPatientBookings,
  createBooking,
} from "../../api/booking";
import { getAllDoctors } from "../../api/doctor";
import CloseButton from "../button/CloseButton";

export default function CreateBookingCard({
  open,
  onClose,
  doctor: initialDoctor,
  patientId,
  onBookingCreated,
  doctors: doctorsProp,
}) {
  const [availableSlots, setAvailableSlots] = useState([]);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState("15");
  const [, setDoctorBookings] = useState([]);
  const [, setPatientBookings] = useState([]);
  const [error, setError] = useState("");
  const [doctor, setDoctor] = useState(initialDoctor || null);
  const [doctors, setDoctors] = useState(doctorsProp || []);

  // Fetch doctors if not provided and no doctor is selected (for staff)
  useEffect(() => {
    if (open && !initialDoctor && (!doctorsProp || doctorsProp.length === 0)) {
      getAllDoctors().then(setDoctors);
    }
  }, [open, initialDoctor, doctorsProp]);

  // Fetch bookings for doctor and patient when pop up opens or date/doctor changes
  useEffect(() => {
    if (!(open && date && doctor && doctor._id && patientId)) return;
    // Fetch doctor and patient bookings for the selected date
    setLoading(true);
    Promise.all([
      getDoctorBookings(doctor._id, date),
      getPatientBookings(patientId, date),
    ])
      .then(([doctorBookingsRes, patientBookingsRes]) => {
        setDoctorBookings(doctorBookingsRes || []);
        setPatientBookings(patientBookingsRes || []);
      })
      .catch(() => {
        setDoctorBookings([]);
        setPatientBookings([]);
      })
      .finally(() => setLoading(false));
  }, [open, date, doctor, patientId]);

  // Reset selected time when date or doctor changes (to avoid selecting unavailable time)
  useEffect(() => {
    setTime("");
  }, []);

  // Clear error when date, doctor, or time changes
  useEffect(() => {
    setError("");
  }, []);

  const todayStr = new Date().toISOString().slice(0, 10);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (!(date && time && doctor && patientId)) {
        setError("Please select all required fields.");
        setLoading(false);
        return;
      }
      if (!availableSlots.some((slot) => slot.value === time)) {
        setError("Please select a valid available time slot.");
        setLoading(false);
        return;
      }
      const datetimeStart = new Date(`${date}T${time}`);
      if (Number.isNaN(datetimeStart.getTime())) {
        setError("Please select a valid date and time.");
        setLoading(false);
        return;
      }
      const parsedDuration = parseInt(duration, 10);
      const result = await createBooking({
        patientId,
        doctorId: doctor._id,
        datetimeStart,
        bookingDuration: parsedDuration,
        patientNotes: notes,
      });
      setLoading(false);
      if (result && result.success === false) {
        setError(
          result.message || "Failed to create booking. Please try again.",
        );
        return;
      }
      onClose?.();
      if (onBookingCreated) {
        setTimeout(() => {
          if (doctor?._id) {
            onBookingCreated(doctor._id);
          } else {
            onBookingCreated();
          }
        }, 750);
      }
    } catch {
      setError("Failed to create booking. Please try again.");
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <ModalOverlay>
      <PopupCard>
        <CloseButton onClick={onClose} />
        <StyledForm onSubmit={handleSubmit}>
          {/* Doctor selection (for staff) */}
          {!initialDoctor || doctorsProp ? (
            <div
              style={{
                marginBottom: 10,
                display: "flex",
                alignItems: "center",
              }}
            >
              <label
                htmlFor="doctor-select"
                style={{ minWidth: 50, marginRight: 8 }}
              >
                Doctor
              </label>
              <select
                id="doctor-select"
                value={doctor?._id || ""}
                onChange={(e) => {
                  const selected = doctors.find(
                    (d) => d._id === e.target.value,
                  );
                  setDoctor(selected || null);
                  setDate("");
                  setTime("");
                  setAvailableSlots([]);
                }}
                required
                style={{ width: "100%", padding: "0.2rem", borderRadius: 4 }}
                disabled={loading || doctors.length === 0}
              >
                <option value="">Select doctor</option>
                {doctors.map((d) => (
                  <option key={d._id} value={d._id}>
                    Dr. {d.firstName} {d.lastName}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            doctor && (
              <div>
                <span>Doctor:</span>{" "}
                {`Dr. ${doctor.firstName} ${doctor.lastName}`}
              </div>
            )
          )}
          <div
            style={{ marginBottom: 10, display: "flex", alignItems: "center" }}
          >
            <label
              htmlFor="booking-date"
              style={{ minWidth: 50, marginRight: 8 }}
            >
              Date:{" "}
            </label>
            <StyledInput
              id="booking-date"
              type="date"
              value={date}
              min={todayStr}
              onChange={(e) => setDate(e.target.value)}
              required
              style={{ marginBottom: 0, width: "100%" }}
            />
          </div>
          <div
            style={{ marginBottom: 10, display: "flex", alignItems: "center" }}
          >
            <label
              htmlFor="booking-duration"
              style={{ minWidth: 70, marginRight: 8 }}
            >
              Duration:{" "}
            </label>
            <select
              id="booking-duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              style={{ marginBottom: 0, width: "100%" }}
            >
              <option value="15">15 min</option>
              <option value="30">30 min</option>
            </select>
          </div>
          <div
            style={{ marginBottom: 10, display: "flex", alignItems: "center" }}
          >
            <label
              htmlFor="booking-time"
              style={{ minWidth: 50, marginRight: 8 }}
            >
              Time:{" "}
            </label>
            <select
              id="booking-time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              style={{
                marginBottom: 0,
                width: "100%",
                padding: "0.2rem",
                borderRadius: 4,
              }}
              disabled={!date || loading || availableSlots.length === 0}
            >
              <option value="">{loading ? "Loading..." : "Select time"}</option>
              {/* Only show available slots, or a clear message if none */}
              {availableSlots.length === 0 && date && doctor && !loading && (
                <option value="" disabled>
                  No available times for this doctor on this date
                </option>
              )}
              {availableSlots.map((slot) => (
                <option key={slot.value} value={slot.value}>
                  {slot.label}
                </option>
              ))}
            </select>
          </div>
          <label>
            Notes for Doctor:{" "}
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Reason for your booking, anything the Doctor should know?"
              style={{
                minHeight: 60,
                borderRadius: 4,
                padding: "0.2rem",
                width: "100%",
                boxSizing: "border-box",
              }}
            />
          </label>
          <ColoredButton
            type="submit"
            disabled={
              loading ||
              !date ||
              !time ||
              !availableSlots.some((slot) => slot.value === time)
            }
          >
            {loading ? "Creating..." : "Create Booking"}
          </ColoredButton>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </StyledForm>
      </PopupCard>
    </ModalOverlay>
  );
}
