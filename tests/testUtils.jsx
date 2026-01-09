import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import { AuthProvider } from "../src/contexts/AuthContext";
import AppRoutes from "../src/router/AppRoutes";

export const renderWithAll = (ui) => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes>{ui}</AppRoutes>
      </AuthProvider>
    </BrowserRouter>
  );
};
