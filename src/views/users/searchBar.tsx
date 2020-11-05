import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { useForm } from 'react-hook-form';
import { RootState } from 'redux/rootReducer';
import { connect } from 'react-redux';
import { searchUserByQuery } from 'redux/userSlice';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

interface Props {
  error: string;
  dispatch: any;
}

interface IFormInputs {
  query: string;
}

const SearchBar = ({ error, dispatch }: Props) => {
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (error !== '') {
      setShowAlert(true);
    }
  }, [error]);

  const methods = useForm<IFormInputs>();
  const { handleSubmit, register } = methods;

  const onSubmit = (data: IFormInputs) => {
    setLoading(true);
    dispatch(searchUserByQuery(data.query))
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  };

  const handleSnackBarClose = () => {
    setShowAlert(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} alignItems="flex-end">
          <Grid item xs={8}>
            <TextField
              inputRef={register()}
              type="text"
              fullWidth
              label="Nombre de usuario"
              name="query"
              id="query"
            />
          </Grid>

          <Grid item xs={4}>
            <Button variant="contained" color="primary" type="submit">
              {loading ? 'Buscando...' : 'Buscar'}
            </Button>
          </Grid>
        </Grid>
      </form>
      {showAlert && (
        <Snackbar
          open={error !== ''}
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
    error: state.users.error,
  };
};

export default connect(mapStateToProps)(SearchBar);
