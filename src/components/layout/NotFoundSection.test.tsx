import { render, screen } from '@testing-library/react';
import NotFoundSection from './NotFoundSection';

describe('NotFoundSection Component', () => {
  it('renders the 404 message', () => {
    render(<NotFoundSection />);

    expect(screen.getByText('404')).toBeInTheDocument();
  });

  it('renders the "Page Not Found" heading', () => {
    render(<NotFoundSection />);

    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
  });

  it('renders the description text', () => {
    render(<NotFoundSection />);

    expect(screen.getByText('Sorry, the page you are looking for does not exist.')).toBeInTheDocument();
  });

  it('has the correct structure and styles', () => {
    render(<NotFoundSection />);

    const section = screen.getByRole('region');
    expect(section).toHaveClass('min-h-[600px]');
    
    const textContainer = screen.getByText('404').parentElement;
    expect(textContainer).toHaveClass('text-center');
  });
});
