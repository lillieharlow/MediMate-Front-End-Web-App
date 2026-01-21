/*
Dashboard Card component
- Displaying dashboard sections in a card style
- title required, optional custom content and styles
- For use on dashboard pages
*/
import PropTypes from "prop-types";
import { Card } from "../style/componentStyles.js";

const DashboardCard = ({ title, children, style }) => {
  return (
    <Card style={style}>
      <div className="dashboard-card-header">
        <h3 className="dashboard-card-title">{title}</h3>
        {typeof children === "object" && children && children.props && children.props.actions && (
          <div className="dashboard-card-actions">{children.props.actions}</div>
        )}
      </div>
      <div className="dashboard-card-content">{children}</div>
    </Card>
  );
};

DashboardCard.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
  style: PropTypes.object,
};

export default DashboardCard;
