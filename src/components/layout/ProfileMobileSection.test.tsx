import { render, screen, waitFor } from '@testing-library/react';
import ProfileMobileSection from './ProfileMobileSection';
import { useUser } from '@clerk/clerk-react';

jest.mock('@clerk/clerk-react', () => ({
  useUser: jest.fn(),
  SignOutButton: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('ProfileMobileSection Component', () => {
  const mockUser = {
    firstName: 'John',
    lastName: 'Doe',
    emailAddresses: [{ emailAddress: 'john.doe@example.com' }],
    imageUrl: 'https://example.com/avatar.jpg',
    createdAt: '2022-01-01T00:00:00Z',
    lastSignInAt: '2022-02-01T00:00:00Z',
  };

  beforeEach(() => {
    (useUser as jest.Mock).mockReturnValue({
      user: mockUser,
    });
  });

  it('renders the profile picture', () => {
    render(<ProfileMobileSection />);

    expect(screen.getByAltText('Profile Avatar')).toHaveAttribute('src', mockUser.imageUrl);
  });

  it('displays the user\'s full name', () => {
    render(<ProfileMobileSection />);

    expect(screen.getByText(`${mockUser.firstName} ${mockUser.lastName}`)).toBeInTheDocument();
  });

  it('displays the user\'s email', () => {
    render(<ProfileMobileSection />);

    expect(screen.getByText(mockUser.emailAddresses[0].emailAddress)).toBeInTheDocument();
  });

  it('displays the correct member since date', () => {
    render(<ProfileMobileSection />);

    expect(screen.getByText('Member since:')).toBeInTheDocument();
    expect(screen.getByText('1/1/2022')).toBeInTheDocument();
  });

  it('displays the correct last sign-in date', () => {
    render(<ProfileMobileSection />);

    expect(screen.getByText('Last Sign In:')).toBeInTheDocument();
    expect(screen.getByText('2/1/2022')).toBeInTheDocument();
  });

  it('displays the total orders', () => {
    render(<ProfileMobileSection />);

    expect(screen.getByText('Total Orders:')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
  });

  it('renders the sign-out button', () => {
    render(<ProfileMobileSection />);

    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('calls signOut when the logout button is clicked', async () => {
    render(<ProfileMobileSection />);

    screen.getByText('Logout').click();

    await waitFor(() => {
      expect(screen.getByText('Logout')).toBeInTheDocument();
    });
  });
});
