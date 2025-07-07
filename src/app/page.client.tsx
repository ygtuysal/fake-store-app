'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Product } from '@/types';
import { HomePage } from '@/components/templates/HomePage';
import { getAllProducts, getCategories } from '@/lib/api';

interface ClientPageProps {
  initialProducts?: Product[];
  initialCategories?: string[];
}

export default function ClientPage({ initialProducts = [], initialCategories = [] }: ClientPageProps) {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [categories, setCategories] = useState<string[]>(initialCategories);
  const [loading, setLoading] = useState(!initialProducts.length);
  
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const itemsPerPage = 10;
  const searchTerm = searchParams.get('search') || '';
  const categoryFilter = searchParams.get('category') || '';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';
  const sortBy = searchParams.get('sort') || '';

  useEffect(() => {
    async function fetchData() {
      if (initialProducts.length === 0) {
        setLoading(true);
        try {
          const [productsData, categoriesData] = await Promise.all([
            getAllProducts(),
            getCategories(),
          ]);
          setProducts(productsData);
          setCategories(categoriesData);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      }
    }
    
    fetchData();
  }, [initialProducts.length]);

  let filteredProducts = [...products];

  if (searchTerm) {
    filteredProducts = filteredProducts.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (categoryFilter) {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === categoryFilter
    );
  }

  if (minPrice) {
    const min = parseFloat(minPrice);
    filteredProducts = filteredProducts.filter(
      (product) => product.price >= min
    );
  }

  if (maxPrice) {
    const max = parseFloat(maxPrice);
    filteredProducts = filteredProducts.filter(
      (product) => product.price <= max
    );
  }

  if (sortBy) {
    switch (sortBy) {
      case 'price-asc':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
    }
  }

  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <HomePage
      products={paginatedProducts}
      categories={categories}
      currentPage={currentPage}
      totalPages={totalPages}
      totalItems={totalItems}
      itemsPerPage={itemsPerPage}
    />
  );
}