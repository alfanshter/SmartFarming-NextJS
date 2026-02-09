"use client";

import React, { useState } from "react";
import DeviceStatCards from "./_components/DeviceStatCards";
import DeviceList from "./_components/DeviceList";
import AddDeviceModal from "./_components/AddDeviceModal";
import DeleteConfirmModal from "./_components/DeleteConfirmModal";
import type { Device } from "./_components/types";
import { useDevices } from "@/shared/hooks/useDevices";
import type { Device as APIDevice } from "@/core/domain/entities/Device";

// Re-export for backward compatibility
export type { Device };

export default function DevicesPage() {
  // Use API hook
  const {
    devices: apiDevices,
    isLoading,
    error,
    createDevice: createDeviceAPI,
    deleteDevice: deleteDeviceAPI,
    refreshDevices,
  } = useDevices();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    deviceId: string;
    deviceName: string;
  }>({
    isOpen: false,
    deviceId: "",
    deviceName: "",
  });

  // Transform API devices to local format for display
  const devices: Device[] = apiDevices.map((device: APIDevice) => ({
    id: device.id,
    name: device.name,
    deviceId: device.mqttTopic.split("/")[1] || device.mqttTopic, // Extract device1 from Smartfarming/device1/command
    ipAddress: "N/A", // Backend doesn't provide this
    uptime: device.status === "ONLINE" ? "Active" : "-",
    lastActive: device.lastSeen
      ? new Date(device.lastSeen).toLocaleString("id-ID")
      : "Unknown",
    status: device.status === "ONLINE" ? "online" : "offline",
  }));

  // Hitung statistik
  const totalDevices = devices.length;
  const onlineDevices = devices.filter((d) => d.status === "online").length;
  const offlineDevices = devices.filter((d) => d.status === "offline").length;

  // Hitung uptime rata-rata
  const calculateAverageUptime = () => {
    const onlineDevicesWithUptime = devices.filter(
      (d) => d.status === "online" && d.uptime !== "-",
    );

    if (onlineDevicesWithUptime.length === 0) return "0 hari";

    let totalDays = 0;
    onlineDevicesWithUptime.forEach((device) => {
      const match = device.uptime.match(/(\d+)\s*hari/);
      if (match) {
        totalDays += parseInt(match[1]);
      }
    });

    const avgDays = (totalDays / onlineDevicesWithUptime.length).toFixed(1);
    return `${avgDays} hari`;
  };

  const handleAddDevice = async (formData: {
    name: string;
    type: "CONTROLLER" | "SENSOR" | "ACTUATOR";
    mqttTopic: string;
  }) => {
    try {
      await createDeviceAPI(formData);
      setIsAddModalOpen(false);
      console.log("Device created successfully!");
    } catch (err) {
      console.error("Failed to create device:", err);
      alert(err instanceof Error ? err.message : "Failed to create device");
    }
  };

  const handleDeleteDevice = (id: string) => {
    const device = devices.find((d) => d.id === id);
    if (device) {
      setDeleteModal({
        isOpen: true,
        deviceId: id,
        deviceName: device.name,
      });
    }
  };

  const confirmDelete = async () => {
    try {
      await deleteDeviceAPI(deleteModal.deviceId);
      setDeleteModal({ isOpen: false, deviceId: "", deviceName: "" });
      console.log("Device deleted successfully!");
    } catch (err) {
      console.error("Failed to delete device:", err);
      alert(err instanceof Error ? err.message : "Failed to delete device");
    }
  };

  return (
    <div className="min-h-screen bg-green-50 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Device Management</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          disabled={isLoading}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Tambah Device
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-md animate-slideUp">
          <div className="flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
              />
            </svg>
            <div>
              <p className="font-semibold">Error loading devices</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {isLoading && devices.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-green-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-green-600 rounded-full border-t-transparent animate-spin"></div>
          </div>
          <p className="text-gray-600 font-medium">Loading devices...</p>
        </div>
      )}

      {/* Content */}
      {(!isLoading || devices.length > 0) && (
        <>
          {/* Statistik Cards */}
          <DeviceStatCards
            totalDevices={totalDevices}
            onlineDevices={onlineDevices}
            offlineDevices={offlineDevices}
            averageUptime={calculateAverageUptime()}
          />

          {/* Daftar Devices */}
          <DeviceList devices={devices} onDeleteDevice={handleDeleteDevice} />
        </>
      )}

      {/* Modal Tambah Device */}
      <AddDeviceModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddDevice={handleAddDevice}
      />

      {/* Modal Konfirmasi Hapus */}
      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() =>
          setDeleteModal({ isOpen: false, deviceId: "", deviceName: "" })
        }
        onConfirm={confirmDelete}
        deviceName={deleteModal.deviceName}
      />
    </div>
  );
}
