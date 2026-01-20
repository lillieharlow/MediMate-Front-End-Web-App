/*
MyBookingsListCard component
- Renders "My Bookings" card for the patient dashboard
- Shows booking date, time, doctor name, icons, and action buttons
- Used by ListCard when layout is 'my-bookings'
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
