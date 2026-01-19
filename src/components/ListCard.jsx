/*
ListCard component
- Displaying list items in a card style
- title required, optional image, icon, subtitle, info, actions, custom content
- For use inside DashboardCard or any card-style list item
*/

import PropTypes from "prop-types";
import "../style/componentStyles.js";

const ListCard = ({
  image,
  icon,
  title,
  subtitle,
  info,
  actions,
  children,
  style,
}) => {
  return (
    <div className="list-card" style={style}>
      <div className="list-card-header">
        {image && <img src={image} alt="" className="list-card-image" />}
        {icon && <span className="list-card-icon">{icon}</span>}
        <div className="list-card-titles">
          <h4 className="list-card-title">{title}</h4>
          {subtitle && <div className="list-card-subtitle">{subtitle}</div>}
        </div>
      </div>
      {info && <div className="list-card-info">{info}</div>}
      <div className="list-card-content">{children}</div>
      {actions && <div className="list-card-actions">{actions}</div>}
    </div>
  );
};

ListCard.propTypes = {
  image: PropTypes.string,
  icon: PropTypes.node,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  info: PropTypes.node,
  actions: PropTypes.node,
  children: PropTypes.node,
  style: PropTypes.object,
};

export default ListCard;
