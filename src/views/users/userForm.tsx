import React, { ReactElement } from 'react';
import TextField from '@material-ui/core/TextField';

interface Props {
  register: any;
  errors: any;
}

export interface IUserFormInputs {
  username: string;
  password: string;
  passwordCheck: string;
}

function DialogForm({ register, errors }: Props): ReactElement {
  return (
    <form>
      <TextField
        inputRef={register()}
        required
        id="username"
        autoFocus
        type="text"
        fullWidth
        label="Nombre de usuario"
        style={{ marginBottom: '16px' }}
        name="username"
        error={!!errors.username}
        helperText={errors.username && errors.username.message}
      />
      <TextField
        inputRef={register()}
        required
        id="password"
        type="password"
        fullWidth
        label="Contraseña"
        style={{ marginBottom: '16px' }}
        name="password"
        error={!!errors.password}
        helperText={errors.password && errors.password.message}
      />
      <TextField
        inputRef={register()}
        required
        id="passwordCheck"
        type="password"
        fullWidth
        label="Repetir contraseña"
        style={{ marginBottom: '16px' }}
        name="passwordCheck"
        error={!!errors.passwordCheck}
        helperText={errors.passwordCheck && errors.passwordCheck.message}
      />
    </form>
  );
}

export default DialogForm;
