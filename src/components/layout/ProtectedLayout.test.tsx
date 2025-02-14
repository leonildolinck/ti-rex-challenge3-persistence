import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { useNavigate, useLocation } from 'react-router-dom';
import ProtectedLayout from './ProtectedLayout';

jest.mock('@clerk/clerk-react', () => ({
  useAuth: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
}));

describe('ProtectedLayout Component', () => {
  const mockNavigate = jest.fn();
  const mockLocation = { pathname: '/test' };

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useLocation as jest.Mock).mockReturnValue(mockLocation);
  });

  it('redirects to login if the user is not signed in', async () => {
    (useAuth as jest.Mock).mockReturnValue({ isSignedIn: false });

    render(
      <Router>
        <ProtectedLayout />
      </Router>
    );

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/login', {
        state: { from: mockLocation.pathname },
        replace: true,
      });
    });
  });

  it('renders the Outlet if the user is signed in', async () => {
    (useAuth as jest.Mock).mockReturnValue({ isSignedIn: true });

    render(
      <Router>
        <ProtectedLayout />
      </Router>
    );

    expect(screen.getByTestId('outlet')).toBeInTheDocument();
  });
});
