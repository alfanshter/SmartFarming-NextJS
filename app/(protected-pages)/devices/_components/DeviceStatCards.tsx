"use client";

import React from "react";

interface DeviceStatCardsProps {
  totalDevices: number;
  onlineDevices: number;
  offlineDevices: number;
  averageUptime: string;
}

export default function DeviceStatCards({
  totalDevices,
  onlineDevices,
  offlineDevices,
  averageUptime,
}: DeviceStatCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* Total Devices Card */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-gray-600 text-sm font-medium mb-1">
              Total Devices
            </p>
            <p className="text-4xl font-bold text-gray-800">{totalDevices}</p>
          </div>
          <div className="bg-gray-100 p-3 rounded-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-gray-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Online Card */}
      <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-sm p-6 border border-green-200">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-green-700 text-sm font-medium mb-1">Online</p>
            <p className="text-4xl font-bold text-green-800">{onlineDevices}</p>
          </div>
          <div className="bg-green-500 p-3 rounded-xl shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z"
              />
            </svg>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-green-700 text-sm font-medium">
            Aktif terhubung
          </span>
        </div>
      </div>

      {/* Offline Card */}
      <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl shadow-sm p-6 border border-red-200">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-red-700 text-sm font-medium mb-1">Offline</p>
            <p className="text-4xl font-bold text-red-800">{offlineDevices}</p>
          </div>
          <div className="bg-red-500 p-3 rounded-xl shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3l8.735 8.735m0 0a.374.374 0 1 1 .53.53m-.53-.53.53.53m0 0L21 21M14.652 9.348a9.75 9.75 0 0 1 4.124 5.528m-6.276-1.776A3.75 3.75 0 0 1 15.75 15m-7.5 0a3.75 3.75 0 0 1 3.75-3.75M3.824 15.176a9.75 9.75 0 0 1 2.926-3.828"
              />
            </svg>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-red-700 text-sm font-medium">
            Perlu perhatian
          </span>
        </div>
      </div>

      {/* Uptime Rata-rata Card */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-sm p-6 border border-blue-200">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-blue-700 text-sm font-medium mb-1">
              Uptime Rata-rata
            </p>
            <p className="text-4xl font-bold text-blue-800">{averageUptime}</p>
          </div>
          <div className="bg-blue-500 p-3 rounded-xl shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
