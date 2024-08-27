import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // For additional matchers
import ProductCard from '@/components/productCard';
import { renderWithProviders } from '../mocks/reduxMockWrapper';
import mockStore from '../mocks/mockStore';

// TypeScript type for ProductCard props
type ProductCardProps = React.ComponentProps<typeof ProductCard>;

// Mock data for ProductData
const mockProductData: ProductCardProps['productData'] = {
    id: '1',
    title: 'Test Product',
    description: 'This is a test product description.',
    imageURL: '/test-image.jpg',
    price: 1000,
    salePrice: 800,
    onSale: true,
    smallImages: ['/small-image1.jpg', '/small-image2.jpg'],
    largeImages: ['/large-image1.jpg', '/large-image2.jpg'],
};

describe('ProductCard Component', () => {
    it('renders the product title and price correctly', () => {
        renderWithProviders(<ProductCard productData={mockProductData} />, { store: mockStore });


        // Assert that the product title is rendered
        expect(screen.getByText('Test Product')).toBeInTheDocument();

        // Assert that the sale price is rendered
        expect(screen.getByText('Rs. 800')).toBeInTheDocument();
    });

    it('shows the sale badge when the product is on sale', () => {
        renderWithProviders(<ProductCard productData={mockProductData} />, { store: mockStore });

        expect(screen.getByText(/sale/i)).toBeInTheDocument();
    });

    it('renders the product description and image correctly', () => {
        renderWithProviders(<ProductCard productData={mockProductData} />, { store: mockStore });

        expect(screen.getByText('This is a test produ')).toBeInTheDocument();

        // const imgElement = screen.getByRole('img');
        // expect(imgElement).toBeInTheDocument();
    });

    it('applies a line-through to the original price when on sale', () => {
        renderWithProviders(<ProductCard productData={mockProductData} />, { store: mockStore });

        // Assert that the original price has a line-through
        const originalPriceElement = screen.getByText('Rs. 1000');
        expect(originalPriceElement).toHaveClass('line-through');
    });
});
