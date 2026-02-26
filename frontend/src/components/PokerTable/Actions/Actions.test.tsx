import { render, screen } from '@testing-library/react';

import Actions from './Actions';

describe('Actions Component', () => {
  describe('when players turn', () => {
    it('renders Fold button', () => {
      render(<Actions isMyTurn={true} />);
      const foldButton = screen.getByRole('button', { name: 'Fold' });
      expect(foldButton).toBeVisible();
    });

    it('renders Check button', () => {
      render(<Actions isMyTurn={true} />);
      const checkButton = screen.getByRole('button', { name: 'Check' });
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
  describe('when not players turn', () => {
    it('disables Fold button', () => {
      render(<Actions isMyTurn={false} />);
      const foldButton = screen.getByRole('button', { name: 'Fold' });
      expect(foldButton).toBeDisabled();
    });

    it('disables Check button', () => {
      render(<Actions isMyTurn={false} />);
      const checkButton = screen.getByRole('button', { name: 'Check' });
      expect(checkButton).toBeDisabled();
    });

    it('disables Call button', () => {
      render(<Actions isMyTurn={false} />);
      const callButton = screen.getByRole('button', { name: 'Call' });
      expect(callButton).toBeDisabled();
    });

    it('disables Bet button', () => {
      render(<Actions isMyTurn={false} />);
      const betButton = screen.getByRole('button', { name: 'Bet' });
      expect(betButton).toBeDisabled();
    });
  });
});
