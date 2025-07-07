import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProduct } from '@/lib/api';
import { ProductDetail } from '@/components/templates/ProductDetail';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  try {
    const product = await getProduct(params.id);
    
    return {
      title: `${product?.title} - Fake Store`,
      description: product?.description,
      openGraph: {
        title: product?.title,
        description: product?.description,
        images: [
          {
            url: product?.image,
            width: 800,
            height: 800,
            alt: product?.title,
          },
        ],
      },
    };
  } catch (error) {
    return {
      title: 'Product Not Found - Fake Store',
      description: 'The requested product could not be found.',
    };
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  try {
    const product = await getProduct(params.id);
    return <ProductDetail product={product} />;
  } catch (error) {
    notFound();
  }
}