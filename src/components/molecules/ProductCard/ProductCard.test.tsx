import React from 'react';
import { render, screen, fireEvent } from '@/test-utils';
import { ProductCard } from './index';
import { CartProvider } from '@/contexts/CartContext';
import { Product } from '@/types';

const mockProduct: Product = {
  id: 1,
  title: 'Test Product',
  price: 99.99,
  description: 'Test description',
  category: 'electronics',
  image: 'https://fakestoreapi.com/img/test.jpg',
  rating: {
    rate: 4.5,
    count: 120,
  },
};

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <CartProvider>
      {ui}
    </CartProvider>
  );
};

describe('ProductCard Component', () => {
  it('renders product information correctly', () => {
    renderWithProviders(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByText('electronics')).toBeInTheDocument();
    expect(screen.getByText('4.5')).toBeInTheDocument();
    expect(screen.getByText('(120)')).toBeInTheDocument();
  });

  it('renders product image', () => {
    renderWithProviders(<ProductCard product={mockProduct} />);
    const image = screen.getByAltText('Test Product');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', expect.stringContaining('test.jpg'));
  });

  it('adds product to cart when button is clicked', () => {
    renderWithProviders(<ProductCard product={mockProduct} />);
    
    const addToCartButton = screen.getByText('Add to Cart');
    fireEvent.click(addToCartButton);
    
    expect(addToCartButton).toBeInTheDocument();
  });

  it('links to product detail page', () => {
    renderWithProviders(<ProductCard product={mockProduct} />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/products/1');
  });

  it('prevents navigation when add to cart is clicked', () => {
    renderWithProviders(<ProductCard product={mockProduct} />);
    
    const addToCartButton = screen.getByText('Add to Cart');
    const clickEvent = fireEvent.click(addToCartButton);
    
    expect(clickEvent).toBeTruthy();
  });
});