"use client";

import { useState, useEffect } from "react";
import { Device, CreateDeviceDTO } from "@/core/domain/entities/Device";
import { DeviceRepository } from "@/core/infrastructure/api/repositories/DeviceRepository";
import { CreateDevice } from "@/core/application/use-cases/devices/CreateDevice";
import { GetAllDevices } from "@/core/application/use-cases/devices/GetAllDevices";
import { DeleteDevice } from "@/core/application/use-cases/devices/DeleteDevice";
import { UpdateDevice } from "@/core/application/use-cases/devices/UpdateDevice";

// Lazy initialize to avoid server-side issues
let deviceRepository: DeviceRepository | null = null;
let createDeviceUseCase: CreateDevice | null = null;
let getAllDevicesUseCase: GetAllDevices | null = null;
let deleteDeviceUseCase: DeleteDevice | null = null;
let updateDeviceUseCase: UpdateDevice | null = null;

const initializeUseCases = () => {
  if (typeof window !== "undefined" && !deviceRepository) {
    deviceRepository = new DeviceRepository();
    createDeviceUseCase = new CreateDevice(deviceRepository);
    getAllDevicesUseCase = new GetAllDevices(deviceRepository);
    deleteDeviceUseCase = new DeleteDevice(deviceRepository);
    updateDeviceUseCase = new UpdateDevice(deviceRepository);
  }
};

export interface UseDevicesReturn {
  devices: Device[];
  isLoading: boolean;
  error: string | null;
  createDevice: (deviceData: CreateDeviceDTO) => Promise<void>;
  deleteDevice: (id: string) => Promise<void>;
  updateDevice: (id: string, deviceData: Partial<Device>) => Promise<void>;
  refreshDevices: () => Promise<void>;
}

export function useDevices(): UseDevicesReturn {
  const [devices, setDevices] = useState<Device[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all devices
  const fetchDevices = async () => {
    initializeUseCases(); // Initialize on first use
    
    setIsLoading(true);
    setError(null);
    try {
      console.log("🔄 Fetching devices from API...");
      
      if (!getAllDevicesUseCase) {
        throw new Error("Use cases not initialized - check if running in browser");
      }
      
      const data = await getAllDevicesUseCase.execute();
      console.log("✅ Devices fetched successfully:", data);
      setDevices(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch devices";
      setError(errorMessage);
      // Use console.warn to avoid Next.js error overlay
      console.warn("⚠️ Error fetching devices:", err);
      console.warn("Error details:", {
        message: err instanceof Error ? err.message : "Unknown error",
        stack: err instanceof Error ? err.stack : undefined,
        raw: err
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Create device
  const createDevice = async (deviceData: CreateDeviceDTO) => {
    initializeUseCases();
    
    setIsLoading(true);
    setError(null);
    try {
      if (!createDeviceUseCase) {
        throw new Error("Use cases not initialized");
      }
      
      const newDevice = await createDeviceUseCase.execute(deviceData);
      setDevices((prev) => [...prev, newDevice]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to create device";
      setError(errorMessage);
      console.warn("⚠️ Error creating device:", err);
      throw err; // Re-throw to handle in component
    } finally {
      setIsLoading(false);
    }
  };

  // Delete device
  const deleteDevice = async (id: string) => {
    initializeUseCases();
    
    setIsLoading(true);
    setError(null);
    try {
      if (!deleteDeviceUseCase) {
        throw new Error("Use cases not initialized");
      }
      
      await deleteDeviceUseCase.execute(id);
      setDevices((prev) => prev.filter((device) => device.id !== id));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to delete device";
      setError(errorMessage);
      console.warn("⚠️ Error deleting device:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Update device
  const updateDevice = async (id: string, deviceData: Partial<Device>) => {
    initializeUseCases();
    
    setIsLoading(true);
    setError(null);
    try {
      if (!updateDeviceUseCase) {
        throw new Error("Use cases not initialized");
      }
      
      const updatedDevice = await updateDeviceUseCase.execute(id, deviceData);
      setDevices((prev) =>
        prev.map((device) => (device.id === id ? updatedDevice : device))
      );
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to update device";
      setError(errorMessage);
      console.warn("⚠️ Error updating device:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Load devices on mount
  useEffect(() => {
    fetchDevices();
  }, []);

  return {
    devices,
    isLoading,
    error,
    createDevice,
    deleteDevice,
    updateDevice,
    refreshDevices: fetchDevices,
  };
}
