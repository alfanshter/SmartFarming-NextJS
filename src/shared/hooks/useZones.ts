"use client";

import { useState, useEffect } from "react";
import { Zone, ControlZoneDTO } from "@/core/domain/entities/Zone";
import { ZoneRepository } from "@/core/infrastructure/api/repositories/ZoneRepository";
import { GetAllZones } from "@/core/application/use-cases/zones/GetAllZones";
import { ControlZone } from "@/core/application/use-cases/zones/ControlZone";

// Lazy initialize to avoid server-side issues
let zoneRepository: ZoneRepository | null = null;
let getAllZonesUseCase: GetAllZones | null = null;
let controlZoneUseCase: ControlZone | null = null;

const initializeUseCases = () => {
  if (typeof window !== "undefined" && !zoneRepository) {
    zoneRepository = new ZoneRepository();
    getAllZonesUseCase = new GetAllZones(zoneRepository);
    controlZoneUseCase = new ControlZone(zoneRepository);
  }
};

export interface UseZonesReturn {
  zones: Zone[];
  isLoading: boolean;
  error: string | null;
  fetchZones: () => Promise<void>;
  startZone: (id: string, durationMinutes: number, durationSeconds: number) => Promise<void>;
  stopZone: (id: string) => Promise<void>;
}

export function useZones(): UseZonesReturn {
  const [zones, setZones] = useState<Zone[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all zones
  const fetchZones = async () => {
    initializeUseCases();
    
    setIsLoading(true);
    setError(null);
    try {
      console.log("🔄 Fetching zones from API...");
      
      if (!getAllZonesUseCase) {
        throw new Error("Use cases not initialized - check if running in browser");
      }
      
      const data = await getAllZonesUseCase.execute();
      console.log("✅ Zones fetched successfully:", data);
      setZones(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch zones";
      setError(errorMessage);
      console.warn("⚠️ Error fetching zones:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Start zone irrigation
  const startZone = async (id: string, durationMinutes: number, durationSeconds: number) => {
    initializeUseCases();
    
    setIsLoading(true);
    setError(null);
    try {
      if (!controlZoneUseCase) {
        throw new Error("Use cases not initialized");
      }
      
      const controlData: ControlZoneDTO = {
        zoneId: id,
        isActive: true,
        durationMinutes,
        durationSeconds,
      };
      
      const controlResponse = await controlZoneUseCase.execute(id, controlData);
      console.log("✅ Zone started:", controlResponse);
      
      // Refresh zones to get updated status
      await fetchZones();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to start zone";
      setError(errorMessage);
      console.warn("⚠️ Error starting zone:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Stop zone irrigation
  const stopZone = async (id: string) => {
    initializeUseCases();
    
    setIsLoading(true);
    setError(null);
    try {
      if (!controlZoneUseCase) {
        throw new Error("Use cases not initialized");
      }
      
      const controlData: ControlZoneDTO = {
        zoneId: id,
        isActive: false,
      };
      
      const controlResponse = await controlZoneUseCase.execute(id, controlData);
      console.log("✅ Zone stopped:", controlResponse);
      
      // Refresh zones to get updated status
      await fetchZones();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to stop zone";
      setError(errorMessage);
      console.warn("⚠️ Error stopping zone:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Load zones on mount
  useEffect(() => {
    fetchZones();
  }, []);

  return {
    zones,
    isLoading,
    error,
    fetchZones,
    startZone,
    stopZone,
  };
}
