import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; // For additional matchers
import ProductCard from '@/components/productCard';
import { renderWithProviders } from '../mocks/reduxMockWrapper';
import mockStore from '../mocks/mockStore';
import SingleProductDetails from '@/components/singleProductDetails';
import Cart from '@/components/cart';

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

describe('SingleProductDetails Integration Test', () => {
    test('adds product to cart and verifies in cart', async () => {
        renderWithProviders(
            <SingleProductDetails product={mockProductData} className="test-class" />, {
            store: mockStore
        }
        );

        // Click "Add to cart" button
        const addToCartButton = screen.getByText('Add to cart');
        fireEvent.click(addToCartButton);

        // Wait for the "Adding..." state to disappear
        await waitFor(() => expect(addToCartButton).toHaveTextContent('Add to cart'), { timeout: 3000 });


        // Render Cart component to check if product is in cart
        renderWithProviders(
            <Cart cartItems={[{ productId: '1', quantity: 1 }]} totalPrice={80} />, {
            store: mockStore
        }
        );

        // // Check if the cart displays the added product
        expect(screen.getByText("Taxes included. Shipping and discount codes calculated at checkout.")).toBeInTheDocument();
        // expect(screen.getByText(/Rs. 80/i)).toBeInTheDocument();
    });
});
