/*
 * CreateBookingCard.jsx
 *
 * Shows a popup form for patients or staff to book an appointment with a doctor.
 * - Loads available doctors and their bookings.
 * - Only shows time slots that are not already booked.
 * - Only allows booking for future times within the doctor's working hours.
 * - Handles form input, validation, and errors.
 * - Uses styled-components for styling.
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
  // State for available time slots, notes, loading, date, time, duration, error, selected doctor, and doctor list
  const [availableSlots, setAvailableSlots] = useState([]);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState("15");
  const [error, setError] = useState("");
  const [doctor, setDoctor] = useState(initialDoctor || null);
  const [doctors, setDoctors] = useState(doctorsProp || []);

  // Converts a Date object to a 12-hour time string
  function formatTime12Hour(dateObj) {
    let hour = dateObj.getHours();
    const min = dateObj.getMinutes().toString().padStart(2, "0");
    const ampm = hour >= 12 ? "pm" : "am";
    hour %= 12;
    if (hour === 0) hour = 12;
    return `${hour}:${min} ${ampm}`;
  }

  // Sets an error message and stops loading
  function setErrorAndLoading(msg) {
    setError(msg);
    setLoading(false);
  }

  // Loads all doctors if not provided (for staff users)
  useEffect(() => {
    if (open && !initialDoctor && (!doctorsProp || doctorsProp.length === 0)) {
      getAllDoctors().then(setDoctors);
    }
  }, [open, initialDoctor, doctorsProp]);

  // Loads bookings and calculates available time slots when doctor, date, or duration changes
  // biome-ignore lint/correctness/useExhaustiveDependencies: dependencies intentionally omitted for booking slot calculation
  useEffect(() => {
    if (!(open && date && doctor && doctor._id && patientId)) return;
    setLoading(true);
    Promise.all([
      getDoctorBookings(doctor._id, date),
      getPatientBookings(patientId, date),
    ])
      .then(([doctorBookingsRes, patientBookingsRes]) => {
        // Calculate all possible time slots in the doctor's shift
        const shiftStart = doctor.shiftStart || "09:00";
        const shiftEnd = doctor.shiftEnd || "17:00";
        const slotDuration = parseInt(duration, 10) || 15;
        const slots = [];
        const start = new Date(`${date}T${shiftStart}`);
        const end = new Date(`${date}T${shiftEnd}`);
        for (
          let t = new Date(start);
          t < end;
          t.setMinutes(t.getMinutes() + slotDuration)
        ) {
          const value = t.toTimeString().slice(0, 5);
          const label = formatTime12Hour(t);
          slots.push({ value, label });
        }
        // Remove slots that overlap with any existing booking (doctor or patient)
        const allBookings = [
          ...(doctorBookingsRes || []),
          ...(patientBookingsRes || []),
        ];
        // Checks if two time ranges overlap
        function overlaps(slotStart, slotEnd, bookingStart, bookingEnd) {
          return slotStart < bookingEnd && bookingStart < slotEnd;
        }
        const now = new Date();
        const isToday = date === now.toISOString().slice(0, 10);
        // Only keep slots that are not in the past and do not overlap with bookings
        const filteredSlots = slots.filter((slot) => {
          const slotStart = new Date(`${date}T${slot.value}`);
          const slotEnd = new Date(slotStart.getTime() + slotDuration * 60000);
          if (isToday && slotStart <= now) return false;
          for (const b of allBookings) {
            if (!(b.datetimeStart && b.bookingDuration)) continue;
            const bookingStart = new Date(b.datetimeStart);
            const bookingEnd = new Date(
              bookingStart.getTime() + (b.bookingDuration || 15) * 60000,
            );
            if (overlaps(slotStart, slotEnd, bookingStart, bookingEnd))
              return false;
          }
          return true;
        });
        setAvailableSlots(filteredSlots);
      })
      .catch(() => {
        setAvailableSlots([]);
      })
      .finally(() => setLoading(false));
  }, [open, date, doctor, patientId, duration]);

  // Reset selected time when date or doctor changes
  useEffect(() => {
    setTime("");
  }, []);

  // Clear error when date, doctor, or time changes
  useEffect(() => {
    setError("");
  }, []);

  const todayStr = new Date().toISOString().slice(0, 10);

  // Handles form submission to create a booking
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      // Validate required fields
      if (!(date && time && doctor && patientId)) {
        setErrorAndLoading("Please select all required fields.");
        return;
      }
      // Validate selected time is still available
      if (!availableSlots.some((slot) => slot.value === time)) {
        setErrorAndLoading("Please select a valid available time slot.");
        return;
      }
      const datetimeStart = new Date(`${date}T${time}`);
      if (Number.isNaN(datetimeStart.getTime())) {
        setErrorAndLoading("Please select a valid date and time.");
        return;
      }
      const parsedDuration = parseInt(duration, 10);
      // Create the booking using the API
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
      // Close the modal and refresh bookings list
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
        <div
          style={{
            textAlign: "center",
            fontWeight: 600,
            fontSize: "1.25rem",
            margin: "8px 0 16px 0",
          }}
        >
          Create Booking
        </div>
        <StyledForm onSubmit={handleSubmit}>
          {/* Doctor selection (dropdown for staff, disabled for patient) */}
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
                style={{ minWidth: 50, marginRight: 8, fontWeight: "normal" }}
              >
                Doctor:{" "}
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
                style={{
                  width: "100%",
                  padding: "0.2rem",
                  borderRadius: 4,
                  fontSize: "1rem",
                }}
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
              <div
                style={{
                  marginBottom: 10,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <label
                  htmlFor="doctor-select-disabled"
                  style={{
                    minWidth: 50,
                    marginRight: 8,
                    fontWeight: "normal",
                    fontSize: "1rem",
                  }}
                >
                  Doctor:{" "}
                </label>
                <select
                  id="doctor-select-disabled"
                  value={doctor._id}
                  disabled
                  style={{
                    width: "100%",
                    padding: "0.2rem",
                    borderRadius: 4,
                    fontSize: "1rem",
                    background: "#f8f8f8",
                    color: "#333",
                  }}
                >
                  <option value={doctor._id}>
                    Dr. {doctor.firstName} {doctor.lastName}
                  </option>
                </select>
              </div>
            )
          )}
          {/* Date selection */}
          <div
            style={{ marginBottom: 10, display: "flex", alignItems: "center" }}
          >
            <label
              htmlFor="booking-date"
              style={{ minWidth: 50, marginRight: 8, fontWeight: "normal" }}
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
          {/* Duration selection */}
          <div
            style={{ marginBottom: 10, display: "flex", alignItems: "center" }}
          >
            <label
              htmlFor="booking-duration"
              style={{ minWidth: 70, marginRight: 8, fontWeight: "normal" }}
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
          {/* Time selection */}
          <div
            style={{ marginBottom: 10, display: "flex", alignItems: "center" }}
          >
            <label
              htmlFor="booking-time"
              style={{ minWidth: 50, marginRight: 8, fontWeight: "normal" }}
            >
              Time:{" "}
            </label>
            <select
              id="booking-time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              style={{
                marginBottom: 0,
                width: "100%",
                background:
                  availableSlots.length === 0 && date && doctor && !loading
                    ? "#f8f8f8"
                    : undefined,
                fontStyle:
                  availableSlots.length === 0 && date && doctor && !loading
                    ? "italic"
                    : undefined,
              }}
              disabled={!date || loading}
            >
              {loading && <option value="">Loading...</option>}
              {!loading && availableSlots.length === 0 && date && doctor && (
                <option value="" disabled>
                  No appointments available
                </option>
              )}
              {!loading && availableSlots.length > 0 && (
                <>
                  <option value="">Select time</option>
                  {availableSlots.map((slot) => (
                    <option key={slot.value} value={slot.value}>
                      {slot.label}
                    </option>
                  ))}
                </>
              )}
            </select>
          </div>
          {/* Notes for the doctor */}
          <label style={{ fontWeight: "normal" }}>
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
          {/* Create Booking button */}
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
