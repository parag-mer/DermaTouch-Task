export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
  title?: string;
}

export interface Order {
  id: string;
  userId: string; // user email or id
  items: OrderItem[];
  total: number;
  createdAt: string;
}
