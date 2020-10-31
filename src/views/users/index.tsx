import React, { ReactElement } from 'react';
import NewUser from 'views/users/addUser';
import SearchUser from 'views/users/searchUser';
import UsersTable from 'views/users/usersTable';

interface Props {}

export default function Users(props: Props): ReactElement {
  console.log(props);
  return (
    <div>
      <SearchUser />
      <NewUser />
      <UsersTable />
    </div>
  );
}
