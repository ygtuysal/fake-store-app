import React from 'react';
import { render, screen, fireEvent } from '@/test-utils';
import { SearchBar } from './index';
import { useRouter, useSearchParams } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe('SearchBar Component', () => {
  const mockPush = jest.fn();
  const mockGet = jest.fn();
  const mockToString = jest.fn(() => '');

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useSearchParams as jest.Mock).mockReturnValue({
      get: mockGet,
      toString: mockToString,
    });
  });

  it('renders search input and button', () => {
    render(<SearchBar />);
    
    expect(screen.getByPlaceholderText('Search products...')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  it('updates input value when typing', () => {
    render(<SearchBar />);
    
    const input = screen.getByPlaceholderText('Search products...') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'laptop' } });
    
    expect(input.value).toBe('laptop');
  });

  it('submits search on form submit', () => {
    render(<SearchBar />);
    
    const input = screen.getByPlaceholderText('Search products...');
    const form = input.closest('form')!;
    
    fireEvent.change(input, { target: { value: 'laptop' } });
    fireEvent.submit(form);
    
    expect(mockPush).toHaveBeenCalledWith('/?search=laptop&page=1');
  });

  it('clears search when clear button is clicked', () => {
    mockGet.mockReturnValue('laptop');
    render(<SearchBar />);
    
    const input = screen.getByPlaceholderText('Search products...') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'laptop' } });
    
    const clearButton = screen.getByRole('button', { hidden: true });
    fireEvent.click(clearButton);
    
    expect(input.value).toBe('');
    expect(mockPush).toHaveBeenCalledWith('/?');
  });

  it('loads search value from URL params', () => {
    mockGet.mockReturnValue('keyboard');
    render(<SearchBar />);
    
    const input = screen.getByPlaceholderText('Search products...') as HTMLInputElement;
    expect(input.value).toBe('keyboard');
  });

  it('trims whitespace from search query', () => {
    render(<SearchBar />);
    
    const input = screen.getByPlaceholderText('Search products...');
    const form = input.closest('form')!;
    
    fireEvent.change(input, { target: { value: '  laptop  ' } });
    fireEvent.submit(form);
    
    expect(mockPush).toHaveBeenCalledWith('/?search=laptop&page=1');
  });

  it('removes search param when submitting empty search', () => {
    mockToString.mockReturnValue('search=laptop&page=2');
    render(<SearchBar />);
    
    const input = screen.getByPlaceholderText('Search products...');
    const form = input.closest('form')!;
    
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.submit(form);
    
    expect(mockPush).toHaveBeenCalledWith('/?');
  });
});