/**
 * Dashboard Layout dengan Sidebar & Topbar
 * Letakkan di: src/app/dashboard/layout.tsx
 */
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Menu Items
  const menuItems = [
    {
      title: 'Dashboard',
      icon: '📊',
      href: '/dashboard',
      badge: null,
    },
    {
      title: 'Tanaman',
      icon: '🌱',
      href: '/dashboard/crops',
      badge: '12',
    },
    {
      title: 'Irigasi',
      icon: '💧',
      href: '/dashboard/irrigation',
      badge: null,
    },
    {
      title: 'Cuaca',
      icon: '🌤️',
      href: '/dashboard/weather',
      badge: null,
    },
    {
      title: 'Sensor',
      icon: '📡',
      href: '/dashboard/sensors',
      badge: '3',
    },
    {
      title: 'Laporan',
      icon: '📈',
      href: '/dashboard/reports',
      badge: null,
    },
    {
      title: 'Pengaturan',
      icon: '⚙️',
      href: '/dashboard/settings',
      badge: null,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gradient-to-b from-green-600 to-green-700 shadow-xl">
          {/* Logo */}
          <div className="flex items-center mb-8 px-3">
            <div className="flex items-center justify-center w-10 h-10 bg-white rounded-lg mr-3">
              <span className="text-2xl">🌾</span>
            </div>
            <div>
              <h2 className="text-white font-bold text-lg">Smart Farming</h2>
              <p className="text-green-100 text-xs">Irrigation System</p>
            </div>
          </div>

          {/* Menu Items */}
          <ul className="space-y-2">
            {menuItems.map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <li key={index}>
                  <Link
                    href={item.href}
                    className={`flex items-center justify-between p-3 rounded-lg transition-all ${
                      isActive
                        ? 'bg-white text-green-700 shadow-md'
                        : 'text-white hover:bg-green-500'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{item.icon}</span>
                      <span className="font-medium">{item.title}</span>
                    </div>
                    {item.badge && (
                      <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* User Profile */}
          <div className="absolute bottom-4 left-3 right-3">
            <div className="bg-green-800 rounded-lg p-3">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3">
                  <span className="text-lg">👨‍🌾</span>
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium text-sm">Pak Tani</p>
                  <p className="text-green-200 text-xs">petani@email.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Topbar */}
        <header className="bg-white shadow-md sticky top-0 z-30">
          <div className="px-4 py-4 flex items-center justify-between">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="🔍 Cari..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 border-0 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
                <svg
                  className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-3">
              {/* Notifications */}
              <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Settings */}
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>

              {/* Logout */}
              <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors">
                🚪 Keluar
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">{children}</main>
      </div>

      {/* Sidebar Overlay (Mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}