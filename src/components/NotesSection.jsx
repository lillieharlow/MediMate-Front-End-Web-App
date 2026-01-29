/*
 * NotesSection.jsx
 *
 * Reusable section for displaying and editing notes.
 * Used for patient notes (added at booking) and doctor notes (added by the doctor).
 * Renders a labeled textarea, optionally read-only.
 */

import PropTypes from "prop-types";

import { StyledTextarea } from "../style/componentStyles";

const NotesSection = ({
  label,
  value,
  readOnly = false,
  placeholder = undefined,
  style = {},
  onChange,
}) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
      ...style,
    }}
  >
    <div style={{ textAlign: "center", width: "100%" }}>
      <strong>{label}</strong>
    </div>
    <StyledTextarea
      value={value}
      readOnly={readOnly}
      placeholder={placeholder}
      onChange={onChange}
    />
  </div>
);

NotesSection.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  readOnly: PropTypes.bool,
  placeholder: PropTypes.string,
  style: PropTypes.object,
  onChange: PropTypes.func,
};

export default NotesSection;
