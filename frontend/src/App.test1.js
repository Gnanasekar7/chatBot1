import { render, screen } from '@testing-library/react';
import App from './App';

it('renders learn react link', () => {
  render(<App />,{wrapper:BrowserRouter})
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
