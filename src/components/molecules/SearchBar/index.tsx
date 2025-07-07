'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/atoms/Input';
import { Button } from '@/components/atoms/Button';
import { FaSearch, FaTimes } from 'react-icons/fa';

const SearchContainer = styled.form`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  width: 100%;
  max-width: 600px;
  position: relative;
`;

const SearchInputWrapper = styled.div`
  position: relative;
  flex: 1;
`;

const SearchInput = styled(Input)`
  padding-left: 40px;
  padding-right: ${({ value }) => (value ? '40px' : '16px')};
`;

const IconWrapper = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.gray[400]};
  pointer-events: none;
  
  &.search-icon {
    left: 12px;
  }
  
  &.clear-icon {
    right: 12px;
    pointer-events: auto;
    cursor: pointer;
    
    &:hover {
      color: ${({ theme }) => theme.colors.gray[600]};
    }
  }
`;

export const SearchBar: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const search = searchParams.get('search');
    if (search) {
      setSearchValue(search);
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    
    if (searchValue.trim()) {
      params.set('search', searchValue.trim());
      params.set('page', '1');
    } else {
      params.delete('search');
    }
    
    router.push(`/?${params.toString()}`);
  };

  const handleClear = () => {
    setSearchValue('');
    const params = new URLSearchParams(searchParams.toString());
    params.delete('search');
    router.push(`/?${params.toString()}`);
  };

  return (
    <SearchContainer onSubmit={handleSubmit}>
      <SearchInputWrapper>
        <IconWrapper className="search-icon">
          <FaSearch size={16} />
        </IconWrapper>
        <SearchInput
          type="text"
          placeholder="Search products..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        {searchValue && (
          <IconWrapper className="clear-icon" onClick={handleClear}>
            <FaTimes size={16} />
          </IconWrapper>
        )}
      </SearchInputWrapper>
      <Button type="submit" variant="primary" size="medium">
        Search
      </Button>
    </SearchContainer>
  );
};