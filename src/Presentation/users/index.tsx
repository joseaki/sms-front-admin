import Grid from '@material-ui/core/Grid';
import React, { ReactElement } from 'react';
import NewUser from 'Presentation/users/Components/addUser';
import SearchBar from 'Presentation/users/Components/searchBar';
import UsersTable from 'Presentation/users/Components/usersTable';

// ! uncomment if you want to use dispatch inside component
// interface Props {dispatch}
interface Props {}

// const Users = ({dispatch}: Props): ReactElement =>{
const Users = (props: Props): ReactElement => {
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
