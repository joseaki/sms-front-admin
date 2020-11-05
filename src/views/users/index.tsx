import Grid from '@material-ui/core/Grid';
import React, { ReactElement } from 'react';
import NewUser from 'views/users/addUser';
import SearchBar from 'views/users/searchBar';
import UsersTable from 'views/users/usersTable';

interface Props {}

export default function Users(props: Props): ReactElement {
  console.log(props);
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
          <div>
            <NewUser />
          </div>
        </Grid>
      </Grid>
      <Grid>
        <UsersTable />
      </Grid>
    </div>
  );
}
