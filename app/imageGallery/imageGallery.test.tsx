import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ImageGallery from './page';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useSearchParams: () => ({
    get: () => null, // Simulate no imageId
  }),
  useRouter: () => ({
    back: jest.fn(),
  }),
}));

// Mock fetch for setup.json
beforeAll(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          appBackground: 'bg-black',
          textColor: 'text-white',
          borderColor: 'border-white',
          headingColor: 'text-white',
          cardBackground: 'bg-gray-900',
          imageApiUrl: 'https://dummy-api.com',
        }),
    })
  ) as jest.Mock;
});

describe('ImageGallery Component', () => {
  test('renders dummy data if no imageId is present', async () => {
    render(<ImageGallery />);

    await waitFor(() => {
      expect(screen.getByText(/Queried image/i)).toBeInTheDocument();
      expect(screen.getByText(/Results/i)).toBeInTheDocument();
    });
  });
});
