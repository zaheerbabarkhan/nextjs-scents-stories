import { http, HttpResponse } from "msw";

export const handlers = [
  // Mock the `useGetProductByIdQuery` request
  http.get("http://localhost:8765/products/:productId", async () => {
    // Return a dummy product based on the productId
    return HttpResponse.json({
      id: "1",
      title: "Test Product",
      description: "This is a test product description.",
      imageURL: "/test-image.jpg",
      price: 1000,
      salePrice: 800,
      onSale: true,
      smallImages: ["/small-image1.jpg", "/small-image2.jpg"],
      largeImages: ["/large-image1.jpg", "/large-image2.jpg"],
    });
  }),
];
