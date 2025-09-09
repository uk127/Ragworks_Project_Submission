export interface SalesData {
  date: string;
  revenue: number;
  orders: number;
}

export interface CategorySales {
  category: string;
  sales: number;
}

export interface ProductPerformance {
  id: string;
  name: string;
  sales: number;
  revenue: number;
  views: number;
}

export const monthlySales: SalesData[] = [
  { date: '2023-01', revenue: 12500, orders: 125 },
  { date: '2023-02', revenue: 15000, orders: 150 },
  { date: '2023-03', revenue: 18500, orders: 185 },
  { date: '2023-04', revenue: 22000, orders: 220 },
  { date: '2023-05', revenue: 24500, orders: 245 },
  { date: '2023-06', revenue: 28000, orders: 280 },
  { date: '2023-07', revenue: 32500, orders: 325 },
  { date: '2023-08', revenue: 36000, orders: 360 },
  { date: '2023-09', revenue: 39500, orders: 395 },
  { date: '2023-10', revenue: 43000, orders: 430 },
  { date: '2023-11', revenue: 46500, orders: 465 },
  { date: '2023-12', revenue: 50000, orders: 500 },
];

export const categorySales: CategorySales[] = [
  { category: 'Electronics', sales: 45000 },
  { category: 'Furniture', sales: 25000 },
  { category: 'Kitchen', sales: 18000 },
  { category: 'Wearables', sales: 15000 },
  { category: 'Gaming', sales: 12000 },
  { category: 'Appliances', sales: 10000 },
];

export const topProducts: ProductPerformance[] = [
  {
    id: '2',
    name: 'Smartphone Pro Max',
    sales: 120,
    revenue: 119998.80,
    views: 5600,
  },
  {
    id: '4',
    name: 'Ultra HD Smart TV',
    sales: 85,
    revenue: 67999.15,
    views: 4200,
  },
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    sales: 150,
    revenue: 29998.50,
    views: 6800,
  },
  {
    id: '10',
    name: 'Adjustable Standing Desk',
    sales: 65,
    revenue: 22749.35,
    views: 3100,
  },
  {
    id: '6',
    name: 'Fitness Smartwatch',
    sales: 110,
    revenue: 19798.90,
    views: 5200,
  },
];