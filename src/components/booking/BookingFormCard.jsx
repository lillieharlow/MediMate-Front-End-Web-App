/*
 * BookingFormCard.jsx
 *
 * Shared form logic and UI for creating or updating a booking.
 * Used by CreateBookingCard and UpdateBookingCard.
 */

// biome-ignore assist/source/organizeImports: manually ordered for clarity
import {
  StyledForm,
  StyledInput,
  StyledSelect,
  ColoredButton,
  PopupCard,
  ModalOverlay,
  ModalTitle,
  ErrorMessage,
} from "../../style/componentStyles";
import CloseButton from "../button/CloseButton";

export default function BookingFormCard({
  open,
  onClose,
  doctor,
  setDoctor,
  doctors,
  onSubmit,
  submitLabel = "Create Booking",
  loading: externalLoading = false,
  error: externalError = "",
  availableSlots = [],
  setDate,
  setTime,
  setDuration,
  setNotes,
  date,
  time,
  duration,
  notes,
  disableDoctorSelect = false,
  title,
}) {
  const todayObj = new Date();
  const todayStr = `${todayObj.getFullYear()}-${String(todayObj.getMonth() + 1).padStart(2, "0")}-${String(todayObj.getDate()).padStart(2, "0")}`;

  if (!open) return null;

  let buttonLabel = submitLabel;
  if (externalLoading) {
    buttonLabel =
      submitLabel === "Update Booking" ? "Updating..." : "Creating...";
  }

  return (
    <ModalOverlay>
      <PopupCard>
        <CloseButton onClick={onClose} />
        {title && (
          <div
            style={{
              marginBottom: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <ModalTitle>{title}</ModalTitle>
          </div>
        )}
        <StyledForm
          onSubmit={(e) => {
            if (onSubmit) {
              onSubmit(e);
            } else {
              e.preventDefault();
            }
          }}
        >
          {/* Doctor selection */}
          {(() => {
            if (doctors && !disableDoctorSelect) {
              return (
                <div
                  style={{
                    marginTop: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                  }}
                >
                  <label
                    htmlFor="doctor-select"
                    style={{
                      fontWeight: "normal",
                      marginRight: 0,
                      minWidth: 0,
                    }}
                  >
                    Doctor:
                  </label>
                  <StyledSelect
                    id="doctor-select"
                    name="doctor-select"
                    autoComplete="organization"
                    value={doctor?.user?._id || ""}
                    onChange={(e) => {
                      const selected = doctors.find(
                        (d) => d.user && d.user._id === e.target.value,
                      );
                      setDate("");
                      setTime("");
                      setNotes("");
                      setDuration("15");
                      if (selected && setDoctor) {
                        setDoctor(selected);
                      }
                    }}
                    required
                    style={{
                      width: 180,
                      textAlign: "center",
                    }}
                    disabled={externalLoading || doctors.length === 0}
                  >
                    <option value="">Select doctor</option>
                    {doctors.map((d) => (
                      <option key={d._id} value={d.user?._id}>
                        Dr. {d.firstName} {d.lastName}
                      </option>
                    ))}
                  </StyledSelect>
                </div>
              );
            }if (doctor) {
              return (
                <div
                  style={{
                    marginTop: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                  }}
                >
                  <label
                    htmlFor="doctor-select-disabled"
                    style={{
                      fontWeight: "normal",
                      marginRight: 0,
                      minWidth: 0,
                    }}
                  >
                    Doctor:
                  </label>
                  <StyledSelect
                    id="doctor-select-disabled"
                    value={doctor._id}
                    disabled
                    style={{
                      width: 180,
                      textAlign: "center",
                      background: "#f8f8f8",
                      color: "#333",
                    }}
                  >
                    <option value={doctor.user}>
                      Dr. {doctor.firstName} {doctor.lastName}
                    </option>
                  </StyledSelect>
                </div>
              );
            }
              return null;
          })()}

          {/* Date selection */}
          <div
            style={{
              marginBottom: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <label
              htmlFor="booking-date"
              style={{ fontWeight: "normal", marginRight: 0, minWidth: 0 }}
            >
              Date:
            </label>
            <StyledInput
              id="booking-date"
              name="booking-date"
              type="date"
              autoComplete="bday"
              value={date}
              min={todayStr}
              onChange={(e) => setDate(e.target.value)}
              required
              style={{ marginBottom: 0, width: 180 }}
            />
          </div>

          {/* Duration selection */}
          <div
            style={{
              marginBottom: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <label
              htmlFor="booking-duration"
              style={{ fontWeight: "normal", marginRight: 0, minWidth: 0 }}
            >
              Duration:
            </label>
            <StyledSelect
              id="booking-duration"
              name="booking-duration"
              autoComplete="off"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              style={{ marginBottom: 0, width: 180 }}
            >
              <option value="15">15 min</option>
              <option value="30">30 min</option>
            </StyledSelect>
          </div>

          {/* Time selection */}
          <div
            style={{
              marginBottom: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <label
              htmlFor="booking-time"
              style={{ fontWeight: "normal", marginRight: 0, minWidth: 0 }}
            >
              Time:
            </label>
            <StyledSelect
              id="booking-time"
              name="booking-time"
              autoComplete="off"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              style={{
                marginBottom: 0,
                width: 180,
                background:
                  availableSlots.length === 0 &&
                  date &&
                  doctor &&
                  !externalLoading
                    ? "#f8f8f8"
                    : undefined,
                fontStyle:
                  availableSlots.length === 0 &&
                  date &&
                  doctor &&
                  !externalLoading
                    ? "italic"
                    : undefined,
              }}
              disabled={!date || externalLoading}
            >
              {externalLoading && <option value="">Loading...</option>}
              {!externalLoading &&
                availableSlots.length === 0 &&
                date &&
                doctor && (
                  <option value="" disabled>
                    No appointments available
                  </option>
                )}
              {!externalLoading && availableSlots.length > 0 && (
                <>
                  <option value="">Select time</option>
                  {availableSlots.map((slot) => (
                    <option key={slot.value} value={slot.value}>
                      {slot.label}
                    </option>
                  ))}
                </>
              )}
            </StyledSelect>
          </div>

          {/* Notes for the doctor */}
          <div
            style={{
              marginBottom: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <label
              htmlFor="booking-notes"
              style={{ fontWeight: "normal", marginBottom: 4 }}
            >
              Notes for Doctor:
            </label>
            <textarea
              id="booking-notes"
              name="booking-notes"
              autoComplete="off"
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
          </div>

          {/* Submit button */}
          <ColoredButton
            type="submit"
            disabled={
              externalLoading ||
              !date ||
              !time ||
              !availableSlots.some((slot) => slot.value === time)
            }
          >
            {buttonLabel}
          </ColoredButton>
          {externalError && <ErrorMessage>{externalError}</ErrorMessage>}
        </StyledForm>
      </PopupCard>
    </ModalOverlay>
  );
}
