/*
PatientMyBookingsCard component
- Displays a list of the patient's future bookings
- Shows appointment date, time, doctor name, duration, status, and action buttons
- Used in the patient dashboard
*/

// biome-ignore assist/source/organizeImports: keeping import order for clarity
import { useState } from "react";
import { NameBox } from "../../style/componentStyles.js";
import { FaRegCalendarAlt, FaRegClock, FaUserMd } from "react-icons/fa";
import ManageBookingButton from "../button/ManageBookingButton.jsx";
import UpdateBookingCard from "../booking/UpdateBookingModal.jsx";
import CancelBookingButton from "../button/CancelBookingButton.jsx";
import { deleteBooking } from "../../api/booking";

function PatientMyBookingsCard({
  bookings = [],
  doctors = [],
  onBookingsRefresh,
}) {
  const [showUpdate, setShowUpdate] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  // Filter to only future bookings
  const now = new Date();
  const futureBookings = bookings.filter((b) => {
    const bookingDate = b.datetimeStart ? new Date(b.datetimeStart) : null;
    return bookingDate && bookingDate > now;
  });

  // Sort bookings by soonest appointment first
  const sortedBookings = [...futureBookings].sort((a, b) => {
    const aDate = a.datetimeStart ? new Date(a.datetimeStart) : new Date(0);
    const bDate = b.datetimeStart ? new Date(b.datetimeStart) : new Date(0);
    return aDate - bDate;
  });

  const handleCancelBooking = async (bookingId) => {
    try {
      await deleteBooking(bookingId);
      if (onBookingsRefresh) onBookingsRefresh();
    } catch {
      alert("Failed to cancel booking. Please try again.");
    }
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {sortedBookings.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              marginTop: "1em",
              color: "#e0e0e0",
              fontWeight: 500,
            }}
          >
            ---------- No bookings ----------
          </div>
        ) : (
          sortedBookings.map((booking) => {
            const dateObj = booking.datetimeStart
              ? new Date(booking.datetimeStart)
              : null;
            const date = dateObj ? dateObj.toLocaleDateString() : "-";
            const time = dateObj
              ? dateObj.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })
              : "-";
            let doctor = null;
            if (Array.isArray(doctors) && booking.doctorId) {
              doctor = doctors.find(
                (doc) =>
                  (doc.user &&
                    String(doc.user._id) === String(booking.doctorId)) ||
                  String(doc._id) === String(booking.doctorId),
              );
            }
            const durationText = booking.bookingDuration
              ? `Duration: ${booking.bookingDuration} min`
              : "Duration: -";
            const statusText = booking.bookingStatus
              ? `Booking Status: ${booking.bookingStatus}`
              : "Booking Status: -";
            return (
              <NameBox $bg="#fff" key={booking._id}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    minWidth: 70,
                    marginRight: 18,
                    position: "relative",
                    paddingTop: 16,
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 10,
                      right: 0,
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      fontSize: 15,
                    }}
                  >
                    <span style={{ fontSize: 18, marginRight: 2 }}>
                      <FaUserMd />
                    </span>
                    {doctor ? (
                      <span>
                        Dr. {doctor.firstName} {doctor.lastName}
                      </span>
                    ) : null}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      fontSize: 15,
                      marginBottom: 4,
                    }}
                  >
                    <FaRegCalendarAlt style={{ fontSize: 18 }} />
                    <span>{date}</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      fontSize: 15,
                    }}
                  >
                    <FaRegClock style={{ fontSize: 17 }} />
                    <span>{time}</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      alignItems: "center",
                      marginTop: 4,
                    }}
                  >
                    <span
                      style={{ fontSize: 14, flex: 1, fontWeight: "normal" }}
                    >
                      {durationText}
                    </span>
                    <span
                      style={{
                        fontSize: 14,
                        fontWeight: "normal",
                        textAlign: "right",
                        minWidth: 120,
                      }}
                    >
                      {statusText}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: 20,
                      margin: 16,
                      justifyContent: "center",
                    }}
                  >
                    <ManageBookingButton
                      bookingId={booking._id}
                      onManage={() => {
                        setSelectedBooking(booking);
                        setSelectedDoctor(doctor);
                        setShowUpdate(true);
                      }}
                    />
                    <CancelBookingButton
                      bookingId={booking._id}
                      onCancel={handleCancelBooking}
                    />
                  </div>
                </div>
              </NameBox>
            );
          })
        )}
      </div>
      {showUpdate && selectedBooking && selectedDoctor && (
        <UpdateBookingCard
          open={showUpdate}
          onClose={() => setShowUpdate(false)}
          booking={selectedBooking}
          doctor={selectedDoctor}
          patientId={selectedBooking.patientId}
          onBookingUpdated={() => {
            setShowUpdate(false);
            if (onBookingsRefresh) {
              onBookingsRefresh();
            }
          }}
        />
      )}
    </>
  );
}

export default PatientMyBookingsCard;
