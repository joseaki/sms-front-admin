import React, { ReactElement, useRef, useState } from 'react';
// Packages
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// MUI Components
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
// Local Components
import UserForm, {
  IUserFormInputs,
  validationSchema,
} from 'Presentation/users/Components/userForm';
// Services
import { saveUser } from 'Domain/Services/user';
import { User } from 'Domain/Entity/user';

interface DialogFormProps {
  open: boolean;
  onClose?: () => any;
  onSuccess?: (data: User) => any;
}

function DialogForm({
  open,
  onClose,
  onSuccess,
}: DialogFormProps): ReactElement {
  const saveButton = useRef<HTMLButtonElement>(null);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, errors } = useForm<IUserFormInputs>({
    resolver: yupResolver(validationSchema),
  });

  const handleSaveUser = async (user: IUserFormInputs) => {
    setLoading(true);
    saveUser({ id: 0, username: user.username, password: user.password })
      .then((userResponse) => {
        setLoading(false);
        if (onSuccess) {
          onSuccess(userResponse);
        }
      })
      .catch(() => {
        setLoading(false);
      });
  };

  if (!open) {
    return <></>;
  }
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
      data-testid="newuser-form"
    >
      <DialogTitle id="form-dialog-title">Nuevo Usuario</DialogTitle>
      <DialogContent>
        <UserForm form={register} errors={errors} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" disabled={loading}>
          Cancelar
        </Button>
        <Button
          ref={saveButton}
          onClick={handleSubmit(handleSaveUser)}
          color="primary"
          disabled={loading}
        >
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

DialogForm.defaultProps = {
  onClose: null,
  onSuccess: null,
};

export default DialogForm;
