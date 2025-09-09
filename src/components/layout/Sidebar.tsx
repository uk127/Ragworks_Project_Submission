'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HomeIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  ClipboardDocumentListIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';

interface SidebarItemProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  isCollapsed: boolean;
}

function SidebarItem({ href, icon, title, isCollapsed }: SidebarItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center p-2 rounded-lg ${isActive
        ? 'bg-primary-100 text-primary-700'
        : 'text-gray-600 hover:bg-gray-100'}`}
    >
      <div className="flex items-center">
        <div className="w-6 h-6">{icon}</div>
        {!isCollapsed && <span className="ml-3">{title}</span>}
      </div>
    </Link>
  );
}

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={`bg-white h-screen shadow-md transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'} fixed left-0 top-0 z-40`}
    >
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
        {!isCollapsed && (
          <Link href="/" className="text-xl font-bold text-primary-600">
            E-Shop
          </Link>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          {isCollapsed ? (
            <ChevronRightIcon className="h-5 w-5" />
          ) : (
            <ChevronLeftIcon className="h-5 w-5" />
          )}
        </button>
      </div>

      <div className="p-4 space-y-2">
        <SidebarItem
          href="/"
          icon={<HomeIcon />}
          title="Dashboard"
          isCollapsed={isCollapsed}
        />
        <SidebarItem
          href="/products"
          icon={<ShoppingBagIcon />}
          title="Products"
          isCollapsed={isCollapsed}
        />
        <SidebarItem
          href="/cart"
          icon={<ShoppingCartIcon />}
          title="Cart"
          isCollapsed={isCollapsed}
        />
        <SidebarItem
          href="/orders"
          icon={<ClipboardDocumentListIcon />}
          title="Orders"
          isCollapsed={isCollapsed}
        />
        <SidebarItem
          href="/analytics"
          icon={<ChartBarIcon />}
          title="Analytics"
          isCollapsed={isCollapsed}
        />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
        <SidebarItem
          href="/settings"
          icon={<Cog6ToothIcon />}
          title="Settings"
          isCollapsed={isCollapsed}
        />
        <button
          className={`flex items-center p-2 rounded-lg text-gray-600 hover:bg-gray-100 w-full mt-2`}
        >
          <div className="flex items-center">
            <div className="w-6 h-6">
              <ArrowLeftOnRectangleIcon />
            </div>
            {!isCollapsed && <span className="ml-3">Logout</span>}
          </div>
        </button>
      </div>
    </aside>
  );
}