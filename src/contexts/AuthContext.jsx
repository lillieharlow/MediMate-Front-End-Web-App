import { createContext, useContext, useEffect, useState } from "react";
import { getJwtPayload } from "../utils/jwt";

const defaultState = {
  userId: null,
  userType: null,
  token: null,
  isAuthenticated: false,
};

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const saved = localStorage.getItem("token");

    if (!saved) {
      return defaultState;
    }

    try {
      const parsedToken = JSON.parse(saved);

      // Validate token - this could refresh token too

      const payload = getJwtPayload(parsedToken);

      return {
        userId: payload.userId,
        userType: payload.userType,
        token: parsedToken,
        isAuthenticated: true,
      };
    } catch {
      return {
        ...defaultState,
      };
    }
  });

  useEffect(() => {
    if (!auth.isAuthenticated) {
      localStorage.removeItem("token");
      return;
    }

    const { token } = auth;

    localStorage.setItem("token", JSON.stringify(token));
  }, [auth]);

  const login = ({ userId, userType, token }) => {
    setAuth({ userId, userType, token, isAuthenticated: true });
  };

  const logout = () => {
    setAuth(defaultState);
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
