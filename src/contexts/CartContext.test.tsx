import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from '@/contexts/CartContext';
import { Product } from '@/types';

jest.mock('@/hooks/useLocalStorage', () => ({
  useLocalStorage: <T,>(key: string, initialValue: T) => {
    const [state, setState] = React.useState<T>(initialValue);
    return [state, setState] as const;
  },
}));

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

const mockProduct: Product = {
  id: 1,
  title: 'Test Product',
  price: 100,
  description: 'A test product',
  category: 'test',
  image: 'test.jpg',
  rating: { rate: 4.5, count: 10 },
};

describe('CartContext', () => {
  it('adds product to cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct);
    });

    expect(result.current.items.length).toBe(1);
    expect(result.current.items[0].quantity).toBe(1);
  });

  it('increments quantity if product already exists', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct);
      result.current.addToCart(mockProduct);
    });

    expect(result.current.items.length).toBe(1);
    expect(result.current.items[0].quantity).toBe(2);
  });

  it('removes product from cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct);
      result.current.removeFromCart(mockProduct.id);
    });

    expect(result.current.items.length).toBe(0);
  });

  it('updates quantity correctly', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct);
      result.current.updateQuantity(mockProduct.id, 5);
    });

    expect(result.current.items[0].quantity).toBe(5);
  });

  it('removes item if quantity set to 0', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct);
      result.current.updateQuantity(mockProduct.id, 0);
    });

    expect(result.current.items.length).toBe(0);
  });

  it('clears cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct);
      result.current.clearCart();
    });

    expect(result.current.items.length).toBe(0);
  });

  it('calculates totalItems and totalPrice', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct);
      result.current.updateQuantity(mockProduct.id, 3);
    });

    expect(result.current.totalItems).toBe(3);
    expect(result.current.totalPrice).toBe(300);
  });

  it('throws error if useCart is used outside provider', () => {
    const { result } = renderHook(() => {
      return () => useCart();
    });

    expect(() => result.current()).toThrow(
      'useCart must be used within a CartProvider'
    );
  });
});
