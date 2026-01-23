/*
OurDoctorsListCard component
- Card for displaying "Our Doctors"
- Child component of ListCard when layout is set to 'our-doctors'
*/

function OurDoctorsListCard({ image, title, subtitle, info, actions, style }) {
  return (
    <div className="list-card doctor-card" style={style}>
      <div className="list-card-left">
        {image && <img src={image} alt="Doctor" className="list-card-image" />}
      </div>
      <div className="list-card-main">
        <h4 className="list-card-title">{title}</h4>
        {subtitle && <div className="list-card-subtitle">{subtitle}</div>}
        {info && <div className="list-card-info">{info}</div>}
      </div>
      <div className="list-card-right">{actions}</div>
    </div>
  );
}

export default OurDoctorsListCard;
