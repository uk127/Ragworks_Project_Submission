'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useCart } from '@/context/CartContext';
import ResponsiveContainer from '@/components/ui/ResponsiveContainer';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.postalCode.trim()) newErrors.postalCode = 'Postal code is required';
    if (!formData.country.trim()) newErrors.country = 'Country is required';
    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = 'Card number is required';
    } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Card number must be 16 digits';
    }
    if (!formData.cardExpiry.trim()) {
      newErrors.cardExpiry = 'Expiry date is required';
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.cardExpiry)) {
      newErrors.cardExpiry = 'Expiry date must be in MM/YY format';
    }
    if (!formData.cardCvc.trim()) {
      newErrors.cardCvc = 'CVC is required';
    } else if (!/^\d{3,4}$/.test(formData.cardCvc)) {
      newErrors.cardCvc = 'CVC must be 3 or 4 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Process successful order
      clearCart();
      router.push('/checkout/success');
    } catch (error) {
      console.error('Checkout error:', error);
      setErrors({ form: 'An error occurred during checkout. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <DashboardLayout>
        <ResponsiveContainer className="py-8">
          <Card className="text-center max-w-md mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some products to your cart before proceeding to checkout.</p>
            <Button
              variant="primary"
              onClick={() => router.push('/products')}
            >
              Browse Products
            </Button>
          </Card>
        </ResponsiveContainer>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <ResponsiveContainer className="py-6">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          {/* Checkout Form */}
          <div className="md:col-span-2">
            <Card>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Checkout</h2>
              
              {errors.form && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-red-600">{errors.form}</p>
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-700 mb-4">Shipping Information</h3>
                  <div className="grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className={`mt-1 block w-full border ${errors.fullName ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500`}
                      />
                      {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
                    </div>
                    
                    <div className="sm:col-span-2">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`mt-1 block w-full border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500`}
                      />
                      {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                    </div>
                    
                    <div className="sm:col-span-2">
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                        Street Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className={`mt-1 block w-full border ${errors.address ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500`}
                      />
                      {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className={`mt-1 block w-full border ${errors.city ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500`}
                      />
                      {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        className={`mt-1 block w-full border ${errors.postalCode ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500`}
                      />
                      {errors.postalCode && <p className="mt-1 text-sm text-red-600">{errors.postalCode}</p>}
                    </div>
                    
                    <div className="sm:col-span-2">
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                        Country
                      </label>
                      <input
                        type="text"
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className={`mt-1 block w-full border ${errors.country ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500`}
                      />
                      {errors.country && <p className="mt-1 text-sm text-red-600">{errors.country}</p>}
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-700 mb-4">Payment Information</h3>
                  <div className="grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-3">
                    <div className="sm:col-span-3">
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                        Card Number
                      </label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        className={`mt-1 block w-full border ${errors.cardNumber ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500`}
                      />
                      {errors.cardNumber && <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        id="cardExpiry"
                        name="cardExpiry"
                        placeholder="MM/YY"
                        value={formData.cardExpiry}
                        onChange={handleChange}
                        className={`mt-1 block w-full border ${errors.cardExpiry ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500`}
                      />
                      {errors.cardExpiry && <p className="mt-1 text-sm text-red-600">{errors.cardExpiry}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="cardCvc" className="block text-sm font-medium text-gray-700">
                        CVC
                      </label>
                      <input
                        type="text"
                        id="cardCvc"
                        name="cardCvc"
                        placeholder="123"
                        value={formData.cardCvc}
                        onChange={handleChange}
                        className={`mt-1 block w-full border ${errors.cardCvc ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500`}
                      />
                      {errors.cardCvc && <p className="mt-1 text-sm text-red-600">{errors.cardCvc}</p>}
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <Button
                    type="submit"
                    variant="primary"
                    fullWidth
                    disabled={isSubmitting}
                    loading={isSubmitting}
                  >
                    {isSubmitting ? 'Processing...' : `Pay ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalPrice)}`}
                  </Button>
                </div>
              </form>
            </Card>
          </div>
          
          {/* Order Summary */}
          <div className="mt-6 md:mt-0">
            <Card className="sticky top-6">
              <h3 className="text-lg font-medium text-gray-700 mb-4">Order Summary</h3>
              
              <div className="flow-root">
                <ul className="-my-4 divide-y divide-gray-200">
                  {items.map((item) => (
                    <li key={item.id} className="py-4 flex">
                      <div className="flex-shrink-0 w-16 h-16 border border-gray-200 rounded-md overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                      <div className="ml-4 flex-1 flex flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h4>{item.name}</h4>
                            <p className="ml-4">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.price)}</p>
                          </div>
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
              
              <div className="border-t border-gray-200 pt-4 mt-6">
                <div className="flex justify-between text-base font-medium text-gray-900 mb-2">
                  <p>Subtotal</p>
                  <p>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalPrice)}</p>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <p>Shipping</p>
                  <p>Free</p>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mb-4">
                  <p>Tax</p>
                  <p>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalPrice * 0.1)}</p>
                </div>
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Total</p>
                  <p>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalPrice * 1.1)}</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </ResponsiveContainer>
    </DashboardLayout>
  );
}