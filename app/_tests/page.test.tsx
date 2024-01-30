import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import HomePage from '../page';

test('Page', () => {
  render(<HomePage />);
  expect(screen.findByText('Home Page')).toBeDefined();
});
