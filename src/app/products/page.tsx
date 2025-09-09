'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { products, categories, Product } from '@/data/products';
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';
import ProductCard from '@/components/products/ProductCard';
import ResponsiveContainer from '@/components/ui/ResponsiveContainer';
import ResponsiveGrid from '@/components/ui/ResponsiveGrid';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    let result = [...products];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      result = result.filter((product) => product.category === selectedCategory);
    }

    // Sort products
    result.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    setFilteredProducts(result);
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <DashboardLayout>
      <ResponsiveContainer className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold">Products</h1>
          <div className="flex space-x-2">
            <Button variant="primary">
              Add Product
            </Button>
          </div>
        </div>

        {/* Search and Filter */}
        <Card className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="text"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pl-10"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Button
                  variant="secondary"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  leftIcon={<FunnelIcon className="h-5 w-5" />}
                >
                  Filter
                </Button>
                {isFilterOpen && (
                  <Card className="absolute right-0 mt-2 w-60 z-10 shadow-lg">
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                          Category
                        </label>
                        <select
                          id="category"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          value={selectedCategory}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                          {categories.map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="sort" className="block text-sm font-medium text-gray-700">
                          Sort By
                        </label>
                        <select
                          id="sort"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value)}
                        >
                          <option value="name">Name (A-Z)</option>
                          <option value="price-low">Price (Low to High)</option>
                          <option value="price-high">Price (High to Low)</option>
                          <option value="rating">Rating</option>
                        </select>
                      </div>
                    </div>
                  </Card>
                )}
              </div>
              <select
                className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 max-w-xs"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Sort by: Name</option>
                <option value="price-low">Sort by: Price (Low to High)</option>
                <option value="price-high">Sort by: Price (High to Low)</option>
                <option value="rating">Sort by: Rating</option>
              </select>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 mt-4">
            <Button 
              variant={selectedCategory === 'All' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory('All')}
            >
              All
            </Button>
            {categories.filter(c => c !== 'All').map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </Card>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <ResponsiveGrid
            cols={{ sm: 1, md: 2, lg: 3, xl: 4 }}
            gap="medium"
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ResponsiveGrid>
        ) : (
          <Card className="py-10 text-center">
            <p className="text-gray-500">No products found matching your criteria.</p>
          </Card>
        )}
      </ResponsiveContainer>
    </DashboardLayout>
  );
}