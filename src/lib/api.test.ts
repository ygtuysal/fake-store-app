import {
  getProducts,
  getAllProducts,
  getProduct,
  getCategories,
  getProductsByCategory,
} from '@/lib/api';
import { Product } from '@/types';

global.fetch = jest.fn();

const mockProduct: Product = {
  id: 1,
  title: 'Test Product',
  price: 99.99,
  description: 'A test product',
  category: 'test-category',
  image: 'test.jpg',
  rating: {
    rate: 4.5,
    count: 10,
  },
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('API functions', () => {
  describe('getProducts', () => {
    it('returns sliced product list when fetch succeeds', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => Array(20).fill(mockProduct),
      });

      const result = await getProducts(5, 10);
      expect(result.length).toBe(5);
    });

    it('returns [] when fetch fails', async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error('Fetch failed'));

      const result = await getProducts();
      expect(result).toEqual([]);
    });
  });

  describe('getAllProducts', () => {
    it('returns all products when fetch succeeds', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => [mockProduct],
      });

      const result = await getAllProducts();
      expect(result).toEqual([mockProduct]);
    });

    it('returns [] when fetch fails', async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error('Fetch error'));

      const result = await getAllProducts();
      expect(result).toEqual([]);
    });
  });

  describe('getProduct', () => {
    it('returns product if fetch is successful', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockProduct,
      });

      const result = await getProduct('1');
      expect(result).toEqual(mockProduct);
    });

    it('returns null on 404', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

      const result = await getProduct('123');
      expect(result).toBeNull();
    });

    it('returns null on error', async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      const result = await getProduct('1');
      expect(result).toBeNull();
    });
  });

  describe('getCategories', () => {
    it('returns categories if fetch succeeds', async () => {
      const mockCategories = ['cat1', 'cat2'];
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockCategories,
      });

      const result = await getCategories();
      expect(result).toEqual(mockCategories);
    });

    it('returns default categories on error', async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error('Fetch failed'));

      const result = await getCategories();
      expect(result).toEqual([
        'electronics',
        'jewelery',
        "men's clothing",
        "women's clothing",
      ]);
    });
  });

  describe('getProductsByCategory', () => {
    it('returns products for given category', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => [mockProduct],
      });

      const result = await getProductsByCategory('test-category');
      expect(result).toEqual([mockProduct]);
    });

    it('returns [] on fetch rejection', async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error('API error'));

      const result = await getProductsByCategory('test-category');
      expect(result).toEqual([]);
    });

    it('returns [] on non-ok response', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: async () => [],
      });

      const result = await getProductsByCategory('test-category');
      expect(result).toEqual([]);
    });
  });
});
