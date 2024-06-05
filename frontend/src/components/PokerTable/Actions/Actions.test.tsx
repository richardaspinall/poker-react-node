import { render, screen } from '@testing-library/react';

import Actions from './Actions';

test('renders the correct greeting', () => {
  render(<Actions />);
  expect(screen.getByText('Fold')).toBeInTheDocument();
});
