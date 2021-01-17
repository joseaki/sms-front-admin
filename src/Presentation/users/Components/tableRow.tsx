import React from 'react';
// MUI Components
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import LockIcon from '@material-ui/icons/Lock';
// Entities
import { User } from 'Domain/Entity/user';

interface Props {
  user: User;
  isChecked: boolean;
  loading?: boolean;
  rowCheck: (userId: number) => any;
  changePasswordClick: (userId: number) => any;
  getAPIKey: (userId: number) => any;
}

const tableRow = (props: Props) => {
  const { user, isChecked, rowCheck } = props;
  const { changePasswordClick, getAPIKey, loading } = props;

  return (
    <TableRow hover role="checkbox" selected={isChecked}>
      <TableCell padding="checkbox">
        <Checkbox
          onClick={() => rowCheck(user.id)}
          checked={isChecked}
          inputProps={{
            'aria-label': `table row checkbox user ${user.id}`,
          }}
        />
      </TableCell>
      <TableCell>{user.username}</TableCell>
      <TableCell>{user.password}</TableCell>
      <TableCell>c</TableCell>
      <TableCell>
        {user.apiKey && user.apiKey !== '' ? (
          user.apiKey
        ) : (
          <Button
            size="small"
            color="primary"
            variant="contained"
            disabled={loading}
            onClick={() => getAPIKey(user.id)}
          >
            {loading ? 'Cargando' : 'Mostrar API Key'}
          </Button>
        )}
      </TableCell>
      <TableCell>
        <Button
          size="small"
          color="primary"
          variant="contained"
          startIcon={<LockIcon />}
          onClick={() => changePasswordClick(user.id)}
        >
          Cambiar contraseña
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default tableRow;
