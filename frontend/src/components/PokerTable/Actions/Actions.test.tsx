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
  describe('when not players turn', () => {
    it('does not render Fold button', () => {
      render(<Actions isMyTurn={false} />);
      const foldButton = screen.queryByRole('button', { name: 'Fold' });
      expect(foldButton).not.toBeInTheDocument();
    });

    it('does not render Check button', () => {
      render(<Actions isMyTurn={false} />);
      const checkButton = screen.queryByRole('button', { name: 'Check' });
      expect(checkButton).not.toBeInTheDocument();
    });

    it('does not render Call button', () => {
      render(<Actions isMyTurn={false} />);
      const callButton = screen.queryByRole('button', { name: 'Call' });
      expect(callButton).not.toBeInTheDocument();
    });

    it('does not render Bet button', () => {
      render(<Actions isMyTurn={false} />);
      const betButton = screen.queryByRole('button', { name: 'Bet' });
      expect(betButton).not.toBeInTheDocument();
    });
  });
});
