'use client';

import React from 'react';
import styled from 'styled-components';
import { Product } from '@/types';
import { ProductGrid } from '@/components/organisms/ProductGrid';
import { Pagination } from '@/components/organisms/Pagination';
import { SearchBar } from '@/components/molecules/SearchBar';
import { SortDropdown } from '@/components/molecules/SortDropdown';
import { FilterPanel } from '@/components/molecules/FilterPanel';

interface HomePageProps {
  products: Product[];
  categories: string[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

const PageContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

const PageHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const ControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const TopControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.lg};
  }
`;

const FilterSidebar = styled.aside`
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    order: -1;
  }
`;

const MainContent = styled.div`
  min-height: 400px;
`;

export const HomePage: React.FC<HomePageProps> = ({
  products,
  categories,
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
}) => {
  return (
    <PageContainer>
      <PageHeader>
        <Title>Our Products</Title>
        <ControlsContainer>
          <TopControls>
            <SearchBar />
            <SortDropdown />
          </TopControls>
        </ControlsContainer>
      </PageHeader>

      <ContentContainer>
        <FilterSidebar>
          <FilterPanel categories={categories} />
        </FilterSidebar>
        
        <MainContent>
          <ProductGrid products={products} />
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
            />
          )}
        </MainContent>
      </ContentContainer>
    </PageContainer>
  );
};