/*
- "Cancel Booking" button for booking management
*/

// biome-ignore assist/source/organizeImports: keeping import order for clarity
import { useState } from "react";
import ActionButton from "./ActionButton";
import CancelBookingCard from "../booking/CancelBookingCard";

function CancelBookingButton({ bookingId, onCancel }) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleCancelClick = (e) => {
    e.stopPropagation();
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    setShowConfirm(false);
    onCancel(bookingId);
  };

  const handleClose = (e) => {
    if (e) e.stopPropagation();
    setShowConfirm(false);
  };

  return (
    <>
      <ActionButton
        $bg="#c90000"
        $color="#ffffff"
        onClick={handleCancelClick}
        style={{ fontSize: "0.85rem" }}
      >
        Cancel Booking
      </ActionButton>
      <CancelBookingCard
        open={showConfirm}
        onConfirm={handleConfirm}
        onClose={handleClose}
      />
    </>
  );
}

export default CancelBookingButton;
