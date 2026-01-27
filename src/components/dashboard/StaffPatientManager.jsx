/*
StaffPatientManager component
- Card for staff to search and manage patients
*/

// biome-ignore assist/source/organizeImports: false positive
import { useState, useEffect } from "react";
import { getAllPatients } from "../../api/staff.js";
import FindPatientButton from "../button/FindPatientButton.jsx";
import ViewBookingsButton from "../button/ViewBookingsButton.jsx";
import BookButton from "../button/BookButton.jsx";
import styled from "styled-components";
import { StyledInput } from "../../style/componentStyles.js";
import { getPatientFullName } from "../../utils/patientUtils.js";

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
    min-width: 110px;
    justify-content: center;
    gap: 0.5rem;
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
  }
  input {
    flex: 1 1 0;
    min-width: 120px;
    padding: 0.4rem 0.7rem;
    border-radius: 6px;
    border: 1px solid #cccccc;
    font-size: 1rem;
  }
`;

import {
  NameBox,
  PatientListActions,
  ListSeparator,
} from "../../style/componentStyles.js";

function StaffPatientManager() {
  const [search, setSearch] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    phone: "",
  });
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    getAllPatients().then(setPatients);
  }, []);

  function handleChange(e) {
    setSearch({ ...search, [e.target.name]: e.target.value });
  }

  function handleFindPatient() {
    getAllPatients(search).then((result) => {
      setPatients(result);
    });
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
            <div data-testid="staff-patient-manager" style={{ textAlign: "center" }}>
              ---------- No patients found ----------
            </div>
          ) : (
            patients.map((patient) => {
              // Support both direct and populated user fields
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
                    <ViewBookingsButton patientId={patientId} />
                    <BookButton patientId={patientId} />
                  </PatientListActions>
                  <ListSeparator />
                </div>
              );
            })
          )}
      </div>
    </div>
  );
}

export default StaffPatientManager;
