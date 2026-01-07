import { createContext, useState, useContext, useEffect } from "react";

const defaultState = {
  userId: null,
  userType: null,
  token: null,
  isAuthenticated: false,
};

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const saved = localStorage.getItem("user");

    if (!saved) {
      return defaultState;
    }

    try {
      const parsed = JSON.parse(saved);
      return {
        userId: parsed.userId,
        userType: parsed.userType,
        token: parsed.token,
        isAuthenticated: parsed.isAuthenticated,
      };
    } catch {
      return {
        ...defaultState,
      };
    }
  });

  useEffect(() => {
    if (!auth.isAuthenticated) {
      localStorage.removeItem("user");
      return;
    }

    const { userId, userType, token } = auth;

    localStorage.setItem("user", JSON.stringify({ userId, userType, token }));
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
