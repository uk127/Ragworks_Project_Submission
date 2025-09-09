'use client';

import { useState } from 'react';
import { StarIcon, ShoppingCartIcon } from '@heroicons/react/24/solid';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const { addItem } = useCart();

  const placeholderImage = 'https://placehold.co/300x300/e2e8f0/64748b?text=Product+Image';

  const handleAddToCart = () => {
    setIsAdding(true);
    addItem(product, 1);

    // Show feedback
    setTimeout(() => {
      setIsAdding(false);
    }, 500);
  };

  return (
    <Card
      className="h-full transition-shadow hover:shadow-md"
      padding="none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src={placeholderImage}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 ease-in-out"
            style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
          />
        </div>
        {product.stock < 10 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            Low Stock
          </div>
        )}
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-medium text-gray-900 line-clamp-2">{product.name}</h3>
          <div className="flex items-center">
            <StarIcon className="h-4 w-4 text-yellow-400" />
            <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
          </div>
        </div>
        <p className="mt-1 text-sm text-gray-500 line-clamp-2">{product.description}</p>
        <div className="mt-2">
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {product.category}
          </span>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
          <Button
            variant={isAdding ? 'success' : 'primary'}
            size="sm"
            onClick={handleAddToCart}
            disabled={isAdding}
            leftIcon={<ShoppingCartIcon className="h-4 w-4" />}
          >
            {isAdding ? 'Added!' : 'Add to Cart'}
          </Button>
        </div>
      </div>
    </Card>
  );
}