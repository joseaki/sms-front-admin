import React from 'react';
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from '@testing-library/react';
import DialogForm from 'Presentation/users/Components/newUserDialog';
import Root from 'Root';

const handleCloseDialog = jest.fn();
const handleSuccessDialog = jest.fn();

describe('newUserForm', () => {
  beforeEach(() => {
    act(() => {
      render(
        <Root>
          <DialogForm
            open
            onClose={handleCloseDialog}
            onSuccess={handleSuccessDialog}
          />
        </Root>,
      );
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
          value: 'pass',
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
      expect(passwordFields[1]).toHaveValue('pass');
    });

    describe('action buttons', () => {
      it('handle close button correctly', () => {
        const cancelButton = screen.getByRole('button', { name: /cancelar/i });
        fireEvent.click(cancelButton);
        expect(handleCloseDialog).toHaveBeenCalled();
      });

      it('handle save button correctly', async () => {
        expect(
          screen.getByRole('textbox', { name: /Nombre de usuario/i }),
        ).toHaveValue('admin');
        const saveButton = screen.getByRole('button', { name: /guardar/i });
        fireEvent.click(saveButton);
        await waitFor(async () => {
          expect(
            await screen.findByRole('button', { name: /guardar/i }),
          ).toBeDisabled();
          expect(
            await screen.findByRole('button', { name: /cancelar/i }),
          ).toBeDisabled();
        });
        await waitFor(() => {
          expect(handleSuccessDialog).toHaveBeenCalled();
        });
      });
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
