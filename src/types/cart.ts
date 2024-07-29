export interface CartItemI {
  productId: string;
  quantity: number;
}

export interface CartI {
  userId?: string;
  date: string;
  products: CartItemI[];
  totalPrice: number;
}
