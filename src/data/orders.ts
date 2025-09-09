import { Product } from "./products";

export interface OrderItem {
  product: Product;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;

  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";

  createdAt: string;   // ISO date string
  updatedAt: string;   // ISO date string
  date: string;        // order date
  shippedDate?: string;
  deliveredDate?: string;

  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };

  paymentMethod: {
    type: "credit_card" | "paypal" | "bank_transfer";
    details: string;
  };

  trackingNumber?: string;
}
