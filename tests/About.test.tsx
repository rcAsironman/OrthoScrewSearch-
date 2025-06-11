import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '@/app/about/page';

describe('About Page', () => {
  test('renders header and intro section', () => {
    render(<About />);
    expect(screen.getByText(/About OrthoScrewSearch/i)).toBeInTheDocument();
    expect(screen.getByText(/image recognition tool/i)).toBeInTheDocument();
  });

  test('renders tech stack section', () => {
    render(<About />);
    expect(screen.getByText(/Tech Stack/i)).toBeInTheDocument();
    expect(screen.getByText(/Next.js/i)).toBeInTheDocument();

    const reactItems = screen.getAllByText(/React/i);
    expect(reactItems.length).toBeGreaterThan(0);
  });

  test('renders features section', () => {
    render(<About />);
    expect(screen.getByText(/Features/i)).toBeInTheDocument();
    expect(screen.getByText(/AI-based recognition/i)).toBeInTheDocument();
  });

  test('renders license section', () => {
    render(<About />);
    const licenseItems = screen.getAllByText(/License/i);
    expect(licenseItems.length).toBeGreaterThan(0);

    const xyzLicenseItems = screen.getAllByText(/XYZ License/i);
    expect(xyzLicenseItems.length).toBeGreaterThan(0);
  });
});
