/** biome-ignore-all lint/a11y/noLabelWithoutControl: Ignored due to use of custom InputField component */
import { useEffect, useState } from "react";
import { getDoctorById } from "../api/doctor";
import { getPatientById } from "../api/patient";
import { getStaffById } from "../api/staff";
import { useAuth } from "../contexts/AuthContext";
import { StyledForm, StyledInput } from "../style/componentStyles";

export default function ManageProfileCard({ userType }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [dob, setDob] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [shiftStart, setShiftStart] = useState("");
  const [shiftEnd, setShiftEnd] = useState("");

  const { userId } = useAuth();

  const handleManageProfile = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    // Get profile depending on userType
    const fetchData = async () => {
      let profileData = {};
      if (userType === "patient") {
        profileData = await getPatientById(userId);
        setDob(profileData.dateOfBirth);
        setMiddleName(profileData.middleName);
        setPhoneNumber(profileData.phone);
      }

      if (userType === "doctor") {
        profileData = await getDoctorById(userId);
      }

      if (userType === "staff") {
        profileData = await getStaffById(userId);
      }

      if (!profileData) throw new Error("Error retrieving profile");
      setFirstName(profileData.firstName);
      setLastName(profileData.lastName);
    };

    fetchData();

    // set states also depending on userType
  }, [userType, userId]);

  return (
    <div data-testid="app-profile-card">
      <StyledForm onSubmit={handleManageProfile}>
        <label>
          First Name:{" "}
          <StyledInput
            type="text"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            placeholder="First name"
            required
            data-testid="app-profile-form-input-firstname"
          />
        </label>
        {userType === "patient" && (
          <label>
            Middle Name:{" "}
            <StyledInput
              type="text"
              value={middleName}
              onChange={(event) => setMiddleName(event.target.value)}
              placeholder="Middle name"
              data-testid="app-profile-form-input-middlename"
            />
          </label>
        )}
        <label>
          Last Name:{" "}
          <StyledInput
            type="text"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            placeholder="Last name"
            required
            data-testid="app-profile-form-input-lastname"
          />
        </label>
        {userType === "patient" && (
          <>
            <label>
              Date of Birth:{" "}
              <StyledInput
                type="date"
                value={dob}
                onChange={(event) => setDob(event.target.value)}
                required
                data-testid="app-profile-form-input-dob"
              />
            </label>
            <label>
              Phone Number:{" "}
              <StyledInput
                type="tel"
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
                placeholder="Phone #"
                required
                data-testid="app-profile-form-input-phone"
              />
            </label>
          </>
        )}
        {userType === "doctor" && (
          <>
            <label>
              Shift Start:{" "}
              <StyledInput
                type="time"
                value={shiftStart}
                onChange={(event) => setShiftStart(event.target.value)}
                required
                data-testid="app-profile-form-input-shift-start"
              />
            </label>
            <label>
              Shift End:{" "}
              <StyledInput
                type="time"
                value={shiftEnd}
                onChange={(event) => setShiftEnd(event.target.value)}
                placeholder="Phone #"
                required
                data-testid="app-profile-form-input-shift-end"
              />
            </label>
          </>
        )}

        {/* Re-enable if required */}
        {/* <FormErrorSpan id="login-error-span" className={isError ? "error" : ""}>
          {message}
        </FormErrorSpan> */}
        <button type="submit" data-testid="app-profile-form-button-submit">
          Save Changes
        </button>
      </StyledForm>
    </div>
  );
}
