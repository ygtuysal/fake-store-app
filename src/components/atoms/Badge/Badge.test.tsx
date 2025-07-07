import React from 'react';
import { render, screen } from '@/test-utils';
import { Badge, BadgeNumber } from './index';
import { theme } from '@/styles/theme';

describe('Badge Component', () => {
  it('renders badge with text', () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('renders with different variants', () => {
    const { rerender } = render(<Badge variant="primary">Primary</Badge>);
    let badge = screen.getByText('Primary');
    expect(badge).toHaveStyle(`background-color: ${theme.colors.primary}`);

    rerender(<Badge variant="error">Error</Badge>);
    badge = screen.getByText('Error');
    expect(badge).toHaveStyle(`background-color: ${theme.colors.error}`);

    rerender(<Badge variant="success">Success</Badge>);
    badge = screen.getByText('Success');
    expect(badge).toHaveStyle(`background-color: ${theme.colors.success}`);
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<Badge size="small">Small</Badge>);
    let badge = screen.getByText('Small');
    expect(badge).toHaveStyle('font-size: 12px');

    rerender(<Badge size="medium">Medium</Badge>);
    badge = screen.getByText('Medium');
    expect(badge).toHaveStyle('font-size: 14px');
  });

  it('renders BadgeNumber correctly', () => {
    render(<BadgeNumber>5</BadgeNumber>);
    const badge = screen.getByText('5');
    expect(badge).toHaveStyle('min-width: 20px');
    expect(badge).toHaveStyle('height: 20px');
  });
});