import React, { ReactElement, useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHeader from 'views/users/tableHeader';
import TableRow from 'views/users/tableRow';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import { RootState } from 'redux/rootReducer';
import { User } from 'Domain/Entity/user';
import TableToolbar from 'views/users/tableToolbar';
import ChangePasswordDialog from 'views/users/changePasswordDialog';
import { getAPIKey, deleteUser } from 'redux/userSlice';

interface Props {
  dispatch: any;
  users: User[];
}

function UsersTable({ dispatch, users }: Props): ReactElement {
  const [loadingUser, setLoadingUser] = useState<{ [x: number]: boolean }>([]);
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [numSelected, setNumSelected] = useState(0);
  const [rowCount, setRowCount] = useState(0);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [changePasswordId, setChangePasswordId] = useState(-1);

  useEffect(() => {
    setRowCount(users.length);
  }, [users]);

  const onSelectAllClick = () => {
    const allUsers = users.map((user) => user.id);
    if (numSelected < rowCount) {
      setSelectedRows(allUsers);
      setNumSelected(allUsers.length);
    } else {
      setSelectedRows([]);
      setNumSelected(0);
    }
  };

  const handleRowCheck = (userId: number) => {
    const user = selectedRows.find((thisUser) => thisUser === userId);
    if (user) {
      const newList = selectedRows.filter((thisUser) => thisUser !== userId);
      setSelectedRows(newList);
      setNumSelected(newList.length);
    } else {
      const newList = [...selectedRows, userId];
      setSelectedRows(newList);
      setNumSelected(newList.length);
    }
  };

  const isItemSelected = (userId: number) => {
    const user = selectedRows.find((thisUser) => thisUser === userId);
    if (user) return true;
    return false;
  };

  const isItemLoading = (userId: number) => {
    return loadingUser[userId];
  };

  const handleChangePassword = (userId: number) => {
    setOpenChangePassword(true);
    setChangePasswordId(userId);
  };

  const handleCloseDialog = () => {
    setOpenChangePassword(false);
    setChangePasswordId(-1);
  };

  const handleGetAPIKey = (userId: number) => {
    const userLoad = { [userId]: true };
    setLoadingUser({ ...loadingUser, ...userLoad });
    dispatch(getAPIKey(userId))
      .then(() => {
        const userLoadF = { [userId]: false };
        setLoadingUser({ ...loadingUser, ...userLoadF });
      })
      .catch(() => {
        const userLoadF = { [userId]: false };
        setLoadingUser({ ...loadingUser, ...userLoadF });
      });
  };

  const handleDeleteItems = () => {
    const arr: any[] = [];
    selectedRows.forEach((userId) => {
      arr.push(dispatch(deleteUser(userId)));
    });
    Promise.all(arr)
      .then(() => {
        setSelectedRows([]);
        setNumSelected(0);
      })
      .catch(() => {
        console.log('error');
      });
  };

  return (
    <>
      <Paper>
        <TableToolbar
          numSelected={numSelected}
          deleteItems={handleDeleteItems}
        />
        <TableContainer>
          <Table size="small" aria-label="Tabla de usuarios">
            <TableHeader
              numSelected={numSelected}
              rowCount={rowCount}
              onSelectAllClick={onSelectAllClick}
            />
            <TableBody>
              {users.map((user) => {
                const isChecked = isItemSelected(user.id);
                const isLoading = isItemLoading(user.id);
                return (
                  <TableRow
                    key={user.id}
                    user={user}
                    loading={isLoading}
                    isChecked={isChecked}
                    rowCheck={handleRowCheck}
                    changePasswordClick={handleChangePassword}
                    getAPIKey={handleGetAPIKey}
                  />
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <ChangePasswordDialog
        userId={changePasswordId}
        open={openChangePassword}
        closeDialog={handleCloseDialog}
      />
    </>
  );
}

const mapStateToProps = (state: RootState) => {
  return {
    users: state.users.userList,
  };
};

export default connect(mapStateToProps)(UsersTable);
