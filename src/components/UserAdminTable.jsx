export default function UserAdminTable({ users }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Fname</th>
          <th>Lname</th>
          <th>Email</th>
          <th>Role</th>
          <th>Functions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => {
          return (
            <tr key={user.id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.user.email}</td>
              <td>{user.user.userType.typeName}</td>
              <td>Functions Go Here</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
