import React from 'react';
import { connect, useSelector } from 'react-redux';
import { RootState } from 'redux/rootReducer';
// MUI Components
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { error } from 'redux/generalSlice';
import { AppDispatch } from 'redux/store';

interface Props {
  dispatch: AppDispatch;
}

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const Messages = ({ dispatch }: Props) => {
  const errorMessage = useSelector((state: RootState) => state.general.error);
  const loading = useSelector((state: RootState) => state.general.loading);
  const classes = useStyles();

  const handleErrorClose = () => {
    dispatch(error(''));
  };

  return (
    <div>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar
        open={errorMessage !== ''}
        autoHideDuration={2000}
        onClose={handleErrorClose}
      >
        <MuiAlert
          elevation={10}
          variant="filled"
          severity="error"
          data-testid="error-alert"
        >
          {errorMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default connect(null)(Messages);
