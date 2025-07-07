import styled from 'styled-components';

interface BadgeProps {
  variant?: 'primary' | 'secondary' | 'success' | 'error' | 'warning';
  size?: 'small' | 'medium';
}

export const Badge = styled.span<BadgeProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${({ size = 'medium' }) =>
    size === 'small' ? '2px 8px' : '4px 12px'};
  font-size: ${({ size = 'medium' }) => (size === 'small' ? '12px' : '14px')};
  font-weight: 600;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  transition: all ${({ theme }) => theme.transitions.fast};
  
  background-color: ${({ variant = 'primary', theme }) => {
    const colors = {
      primary: theme.colors.primary,
      secondary: theme.colors.secondary,
      success: theme.colors.success,
      error: theme.colors.error,
      warning: theme.colors.warning,
    };
    return colors[variant];
  }};
  
  color: white;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: ${({ theme }) => theme.shadows.sm};
  }
`;

export const BadgeNumber = styled(Badge)`
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  font-size: 11px;
  font-weight: 700;
`;