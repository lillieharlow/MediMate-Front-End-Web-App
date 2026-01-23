/*
MyBookingsListCard component
- Renders "My Bookings" card for a patient
- Shows booking date, time, doctor name, icons, and action buttons
- Child component of ListCard when layout is set to 'my-bookings'
*/

function MyBookingsListCard({ bookingDate, bookingTime, doctorName, title, icon, actions, style }) {
  return (
    <div className="list-card booking-card" style={style}>
      <div className="list-card-left">
        <div className="booking-icons">
          <span className="calendar-icon">📅</span>
          <span className="booking-date">{bookingDate}</span>
          <span className="clock-icon">⏰</span>
          <span className="booking-time">{bookingTime}</span>
        </div>
      </div>
      <div className="list-card-main">
        <h4 className="list-card-title">{doctorName}</h4>
        {title && <div className="list-card-booking-title">{title}</div>}
      </div>
      <div className="list-card-right">
        {icon && <span className="list-card-icon">{icon}</span>}
        <div className="list-card-actions">{actions}</div>
      </div>
    </div>
  );
}

export default MyBookingsListCard;
