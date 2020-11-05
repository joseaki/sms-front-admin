import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import { IUserFormInputs } from 'views/users/userForm';
import { connect } from 'react-redux';
import { RootState } from 'redux/rootReducer';
import DialogForm from 'views/users/newUserDialog';
import { saveUser } from 'redux/userSlice';
import CircularProgress from '@material-ui/core/CircularProgress';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1300,
      color: '#fff',
    },
  }),
);

interface Props {
  dispatch: any;
  loading: boolean;
  success: boolean;
  error: string;
}

const AddUser = ({ dispatch, loading, success, error }: Props) => {
  const [open, setOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const classes = useStyles();

  useEffect(() => {}, []);

  useEffect(() => {
    if (loading === false && error === '') {
      setOpen(false);
    }
  }, [loading]);

  useEffect(() => {
    if (error !== '') {
      setShowAlert(true);
    }
  }, [error]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (data: IUserFormInputs) => {
    setShowAlert(false);
    dispatch(saveUser(data)).then(() => {
      setShowAlert(true);
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSnackBarClose = () => {
    setShowAlert(false);
  };

  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Nuevo
      </Button>
      <DialogForm
        open={open}
        handleClose={handleClose}
        onSubmit={handleSubmit}
      />
      <Backdrop
        data-testid="loading-indicator"
        className={classes.backdrop}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {success && (
        <Snackbar
          open={showAlert}
          autoHideDuration={2000}
          onClose={handleSnackBarClose}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            severity="success"
            data-testid="newuser-success-alert"
          >
            Usuario agregado correctamente
          </MuiAlert>
        </Snackbar>
      )}
      {error !== '' && (
        <Snackbar
          open={showAlert}
          autoHideDuration={2000}
          onClose={handleSnackBarClose}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            severity="error"
            data-testid="newuser-success-alert"
          >
            error
          </MuiAlert>
        </Snackbar>
      )}
    </>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    loading: state.users.loading,
    error: state.users.error,
    success: state.users.success,
  };
};

export default connect(mapStateToProps)(AddUser);
