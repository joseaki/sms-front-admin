import React, { ReactElement } from 'react';
import * as yup from 'yup';
// MUI components
import TextField from '@material-ui/core/TextField';

interface Props {
  form: any;
  errors: any;
}

export interface IUserFormInputs {
  username: string;
  password: string;
  passwordCheck: string;
}

export const validationSchema = yup.object().shape({
  username: yup.string().required('Ingrese un nombre se usuario'),
  password: yup.string().required('Ingrese una contraseña'),
  passwordCheck: yup
    .string()
    .oneOf([yup.ref('password'), undefined], 'Las contraseñas no coinciden!')
    .required('Repita la contraseña anterior'),
});

function DialogForm({ form, errors }: Props): ReactElement {
  return (
    <>
      <TextField
        inputRef={form()}
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
        inputRef={form()}
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
        inputRef={form()}
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
    </>
  );
}

export default DialogForm;
