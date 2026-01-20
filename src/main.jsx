import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router";
import App from "./App.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";

// MSW browser mock setup - COMMENT OUT FOR PRODUCTION
// This ensures mock API responses in development only
const renderApp = () => {
  createRoot(document.getElementById("root")).render(
    <StrictMode>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </StrictMode>
  );
};

if (import.meta.env.MODE === 'development') {
  // MSW setup for local API mocking
  import('../tests/mocks/browser').then(({ worker }) => {
    worker.start().then(renderApp);
  });
} else {
  renderApp();
}