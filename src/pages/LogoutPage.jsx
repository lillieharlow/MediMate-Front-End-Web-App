import { Navigate } from "react-router";
import LogoutCard from "../components/LogoutCard";
import { useAuth } from "../contexts/AuthContext";

export default function LogoutPage() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <main>
      <LogoutCard />
    </main>
  );
}
