import { useEffect, useState } from "react";
import {
  ModalOverlay,
  ModalTitle,
  PopupCard,
} from "../../style/componentStyles";
import CloseButton from "../button/CloseButton";
import { getPatientBookings } from "../../api/booking";
import PatientMyBookingsCard from "../dashboard/PatientMyBookingsCard";

export default function ViewBookingsModal({
  open,
  onClose,
  patientId,
  doctors,
}) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!(open && patientId)) return;
    setLoading(true);
    getPatientBookings(patientId)
      .then((data) => setBookings(data || []))
      .finally(() => setLoading(false));
  }, [open, patientId]);

  if (!open) return null;

  return (
    <ModalOverlay>
      <PopupCard style={{ minWidth: 400 }}>
        <CloseButton onClick={onClose} />
        <ModalTitle>View Bookings</ModalTitle>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <PatientMyBookingsCard
            bookings={bookings}
            doctors={doctors}
            onBookingsRefresh={async () => {
              setBookings((await getPatientBookings(patientId)) || []);
            }}
          />
        )}
      </PopupCard>
    </ModalOverlay>
  );
}
