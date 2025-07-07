import React from 'react';
import { render } from '@testing-library/react';
import Page from '@/app/page';
import { getAllProducts, getCategories } from '@/lib/api';
import { Product } from '@/types';

jest.mock('@/lib/api', () => ({
  getAllProducts: jest.fn(),
  getCategories: jest.fn(),
}));

const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Phone',
    price: 500,
    description: 'Smartphone',
    category: 'electronics',
    image: 'img1',
    rating: { rate: 4.5, count: 10 },
  },
  {
    id: 2,
    title: 'Laptop',
    price: 1000,
    description: 'Laptop description',
    category: 'electronics',
    image: 'img2',
    rating: { rate: 4.7, count: 5 },
  },
  {
    id: 3,
    title: 'Necklace',
    price: 200,
    description: 'Jewelry item',
    category: 'jewelery',
    image: 'img3',
    rating: { rate: 4.9, count: 3 },
  },
];

const mockCategories = ['electronics', 'jewelery'];

describe('<Page />', () => {
  beforeEach(() => {
    (getAllProducts as jest.Mock).mockResolvedValue(mockProducts);
    (getCategories as jest.Mock).mockResolvedValue(mockCategories);
  });

  it('renders all products with default props', async () => {
    const { findByText } = render(<Page />);
    expect(await findByText('Phone')).toBeInTheDocument();
    expect(await findByText('Laptop')).toBeInTheDocument();
    expect(await findByText('Necklace')).toBeInTheDocument();
  });

  it('filters by search', async () => {
    const { queryByText, findByText } = render(
      <Page searchParams={{ search: 'phone' }} />
    );
    expect(await findByText('Phone')).toBeInTheDocument();
    expect(queryByText('Laptop')).not.toBeInTheDocument();
  });

  it('filters by category', async () => {
    const { queryByText, findByText } = render(
      <Page searchParams={{ category: 'jewelery' }} />
    );
    expect(await findByText('Necklace')).toBeInTheDocument();
    expect(queryByText('Phone')).not.toBeInTheDocument();
  });

  it('filters by minPrice', async () => {
    const { queryByText, findByText } = render(
      <Page searchParams={{ minPrice: '800' }} />
    );
    expect(await findByText('Laptop')).toBeInTheDocument();
    expect(queryByText('Phone')).not.toBeInTheDocument();
  });

  it('filters by maxPrice', async () => {
    const { queryByText, findByText } = render(
      <Page searchParams={{ maxPrice: '300' }} />
    );
    expect(await findByText('Necklace')).toBeInTheDocument();
    expect(queryByText('Laptop')).not.toBeInTheDocument();
  });

  it('sorts by price ascending', async () => {
    const { findAllByTestId } = render(
      <Page searchParams={{ sort: 'price-asc' }} />
    );
    const items = await findAllByTestId('product-title');
    const titles = items.map((el) => el.textContent);
    expect(titles).toEqual(['Necklace', 'Phone', 'Laptop']);
  });

  it('sorts by price descending', async () => {
    const { findAllByTestId } = render(
      <Page searchParams={{ sort: 'price-desc' }} />
    );
    const items = await findAllByTestId('product-title');
    const titles = items.map((el) => el.textContent);
    expect(titles).toEqual(['Laptop', 'Phone', 'Necklace']);
  });

  it('paginates correctly', async () => {
    const { queryByText, findByText } = render(
      <Page searchParams={{ page: '2' }} />
    );
    expect(await findByText('Phone')).toBeInTheDocument();
    expect(queryByText('Laptop')).toBeInTheDocument();
  });
});
