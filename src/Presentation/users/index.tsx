import Grid from '@material-ui/core/Grid';
import React, { ReactElement, useEffect } from 'react';
import NewUser from 'Presentation/users/Components/addUser';
import SearchBar from 'Presentation/users/Components/searchBar';
import UsersTable from 'Presentation/users/Components/usersTable';
import { saveUser } from 'Domain/Services/user';

// ! uncomment if you want to use dispatch inside component
// interface Props {dispatch}

// const Users = ({dispatch}: Props): ReactElement =>{
const Users = (): ReactElement => {
  useEffect(() => {
    saveUser({ id: 0, username: '123', password: '123' });
  }, []);
  return (
    <div style={{ padding: '16px' }}>
      <Grid
        container
        direction="row"
        alignItems="flex-end"
        justify="center"
        spacing={2}
        style={{ marginBottom: '16px' }}
      >
        <Grid item xs={8}>
          <SearchBar />
        </Grid>
        <Grid item xs={4} container justify="flex-end">
          <NewUser />
        </Grid>
      </Grid>
      <Grid>
        <UsersTable />
      </Grid>
    </div>
  );
};

// export default connect(null)(Users)
export default Users;
