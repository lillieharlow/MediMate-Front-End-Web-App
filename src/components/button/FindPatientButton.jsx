/*
- "Find Patient" button for triggering patient search
*/
import ActionButton from "./ActionButton";

function FindPatientButton({ onFind }) {
  return (
    <ActionButton type="button" onClick={onFind}>
      Find Patient
    </ActionButton>
  );
}

export default FindPatientButton;
