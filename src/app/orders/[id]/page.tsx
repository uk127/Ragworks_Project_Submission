'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { TruckIcon, CheckCircleIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import ResponsiveContainer from '@/components/ui/ResponsiveContainer';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

// Define types for order and items
export type OrderItem = {
  productId: string;
  name: string;
  image: string;
  category: string;
  price: number;
  quantity: number;
};

export type OrderType = {
  id: string;
  status: string;
  orderDate?: string;
  shippedDate?: string;
  deliveredDate?: string;
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  shippingMethod: string;
  trackingNumber?: string;
  paymentMethod: string;
  items: OrderItem[];
};

interface OrderPageProps {
  params: {
    id: string;
  };
}

export default function OrderPage({ params }: OrderPageProps) {
  const router = useRouter();
  const [order, setOrder] = useState<OrderType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundOrder = orders.find((o: { id: string; }) => o.id === params.id) as OrderType | undefined;
    setOrder(foundOrder || null);
    setLoading(false);
  }, [params.id]);

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'N/A';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'processing':
        return 'text-yellow-700 bg-yellow-100';
      case 'shipped':
        return 'text-blue-700 bg-blue-100';
      case 'delivered':
        return 'text-green-700 bg-green-100';
      default:
        return 'text-gray-700 bg-gray-100';
    }
  };

  const calculateTotal = (items: OrderItem[]) => {
    if (!items) return 0;
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 sm:px-0 flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!order) {
    return (
      <DashboardLayout>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 sm:px-0">
            <div className="flex items-center mb-6">
              <button 
                onClick={() => router.back()}
                className="flex items-center text-sm text-gray-500 hover:text-gray-700"
                type="button"
              >
                <ArrowLeftIcon className="h-4 w-4 mr-1" />
                Back to Orders
              </button>
            </div>
            <div className="bg-white shadow rounded-lg p-6 text-center">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Order Not Found</h2>
              <p className="text-gray-600 mb-6">We couldn't find the order you're looking for.</p>
              <Link
                href="/orders"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Back to Orders
              </Link>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <ResponsiveContainer>
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="flex items-center text-sm text-gray-500 hover:text-gray-700"
            type="button"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-1" />
            Back to Orders
          </Button>
        </div>
        <Card className="overflow-hidden">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Order #{order.id}
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Placed on {formatDate(order.orderDate)}
              </p>
            </div>
            <div>
              <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                {order.status}
              </span>
            </div>
          </div>
          {/* Order Timeline */}
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <h4 className="text-md font-medium text-gray-900 mb-4">Order Status</h4>
            <div className="flex items-center">
              <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${['processing', 'shipped', 'delivered'].includes(order.status.toLowerCase()) ? 'bg-green-100' : 'bg-gray-100'}`}>
                <CheckCircleIcon className={`h-5 w-5 ${['processing', 'shipped', 'delivered'].includes(order.status.toLowerCase()) ? 'text-green-500' : 'text-gray-400'}`} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">Order Placed</p>
                <p className="text-sm text-gray-500">{formatDate(order.orderDate)}</p>
              </div>
            </div>
            <div className="ml-4 mt-2 border-l-2 border-gray-200 h-12"></div>
            <div className="flex items-center">
              <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${['shipped', 'delivered'].includes(order.status.toLowerCase()) ? 'bg-green-100' : 'bg-gray-100'}`}>
                <TruckIcon className={`h-5 w-5 ${['shipped', 'delivered'].includes(order.status.toLowerCase()) ? 'text-green-500' : 'text-gray-400'}`} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">Order Shipped</p>
                <p className="text-sm text-gray-500">{order.shippedDate ? formatDate(order.shippedDate) : 'Pending'}</p>
              </div>
            </div>
            <div className="ml-4 mt-2 border-l-2 border-gray-200 h-12"></div>
            <div className="flex items-center">
              <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${order.status.toLowerCase() === 'delivered' ? 'bg-green-100' : 'bg-gray-100'}`}>
                <CheckCircleIcon className={`h-5 w-5 ${order.status.toLowerCase() === 'delivered' ? 'text-green-500' : 'text-gray-400'}`} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">Order Delivered</p>
                <p className="text-sm text-gray-500">{order.deliveredDate ? formatDate(order.deliveredDate) : 'Pending'}</p>
              </div>
            </div>
          </div>
          {/* Shipping Information */}
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <h4 className="text-md font-medium text-gray-900 mb-4">Shipping Information</h4>
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2">
              <div>
                <h5 className="text-sm font-medium text-gray-500">Shipping Address</h5>
                <p className="mt-1 text-sm text-gray-900">{order.shippingAddress.name}</p>
                <p className="text-sm text-gray-900">{order.shippingAddress.street}</p>
                <p className="text-sm text-gray-900">
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
                </p>
                <p className="text-sm text-gray-900">{order.shippingAddress.country}</p>
              </div>
              <div>
                <h5 className="text-sm font-medium text-gray-500">Shipping Method</h5>
                <p className="mt-1 text-sm text-gray-900">{order.shippingMethod}</p>
                {order.trackingNumber && (
                  <div className="mt-4">
                    <h5 className="text-sm font-medium text-gray-500">Tracking Number</h5>
                    <p className="mt-1 text-sm text-primary-600">{order.trackingNumber}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Payment Information */}
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <h4 className="text-md font-medium text-gray-900 mb-4">Payment Information</h4>
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2">
              <div>
                <h5 className="text-sm font-medium text-gray-500">Payment Method</h5>
                <p className="mt-1 text-sm text-gray-900">{order.paymentMethod}</p>
              </div>
              <div>
                <h5 className="text-sm font-medium text-gray-500">Billing Address</h5>
                <p className="mt-1 text-sm text-gray-900">{order.shippingAddress.name}</p>
                <p className="text-sm text-gray-900">{order.shippingAddress.street}</p>
                <p className="text-sm text-gray-900">
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
                </p>
                <p className="text-sm text-gray-900">{order.shippingAddress.country}</p>
              </div>
            </div>
          </div>
          {/* Order Items */}
          <div className="border-t border-gray-200">
            <h4 className="sr-only">Items</h4>
            <div className="border-b border-gray-200">
              <div className="px-4 py-5 sm:px-6">
                <h4 className="text-md font-medium text-gray-900 mb-4">Order Items</h4>
                <ul className="divide-y divide-gray-200">
                  {order.items.map((item) => (
                    <li key={item.productId} className="py-4 flex">
                      <div className="flex-shrink-0 w-16 h-16 border border-gray-200 rounded-md overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-center object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                      <div className="ml-4 flex-1 flex flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h5>{item.name}</h5>
                            <p className="ml-4">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.price)}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                        </div>
                        <div className="flex-1 flex items-end justify-between text-sm">
                          <p className="text-gray-500">Qty {item.quantity}</p>
                          <p className="text-gray-500">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.price * item.quantity)}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          {/* Order Summary */}
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <div className="flex justify-between text-sm mb-2">
              <p className="text-gray-500">Subtotal</p>
              <p className="text-gray-900">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(calculateTotal(order.items))}</p>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <p className="text-gray-500">Shipping</p>
              <p className="text-gray-900">Free</p>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <p className="text-gray-500">Tax</p>
              <p className="text-gray-900">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(calculateTotal(order.items) * 0.1)}</p>
            </div>
            <div className="flex justify-between text-base font-medium mt-4 pt-4 border-t border-gray-200">
              <p className="text-gray-900">Total</p>
              <p className="text-gray-900">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(calculateTotal(order.items) * 1.1)}</p>
            </div>
          </div>
          {/* Actions */}
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <div className="flex justify-between">
              <Link
                href="/orders"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Back to Orders
              </Link>
              {order.status.toLowerCase() === 'delivered' && (
                <Button
                  variant="outline"
                  size="sm"
                >
                  Return Items
                </Button>
              )}
            </div>
          </div>
        </Card>
      </ResponsiveContainer>
    </DashboardLayout>
  );
}