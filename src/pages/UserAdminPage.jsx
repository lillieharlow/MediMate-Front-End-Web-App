import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { populateUsersRequest } from "../api/staff";
import UserAdminTable from "../components/UserAdminTable";
import { useAuth } from "../contexts/AuthContext";

export default function UserAdminPage() {
  const [users, setUsers] = useState([]);
  const { isAuthenticated, userType } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) return;
    if (userType !== "staff") return;
    async function fetchData() {
      const data = await populateUsersRequest();
      setUsers(data.users);
    }

    fetchData();
  }, [isAuthenticated, userType]);

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (userType !== "staff") return <Navigate to="/dashboard" replace />;

  return (
    <main>
      <h1>User Administration</h1>
      <UserAdminTable users={users} />
    </main>
  );
}
