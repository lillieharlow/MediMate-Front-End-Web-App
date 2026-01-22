import DeleteProfileButton from "./button/DeleteProfileButton";
import ManageProfileButton from "./button/EditProfileButton";

export default function UserAdminTable({ users }) {
  const onManageProfile = (profileId) => {
    console.log(`I will manage profile: ${profileId}`);
  };

  const onDeleteProfile = (profileId) => {
    console.log(`I will delete profile: ${profileId}`);
  };

  return (
    <table>
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
        {users.map((user) => {
          return (
            <tr key={user._id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.user.email}</td>
              <td>{user.user.userType.typeName}</td>
              <td>
                <ManageProfileButton
                  profileId={user._id}
                  onManage={onManageProfile}
                />
                <DeleteProfileButton
                  profileId={user._id}
                  onManage={onDeleteProfile}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
