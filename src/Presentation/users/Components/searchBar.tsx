import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { useForm } from 'react-hook-form';
import { RootState } from 'redux/rootReducer';
import { connect, useSelector } from 'react-redux';
import { getUsersByQuery } from 'Domain/Services/user';

interface IFormInputs {
  query: string;
}

const SearchBar = () => {
  const loading = useSelector((state: RootState) => state.users.loading);

  const methods = useForm<IFormInputs>();
  const { handleSubmit, register } = methods;

  const onSubmit = (data: IFormInputs) => {
    getUsersByQuery(data.query);
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
    </>
  );
};

export default connect(null)(SearchBar);
