import { Product } from '@/types';

const API_BASE_URL = 'https://fakestoreapi.com';

async function fetchWithRetry(url: string, options?: RequestInit, retries = 3): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });
      
      return response;
    } catch (error) {
      console.log(`Fetch attempt ${i + 1} failed for ${url}:`, error);
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
  
  throw new Error('All fetch attempts failed');
}

export async function getProducts(
  limit: number = 10,
  offset: number = 0
): Promise<Product[]> {
  try {
    const response = await fetchWithRetry(`${API_BASE_URL}/products`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const products: Product[] = await response.json();
    
    const startIndex = offset;
    const endIndex = offset + limit;
    
    return products.slice(startIndex, endIndex);
  } catch (error) {
    console.error('Error in getProducts:', error);
    return [];
  }
}

export async function getAllProducts(): Promise<Product[]> {
  try {
    const response = await fetchWithRetry(`${API_BASE_URL}/products`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const products: Product[] = await response.json();
    return products;
  } catch (error) {
    console.error('Error in getAllProducts:', error);
    return [];
  }
}

export async function getProduct(id: string): Promise<Product | null> {
  try {
    const response = await fetchWithRetry(`${API_BASE_URL}/products/${id}`);
    
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  } catch (error) {
    console.error('Error in getProduct:', error);
    return null;
  }
}

export async function getCategories(): Promise<string[]> {
  try {
    const response = await fetchWithRetry(`${API_BASE_URL}/products/categories`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const categories: string[] = await response.json();
    return categories;
  } catch (error) {
    console.error('Error in getCategories:', error);
    return ['electronics', 'jewelery', "men's clothing", "women's clothing"];
  }
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  try {
    const response = await fetchWithRetry(`${API_BASE_URL}/products/category/${encodeURIComponent(category)}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  } catch (error) {
    console.error('Error in getProductsByCategory:', error);
    return [];
  }
}