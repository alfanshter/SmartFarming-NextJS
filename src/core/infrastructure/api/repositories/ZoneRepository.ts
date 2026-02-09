"use client";

import { IZoneRepository } from "@/core/domain/repositories/IZoneRepository";
import { Zone, CreateZoneDTO, UpdateZoneDTO, ControlZoneDTO, ZoneControlResponse } from "@/core/domain/entities/Zone";
import { apiClient } from "../apiClient";

export class ZoneRepository implements IZoneRepository {
  async getAllZones(): Promise<Zone[]> {
    try {
      console.log("🔍 Fetching all zones...");
      const response = await apiClient.get<Zone[]>("/zones/my");
      console.log("✅ Zones fetched:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Get zones failed:", error);
      throw error;
    }
  }

  async getZoneById(id: string): Promise<Zone> {
    try {
      console.log("🔍 Fetching zone:", id);
      const response = await apiClient.get<Zone>(`/zones/${id}`);
      console.log("✅ Zone fetched:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Get zone failed:", error);
      throw error;
    }
  }

  async createZone(data: CreateZoneDTO): Promise<Zone> {
    try {
      console.log("➕ Creating zone:", data);
      const response = await apiClient.post<Zone>("/zones", data);
      console.log("✅ Zone created:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Create zone failed:", error);
      throw error;
    }
  }

  async updateZone(id: string, data: UpdateZoneDTO): Promise<Zone> {
    try {
      console.log("✏️ Updating zone:", id, data);
      const response = await apiClient.patch<Zone>(`/zones/${id}`, data);
      console.log("✅ Zone updated:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Update zone failed:", error);
      throw error;
    }
  }

  async deleteZone(id: string): Promise<void> {
    try {
      console.log("🗑️ Deleting zone:", id);
      await apiClient.delete(`/zones/${id}`);
      console.log("✅ Zone deleted");
    } catch (error) {
      console.error("❌ Delete zone failed:", error);
      throw error;
    }
  }

  async controlZone(id: string, data: ControlZoneDTO): Promise<ZoneControlResponse> {
    try {
      console.log(`🎮 ${data.isActive ? 'Starting' : 'Stopping'} zone:`, id, data);
      const response = await apiClient.post<ZoneControlResponse>("/zones/control", data);
      console.log("✅ Zone control success:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Zone control failed:", error);
      throw error;
    }
  }
}

