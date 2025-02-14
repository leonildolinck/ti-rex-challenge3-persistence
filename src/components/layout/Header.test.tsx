import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';
import { useUser } from '@clerk/clerk-react';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('@clerk/clerk-react', () => ({
  useUser: jest.fn(),
}));

describe('Header Component', () => {
  it('renders the header correctly', () => {
    render(
      <Router>
        <Header />
      </Router>
    );

    expect(screen.getByAltText(/Logo Furniro/i)).toBeInTheDocument();
    expect(screen.getByText(/Furniro/i)).toBeInTheDocument();
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Shop/i)).toBeInTheDocument();
    expect(screen.getByText(/About/i)).toBeInTheDocument();
    expect(screen.getByText(/Contact/i)).toBeInTheDocument();
  });

  it('toggles the mobile menu when clicked', () => {
    render(
      <Router>
        <Header />
      </Router>
    );

    const menuButton = screen.getByAltText(/Menu/i);
    fireEvent.click(menuButton);

    expect(screen.getByAltText(/close icon/i)).toBeInTheDocument();

    fireEvent.click(screen.getByAltText(/close icon/i));

    expect(screen.getByAltText(/hamburger icon/i)).toBeInTheDocument();
  });

  it('opens and closes the cart modal when the cart button is clicked', () => {
    render(
      <Router>
        <Header />
      </Router>
    );

    fireEvent.click(screen.getByAltText(/Cart/i));

    expect(screen.getByRole('dialog')).toBeInTheDocument();

    fireEvent.click(screen.getByAltText(/close icon/i));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('opens the profile modal when the profile button is clicked if signed in', () => {
    useUser.mockReturnValue({ isSignedIn: true });

    render(
      <Router>
        <Header />
      </Router>
    );

    fireEvent.click(screen.getByAltText(/Profile/i));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('redirects to the login page when the profile button is clicked if not signed in', () => {
    useUser.mockReturnValue({ isSignedIn: false });

    render(
      <Router>
        <Header />
      </Router>
    );

    fireEvent.click(screen.getByAltText(/Profile/i));

    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });
});
