import { useEffect, useState } from "react";
import { Link } from "react-router";
import styled from "styled-components";
import { useAuth } from "../contexts/AuthContext";
import HeaderMenu from "./HeaderMenu";

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
`;

const MenuButton = styled.button`
  padding: 0.5rem 0.75rem;
`;

const MenuOverlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.01);
  -webkit-backdrop-filter: blur(1px);
  backdrop-filter: blur(1px);
`;

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  // Ensure menu starts closed in instances where user has previously logged out on render
  useEffect(() => {
    setMenuOpen(false);
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <StyledHeader>
      <span>
        <Link to="/" style={{ color: "inherit" }}>
          <h3>MediMate</h3>
        </Link>
      </span>

      {isAuthenticated && (
        <div style={{ position: "relative" }}>
          <MenuButton
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span style={{ fontSize: "16pt" }}>☰</span>
          </MenuButton>

          {/* Render overlay first so the menu is still interactable */}
          {menuOpen && <MenuOverlay onClick={() => setMenuOpen(false)} />}

          {menuOpen && (
            <HeaderMenu
              onClose={() => setMenuOpen(false)}
              onClickItem={closeMenu}
            />
          )}
        </div>
      )}
    </StyledHeader>
  );
}
