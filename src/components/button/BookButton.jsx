/*
- "BOOK" button for navigating to the booking page
*/

// biome-ignore assist/source/organizeImports: keeping import order for clarity
import  { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import ActionButton from "./ActionButton";
import CreateBookingModal from "../booking/CreateBookingModal";
import { getAllDoctors } from "../../api/doctor";
import { getDoctorBookings } from "../../api/booking";



function BookButton({ doctor, patientId, onBookingCreated, existingBookings, onBookButtonClick, onModalClose, staffSelectedDoctor = null }) {
  const [open, setOpen] = useState(false);
  const [latestBookings, setLatestBookings] = useState(existingBookings || []);
  const [doctors, setDoctors] = useState([]);
  const { userType } = useAuth();

  const handleOpen = async () => {
    if (userType === "staff") {
      // Staff: fetch all doctors for selection
      setOpen(true); // Open modal immediately for loading state
      const allDocs = await getAllDoctors();
      setDoctors(allDocs || []);
    } else if (userType === "doctor") {
      if (typeof doctor?.user === 'string') {
        try {
          const bookings = await getDoctorBookings(doctor.user);
          setLatestBookings(bookings || []);
        } catch {
          setLatestBookings(existingBookings || []);
        }
      }
      setOpen(true);
    } else {
      // For patients, force refresh all bookings for the doctor before opening modal
      if (onBookButtonClick && typeof doctor?.user === 'string') {
        const freshBookings = await onBookButtonClick(doctor.user);
        setLatestBookings(freshBookings || []);
      } else {
        setLatestBookings(existingBookings || []);
      }
      setOpen(true);
    }
  };

  // For staff, wrap onBookingCreated to ensure DoctorManagerCard gets correct doctorId
  const handleBookingCreated = (createdDoctorId) => {
    if (userType === "staff" && createdDoctorId) {
      onBookingCreated?.(createdDoctorId);
    } else {
      onBookingCreated?.();
    }
  };
  // When modal closes, call onModalClose if provided
  const handleModalClose = () => {
    setOpen(false);
    if (onModalClose) onModalClose();
  };
  // For patients, always pass doctor and disable doctor select
  const isStaff = userType === "staff";
  const isPatient = userType === "patient";
  const selectedDoctor = isStaff && staffSelectedDoctor
    ? doctors.find(d => d.user && d.user._id === staffSelectedDoctor)
    : doctor;
  return (
    <>
      <ActionButton
        type="button"
        onClick={handleOpen}
      >
        BOOK
      </ActionButton>
      <CreateBookingModal
        open={open}
        onClose={handleModalClose}
        doctor={selectedDoctor}
        patientId={patientId}
        onBookingCreated={handleBookingCreated}
        existingBookings={latestBookings}
        doctors={isStaff ? doctors : undefined}
        disableDoctorSelect={isPatient}
      />
    </>
  );
}

export default BookButton;
