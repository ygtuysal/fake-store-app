'use client';

import React from 'react';
import styled from 'styled-components';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

interface RatingProps {
  value: number;
  count?: number;
  size?: 'small' | 'medium' | 'large';
}

const sizeMap = {
  small: 12,
  medium: 16,
  large: 20,
};

const RatingContainer = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const Stars = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 2px;
  color: #fbbf24;
`;

const RatingText = styled.span<{ size: 'small' | 'medium' | 'large' }>`
  font-size: ${({ size }) => {
    const sizes = {
      small: '12px',
      medium: '14px',
      large: '16px',
    };
    return sizes[size];
  }};
  color: ${({ theme }) => theme.colors.gray[600]};
  margin-left: ${({ theme }) => theme.spacing.xs};
`;

export const Rating = ({ value, count, size = 'medium' }: RatingProps) => {
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(value);
    const hasHalfStar = value % 1 >= 0.5;
    const iconSize = sizeMap[size];

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FaStar key={i} size={iconSize} />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} size={iconSize} />);
      } else {
        stars.push(<FaRegStar key={i} size={iconSize} />);
      }
    }

    return stars;
  };

  return (
    <RatingContainer>
      <Stars>{renderStars()}</Stars>
      <RatingText size={size}>
        {value.toFixed(1)}
        {count && ` (${count})`}
      </RatingText>
    </RatingContainer>
  );
};