"use client";

import React from "react";
import type { Device } from "./types";

interface DeviceListProps {
  devices: Device[];
  onDeleteDevice: (id: string) => void;
}

export default function DeviceList({
  devices,
  onDeleteDevice,
}: DeviceListProps) {
  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Daftar Devices</h2>
        <p className="text-gray-600">
          <span className="font-semibold">{devices.length}</span> device
          terdaftar
        </p>
      </div>

      {/* Device Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {devices.map((device) => (
          <div
            key={device.id}
            className={`rounded-2xl shadow-md p-6 border-2 transition-all hover:shadow-lg ${
              device.status === "online"
                ? "bg-gradient-to-br from-green-50 to-white border-green-200"
                : "bg-gradient-to-br from-gray-50 to-white border-gray-200"
            }`}
          >
            {/* Header dengan Icon dan Status Badge */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <div
                  className={`p-3 rounded-xl ${
                    device.status === "online"
                      ? "bg-green-500"
                      : "bg-gray-400"
                  }`}
                >
                  {device.status === "online" ? (
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
                  ) : (
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
                        d="M3 3l8.735 8.735m0 0a.374.374 0 1 1 .53.53m-.53-.53.53.53m0 0L21 21"
                      />
                    </svg>
                  )}
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  device.status === "online"
                    ? "bg-green-200 text-green-800"
                    : "bg-red-200 text-red-800"
                }`}
              >
                {device.status === "online" ? "Online" : "Offline"}
              </span>
            </div>

            {/* Device Info */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-1">
                {device.name}
              </h3>
              <p className="text-sm text-gray-600">{device.deviceId}</p>
            </div>

            {/* Device Details */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">IP Address:</span>
                <span className="text-sm font-mono font-semibold text-gray-800">
                  {device.ipAddress}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Uptime:</span>
                <span className="text-sm font-semibold text-gray-800">
                  {device.uptime}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Terakhir aktif:</span>
                <span
                  className={`text-sm font-semibold ${
                    device.status === "online"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {device.lastActive}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button className="flex-1 bg-green-100 hover:bg-green-200 text-green-700 font-semibold py-2 px-4 rounded-lg transition-colors">
                Detail
              </button>
              <button
                onClick={() => onDeleteDevice(device.id)}
                className="bg-red-50 hover:bg-red-100 text-red-600 p-2 rounded-lg transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
