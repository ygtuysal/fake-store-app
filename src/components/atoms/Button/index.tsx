import styled, { css } from 'styled-components';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  disabled?: boolean;
}

const sizeStyles = {
  small: css`
    padding: 6px 12px;
    font-size: 14px;
  `,
  medium: css`
    padding: 10px 20px;
    font-size: 16px;
  `,
  large: css`
    padding: 14px 28px;
    font-size: 18px;
  `,
};

const variantStyles = {
  primary: css`
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
    border: 2px solid transparent;
    
    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.primary};
      filter: brightness(1.1);
    }
    
    &:active:not(:disabled) {
      filter: brightness(0.95);
    }
  `,
  secondary: css`
    background-color: ${({ theme }) => theme.colors.secondary};
    color: white;
    border: 2px solid transparent;
    
    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.secondary};
      filter: brightness(1.1);
    }
    
    &:active:not(:disabled) {
      filter: brightness(0.95);
    }
  `,
  outline: css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.primary};
    border: 2px solid ${({ theme }) => theme.colors.primary};
    
    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.primary};
      color: white;
    }
  `,
  ghost: css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.text};
    border: 2px solid transparent;
    
    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.gray[100]};
    }
  `,
};

export const Button = styled.button<ButtonProps>`
  ${({ size = 'medium' }) => sizeStyles[size]}
  ${({ variant = 'primary' }) => variantStyles[variant]}
  
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: 600;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  outline: none;
  position: relative;
  overflow: hidden;
  
  &:focus-visible {
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}33;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.3);
    transform: translate(-50%, -50%);
    transition: width 0.3s, height 0.3s;
  }
  
  &:active:not(:disabled)::after {
    width: 300px;
    height: 300px;
  }
`;