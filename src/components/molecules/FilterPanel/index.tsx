'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input, InputWrapper, InputLabel } from '@/components/atoms/Input';
import { Button } from '@/components/atoms/Button';

interface FilterPanelProps {
  categories: string[];
}

const FilterContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.gray[50]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

const FilterSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text};
`;

const CategoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const CategoryItem = styled.label`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  cursor: pointer;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  text-transform: capitalize;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  cursor: pointer;
`;

const PriceInputsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const ClearButton = styled(Button)`
  margin-top: ${({ theme }) => theme.spacing.md};
`;

export const FilterPanel: React.FC<FilterPanelProps> = ({ categories }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    setSelectedCategory(searchParams.get('category') || '');
    setMinPrice(searchParams.get('minPrice') || '');
    setMaxPrice(searchParams.get('maxPrice') || '');
  }, [searchParams]);

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (selectedCategory) {
      params.set('category', selectedCategory);
    } else {
      params.delete('category');
    }
    
    if (minPrice) {
      params.set('minPrice', minPrice);
    } else {
      params.delete('minPrice');
    }
    
    if (maxPrice) {
      params.set('maxPrice', maxPrice);
    } else {
      params.delete('maxPrice');
    }
    
    params.set('page', '1');
    router.push(`/?${params.toString()}`);
  };

  const clearFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('category');
    params.delete('minPrice');
    params.delete('maxPrice');
    params.set('page', '1');
    router.push(`/?${params.toString()}`);
  };

  return (
    <FilterContainer>
      <FilterSection>
        <SectionTitle>Category</SectionTitle>
        <CategoryList>
          {categories.map((category) => (
            <CategoryItem key={category}>
              <Checkbox
                type="radio"
                name="category"
                value={category}
                checked={selectedCategory === category}
                onChange={(e) => setSelectedCategory(e.target.value)}
              />
              {category}
            </CategoryItem>
          ))}
        </CategoryList>
      </FilterSection>

      <FilterSection>
        <SectionTitle>Price Range</SectionTitle>
        <PriceInputsContainer>
          <InputWrapper>
            <InputLabel>Min</InputLabel>
            <Input
              type="number"
              placeholder="0"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              min="0"
              step="0.01"
            />
          </InputWrapper>
          <InputWrapper>
            <InputLabel>Max</InputLabel>
            <Input
              type="number"
              placeholder="999"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              min="0"
              step="0.01"
            />
          </InputWrapper>
        </PriceInputsContainer>
      </FilterSection>

      <Button variant="primary" fullWidth onClick={applyFilters}>
        Apply Filters
      </Button>
      
      <ClearButton variant="ghost" fullWidth onClick={clearFilters}>
        Clear All
      </ClearButton>
    </FilterContainer>
  );
};