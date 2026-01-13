import { NavLink } from "react-router";
import styled from "styled-components";
import { useAuth } from "../contexts/AuthContext";

const Menu = styled.div`
  background-color: white;
  position: absolute;
  right: 20px;
  top: 20px;
  border: 1px solid black;
  border-radius: 8px;
  padding: 0.5rem;
  margin: 0;

  > ul {
    margin: 0;
    padding: 0 0.5rem;
    list-style: none;
    width: 150px;
  }
`;
export default function HeaderMenu({ onClickItem }) {
  const { userType } = useAuth();
  return (
    <Menu role="menu">
      <ul>
        <li>
          <NavLink
            to="/dashboard"
            onClick={onClickItem}
            className={({ isActive }) => (isActive ? "active" : null)}
          >
            <span>Dashboard</span>
          </NavLink>
        </li>
        {["patient", "staff"].includes(userType) && (
          <li>
            <NavLink
              to="/book"
              onClick={onClickItem}
              className={({ isActive }) => (isActive ? "active" : null)}
            >
              New Booking
            </NavLink>
          </li>
        )}
        {userType === "staff" && (
          <li>
            <NavLink
              to="/useradmin"
              onClick={onClickItem}
              className={({ isActive }) => (isActive ? "active" : null)}
            >
              User Administration
            </NavLink>
          </li>
        )}

        <li>
          <NavLink
            to="/profile"
            onClick={onClickItem}
            className={({ isActive }) => (isActive ? "active" : null)}
          >
            My Profile
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/logout"
            onClick={onClickItem}
            className={({ isActive }) => (isActive ? "active" : null)}
          >
            Logout
          </NavLink>
        </li>
      </ul>
    </Menu>
  );
}
