import Link from 'next/link';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { monthlySales, categorySales, topProducts } from '@/data/analytics';
import ResponsiveContainer from '@/components/ui/ResponsiveContainer';
import ResponsiveGrid from '@/components/ui/ResponsiveGrid';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function Home() {
  return (
    <DashboardLayout>
      <ResponsiveContainer className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex space-x-2">
            <Link
              href="/products"
              className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              View Products
            </Link>
          </div>
        </div>

        {/* Stats Overview */}
        <ResponsiveGrid cols={{ sm: 1, md: 2, lg: 4 }} gap="medium">
          <Card>
            <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
            <p className="text-2xl font-bold">$328,500</p>
            <p className="text-sm text-green-600">+12% from last month</p>
          </Card>
          <Card>
            <h3 className="text-sm font-medium text-gray-500">Orders</h3>
            <p className="text-2xl font-bold">3,280</p>
            <p className="text-sm text-green-600">+8% from last month</p>
          </Card>
          <Card>
            <h3 className="text-sm font-medium text-gray-500">Customers</h3>
            <p className="text-2xl font-bold">1,845</p>
            <p className="text-sm text-green-600">+5% from last month</p>
          </Card>
          <Card>
            <h3 className="text-sm font-medium text-gray-500">Conversion Rate</h3>
            <p className="text-2xl font-bold">3.2%</p>
            <p className="text-sm text-red-600">-0.4% from last month</p>
          </Card>
        </ResponsiveGrid>

        {/* Recent Orders */}
        <Card>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <h2 className="text-lg font-medium">Recent Orders</h2>
            <Button variant="ghost" size="sm" as={Link} href="/orders">
              View all
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                    Date
                  </th>
                  <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#ORD-001</td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">John Smith</td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">2023-12-01</td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">$299.99</td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Delivered
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#ORD-002</td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">Jane Doe</td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">2023-12-02</td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">$149.99</td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      Processing
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#ORD-003</td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">Robert Johnson</td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">2023-12-03</td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">$89.99</td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      Shipped
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>

        {/* Top Products */}
        <Card>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <h2 className="text-lg font-medium">Top Products</h2>
            <Button variant="ghost" size="sm" as={Link} href="/products">
              View all
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sales
                  </th>
                  <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                    Revenue
                  </th>
                  <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                    Views
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {topProducts.map((product) => (
                  <tr key={product.id}>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.sales}</td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">${product.revenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">{product.views.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </ResponsiveContainer>
    </DashboardLayout>
  );
}