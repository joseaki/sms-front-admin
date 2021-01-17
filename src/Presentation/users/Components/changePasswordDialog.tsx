import React, { useState } from 'react';
// Packages
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
// MUI Components
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
// Services
import { changePassword } from 'Domain/Services/user';

interface Props {
  open: boolean;
  userId: number;
  closeDialog: () => any;
}

export interface IChangePasswordFormInputs {
  password: string;
  passwordCheck: string;
}

const validationSchema = yup.object().shape({
  password: yup.string().required('Ingrese una contraseña'),
  passwordCheck: yup
    .string()
    .oneOf([yup.ref('password'), undefined], 'Las contraseñas no coinciden!')
    .required('Repita la contraseña anterior'),
});

const ChangePasswordDialog = ({ userId, open, closeDialog }: Props) => {
  const [loading, setLoading] = useState(false);
  const form = useForm<IChangePasswordFormInputs>({
    resolver: yupResolver(validationSchema),
  });
  const { register, handleSubmit, errors } = form;

  const handleSave = (data: IChangePasswordFormInputs) => {
    setLoading(true);
    changePassword(data.password, userId)
      .then(() => {
        setLoading(false);
        closeDialog();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <Dialog open={open} onClose={closeDialog}>
      <DialogTitle>Cambiar contraseña</DialogTitle>
      <DialogContent>
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
      </DialogContent>
      <DialogActions>
        <Button
          onClick={closeDialog}
          color="primary"
          type="button"
          variant="contained"
        >
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit(handleSave)}
          color="primary"
          type="button"
          variant="outlined"
          disabled={loading}
        >
          {loading ? 'Guardando' : 'Guardar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChangePasswordDialog;
