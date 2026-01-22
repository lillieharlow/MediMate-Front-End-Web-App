import { Navigate } from "react-router";
import ManageProfileCard from "../components/ManageProfileCard";
import { useAuth } from "../contexts/AuthContext";

export default function ProfilePage() {
  const { isAuthenticated, userType } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <main>
      <h2>Manage Your Profile</h2>
      <ManageProfileCard userType={userType} />
    </main>
  );
}
