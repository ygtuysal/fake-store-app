import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';
import { ThemeProvider } from 'styled-components';
import { Input } from '.';

const theme = {
  colors: {
    primary: '#0070f3',
    text: '#111',
    error: '#dc3545',
    gray: {
      100: '#f1f3f5',
      400: '#ced4da',
    },
    border: '#dee2e6',
    background: '#ffffff',
  },
  borderRadius: {
    md: '4px',
  },
  transitions: {
    fast: '0.2s',
  },
  spacing: {
    xs: '4px',
  },
};

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

describe('Input', () => {
  it('renders default input', () => {
    const { container } = renderWithTheme(<Input placeholder="type here" />);
    expect(container.firstChild).toMatchSnapshot();
    expect(container.firstChild).toHaveStyleRule('border', `2px solid ${theme.colors.border}`);
  });

  it('renders full width input', () => {
    const { container } = renderWithTheme(<Input $fullWidth />);
    expect(container.firstChild).toHaveStyleRule('width', '100%');
  });

  it('renders input with error', () => {
    const { container } = renderWithTheme(<Input $error />);
    expect(container.firstChild).toHaveStyleRule('border', `2px solid ${theme.colors.error}`);
  });

  it('renders disabled input', () => {
    const { container } = renderWithTheme(<Input disabled />);
    expect(container.firstChild).toHaveStyleRule('cursor', 'not-allowed', {
      modifier: ':disabled',
    });
  });

  it('renders focus style', () => {
    const { container } = renderWithTheme(<Input />);
    expect(container.firstChild).toHaveStyleRule('box-shadow', `0 0 0 3px ${theme.colors.primary}33`, {
      modifier: ':focus',
    });
  });
});
