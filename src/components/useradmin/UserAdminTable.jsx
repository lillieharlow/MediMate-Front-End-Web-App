import AddUserButton from '../button/AddUserButton';
import DeleteProfileButton from '../button/DeleteProfileButton';
import EditUserTypeButton from '../button/EditUserTypeButton';
import ManageProfileButton from '../button/ManageProfileButton';

export default function UserAdminTable({ users, onCreateUser, onEditUser, onDeleteUser }) {
  const onAddUser = () => {
    onCreateUser();
  };

  const onManageProfile = (profileId, userType) => {
    onEditUser(profileId, userType);
  };

  const onEditUserType = profileId => {
    console.log(`I will change type of profile: ${profileId}`);
  };

  const onDeleteProfile = (profileId, userType, userInfo) => {
    onDeleteUser(profileId, userType, userInfo);
  };

  return (
    <div>
      <div style={{ width: 'fit-content', marginLeft: 'auto' }}>
        <AddUserButton onAddUser={onAddUser} />
      </div>
      <table data-testid="app-useradmin-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Functions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => {
            return (
              <tr key={user.user._id}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.user.email}</td>
                <td>{user.user.userType.typeName}</td>
                <td>
                  <ManageProfileButton
                    profileId={user.user._id}
                    userType={user.user.userType.typeName}
                    onManage={onManageProfile}
                  />
                  <EditUserTypeButton profileId={user.user._id} onEditType={onEditUserType} />
                  <DeleteProfileButton
                    profileId={user.user._id}
                    userType={user.user.userType.typeName}
                    userInfo={{
                      email: user.user.email,
                      firstName: user.firstName,
                      lastName: user.lastName,
                    }}
                    onDelete={onDeleteProfile}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
