import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TableToolbar from 'Presentation/users/Components/tableToolbar';

const handleDelete = jest.fn();

describe('toolbar components', () => {
  it('has a title', () => {
    render(<TableToolbar numSelected={0} deleteItems={handleDelete} />);
    expect(screen.getByText(/usuarios/i)).toBeInTheDocument();
  });
});

describe('toolbar selected users', () => {
  beforeEach(() => {
    render(<TableToolbar numSelected={2} deleteItems={handleDelete} />);
  });
  it('show the number of selected users', () => {
    expect(screen.getByText(/2 seleccionado/i)).toBeInTheDocument();
  });

  it('show a button to delete the users', () => {
    expect(screen.getByRole('button', { name: /borrar/i })).toBeInTheDocument();
  });

  it('call a fn when delete button is clicked', () => {
    fireEvent.click(screen.getByRole('button', { name: /borrar/i }));
    expect(handleDelete).toHaveBeenCalledWith();
  });
});
