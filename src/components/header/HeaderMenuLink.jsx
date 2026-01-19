import { NavLink } from "react-router";

export default function HeaderMenuLink({ children, to }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => (isActive ? "active" : null)}
    >
      {children}
    </NavLink>
  );
}
