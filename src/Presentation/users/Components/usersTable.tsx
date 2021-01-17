import React, { ReactElement, useEffect, useState } from 'react';
// Packages
import { useSelector } from 'react-redux';
// MUI Components
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
// Local Components
import TableHeader from 'Presentation/users/Components/tableHeader';
import TableRow from 'Presentation/users/Components/tableRow';
import TableToolbar from 'Presentation/users/Components/tableToolbar';
import ChangePasswordDialog from 'Presentation/users/Components/changePasswordDialog';
// Redux
import { RootState } from 'redux/rootReducer';
// Services
import { getAPIKey, deleteUser } from 'Domain/Services/user';

function UsersTable(): ReactElement {
  const [loadingUser, setLoadingUser] = useState<{ [x: number]: boolean }>([]);
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [numSelected, setNumSelected] = useState(0);
  const [rowCount, setRowCount] = useState(0);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [changePasswordId, setChangePasswordId] = useState(-1);

  const users = useSelector((state: RootState) => state.users.userList);

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
    getAPIKey(userId)
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
    const arr = selectedRows.map((userId) => deleteUser(userId));
    Promise.all(arr)
      .then(() => {
        setSelectedRows([]);
        setNumSelected(0);
      })
      .catch(() => {
        console.log('error no se puede borrar');
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

export default UsersTable;
