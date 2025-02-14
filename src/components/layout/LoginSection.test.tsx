import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginSection from './LoginSection';
import { useSignIn, useAuth } from '@clerk/clerk-react';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('@clerk/clerk-react', () => ({
  useSignIn: jest.fn(),
  useAuth: jest.fn(),
}));

describe('LoginSection Component', () => {
  it('renders login form with inputs and buttons', () => {
    render(
      <Router>
        <LoginSection />
      </Router>
    );

    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();

    expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
  });

  it('displays loading spinner when logging in', async () => {
    render(
      <Router>
        <LoginSection />
      </Router>
    );

    const mockSignIn = useSignIn();
    mockSignIn.create = jest.fn().mockResolvedValue({ status: 'complete' });

    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });

    fireEvent.click(screen.getByText(/Sign In/i));

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });
  });

  it('handles successful login', async () => {
    render(
      <Router>
        <LoginSection />
      </Router>
    );

    const mockSignIn = useSignIn();
    mockSignIn.create = jest.fn().mockResolvedValue({ status: 'complete' });

    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });

    fireEvent.click(screen.getByText(/Sign In/i));

    await waitFor(() => {
      expect(mockSignIn.setActive).toHaveBeenCalled();
    });
  });

  it('displays error message when login fails', async () => {
    render(
      <Router>
        <LoginSection />
      </Router>
    );

    const mockSignIn = useSignIn();
    mockSignIn.create = jest.fn().mockRejectedValue(new Error('Login failed'));

    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'wrong@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'wrongpassword' } });

    fireEvent.click(screen.getByText(/Sign In/i));

    await waitFor(() => {
      expect(screen.getByText(/Login failed. Check your credentials./i)).toBeInTheDocument();
    });
  });

  it('handles social login for Google and Facebook', async () => {
    render(
      <Router>
        <LoginSection />
      </Router>
    );

    const mockSignIn = useSignIn();
    mockSignIn.authenticateWithRedirect = jest.fn();

    fireEvent.click(screen.getByAltText(/Google/i));
    await waitFor(() => {
      expect(mockSignIn.authenticateWithRedirect).toHaveBeenCalledWith({
        strategy: 'oauth_google',
        redirectUrl: 'http://localhost:5173/sign-in-callback',
        redirectUrlComplete: '/home',
      });
    });

    fireEvent.click(screen.getByAltText(/Facebook/i));
    await waitFor(() => {
      expect(mockSignIn.authenticateWithRedirect).toHaveBeenCalledWith({
        strategy: 'oauth_facebook',
        redirectUrl: 'http://localhost:5173/sign-in-callback',
        redirectUrlComplete: '/home',
      });
    });
  });

  it('redirects to the cart if the user is already signed in', () => {
    const mockUseAuth = useAuth();
    mockUseAuth.isSignedIn = true;

    render(
      <Router>
        <LoginSection />
      </Router>
    );

    expect(window.location.pathname).toBe('/cart');
  });
});
