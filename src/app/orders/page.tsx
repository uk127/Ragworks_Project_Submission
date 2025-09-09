"use client";

import { useState } from "react";
import Link from "next/link";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { orders } from "@/data/orders";
import {
  ClockIcon,
  TruckIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import ResponsiveContainer from "@/components/ui/ResponsiveContainer";
import Card from "@/components/ui/Card";

// Main OrdersPage component
export default function OrdersPage() {
  const [filter, setFilter] = useState("all");

  // Safe filter handling
  const filteredOrders = Array.isArray(orders)
    ? filter === "all"
      ? orders
      : orders.filter((order) => order.status.toLowerCase() === filter)
    : [];

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "processing":
        return <ClockIcon className="h-5 w-5 text-yellow-500" />;
      case "shipped":
        return <TruckIcon className="h-5 w-5 text-blue-500" />;
      case "delivered":
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      default:
        return <ClockIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "processing":
        return "text-yellow-700 bg-yellow-100";
      case "shipped":
        return "text-blue-700 bg-blue-100";
      case "delivered":
        return "text-green-700 bg-green-100";
      default:
        return "text-gray-700 bg-gray-100";
    }
  };

  // Format date safely
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "Date unavailable";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Date unavailable";
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <DashboardLayout>
      <ResponsiveContainer className="py-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Order History
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Check the status of recent orders, manage returns, and discover
            similar products.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="mt-6 sm:mt-8">
          <div className="hidden sm:block">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                {["all", "processing", "shipped", "delivered"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setFilter(tab)}
                    className={`${
                      filter === tab
                        ? "border-primary-500 text-primary-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                  >
                    {tab === "all"
                      ? "All Orders"
                      : tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Mobile filter dropdown */}
        <div className="sm:hidden mt-4">
          <select
            id="order-status"
            name="order-status"
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Orders</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>

        {/* Orders list */}
        <div className="mt-8">
          {filteredOrders.length === 0 ? (
            <Card className="text-center py-12">
              <p className="text-sm text-gray-500">No orders found</p>
            </Card>
          ) : (
            <Card className="overflow-hidden p-0">
              <ul className="divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <li key={order.id}>
                    <div className="block hover:bg-gray-50">
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <p className="text-sm font-medium text-primary-600 truncate">
                              Order #{order.id}
                            </p>
                            <div className="ml-2 flex-shrink-0 flex">
                              <p
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                                  order.status
                                )}`}
                              >
                                {order.status}
                              </p>
                            </div>
                          </div>
                          <div className="ml-2 flex-shrink-0 flex">
                            <p className="text-sm text-gray-500">
                              {order.date
                                ? formatDate(order.date)
                                : "Date unavailable"}
                            </p>
                          </div>
                        </div>
                        <div className="mt-2 sm:flex sm:justify-between">
                          <div className="flex items-center">
                            {getStatusIcon(order.status)}
                            <span className="ml-1">
                              {order.status.toLowerCase() === "processing"
                                ? "Preparing to ship"
                                : order.status.toLowerCase() === "shipped"
                                ? order.shippedDate
                                  ? `Shipped on ${formatDate(
                                      order.shippedDate
                                    )}`
                                  : "Shipped"
                                : order.deliveredDate
                                ? `Delivered on ${formatDate(
                                    order.deliveredDate
                                  )}`
                                : "Delivered"}
                            </span>
                          </div>
                          <div className="mt-2 sm:mt-0 sm:ml-4">
                            <Link
                              href={`/orders/${order.id}`}
                              className="font-medium text-primary-600 hover:text-primary-500"
                            >
                              View Details
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </div>
      </ResponsiveContainer>
    </DashboardLayout>
  );
}
