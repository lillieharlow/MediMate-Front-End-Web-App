/*
- "Create Booking" button for creating a booking for a patient
*/

// biome-ignore assist/source/organizeImports: keeping import order for clarity
import ActionButton from "./ActionButton";
// TODO: Implement modal popup for staff booking creation
function CreateBookingButton() {
  return (
    <ActionButton type="button" disabled>
      Create Booking
    </ActionButton>
  );
}

export default CreateBookingButton;
