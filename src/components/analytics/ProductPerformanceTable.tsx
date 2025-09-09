'use client';

import { useState } from 'react';
import { ProductPerformance } from '@/data/analytics';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';
import Card from '@/components/ui/Card';

interface ProductPerformanceTableProps {
  products: ProductPerformance[];
}

export default function ProductPerformanceTable({ products }: ProductPerformanceTableProps) {
  const [sortField, setSortField] = useState<keyof ProductPerformance>('revenue');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const handleSort = (field: keyof ProductPerformance) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (sortField === 'name') {
      return sortDirection === 'asc' 
        ? a[sortField].localeCompare(b[sortField])
        : b[sortField].localeCompare(a[sortField]);
    } else {
      return sortDirection === 'asc' 
        ? (a[sortField] as number) - (b[sortField] as number)
        : (b[sortField] as number) - (a[sortField] as number);
    }
  });

  const getSortIcon = (field: keyof ProductPerformance) => {
    if (field !== sortField) return null;
    
    return sortDirection === 'asc' 
      ? <ArrowUpIcon className="h-4 w-4 text-gray-500" />
      : <ArrowDownIcon className="h-4 w-4 text-gray-500" />;
  };

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort('name')}
            >
              <div className="flex items-center">
                <span>Product</span>
                <span className="ml-1">{getSortIcon('name')}</span>
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort('revenue')}
            >
              <div className="flex items-center">
                <span>Revenue</span>
                <span className="ml-1">{getSortIcon('revenue')}</span>
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort('units')}
            >
              <div className="flex items-center">
                <span>Units Sold</span>
                <span className="ml-1">{getSortIcon('units')}</span>
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort('conversionRate')}
            >
              <div className="flex items-center">
                <span>Conversion Rate</span>
                <span className="ml-1">{getSortIcon('conversionRate')}</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedProducts.map((product) => (
            <tr key={product.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <img className="h-10 w-10 rounded-full object-cover" src={product.image} alt={product.name} />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                    <div className="text-sm text-gray-500">{product.category}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.revenue)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{product.units?.toLocaleString() || '0'}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{product.conversionRate}%</div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                  <div 
                    className="bg-primary-600 h-1.5 rounded-full" 
                    style={{ width: `${Math.min(product.conversionRate * 5, 100)}%` }}
                  ></div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
        </table>
      </div>
    </Card>
  );
}