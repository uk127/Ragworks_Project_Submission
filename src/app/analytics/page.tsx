'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { monthlySales, categorySales, topProducts } from '@/data/analytics';
import SalesChart from '@/components/analytics/SalesChart';
import CategoryChart from '@/components/analytics/CategoryChart';
import ProductPerformanceTable from '@/components/analytics/ProductPerformanceTable';
import ResponsiveContainer from '@/components/ui/ResponsiveContainer';
import ResponsiveGrid from '@/components/ui/ResponsiveGrid';
import Card from '@/components/ui/Card';

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('year');
  
  // Calculate total sales
  const totalSales = monthlySales.reduce((sum, month) => sum + month.revenue, 0);
  
  // Calculate average order value
  const totalOrders = monthlySales.reduce((sum, month) => sum + month.orders, 0);
  const averageOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;
  
  // Calculate year-over-year growth (mock data)
  const yoyGrowth = 24.5;
  
  // Calculate conversion rate (mock data)
  const conversionRate = 3.2;

  return (
    <DashboardLayout>
      <ResponsiveContainer className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Analytics Dashboard</h1>
          <p className="mt-2 text-sm text-gray-700">
            Monitor your store's performance with key metrics and insights.
          </p>
        </div>

        {/* Time range selector */}
        <Card>
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h2 className="text-xl font-semibold text-gray-900">Sales Overview</h2>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
              <select
                id="timeRange"
                name="timeRange"
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
              >
                <option value="month">Last 30 Days</option>
                <option value="quarter">Last Quarter</option>
                <option value="year">Last Year</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Stats cards */}
        <ResponsiveGrid cols={{ sm: 1, md: 2, lg: 4 }} gap="medium">
          {/* Total Sales */}
          <Card>
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-primary-100 rounded-md p-3">
                <svg className="h-6 w-6 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Sales</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalSales)}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </Card>

          {/* Average Order Value */}
          <Card>
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3">
                <svg className="h-6 w-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Average Order Value</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(averageOrderValue)}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </Card>

          {/* YoY Growth */}
          <Card>
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Year over Year Growth</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      {yoyGrowth}%
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </Card>

          {/* Conversion Rate */}
          <Card>
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-yellow-100 rounded-md p-3">
                <svg className="h-6 w-6 text-yellow-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Conversion Rate</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      {conversionRate}%
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </Card>
        </ResponsiveGrid>

        {/* Charts */}
        <ResponsiveGrid cols={{ sm: 1, lg: 2 }} gap="medium">
          {/* Sales Chart */}
          <Card>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue & Orders</h3>
            <div className="h-80">
              <SalesChart data={monthlySales} timeRange={timeRange} />
            </div>
          </Card>

          {/* Category Chart */}
          <Card>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Sales by Category</h3>
            <div className="h-80">
              <CategoryChart data={categorySales} />
            </div>
          </Card>
        </ResponsiveGrid>

        {/* Product Performance Table */}
        <Card>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Top Performing Products</h3>
          <ProductPerformanceTable products={topProducts} />
        </Card>
      </ResponsiveContainer>
    </DashboardLayout>
  );
}