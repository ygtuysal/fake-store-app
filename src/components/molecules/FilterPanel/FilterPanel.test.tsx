import React from 'react';
import { render, screen, fireEvent } from '@/test-utils';
import { FilterPanel } from './index';
import { useRouter, useSearchParams } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe('FilterPanel Component', () => {
  const mockPush = jest.fn();
  const mockGet = jest.fn();
  const mockToString = jest.fn(() => '');
  const mockCategories = ['electronics', 'jewelery', "men's clothing", "women's clothing"];

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useSearchParams as jest.Mock).mockReturnValue({
      get: mockGet,
      toString: mockToString,
    });
  });

  it('renders all categories', () => {
    render(<FilterPanel categories={mockCategories} />);
    
    mockCategories.forEach(category => {
      expect(screen.getByText(category)).toBeInTheDocument();
    });
  });

  it('renders price range inputs', () => {
    render(<FilterPanel categories={mockCategories} />);
    
    expect(screen.getByLabelText('Min')).toBeInTheDocument();
    expect(screen.getByLabelText('Max')).toBeInTheDocument();
  });

  it('selects category when clicked', () => {
    render(<FilterPanel categories={mockCategories} />);
    
    const electronicsRadio = screen.getByLabelText('electronics') as HTMLInputElement;
    fireEvent.click(electronicsRadio);
    
    expect(electronicsRadio.checked).toBe(true);
  });

  it('applies filters when apply button is clicked', () => {
    render(<FilterPanel categories={mockCategories} />);
    
    const electronicsRadio = screen.getByLabelText('electronics');
    const minInput = screen.getByLabelText('Min');
    const maxInput = screen.getByLabelText('Max');
    const applyButton = screen.getByText('Apply Filters');
    
    fireEvent.click(electronicsRadio);
    fireEvent.change(minInput, { target: { value: '10' } });
    fireEvent.change(maxInput, { target: { value: '100' } });
    fireEvent.click(applyButton);
    
    expect(mockPush).toHaveBeenCalledWith('/?category=electronics&minPrice=10&maxPrice=100&page=1');
  });

  it('clears all filters when clear button is clicked', () => {
    mockGet.mockImplementation((key) => {
      if (key === 'category') return 'electronics';
      if (key === 'minPrice') return '10';
      if (key === 'maxPrice') return '100';
      return null;
    });
    
    render(<FilterPanel categories={mockCategories} />);
    
    const clearButton = screen.getByText('Clear All');
    fireEvent.click(clearButton);
    
    expect(mockPush).toHaveBeenCalledWith('/?page=1');
  });

  it('loads filter values from URL params', () => {
    mockGet.mockImplementation((key) => {
      if (key === 'category') return 'electronics';
      if (key === 'minPrice') return '50';
      if (key === 'maxPrice') return '200';
      return null;
    });
    
    render(<FilterPanel categories={mockCategories} />);
    
    const electronicsRadio = screen.getByLabelText('electronics') as HTMLInputElement;
    const minInput = screen.getByLabelText('Min') as HTMLInputElement;
    const maxInput = screen.getByLabelText('Max') as HTMLInputElement;
    
    expect(electronicsRadio.checked).toBe(true);
    expect(minInput.value).toBe('50');
    expect(maxInput.value).toBe('200');
  });

  it('shows mobile filter button on mobile', () => {
    render(<FilterPanel categories={mockCategories} />);
    
    const mobileButton = screen.getByRole('button', { name: /filters/i });
    expect(mobileButton).toBeInTheDocument();
  });

  it('opens and closes mobile filter panel', () => {
    render(<FilterPanel categories={mockCategories} />);
    
    const mobileButton = screen.getByRole('button', { name: /filters/i });
    fireEvent.click(mobileButton);
    
    const closeButton = screen.getAllByRole('button')[0]; 
    expect(closeButton).toBeInTheDocument();
    
    fireEvent.click(closeButton);
    
    expect(mobileButton).toBeInTheDocument();
  });
});