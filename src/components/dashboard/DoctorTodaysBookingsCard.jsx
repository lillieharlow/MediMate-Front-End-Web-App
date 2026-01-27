/*
DoctorTodaysBookingsCard component
- Displays today's bookings for a doctor or staff user
- Colors past bookings grey, centers the list, and shows a message when all bookings are done
*/

// biome-ignore assist/source/organizeImports: manually ordered for clarity
import PropTypes from "prop-types";
import DashboardCard from "./DashboardCard";
import DoctorManagerListCard from "./DoctorManagerListCard";
import { NameBox, NameBoxRow } from "../../style/componentStyles";

const TodaysBookingsCard = ({
  doctorBookings,
  containerClassName,
  cardStyle,
  selectedBooking,
}) => {
  const now = new Date();
  return (
    <DashboardCard title="Today's Bookings" style={cardStyle}>
      <div
        className={containerClassName}
        data-testid="doctor-todays-bookings-card"
      >
        {doctorBookings.length === 0 ? (
          <div style={{
            textAlign: "center",
            marginTop: "1.5em",
            color: "#e0e0e0",
            fontWeight: 500,
          }}>
            ---------- No more bookings today ----------
          </div>
        ) : (
          doctorBookings.map((booking) => {
              const bookingTime = new Date(booking.datetimeStart);
              const isPast = bookingTime < now;
              const isSelected =
                selectedBooking && booking._id === selectedBooking._id;
              let bgColor;
              if (isPast) {
                bgColor = "#e0e0e0";
              } else {
                bgColor = undefined;
              }
              return (
                <NameBoxRow $selected={isSelected} key={booking._id}>
                  <NameBox $bg={bgColor} style={{ cursor: "default" }}>
                    <DoctorManagerListCard booking={booking} />
                  </NameBox>
                </NameBoxRow>
              );
            })
        )}
      </div>
    </DashboardCard>
  );
};

TodaysBookingsCard.defaultProps = {
  renderBooking: undefined,
  containerClassName: "",
  cardStyle: undefined,
  onBookingSelect: undefined,
  selectedBooking: undefined,
};

TodaysBookingsCard.propTypes = {
  doctorBookings: PropTypes.array.isRequired,
  renderBooking: PropTypes.func,
  containerClassName: PropTypes.string,
  cardStyle: PropTypes.object,
  onBookingSelect: PropTypes.func,
  selectedBooking: PropTypes.object,
};
export default TodaysBookingsCard;
