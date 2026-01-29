import { PopupCard } from "../../style/componentStyles";
import CloseButton from "../button/CloseButton";
import ActionButton from "../button/ActionButton";

/**
 * Cancel Booking Card
 * Modal dialog to confirm booking cancellation.
 * Props:
 *   open (bool): Whether modal is open
 *   onConfirm (func): Called when user confirms
 *   onClose (func): Called when user cancels/backs out
 */

export default function CancelBookingCard({ open, onConfirm, onClose }) {
  if (!open) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "#0000004d",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          e.preventDefault();
          onClose();
        }
      }}
      onKeyUp={(e) => {
        if (e.key === "Escape") {
          e.preventDefault();
          onClose();
        }
      }}
    >
      <PopupCard onClick={(e) => e.stopPropagation()}>
        <div
          style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
        >
          <CloseButton onClick={onClose} />
        </div>
        <p style={{ textAlign: "center", margin: "2rem 0 0 0" }}>
          Are you sure you want to cancel your appointment?
        </p>
        <ActionButton
          $bg="#c90000"
          $color="#fff"
          onClick={onConfirm}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onConfirm();
            }
          }}
          onKeyUp={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onConfirm();
            }
          }}
          style={{ marginTop: "2rem", fontWeight: "bold", alignSelf: "center" }}
        >
          Yes, cancel appointment
        </ActionButton>
      </PopupCard>
    </div>
  );
}
