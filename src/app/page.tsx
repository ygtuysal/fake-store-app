import React from 'react';
import { getAllProducts, getCategories } from '@/lib/api';
import { Product } from '@/types';
import { HomePage } from '@/components/templates/HomePage';

interface PageProps {
  searchParams?: {
    page?: string;
    sort?: string;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    search?: string;
  };
}

async function filterAndSortProducts(
  products: Product[],
  params: PageProps['searchParams']
): Promise<Product[]> {
  let filteredProducts = [...products];

  if (params?.search) {
    const searchTerm = params.search.toLowerCase();
    filteredProducts = filteredProducts.filter((product) =>
      product.title.toLowerCase().includes(searchTerm)
    );
  }

  if (params?.category) {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === params.category
    );
  }

  if (params?.minPrice) {
    const minPrice = parseFloat(params.minPrice);
    filteredProducts = filteredProducts.filter(
      (product) => product.price >= minPrice
    );
  }

  if (params?.maxPrice) {
    const maxPrice = parseFloat(params.maxPrice);
    filteredProducts = filteredProducts.filter(
      (product) => product.price <= maxPrice
    );
  }

  if (params?.sort) {
    switch (params.sort) {
      case 'price-asc':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
    }
  }

  return filteredProducts;
}

export default async function Page({ searchParams }: PageProps) {
  const currentPage = parseInt(searchParams?.page || '1', 10);
  const itemsPerPage = 10;

  const [allProducts, categories] = await Promise.all([
    getAllProducts(),
    getCategories(),
  ]);

  const filteredProducts = await filterAndSortProducts(allProducts, searchParams);
  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

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