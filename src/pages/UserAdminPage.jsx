import { useEffect, useState } from 'react';
import { Navigate } from 'react-router';
import styled from 'styled-components';
import { populateUsersRequest } from '../api/staff';
import ManageProfileCard from '../components/ManageProfileCard';
import UserAdminTable from '../components/UserAdminTable';
import { useAuth } from '../contexts/AuthContext';
import { BlurOverlay } from '../style/componentStyles';

const StaticCard = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 2rem;
  border: 2px solid #8b8b8b;
  border-radius: 10px;
`;

export default function UserAdminPage() {
  const [users, setUsers] = useState([]);
  const [renderOverlay, setRenderOverlay] = useState(false);
  const [editingProfile, setEditingProfile] = useState(false);
  const [targetUser, setTargetUser] = useState({ userId: null, userType: null });
  const { isAuthenticated, userType } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) return;
    if (userType !== 'staff') return;

    async function fetchData() {
      const data = await populateUsersRequest();
      setUsers(data.users);
    }

    fetchData();
  }, [isAuthenticated, userType]);

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (userType !== 'staff') return <Navigate to="/dashboard" replace />;

  const closeCard = () => {
    setRenderOverlay(false);
    setEditingProfile(false);
    setTargetUser({ userId: null, userType: null });
  };

  const editUser = (profileId, userType) => {
    setRenderOverlay(true);
    setEditingProfile(true);
    setTargetUser({ userId: profileId, userType });
  };

  const updateUserTable = user => {
    console.log(user);
    setUsers(prev => prev.map(u => (u._id === user._id ? user : u)));
  };

  return (
    <main>
      <h1>User Administration</h1>

      <UserAdminTable users={users} onEditUser={editUser} />
      {renderOverlay && (
        <>
          <BlurOverlay onClick={closeCard} />
          {editingProfile && (
            <StaticCard>
              <h2>Edit User Profile</h2>
              <ManageProfileCard
                userType={targetUser.userType}
                userId={targetUser.userId}
                onProfileUpdated={updateUserTable}
              />
            </StaticCard>
          )}
        </>
      )}
    </main>
  );
}
