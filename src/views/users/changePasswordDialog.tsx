import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { RootState } from 'redux/rootReducer';
import { connect } from 'react-redux';
import { changePassword } from 'redux/userSlice';

interface Props {
  loading: boolean;
  open: boolean;
  userId: number;
  dispatch: any;
  closeDialog: () => any;
}

export interface IChangePasswordFormInputs {
  password: string;
  passwordCheck: string;
}

const schema = yup.object().shape({
  password: yup.string().required('Ingrese una contraseña'),
  passwordCheck: yup
    .string()
    .oneOf([yup.ref('password'), undefined], 'Las contraseñas no coinciden!')
    .required('Repita la contraseña anterior'),
});

const ChangePasswordDialog = ({
  loading,
  dispatch,
  userId,
  open,
  closeDialog,
}: Props) => {
  const { register, handleSubmit, errors } = useForm<IChangePasswordFormInputs>(
    {
      resolver: yupResolver(schema),
    },
  );

  const handleSave = (data: IChangePasswordFormInputs) => {
    dispatch(changePassword(data.password, userId)).then(() => {
      closeDialog();
    });
  };

  return (
    <Dialog open={open} onClose={closeDialog}>
      <DialogTitle>Cambiar contraseña</DialogTitle>
      <DialogContent>
        <form>
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

const mapStateToProps = (state: RootState) => {
  return {
    loading: state.users.loading,
  };
};

export default connect(mapStateToProps)(ChangePasswordDialog);
