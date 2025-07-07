import styled from 'styled-components';

interface InputProps {
  fullWidth?: boolean;
  error?: boolean;
}

export const Input = styled.input<InputProps>`
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  padding: 10px 16px;
  font-size: 16px;
  border: 2px solid ${({ error, theme }) =>
    error ? theme.colors.error : theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  transition: all ${({ theme }) => theme.transitions.fast};
  outline: none;
  
  &:focus {
    border-color: ${({ error, theme }) =>
      error ? theme.colors.error : theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ error, theme }) =>
      error ? `${theme.colors.error}33` : `${theme.colors.primary}33`};
  }
  
  &:hover:not(:disabled) {
    border-color: ${({ error, theme }) =>
      error ? theme.colors.error : theme.colors.gray[400]};
  }
  
  &:disabled {
    background-color: ${({ theme }) => theme.colors.gray[100]};
    cursor: not-allowed;
    opacity: 0.6;
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[400]};
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  width: 100%;
`;

export const InputLabel = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`;

export const InputError = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.error};
`;