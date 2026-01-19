/*
DashboardCard component
- Displaying dashboard sections in a card style
- title required, optional custom content and styles
- For use on dashboard pages
*/
import PropTypes from "prop-types";
import "../style/componentStyles.js";

const DashboardCard = ({ title, children, style }) => {
  return (
    <div className="dashboard-card" style={style}>
      <h3 className="dashboard-card-title">{title}</h3>
      <div className="dashboard-card-content">{children}</div>
    </div>
  );
};

DashboardCard.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
  style: PropTypes.object,
};

export default DashboardCard;
