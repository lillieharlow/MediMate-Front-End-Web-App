/*
StaffPatientManager component
- Card for staff to search and manage patients
*/

// biome-ignore assist/source/organizeImports: false positive
import { useState, useEffect } from "react";
import { getAllPatients } from "../api/staff.js";
import FindPatientButton from "./button/FindPatientButton.jsx";
import ViewBookingsButton from "./button/ViewBookingsButton.jsx";
import CreateBookingButton from "./button/CreateBookingButton.jsx";

function StaffPatientManager() {
  const [search, setSearch] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
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
    getAllPatients(search).then(setPatients);
  }

  return (
    <div>
      <div className="patient-search-fields">
        <label>
          First Name{" "}
          <input
            name="firstName"
            value={search.firstName}
            onChange={handleChange}
          />
        </label>
        <label>
          Last Name{" "}
          <input
            name="lastName"
            value={search.lastName}
            onChange={handleChange}
          />
        </label>
        <label>
          Email{" "}
          <input name="email" value={search.email} onChange={handleChange} />
        </label>
        <label>
          DOB <input name="dateOfBirth" value={search.dateOfBirth} onChange={handleChange} />
        </label>
        <label>
          Phone #{" "}
          <input name="phone" value={search.phone} onChange={handleChange} />
        </label>
        <FindPatientButton onFind={handleFindPatient} />
      </div>
      <div className="patient-list">
        {(() => {
          if (!Array.isArray(patients)) {
            return <div className="error-message">No patients found or unauthorized.</div>;
          }
          if (patients.length === 0) {
            return <div>No patients found.</div>;
          }
          return patients.map((patient) => (
            <div key={patient.id} className="patient-list-item">
              <strong>
                {patient.firstName} {patient.lastName}
              </strong>
              <div className="patient-list-actions">
                <ViewBookingsButton patientId={patient.id} />
                <CreateBookingButton patientId={patient.id} />
              </div>
            </div>
          ));
        })()}
      </div>
    </div>
  );
}

export default StaffPatientManager;
