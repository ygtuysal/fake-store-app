'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { BadgeNumber } from '@/components/atoms/Badge';
import { ThemeToggle } from '@/components/molecules/ThemeToggle';
import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';

const HeaderWrapper = styled.header`
  background-color: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const HeaderContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.md}`};
  }
`;

const Logo = styled(Link)`
  font-size: 24px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  
  &:hover {
    opacity: 0.8;
  }
`;

const Nav = styled.nav<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${({ theme }) => theme.colors.background};
    flex-direction: column;
    padding: ${({ theme }) => theme.spacing.lg};
    transform: translateX(${({ $isOpen }) => ($isOpen ? '0' : '100%')});
    transition: transform ${({ theme }) => theme.transitions.normal};
  }
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  font-weight: 500;
  transition: color ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const CartButton = styled.button`
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const CartBadge = styled(BadgeNumber)`
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(50%, -50%);
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: block;
  }
`;

export const Header: React.FC = () => {
  const { totalItems } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <HeaderWrapper>
      <HeaderContainer>
        <Logo href="/">
          <FaShoppingCart size={28} />
          Fake Store
        </Logo>
        
        <Nav $isOpen={isMobileMenuOpen}>
          <NavLink href="/" onClick={() => setIsMobileMenuOpen(false)}>
            Products
          </NavLink>
          
          <NavActions>
            <ThemeToggle variant="simple" />
            <CartButton>
              <FaShoppingCart size={24} />
              {totalItems > 0 && (
                <CartBadge variant="error">{totalItems}</CartBadge>
              )}
            </CartButton>
          </NavActions>
        </Nav>
        
        <MobileMenuButton onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </MobileMenuButton>
      </HeaderContainer>
    </HeaderWrapper>
  );
};