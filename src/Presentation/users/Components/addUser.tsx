import React, { useState } from 'react';
// MUI Components
import Button from '@material-ui/core/Button';
// Local Componentes
import NewUserDialog from 'Presentation/users/Components/newUserDialog';

const AddUser = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleSuccess = () => {
    setOpenModal(false);
  };

  const handleOpen = () => {
    setOpenModal(true);
  };

  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleOpen}>
        Nuevo
      </Button>
      <NewUserDialog
        open={openModal}
        onClose={handleClose}
        onSuccess={handleSuccess}
      />
    </>
  );
};

export default AddUser;
