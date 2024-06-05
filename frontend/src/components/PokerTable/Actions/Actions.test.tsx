import { render, screen } from '@testing-library/react';

import Actions from './Actions';

describe('Actions Component', () => {
  it('renders Fold button', () => {
    render(<Actions />);
    const foldButton = screen.getByRole('button', { name: 'Fold' });
    expect(foldButton).toBeVisible();
  });

  it('renders Check button', () => {
    render(<Actions />);
    const checkButton = screen.getByRole('button', { name: 'Fold' });
    expect(checkButton).toBeVisible();
  });

  it('renders Call button', () => {
    render(<Actions />);
    const callButton = screen.getByRole('button', { name: 'Call' });
    expect(callButton).toBeVisible();
  });

  it('renders Bet button', () => {
    render(<Actions />);
    const betButton = screen.getByRole('button', { name: 'Bet' });
    expect(betButton).toBeVisible();
  });
});
