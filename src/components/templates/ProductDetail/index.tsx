import React, { useState, useCallback, memo } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { Product } from '@/types';
import { Button } from '@/components/atoms/Button';
import { Badge } from '@/components/atoms/Badge';
import { useCart } from '@/contexts/CartContext';
import { FaShoppingCart, FaArrowLeft, FaCheck } from 'react-icons/fa';
import { generateBlurDataURL } from '@/lib/imageLoader';
const Rating = dynamic(() => import('@/components/atoms/Rating'), { ssr: false });

interface ProductDetailProps {
  product: Product;
}

const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.gray[600]};
  text-decoration: none;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  transition: color ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ProductContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`;

const ImageSection = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.colors.gray[50]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 500px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-height: 300px;
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

const StyledImage = styled(Image)`
  object-fit: contain;
  max-width: 100%;
  height: auto;
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const CategoryBadge = styled(Badge)`
  align-self: flex-start;
  text-transform: capitalize;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.2;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 24px;
  }
`;

const PriceSection = styled.div`
  display: flex;
  align-items: baseline;
  gap: ${({ theme }) => theme.spacing.md};
`;

const Price = styled.span`
  font-size: 36px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.primary};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 28px;
  }
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.gray[700]};
`;

const ActionsSection = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: auto;
  padding-top: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const SuccessMessage = styled.div<{ show: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.success};
  font-weight: 500;
  margin-top: ${({ theme }) => theme.spacing.sm};
  opacity: ${({ show }) => (show ? 1 : 0)};
  transition: opacity ${({ theme }) => theme.transitions.fast};
`;

const StockInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.gray[600]};
  font-size: 14px;
`;

const Divider = styled.hr`
  border: none;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.border};
  margin: ${({ theme }) => theme.spacing.lg} 0;
`;

export const ProductDetail: React.FC<ProductDetailProps> = memo(({ product }) => {
  const { addToCart } = useCart();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddToCart = useCallback(() => {
    addToCart(product);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  }, [addToCart, product]);

  return (
    <>
      <Head>
        <link rel="preload" as="image" href={product.image} />
      </Head>

      <Container>
        <BackLink href="/">
          <FaArrowLeft size={16} />
          Back to Products
        </BackLink>

        <ProductContainer>
          <ImageSection>
            <StyledImage
              src={product.image}
              alt={product.title}
              width={400}
              height={400}
              priority
              placeholder="blur"
              blurDataURL={generateBlurDataURL(400, 400)}
              quality={90}
            />
          </ImageSection>

          <InfoSection>
            <CategoryBadge variant="secondary" size="small">
              {product.category}
            </CategoryBadge>

            <Title>{product.title}</Title>

            <Rating 
              value={product.rating.rate} 
              count={product.rating.count}
              size="large"
            />

            <PriceSection>
              <Price>${product.price.toFixed(2)}</Price>
            </PriceSection>

            <StockInfo>
              <FaCheck color="#4caf50" />
              In Stock - Ships within 24 hours
            </StockInfo>

            <Divider />

            <Description>{product.description}</Description>

            <ActionsSection>
              <Button
                variant="primary"
                size="large"
                onClick={handleAddToCart}
                fullWidth
              >
                <FaShoppingCart size={20} />
                Add to Cart
              </Button>
              <Button variant="outline" size="large" fullWidth>
                Buy Now
              </Button>
            </ActionsSection>

            <SuccessMessage show={showSuccess}>
              <FaCheck />
              Product added to cart successfully!
            </SuccessMessage>
          </InfoSection>
        </ProductContainer>
      </Container>
    </>
  );
});

ProductDetail.displayName = 'ProductDetail';
