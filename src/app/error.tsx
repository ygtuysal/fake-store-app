'use client';

import React from 'react';
import styled from 'styled-components';
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

const Title = styled.h1`
  font-size: 48px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.error};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Message = styled.p`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.gray[600]};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  max-width: 500px;
`;

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Container>
      <Title>Oops! Something went wrong</Title>
      <Message>
        We encountered an unexpected error. Please try again later or contact support if the problem persists.
      </Message>
      <Button variant="primary" size="large" onClick={reset}>
        Try Again
      </Button>
    </Container>
  );
}