import { Navigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

export default function UserAdminPage() {
  const { isAuthenticated, userType } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (userType !== "staff") return <Navigate to="/dashboard" replace />;

  return (
    <main>
      <h1>User Administration</h1>
    </main>
  );
}
