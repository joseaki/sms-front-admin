import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import LockIcon from '@material-ui/icons/Lock';
import { User } from 'Domain/Entity/user';

interface Props {
  user: User;
  isChecked: boolean;
  loading?: boolean;
  rowCheck: (e: React.MouseEvent, userId: number) => any;
  changePasswordClick: (userId: number) => any;
  getAPIKey: (userId: number) => any;
}

const tableRow = ({
  user,
  isChecked,
  rowCheck,
  changePasswordClick,
  getAPIKey,
  loading,
}: Props) => {
  return (
    <TableRow hover role="checkbox" selected={isChecked}>
      <TableCell padding="checkbox">
        <Checkbox
          onClick={(e) => rowCheck(e, user.id)}
          checked={isChecked}
          inputProps={{
            'aria-labelledby': 'enhanced-table-checkbox-1',
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
