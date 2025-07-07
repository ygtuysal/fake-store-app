'use client';

import React from 'react';
import styled from 'styled-components';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/atoms/Button';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin: ${({ theme }) => `${theme.spacing.xl} 0`};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-wrap: wrap;
  }
`;

const PageButton = styled(Button)<{ active?: boolean }>`
  min-width: 40px;
  height: 40px;
  padding: 0;
  
  ${({ active, theme }) =>
    active &&
    `
    background-color: ${theme.colors.primary};
    color: white;
    border-color: ${theme.colors.primary};
    
    &:hover {
      background-color: ${theme.colors.primary};
      filter: brightness(0.9);
    }
  `}
`;

const PageInfo = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.gray[600]};
  margin: 0 ${({ theme }) => theme.spacing.sm};
`;

const PageNumbers = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const Ellipsis = styled.span`
  padding: 0 ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.gray[500]};
`;

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`/?${params.toString()}`);
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <PageButton
            key={i}
            variant="outline"
            size="small"
            active={i === currentPage}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </PageButton>
        );
      }
    } else {
      pages.push(
        <PageButton
          key={1}
          variant="outline"
          size="small"
          active={1 === currentPage}
          onClick={() => handlePageChange(1)}
        >
          1
        </PageButton>
      );

      if (currentPage > 3) {
        pages.push(<Ellipsis key="ellipsis-start">...</Ellipsis>);
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(
          <PageButton
            key={i}
            variant="outline"
            size="small"
            active={i === currentPage}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </PageButton>
        );
      }

      if (currentPage < totalPages - 2) {
        pages.push(<Ellipsis key="ellipsis-end">...</Ellipsis>);
      }

      if (totalPages > 1) {
        pages.push(
          <PageButton
            key={totalPages}
            variant="outline"
            size="small"
            active={totalPages === currentPage}
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </PageButton>
        );
      }
    }

    return pages;
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <PaginationContainer>
      <Button
        variant="outline"
        size="small"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <FaChevronLeft />
      </Button>

      <PageNumbers>{renderPageNumbers()}</PageNumbers>

      <Button
        variant="outline"
        size="small"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <FaChevronRight />
      </Button>

      <PageInfo>
        Showing {startItem}-{endItem} of {totalItems}
      </PageInfo>
    </PaginationContainer>
  );
};