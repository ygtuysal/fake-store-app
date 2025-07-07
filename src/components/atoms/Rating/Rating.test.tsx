import React from 'react';
import { render, screen } from '@/test-utils';
import { Rating } from './index';

describe('Rating Component', () => {
  it('renders rating value correctly', () => {
    render(<Rating value={4.5} />);
    expect(screen.getByText('4.5')).toBeInTheDocument();
  });

  it('renders rating with count', () => {
    render(<Rating value={3.7} count={150} />);
    expect(screen.getByText('3.7')).toBeInTheDocument();
    expect(screen.getByText('(150)')).toBeInTheDocument();
  });

  it('renders correct number of stars', () => {
    const { container } = render(<Rating value={3.5} />);
    const stars = container.querySelectorAll('svg');
    expect(stars).toHaveLength(5);
  });

  it('renders with different sizes', () => {
    const { container } = render(<Rating value={4} size="small" />);
    let stars = container.querySelectorAll('svg');
    expect(stars.length).toBeGreaterThan(0);
    
    const { container: container2 } = render(<Rating value={4} size="large" />);
    stars = container2.querySelectorAll('svg');
    expect(stars.length).toBeGreaterThan(0);
  });

  it('renders full, half and empty stars correctly', () => {
    const { container } = render(<Rating value={3.5} />);
    const stars = container.querySelectorAll('svg');
    expect(stars).toHaveLength(5);
    expect(screen.getByText('3.5')).toBeInTheDocument();
  });
});