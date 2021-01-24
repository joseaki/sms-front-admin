import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UsersTable from 'Presentation/users/Components/usersTable';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Root from 'Root';

const server = setupServer(
  rest.delete('http://localhost:5000/users/:id', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ id: 1, username: 'jose', password: 'jose' }),
    );
  }),
  rest.delete('*', (req, res, ctx) => {
    // eslint-disable-next-line no-console
    console.error('Add request handler!!!!');
    return res(
      ctx.status(500),
      ctx.json({ error: 'please add request handler' }),
    );
  }),
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

const users = [
  { id: 1, username: 'jose', password: 'jose' },
  { id: 2, username: 'admin', password: 'jose' },
  { id: 3, username: 'add', password: 'jose' },
];

beforeEach(() => {
  render(
    <Root initialState={{ users: { userList: users } }}>
      <UsersTable />
    </Root>,
  );
});

describe('checkbox check', () => {
  test('list of users is displayed', () => {
    expect(screen.getAllByText(/mostrar api key/i).length).toEqual(3);
  });
  test('all checkbox are not checked', () => {
    const checkboxList = screen.getAllByLabelText(/table row checkbox/i);
    checkboxList.forEach((checkBox) => {
      expect(checkBox).not.toBeChecked();
    });
  });
  test('toolbar to show when a checkboxz is checked', () => {
    fireEvent.click(screen.getAllByLabelText(/table row checkbox/i)[0]);
    expect(screen.getByText(/1 seleccionado/i)).toBeInTheDocument();
  });
  test('check the checkbox in the header select all checkboxes in the body', () => {
    fireEvent.click(screen.getByLabelText(/seleccionar todos los usuarios/i));
    const checkboxes = screen.getAllByLabelText(/table row checkbox/i);
    checkboxes.forEach((checkbox) => {
      expect(checkbox).toBeChecked();
    });
  });
  test('delete selected users dont show in the table', async () => {
    fireEvent.click(screen.getAllByLabelText(/table row checkbox/i)[0]);
    fireEvent.click(screen.getAllByLabelText(/table row checkbox/i)[1]);
    fireEvent.click(screen.getByRole('button', { name: 'borrar' }));
    await waitFor(() => {
      expect(screen.getAllByText(/mostrar api key/i).length).toEqual(1);
    });
  });
});
