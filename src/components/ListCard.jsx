/*
ListCard component
- Displays card-style list items for user dashboards
- Layouts are in their own files
- Accepts props for title (required), image, icon, subtitle, info, actions, and custom content
- Used inside DashboardCard component
*/


// biome-ignore assist/source/organizeImports: false positive
import  OurDoctorsListCard from "./OurDoctorsListCard.jsx";
import MyBookingsListCard from "./MyBookingsListCard.jsx";
import "../style/componentStyles.js";

const ListCard = (props) => {
  const { layout } = props;
  if (layout === "our-doctors") return <OurDoctorsListCard {...props} />;
  if (layout === "my-bookings") return <MyBookingsListCard {...props} />;
  return null;
};

export default ListCard;