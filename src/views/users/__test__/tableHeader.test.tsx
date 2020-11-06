import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TableHeader from 'views/users/tableHeader';

const handleCheck = jest.fn();

describe('actions when checking a checkbox', () => {
  test('the checkbox is not checked when the number of selected boxes is 0', () => {
    render(
      <table>
        <TableHeader
          numSelected={0}
          rowCount={2}
          onSelectAllClick={handleCheck}
        />
      </table>,
    );
    expect(
      screen.getByLabelText(/Seleccionar todos los usuarios/i),
    ).not.toBeChecked();
  });
  test('the checkbos is is indeterminate state when the number of boxed is less than the row count', () => {
    render(
      <table>
        <TableHeader
          numSelected={1}
          rowCount={2}
          onSelectAllClick={handleCheck}
        />
      </table>,
    );
    expect(
      screen.getByLabelText(/Seleccionar todos los usuarios/i),
    ).toHaveAttribute('data-indeterminate', 'true');
  });

  test('the checkbox is checked when the selected rows are the same as the total row', () => {
    render(
      <table>
        <TableHeader
          numSelected={2}
          rowCount={2}
          onSelectAllClick={handleCheck}
        />
      </table>,
    );
    expect(
      screen.getByLabelText(/Seleccionar todos los usuarios/i),
    ).toBeChecked();
  });

  test('checking the checkbox trigger the onSelectAll ', () => {
    render(
      <table>
        <TableHeader
          numSelected={0}
          rowCount={2}
          onSelectAllClick={handleCheck}
        />
      </table>,
    );
    fireEvent.click(screen.getByLabelText(/Seleccionar todos los usuarios/i));
    expect(handleCheck).toHaveBeenCalled();
  });
});
