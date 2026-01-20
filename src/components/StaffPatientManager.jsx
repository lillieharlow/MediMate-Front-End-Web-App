/*
StaffPatientManager component
- Card for staff to search and manage patients
- Includes search fields, filter logic, and patient actions
*/

// biome-ignore assist/source/organizeImports: false positive
import { useState, useEffect } from "react";
import { getAllPatients } from "../api/staff.js";
import FindPatientButton from "./FindPatientButton.jsx";
import ViewBookingsButton from "./ViewBookingsButton.jsx";
import CreateBookingButton from "./CreateBookingButton.jsx";

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
          DOB{" "}
          <input
            name="dob"
            value={search.dateOfBirth}
            onChange={handleChange}
          />
        </label>
        <label>
          Phone #{" "}
          <input name="phone" value={search.phone} onChange={handleChange} />
        </label>
        <FindPatientButton onFind={handleFindPatient} />
      </div>
      <div className="patient-list">
        {patients.length === 0 ? (
          <div>No patients found.</div>
        ) : (
          patients.map((p) => (
            <div key={p.id} className="patient-list-item">
              <strong>
                {p.firstName} {p.lastName}
              </strong>
              <div className="patient-list-actions">
                <ViewBookingsButton
                  patientId={p.id}
                  onView={() => {
                    /* handle view bookings */
                  }}
                />
                <CreateBookingButton
                  patientId={p.id}
                  onCreate={() => {
                    /* handle create booking */
                  }}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default StaffPatientManager;
