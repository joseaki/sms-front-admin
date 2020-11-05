import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import DialogForm from 'views/users/newUserDialog';

describe('newUserForm', () => {
  beforeEach(() => {
    act(() => {
      render(<DialogForm open />);
    });
  });

  describe('Fill user form', () => {
    beforeEach(() => {
      fireEvent.input(
        screen.getByRole('textbox', { name: /Nombre de usuario/i }),
        {
          target: {
            value: 'admin',
          },
        },
      );
      const password = screen.getAllByLabelText(/contraseña/i);
      fireEvent.input(password[0], {
        target: {
          value: 'pass',
        },
      });
      fireEvent.input(password[1], {
        target: {
          value: 'pass2',
        },
      });
    });

    it('updates the username text input', () => {
      expect(
        screen.getByRole('textbox', { name: /Nombre de usuario/i }),
      ).toHaveValue('admin');
    });

    it('updates the password text input', () => {
      const passwordFields = screen.getAllByLabelText(/contraseña/i);
      expect(passwordFields[0]).toHaveValue('pass');
    });

    it('updates the repeat password text input', () => {
      const passwordFields = screen.getAllByLabelText(/contraseña/i);
      expect(passwordFields[1]).toHaveValue('pass2');
    });
  });
  // describe('Submit form', () => {
  //   it('Should show an error message', () => {
  //     const sumbitButton = screen.getByRole('button', { name: /guardar/i });
  //     act(() => {
  //       fireEvent.click(sumbitButton);
  //     });
  //     expect(screen.getByText('Ingrese un nombre de usuario')).toEqual(
  //       'Ingrese un nombre de usuario',
  //     );
  //   });
  // });
});
