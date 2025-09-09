'use client';

import { useState } from 'react';
import Link from 'next/link';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useCart } from '@/context/CartContext';
import { TrashIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/outline';
import ResponsiveContainer from '@/components/ui/ResponsiveContainer';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, total } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleRemoveItem = (productId: string) => {
    removeItem(productId);
  };

  const handleClearCart = () => {
    clearCart();
  };

  const handleCheckout = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = '/checkout';
    }, 1000);
  };

  const placeholderImage = 'https://placehold.co/300x300/e2e8f0/64748b?text=Product+Image';

  return (
    <DashboardLayout>
      <ResponsiveContainer className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Shopping Cart</h1>
          {items.length > 0 && (
            <Button
              variant="danger"
              size="sm"
              onClick={handleClearCart}
            >
              Clear Cart
            </Button>
          )}
        </div>

        {items.length === 0 ? (
          <Card className="py-12 text-center">
            <div className="text-gray-500 mb-4">Your cart is empty</div>
            <Link href="/products" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
              Browse Products
            </Link>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card padding="none">
                <div className="divide-y divide-gray-200">
                  {items.map((item) => (
                    <div key={item.product.id} className="p-4 flex flex-col sm:flex-row gap-4">
                      <div className="relative h-24 w-24 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                        <img
                          src={placeholderImage}
                          alt={item.product.name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex-grow">
                        <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                          <h3 className="text-lg font-medium text-gray-900">{item.product.name}</h3>
                          <p className="text-lg font-bold">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{item.product.category}</p>
                        <div className="mt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                          <div className="flex items-center border border-gray-300 rounded-md">
                            <button
                              onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                              className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                              disabled={item.quantity <= 1}
                            >
                              <MinusIcon className="h-4 w-4" />
                            </button>
                            <span className="px-4 py-1 text-gray-800">{item.quantity}</span>
                            <button
                              onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                              className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                            >
                              <PlusIcon className="h-4 w-4" />
                            </button>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveItem(item.product.id)}
                            className="text-red-600 hover:text-red-800"
                            leftIcon={<TrashIcon className="h-5 w-5" />}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-20">
                <h2 className="text-lg font-medium mb-4">Order Summary</h2>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">$0.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">${(total * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="flex justify-between">
                      <span className="font-medium">Total</span>
                      <span className="font-bold">${(total + total * 0.1).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="primary"
                  fullWidth
                  className="mt-6"
                  onClick={handleCheckout}
                  isLoading={isLoading}
                >
                  {isLoading ? 'Processing...' : 'Proceed to Checkout'}
                </Button>
                <div className="text-center mt-4">
                  <Link href="/products" passHref>
                    <Button variant="ghost" size="sm">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        )}
      </ResponsiveContainer>
    </DashboardLayout>
  );
}