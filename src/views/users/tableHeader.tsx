import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';

interface Props {
  numSelected: number;
  rowCount: number;
  onSelectAllClick: () => any;
}

const TableHeader = ({ numSelected, rowCount, onSelectAllClick }: Props) => {
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'Seleccionar todos los usuarios',
            }}
          />
        </TableCell>
        <TableCell>Usuario</TableCell>
        <TableCell>Creado</TableCell>
        <TableCell>Actualizado</TableCell>
        <TableCell>API key</TableCell>
        <TableCell />
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
