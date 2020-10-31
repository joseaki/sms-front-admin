import React, { ReactElement, useRef } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import UserForm, { IUserFormInputs } from 'views/users/userForm';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface DialogFormProps {
  open: boolean;
  handleClose?: () => any;
  onSubmit?: (data: IUserFormInputs) => any;
}

const schema = yup.object().shape({
  username: yup.string().required('Ingrese un nombre se usuario'),
  password: yup.string().required('Ingrese una contraseña'),
  passwordCheck: yup
    .string()
    .oneOf([yup.ref('password'), undefined], 'Las contraseñas no coinciden!')
    .required('Repita la contraseña anterior'),
});

function DialogForm({
  open,
  handleClose,
  onSubmit,
}: DialogFormProps): ReactElement {
  const saveButton = useRef<HTMLButtonElement>(null);
  const { register, handleSubmit, errors } = useForm<IUserFormInputs>({
    resolver: yupResolver(schema),
  });

  const removeFocusAndSave = (data: IUserFormInputs) => {
    if (saveButton.current) {
      saveButton.current.blur();
    }
    if (onSubmit) {
      onSubmit(data);
    }
  };

  if (!open) {
    return <></>;
  }
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      data-testid="newuser-form"
    >
      <DialogTitle id="form-dialog-title">Nuevo Usuario</DialogTitle>
      <DialogContent>
        <UserForm register={register} errors={errors} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancelar
        </Button>
        <Button
          ref={saveButton}
          onClick={handleSubmit(removeFocusAndSave)}
          color="primary"
        >
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

DialogForm.defaultProps = {
  handleClose: null,
  onSubmit: null,
};

export default DialogForm;
