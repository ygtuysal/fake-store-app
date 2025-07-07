import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';
import { ThemeProvider } from 'styled-components';
import { Button } from '.';

const theme = {
  colors: {
    primary: '#0070f3',
    secondary: '#6c757d',
    text: '#111',
    gray: {
      100: '#f1f3f5',
      400: '#ced4da',
    },
    error: '#dc3545',
    border: '#dee2e6',
    background: '#ffffff',
  },
  borderRadius: {
    md: '4px',
  },
  spacing: {
    xs: '4px',
  },
  transitions: {
    fast: '0.2s',
  },
};

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

describe('Button', () => {
  it('renders primary button with default styles', () => {
    const { container } = renderWithTheme(<Button>Click me</Button>);
    expect(container.firstChild).toMatchSnapshot();
    expect(container.firstChild).toHaveStyleRule('background-color', theme.colors.primary);
  });

  it('renders secondary button', () => {
    const { container } = renderWithTheme(<Button variant="secondary">Secondary</Button>);
    expect(container.firstChild).toHaveStyleRule('background-color', theme.colors.secondary);
  });

  it('renders fullWidth button', () => {
    const { container } = renderWithTheme(<Button fullWidth>Full Width</Button>);
    expect(container.firstChild).toHaveStyleRule('width', '100%');
  });

  it('renders hover style for primary button', () => {
    const { container } = renderWithTheme(<Button>Hover me</Button>);
    expect(container.firstChild).toHaveStyleRule('filter', 'brightness(1.1)', {
      modifier: ':hover:not(:disabled)',
    });
  });

  it('renders disabled style', () => {
    const { container } = renderWithTheme(<Button disabled>Disabled</Button>);
    expect(container.firstChild).toHaveStyleRule('cursor', 'not-allowed', {
      modifier: ':disabled',
    });
  });
});
