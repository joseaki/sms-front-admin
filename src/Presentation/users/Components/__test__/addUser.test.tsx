import React from 'react';

// import { mount, ReactWrapper } from 'enzyme';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import AddUSer from 'Presentation/users/Components/addUser';
import Root from 'Root';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.post('http://localhost:5000/users', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ id: 1, username: 'jose', password: 'jose' }),
    );
  }),
  rest.post('*', (req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json({ error: 'please add request handler' }),
    );
  }),
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

let newUserButton: HTMLElement;
beforeEach(() => {
  render(
    <Root>
      <AddUSer />
    </Root>,
  );
  newUserButton = screen.getByRole('button', { name: /nuevo/i });
});

afterEach(() => {
  cleanup();
});

it('has a button to show the modal', () => {
  expect(newUserButton).toBeInTheDocument();
});

describe('Modal open', () => {
  beforeEach(async () => {
    fireEvent.click(screen.getByRole('button', { name: /nuevo/i }));
  });

  it('has a input for the username and has two inputs for the password', () => {
    expect(
      screen.getByRole('textbox', { name: /Nombre de usuario/i }),
    ).toHaveTextContent('');
    expect(screen.getAllByLabelText(/contraseña/i)[0]).toHaveTextContent('');
    expect(screen.getAllByLabelText(/contraseña/i)[1]).toHaveTextContent('');
  });

  it('has a button to save the user and a button to cancel the form', () => {
    expect(
      screen.getByRole('button', { name: /Guardar/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Cancelar/i }),
    ).toBeInTheDocument();
  });

  // describe('Fill user form correctly', () => {
  //   beforeEach(() => {
  //     fireEvent.input(
  //       screen.getByRole('textbox', { name: /Nombre de usuario/i }),
  //       {
  //         target: {
  //           value: 'admin',
  //         },
  //       },
  //     );
  //     const password = screen.getAllByLabelText(/contraseña/i);
  //     fireEvent.input(password[0], { target: { value: 'pass' } });
  //     fireEvent.input(password[1], { target: { value: 'pass' } });
  //   });

  //   describe('cancel button behaviour', () => {
  //     beforeEach(() => {
  //       const cancelButton = screen.getByRole('button', { name: /cancelar/i });
  //       fireEvent.click(cancelButton);
  //     });

  //     it('should not mount the <Dialog/>', () => {
  //       expect(screen.queryByTestId('newuser-form')).toBeFalsy();
  //     });

  //     it('clear the user form', () => {
  //       fireEvent.click(screen.getByRole('button', { name: /nuevo/i }));
  //       expect(
  //         screen.getByRole('textbox', { name: /nombre de usuario/i }),
  //       ).toHaveValue('');
  //       expect(screen.getAllByLabelText(/contraseña/i)[0]).toHaveValue('');
  //       expect(screen.getAllByLabelText(/contraseña/i)[1]).toHaveValue('');
  //     });
  //   });
  // });

  // describe('save button behaviour', () => {
  //   beforeEach(async () => {
  //     screen.getByRole('button', { name: /guardar/i }).focus();
  //     fireEvent.click(screen.getByRole('button', { name: /guardar/i }));
  //   });

  //   it('focus out of save button', async () => {
  //     await waitFor(() => {
  //       expect(document.activeElement).toBe(
  //         screen.getByRole('button', { name: /guardar/i }),
  //       );
  //     });
  //     await waitFor(() => {
  //       expect(document.activeElement).not.toBe(
  //         screen.getByRole('button', { name: /guardar/i }),
  //       );
  //     });
  //   });
  // });

  // describe('save button behaviour success', () => {
  //   beforeEach(() => {
  //     fireEvent.click(screen.getByRole('button', { name: /guardar/i }));
  //   });
  //   it('should not mount the <Modal/>', async () => {
  //     await waitFor(() => {
  //       expect(screen.queryByText(/nuevo usuario/i)).toBeInTheDocument();
  //     });
  //     await waitFor(() => {
  //       // the not part is throwing the warning about state
  //       expect(screen.queryByText(/nuevo usuario/i)).not.toBeInTheDocument();
  //     });
  //   });
  //   it('shows a confirmation notification', async () => {
  //     await waitFor(() => {
  //       expect(
  //         screen.getByText(/Usuario agregado correctamente/i),
  //       ).toBeInTheDocument();
  //     });
  //   });
  // });

  //   describe('save button behaviour on error', () => {
  //     beforeEach(async () => {
  //       server.use(
  //         rest.post('http://localhost:5000/users', (req, res, ctx) => {
  //           return res(
  //             ctx.status(404),
  //             ctx.delay(200),
  //             ctx.json({ error: 'mensaje' }),
  //           );
  //         }),
  //       );
  //     });

  //     it('show error notification', async () => {
  //       fireEvent.click(screen.getByRole('button', { name: /guardar/i }));
  //       expect(
  //         await screen.findByTestId('loading-indicator'),
  //       ).not.toHaveProperty('visibility', 'hidden');
  //       await waitFor(() => {
  //         expect(screen.getByText(/error/i)).toBeInTheDocument();
  //       });
  //     });
  //   });
  // });

  // describe('Fill user form incorrectly', () => {
  //   beforeEach(() => {
  //     fireEvent.input(
  //       screen.getByRole('textbox', { name: /Nombre de usuario/i }),
  //       {
  //         target: {
  //           value: 'admin',
  //         },
  //       },
  //     );
  //     const password = screen.getAllByLabelText(/contraseña/i);
  //     fireEvent.input(password[0], { target: { value: 'pass' } });
  //     fireEvent.input(password[1], { target: { value: 'pass2' } });
  //   });
  //   describe('save button behaviour', () => {
  //     beforeEach(() => {
  //       fireEvent.click(screen.getByRole('button', { name: /guardar/i }));
  //     });
  //     it('show error messages in the inputs', async () => {
  //       await waitFor(() => {
  //         expect(
  //           screen.queryByText(/las contraseñas no coinciden!/i),
  //         ).toBeInTheDocument();
  //       });
  //     });
  //   });
  // });
});
