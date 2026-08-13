import { render, screen } from '@testing-library/react';
import App from './App';

test('renders SENAI DevHub branding', () => {
  render(<App />);
  const brandElements = screen.getAllByText(/SENAI/i);
  expect(brandElements.length).toBeGreaterThan(0);
});
