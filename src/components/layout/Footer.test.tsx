import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Footer from './Footer';

describe('Footer Component', () => {
  it('renders the footer correctly', () => {
    render(<Footer />);

    expect(screen.getByText(/Furniro./i)).toBeInTheDocument();
    
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Shop/i)).toBeInTheDocument();
    expect(screen.getByText(/About/i)).toBeInTheDocument();
    expect(screen.getByText(/Contact/i)).toBeInTheDocument();
    
    expect(screen.getByAltText(/facebook logo/i)).toBeInTheDocument();
    expect(screen.getByAltText(/instagram logo/i)).toBeInTheDocument();
    expect(screen.getByAltText(/twitter logo/i)).toBeInTheDocument();
    expect(screen.getByAltText(/linkedin logo/i)).toBeInTheDocument();
  });

  it('shows an error message for invalid email format', async () => {
    render(<Footer />);

    fireEvent.change(screen.getByPlaceholderText(/Enter Your Email Address/i), {
      target: { value: 'invalid-email' },
    });

    fireEvent.click(screen.getByText(/Subscribe/i));

    await waitFor(() => {
      expect(screen.getByText(/Insert a valid e-mail./i)).toBeInTheDocument();
    });
  });

  it('shows an error message for empty email field', async () => {
    render(<Footer />);

    fireEvent.change(screen.getByPlaceholderText(/Enter Your Email Address/i), {
      target: { value: '' },
    });

    fireEvent.click(screen.getByText(/Subscribe/i));

    await waitFor(() => {
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
    });
  });

  it('subscribes successfully when a valid email is entered', async () => {
    render(<Footer />);

    fireEvent.change(screen.getByPlaceholderText(/Enter Your Email Address/i), {
      target: { value: 'test@example.com' },
    });

    fireEvent.click(screen.getByText(/Subscribe/i));

    await waitFor(() => {
      expect(screen.getByText(/Thanks for subscribing!/i)).toBeInTheDocument();
    });
  });

  it('hides the subscribe form after successful subscription', async () => {
    render(<Footer />);

    fireEvent.change(screen.getByPlaceholderText(/Enter Your Email Address/i), {
      target: { value: 'test@example.com' },
    });

    fireEvent.click(screen.getByText(/Subscribe/i));

    await waitFor(() => {
      expect(screen.queryByPlaceholderText(/Enter Your Email Address/i)).toBeNull();
    });
  });
});
