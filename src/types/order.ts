export interface Order {
  orderStatus: string;
  totalPrice: number;
  username: string;
  email: string;
  noOfProducts: number;
}

export interface Orders {
  orders: Order[];
  totalOrders: number;
}
