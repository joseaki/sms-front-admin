import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from '@testing-library/react';
import SearchBar from 'Presentation/users/Components/searchBar';
import Root from 'Root';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.get('http://localhost:5000/users', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([{ id: 1, username: 'jose', password: 'jose' }]),
      ctx.delay(200),
    );
  }),
  rest.get('*', (req, res, ctx) => {
    // eslint-disable-next-line no-console
    console.error('Add request handler!!!!');
    return res(
      ctx.status(500),
      ctx.json({ error: 'please add request handler' }),
    );
  }),
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => {
  server.resetHandlers();
  cleanup();
});

beforeEach(() => {
  render(
    <Root>
      <SearchBar />
    </Root>,
  );
});

it('shows a input and a search button', () => {
  expect(screen.getByLabelText(/nombre de usuario/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /buscar/i })).toBeInTheDocument();
});

it('shows a loading button instead of the search button', async () => {
  fireEvent.click(screen.getByRole('button', { name: /buscar/i }));
  expect(
    await screen.findByRole('button', { name: /buscando/i }),
  ).toBeInTheDocument();
});

it('keeps the search query after loading has finished', async () => {
  fireEvent.input(screen.getByRole('textbox', { name: /usuario/i }), {
    target: { value: 'jose' },
  });
  expect(screen.getByLabelText(/nombre de usuario/i)).toHaveValue('jose');
  fireEvent.click(screen.getByRole('button', { name: /buscar/i }));
  expect(
    await screen.findByRole('button', { name: /buscando/i }),
  ).toBeInTheDocument();
  expect(
    await screen.findByRole('button', { name: /buscar/i }),
  ).toBeInTheDocument();
});

describe('handle error', () => {
  beforeEach(() => {
    server.use(
      rest.get('http://localhost:5000/users', (req, res, ctx) => {
        return res(
          ctx.status(404),
          ctx.json({ error: 'mensaje' }),
          ctx.delay(200),
        );
      }),
    );
  });

  it('shows an error when request fail', async () => {
    fireEvent.input(screen.getByRole('textbox', { name: /usuario/i }), {
      target: { value: 'jose' },
    });
    expect(screen.getByLabelText(/nombre de usuario/i)).toHaveValue('jose');
    fireEvent.click(screen.getByRole('button', { name: /buscar/i }));
    expect(
      await screen.findByRole('button', { name: /buscando/i }),
    ).toBeInTheDocument();
    expect(
      await screen.findByRole('button', { name: /buscar/i }),
    ).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
    // jest.useFakeTimers();
    // setTimeout(() => {
    //   expect(component.state().fruits).toEqual(fruits);
    // }, 3000);
    // jest.runAllTimers();
    await waitFor(
      () => {
        expect(screen.queryByText('error')).toBeNull();
      },
      { timeout: 2300 },
    );
  });
});
