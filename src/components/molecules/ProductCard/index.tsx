'use client';

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { Card } from '@/components/atoms/Card';
import { Button } from '@/components/atoms/Button';
import { Rating } from '@/components/atoms/Rating';
import { useCart } from '@/contexts/CartContext';
import { FaShoppingCart } from 'react-icons/fa';

interface ProductCardProps {
  product: Product;
}

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  transition: all ${({ theme }) => theme.transitions.normal};
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  overflow: hidden;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ theme }) => theme.colors.gray[50]};
`;

const StyledImage = styled(Image)`
  object-fit: contain;
  transition: transform ${({ theme }) => theme.transitions.normal};
  
  ${StyledCard}:hover & {
    transform: scale(1.05);
  }
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Title = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.4;
  min-height: 44.8px;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding-top: ${({ theme }) => theme.spacing.sm};
`;

const Price = styled.span`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`;

const Category = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.gray[500]};
  text-transform: capitalize;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const ButtonContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
`;

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <Link href={`/products/${product.id}`} passHref legacyBehavior>
      <a style={{ textDecoration: 'none' }}>
        <StyledCard hoverable clickable>
        <ImageContainer>
          <StyledImage
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
            priority={false}
          />
        </ImageContainer>
        <Content>
          <Category>{product.category}</Category>
          <Title>{product.title}</Title>
          <Rating value={product.rating.rate} count={product.rating.count} />
          <PriceContainer>
            <Price>${product.price.toFixed(2)}</Price>
          </PriceContainer>
        </Content>
        <ButtonContainer>
          <Button
            variant="primary"
            size="medium"
            fullWidth
            onClick={handleAddToCart}
          >
            <FaShoppingCart size={16} />
            Add to Cart
          </Button>
        </ButtonContainer>
              </StyledCard>
      </a>
    </Link>
  );
};