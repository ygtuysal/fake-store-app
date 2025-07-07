import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ClientPage from '@/app/page.client';
import { getAllProducts, getCategories } from '@/lib/api';
import { useSearchParams } from 'next/navigation';
import { Product } from '@/types';

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
}));

jest.mock('@/lib/api', () => ({
  getAllProducts: jest.fn(),
  getCategories: jest.fn(),
}));

const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Cheap Product',
    price: 50,
    category: 'electronics',
    description: 'desc',
    image: 'url',
    rating: { rate: 4.5, count: 10 },
  },
  {
    id: 2,
    title: 'Expensive Product',
    price: 150,
    category: 'jewelery',
    description: 'desc',
    image: 'url',
    rating: { rate: 4.5, count: 10 },
  },
];

const mockCategories = ['electronics', 'jewelery'];

describe('<ClientPage />', () => {
  beforeEach(() => {
    (getAllProducts as jest.Mock).mockResolvedValue(mockProducts);
    (getCategories as jest.Mock).mockResolvedValue(mockCategories);
  });

  const mockSearchParams = (values: Record<string, string | null>) => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: (key: string) => values[key] ?? null,
    });
  };

  it('renders loading initially', () => {
    mockSearchParams({});
    render(<ClientPage />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('fetches and renders all products', async () => {
    mockSearchParams({});
    render(<ClientPage />);

    await waitFor(() => {
      expect(screen.getByText('Cheap Product')).toBeInTheDocument();
      expect(screen.getByText('Expensive Product')).toBeInTheDocument();
    });
  });

  it('filters by category', async () => {
    mockSearchParams({ category: 'electronics' });
    render(<ClientPage />);

    await waitFor(() => {
      expect(screen.getByText('Cheap Product')).toBeInTheDocument();
      expect(screen.queryByText('Expensive Product')).not.toBeInTheDocument();
    });
  });

  it('filters by search term', async () => {
    mockSearchParams({ search: 'expensive' });
    render(<ClientPage />);

    await waitFor(() => {
      expect(screen.getByText('Expensive Product')).toBeInTheDocument();
      expect(screen.queryByText('Cheap Product')).not.toBeInTheDocument();
    });
  });

  it('filters by min and max price', async () => {
    mockSearchParams({ minPrice: '100', maxPrice: '200' });
    render(<ClientPage />);

    await waitFor(() => {
      expect(screen.getByText('Expensive Product')).toBeInTheDocument();
      expect(screen.queryByText('Cheap Product')).not.toBeInTheDocument();
    });
  });

  it('sorts products by price ascending', async () => {
    mockSearchParams({ sort: 'price-asc' });
    render(<ClientPage />);
    await waitFor(() => {
      const prices = screen.getAllByText(/Product/).map(p => p.textContent);
      expect(prices[0]).toContain('Cheap');
      expect(prices[1]).toContain('Expensive');
    });
  });

  it('sorts products by price descending', async () => {
    mockSearchParams({ sort: 'price-desc' });
    render(<ClientPage />);
    await waitFor(() => {
      const prices = screen.getAllByText(/Product/).map(p => p.textContent);
      expect(prices[0]).toContain('Expensive');
      expect(prices[1]).toContain('Cheap');
    });
  });

  it('paginates correctly', async () => {
    mockSearchParams({ page: '1' });
    render(<ClientPage initialProducts={mockProducts} initialCategories={mockCategories} />);

    await waitFor(() => {
      expect(screen.getByText('Cheap Product')).toBeInTheDocument();
      expect(screen.getByText('Expensive Product')).toBeInTheDocument();
    });
  });

  it('handles fetch error gracefully', async () => {
    (getAllProducts as jest.Mock).mockRejectedValueOnce(new Error('fail'));
    (getCategories as jest.Mock).mockRejectedValueOnce(new Error('fail'));

    mockSearchParams({});
    render(<ClientPage />);
    await waitFor(() => {
      expect(screen.queryByText('Cheap Product')).not.toBeInTheDocument();
      expect(screen.queryByText('Expensive Product')).not.toBeInTheDocument();
    });
  });
});
