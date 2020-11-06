import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ChangePasswordDialog from 'views/users/changePasswordDialog';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Root from 'Root';

const handleCloseDialog = jest.fn();
const server = setupServer(
  rest.patch('http://localhost:5000/users/:id', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ id: 1, username: 'jose', password: 'jose' }),
    );
  }),
  rest.patch('*', (req, res, ctx) => {
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

describe('change password ', () => {
  beforeEach(() => {
    render(
      <Root>
        <ChangePasswordDialog userId={1} open closeDialog={handleCloseDialog} />
      </Root>,
    );
  });

  test('has a couple of password textfields and buttons', () => {
    expect(screen.getAllByLabelText(/contraseña/i)[0]).toBeInTheDocument();
    expect(screen.getAllByLabelText(/contraseña/i)[1]).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /cancelar/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /guardar/i }),
    ).toBeInTheDocument();
  });

  test('show errors when fields are wrong', async () => {
    fireEvent.click(screen.getByRole('button', { name: /guardar/i }));
    await waitFor(() => {
      expect(screen.queryByText(/ingrese una contraseña/i)).toBeInTheDocument();
      expect(
        screen.getByText(/repita la contraseña anterior/i),
      ).toBeInTheDocument();
    });
  });

  test('cancel button', () => {
    fireEvent.click(screen.getByRole('button', { name: /cancelar/i }));
    expect(handleCloseDialog).toHaveBeenCalled();
  });

  test('save button with fields filled', async () => {
    fireEvent.input(screen.getAllByLabelText(/contraseña/i)[0], {
      target: { value: 'admin' },
    });
    fireEvent.input(screen.getAllByLabelText(/contraseña/i)[1], {
      target: { value: 'admin' },
    });
    fireEvent.click(screen.getByRole('button', { name: /guardar/i }));
    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: /guardando/i }),
      ).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /guardando/i })).toBeDisabled();
    });
    await waitFor(() => {
      expect(handleCloseDialog).toHaveBeenCalled();
    });
  });
});
