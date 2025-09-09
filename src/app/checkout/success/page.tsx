'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import ResponsiveContainer from '@/components/ui/ResponsiveContainer';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function CheckoutSuccessPage() {
  const router = useRouter();
  
  // Generate a random order number
  const orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);
  
  // Format the estimated delivery date
  const formattedDeliveryDate = estimatedDelivery.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <DashboardLayout>
      <ResponsiveContainer className="py-16">
        <Card className="max-w-3xl mx-auto p-8 text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
            <CheckCircleIcon className="h-10 w-10 text-green-600" aria-hidden="true" />
          </div>
          
          <h1 className="mt-6 text-3xl font-extrabold text-gray-900">Thank you for your order!</h1>
          
          <p className="mt-2 text-lg text-gray-600">
            Your order has been successfully placed and is being processed.
          </p>
          
          <div className="mt-8 border-t border-b border-gray-200 py-6">
            <dl className="divide-y divide-gray-200">
              <div className="py-4 flex justify-between">
                <dt className="text-sm font-medium text-gray-500">Order number</dt>
                <dd className="text-sm font-medium text-gray-900">{orderNumber}</dd>
              </div>
              
              <div className="py-4 flex justify-between">
                <dt className="text-sm font-medium text-gray-500">Status</dt>
                <dd className="text-sm font-medium text-green-600">Processing</dd>
              </div>
              
              <div className="py-4 flex justify-between">
                <dt className="text-sm font-medium text-gray-500">Estimated delivery</dt>
                <dd className="text-sm font-medium text-gray-900">{formattedDeliveryDate}</dd>
              </div>
            </dl>
          </div>
          
          <div className="mt-8 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button
              variant="primary"
              as={Link}
              href="/orders"
            >
              View Order
            </Button>
            
            <Button
              variant="outline"
              as={Link}
              href="/products"
            >
              Continue Shopping
            </Button>
          </div>
        </Card>
      </ResponsiveContainer>
    </DashboardLayout>
  );
}