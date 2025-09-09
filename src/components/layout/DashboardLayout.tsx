'use client';

import { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="md:pl-64 flex flex-col flex-1">
        <Navbar />
        <main className="flex-1 p-4 sm:p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}