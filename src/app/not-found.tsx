'use client';

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { Button } from '@/components/atoms/Button';

const Container = styled.div`
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
`;

const ErrorCode = styled.h1`
  font-size: 120px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
  line-height: 1;
`;

const Title = styled.h2`
  font-size: 32px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: ${({ theme }) => theme.spacing.md} 0;
`;

const Description = styled.p`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.gray[600]};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  max-width: 500px;
`;

export default function NotFound() {
  return (
    <Container>
      <ErrorCode>404</ErrorCode>
      <Title>Page Not Found</Title>
      <Description>
        Sorry, we couldnt find the page you are looking for. The page might have been removed or the link might be broken.
      </Description>
      <Link href="/" style={{ textDecoration: 'none' }}>
        <Button variant="primary" size="large">
          Back to Home
        </Button>
      </Link>
    </Container>
  );
}