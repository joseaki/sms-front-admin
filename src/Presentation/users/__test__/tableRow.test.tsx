import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TableRow from 'Presentation/users/Components/tableRow';
import { User } from 'Domain/Entity/user';

const handleRowCheck = jest.fn();
const handlePasswordChange = jest.fn();
const handleGetApiKey = jest.fn();

const user: User = {
  id: 12,
  username: 'jose',
};

describe('row parts', () => {
  beforeEach(() => {
    render(
      <table>
        <tbody>
          <TableRow
            user={user}
            isChecked={false}
            loading={false}
            rowCheck={handleRowCheck}
            changePasswordClick={handlePasswordChange}
            getAPIKey={handleGetApiKey}
          />
        </tbody>
      </table>,
    );
  });

  it('have a checkbox, a button to show the api key and a button to change the password', () => {
    expect(screen.getByLabelText(/table row checkbox/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /mostrar api key/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /cambiar contraseña/i }),
    ).toBeInTheDocument();
  });

  it('when checking a checkbox it should call the rowCheck', () => {
    fireEvent.click(screen.getByLabelText(/table row checkbox/i));
    expect(handleRowCheck).toHaveBeenCalledWith(user.id);
  });
  it('when click the show apiKey it call the getApikey fn', () => {
    fireEvent.click(screen.getByRole('button', { name: /mostrar api key/i }));
    expect(handleGetApiKey).toHaveBeenCalledWith(user.id);
  });
  it('when click the change password it call the changePassword fn', () => {
    fireEvent.click(
      screen.getByRole('button', { name: /cambiar contraseña/i }),
    );
    expect(handlePasswordChange).toHaveBeenCalledWith(user.id);
  });
});

describe('checked row', () => {
  it('the checkbox is checked', () => {
    render(
      <table>
        <tbody>
          <TableRow
            user={user}
            isChecked
            loading={false}
            rowCheck={handleRowCheck}
            changePasswordClick={handlePasswordChange}
            getAPIKey={handleGetApiKey}
          />
        </tbody>
      </table>,
    );
    expect(screen.getByLabelText(/table row checkbox/i)).toBeChecked();
  });
  it('change the status of apikey to loading', () => {
    render(
      <table>
        <tbody>
          <TableRow
            user={user}
            isChecked={false}
            loading
            rowCheck={handleRowCheck}
            changePasswordClick={handlePasswordChange}
            getAPIKey={handleGetApiKey}
          />
        </tbody>
      </table>,
    );
    expect(
      screen.getByRole('button', { name: /cargando/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cargando/i })).toBeDisabled();
  });
});
