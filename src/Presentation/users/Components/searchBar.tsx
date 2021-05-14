import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { useForm } from 'react-hook-form';
import { getUsersByQuery } from 'Domain/Services/user';

interface IFormInputs {
  query: string;
}

const SearchBar = () => {
  const [loading, setLoading] = useState(false);

  const methods = useForm<IFormInputs>();
  const { handleSubmit, register } = methods;

  const onSubmit = async (data: IFormInputs) => {
    setLoading(true);
    getUsersByQuery(data.query)
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
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
              label="Nombre de usuarios"
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

export default SearchBar;
