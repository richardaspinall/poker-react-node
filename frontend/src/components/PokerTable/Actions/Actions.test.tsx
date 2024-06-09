import { render, screen } from '@testing-library/react';

import Actions from './Actions';

describe('Actions Component', () => {
  it('renders Fold button', () => {
    render(<Actions isMyTurn={true} />);
    const foldButton = screen.getByRole('button', { name: 'Fold' });
    expect(foldButton).toBeVisible();
  });

  it('renders Check button', () => {
    render(<Actions isMyTurn={true} />);
    const checkButton = screen.getByRole('button', { name: 'Fold' });
    expect(checkButton).toBeVisible();
  });

  it('renders Call button', () => {
    render(<Actions isMyTurn={true} />);
    const callButton = screen.getByRole('button', { name: 'Call' });
    expect(callButton).toBeVisible();
  });

  it('renders Bet button', () => {
    render(<Actions isMyTurn={true} />);
    const betButton = screen.getByRole('button', { name: 'Bet' });
    expect(betButton).toBeVisible();
  });
});
