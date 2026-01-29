/*
 * StaffPatientManager.jsx
 *
 * Dashboard card for staff to search, view, and manage patients.
 * - Provides search fields for filtering patients by name, email, DOB, or phone.
 * - Lists matching patients with actions to view bookings or book an appointment.
 * - Opens a modal to view all bookings for a selected patient.
 * Used in staff dashboard.
 */

// biome-ignore assist/source/organizeImports: manually ordered
import { useState, useEffect } from "react";
import styled from "styled-components";

import FindPatientButton from "../button/FindPatientButton.jsx";
import ViewBookingsButton from "../button/ViewBookingsButton.jsx";
import BookButton from "../button/BookButton.jsx";
import ViewBookingsModal from "../booking/ViewBookingsModal.jsx";
import {
  StyledInput,
  NameBox,
  PatientListActions,
  ListSeparator,
} from "../../style/componentStyles.js";

import { getPatientFullName } from "../../utils/patientUtils.js";

import { getAllPatients } from "../../api/staff.js";

const PatientSearchFields = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
  margin-bottom: 1.5rem;
  label {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-weight: 500;
    gap: 0.5rem;
    width: 100%;
    max-width: 350px;
  }
  input {
    flex: 1 1;
    min-width: 120px;
    padding: 0.4rem 0.7rem;
    border-radius: 6px;
    border: 1px solid #cccccc;
    font-size: 1rem;
  }
`;

function StaffPatientManager({
  doctors,
  onBookingCreated,
  staffSelectedDoctor,
}) {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    phone: "",
  });
  const [showBookingsModal, setShowBookingsModal] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  const handleViewBookings = (patientId) => {
    setSelectedPatientId(patientId);
    setShowBookingsModal(true);
  };

  useEffect(() => {
    getAllPatients().then((result) => setPatients(result || []));
  }, []);

  function handleFindPatient() {
    getAllPatients(search).then((result) => {
      setPatients(result || []);
    });
  }

  function handleChange(e) {
    setSearch({ ...search, [e.target.name]: e.target.value });
  }

  return (
    <div>
      <PatientSearchFields>
        <label>
          First Name
          <input
            name="firstName"
            value={search.firstName}
            onChange={handleChange}
          />
        </label>
        <label>
          Last Name
          <input
            name="lastName"
            value={search.lastName}
            onChange={handleChange}
          />
        </label>
        <label>
          Email
          <input name="email" value={search.email} onChange={handleChange} />
        </label>
        <label htmlFor="dateOfBirth">
          DOB
          <StyledInput
            id="dateOfBirth"
            type="date"
            name="dateOfBirth"
            value={search.dateOfBirth}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Phone #
          <input name="phone" value={search.phone} onChange={handleChange} />
        </label>
        <FindPatientButton onFind={handleFindPatient} />
        <ListSeparator />
      </PatientSearchFields>
      <div className="patient-list">
        {patients.length === 0 ? (
          <div
            data-testid="staff-patient-manager"
            style={{ textAlign: "center", color: "#e0e0e0" }}
          >
            ---------- No patients found ----------
          </div>
        ) : (
          patients.map((patient) => {
            const user =
              patient.user && typeof patient.user === "object"
                ? patient.user
                : {};
            const patientId = user._id;
            return (
              <div
                key={patientId}
                data-testid="staff-patient-manager"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "1.2rem",
                  paddingBottom: "1.2rem",
                  width: "100%",
                }}
              >
                <NameBox $bg="#80d09e">{getPatientFullName(patient)}</NameBox>
                <PatientListActions>
                  <ViewBookingsButton
                    onClick={() => handleViewBookings(patientId)}
                  />
                  <BookButton
                    patientId={patientId}
                    onBookingCreated={onBookingCreated}
                    doctor={undefined}
                    staffSelectedDoctor={staffSelectedDoctor}
                  />
                </PatientListActions>
                <ListSeparator />
              </div>
            );
          })
        )}
      </div>
      <ViewBookingsModal
        open={showBookingsModal}
        onClose={() => setShowBookingsModal(false)}
        patientId={selectedPatientId}
        doctors={doctors}
      />
    </div>
  );
}

export default StaffPatientManager;
