import { Navigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

export default function HomePage() {
  const { userId, userType, isAuthenticated } = useAuth();

  // Return user to login page if they're not authenticated
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <main>
      <h1 data-testid="app-dashboard-heading">Dashboard (Placeholder)</h1>
      {/* Placeholder information to verify login */}
      <div id="dev-information">
        <p>Authenticated: {JSON.stringify(isAuthenticated)}</p>
        <p>User: {JSON.stringify(userId)}</p>
        <p>Type: {JSON.stringify(userType)}</p>
      </div>
    </main>
  );
}
