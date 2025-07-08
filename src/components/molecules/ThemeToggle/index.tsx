'use client';

import React from 'react';
import styled from 'styled-components';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '@/theme/ThemeContext';

const ToggleButton = styled.button`
  position: relative;
  width: 60px;
  height: 30px;
  background-color: ${({ theme }) => theme.colors.gray[200]};
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color ${({ theme }) => theme.transitions.normal};
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray[300]};
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}33;
  }
`;

const ToggleSlider = styled.div<{ $isDark: boolean }>`
  position: absolute;
  top: 3px;
  left: ${({ $isDark }) => ($isDark ? '33px' : '3px')};
  width: 24px;
  height: 24px;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 50%;
  transition: all ${({ theme }) => theme.transitions.normal};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IconWrapper = styled.div`
  color: ${({ theme }) => theme.colors.gray[600]};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

const SimpleToggle = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray[100]};
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}33;
  }
`;

interface ThemeToggleProps {
  variant?: 'switch' | 'simple';
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ variant = 'switch' }) => {
  const { themeMode, toggleTheme } = useTheme();
  const isDark = themeMode === 'dark';

  if (variant === 'simple') {
    return (
      <SimpleToggle
        onClick={toggleTheme}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      >
        {isDark ? <FaSun size={20} /> : <FaMoon size={20} />}
      </SimpleToggle>
    );
  }

  return (
    <ToggleButton
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      role="switch"
      aria-checked={isDark}
    >
      <IconWrapper style={{ marginLeft: '4px' }}>
        <FaSun size={14} />
      </IconWrapper>
      <IconWrapper style={{ marginRight: '4px' }}>
        <FaMoon size={14} />
      </IconWrapper>
      <ToggleSlider $isDark={isDark}>
        {isDark ? <FaMoon size={12} /> : <FaSun size={12} />}
      </ToggleSlider>
    </ToggleButton>
  );
};