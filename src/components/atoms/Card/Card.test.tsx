import React from 'react';
import { render, screen } from '@/test-utils';
import { Card, CardHeader, CardBody, CardFooter } from './index';

describe('Card Component', () => {
  it('renders card with content', () => {
    render(
      <Card>
        <div>Card Content</div>
      </Card>
    );
    expect(screen.getByText('Card Content')).toBeInTheDocument();
  });

  it('renders card with all sections', () => {
    render(
      <Card>
        <CardHeader>Header</CardHeader>
        <CardBody>Body</CardBody>
        <CardFooter>Footer</CardFooter>
      </Card>
    );
    
    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Body')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });

  it('applies hoverable styles', () => {
    const { container } = render(
      <Card hoverable>
        <div>Hoverable Card</div>
      </Card>
    );
    const card = container.firstChild;
    expect(card).toHaveStyleRule('transform', 'translateY(-4px)', {
      modifier: ':hover',
    });
  });

  it('applies clickable cursor', () => {
    const { container } = render(
      <Card clickable>
        <div>Clickable Card</div>
      </Card>
    );
    const card = container.firstChild;
    expect(card).toHaveStyleRule('cursor', 'pointer');
  });
});