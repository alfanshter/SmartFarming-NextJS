import { ITankRepository } from "../../../domain/repositories/ITankRepository";
import {
  Tank,
  WaterUsageStats,
  CreateTankDTO,
  UpdateTankConfigDTO,
  ControlMixerDTO,
  ControlPumpDTO,
} from "../../../domain/entities/Tank";
import { apiClient } from "../apiClient";

// Backend response type (what API actually returns)
interface BackendTank {
  id: string;
  name: string;
  description?: string;
  deviceId: string;
  sensorDeviceId?: string | null;
  capacity: string; // Backend returns as string
  currentLevel: string; // Backend returns as string
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  autoFillEnabled: boolean;
  autoFillMinLevel: string; // Backend returns as string
  autoFillMaxLevel: string; // Backend returns as string
  manualFillMaxLevel: string; // Backend returns as string
  manualFillDuration?: number | null;
  agitatorEnabled: boolean;
  agitatorStatus: boolean; // Backend field name
  userId: string;
}

// API response wrapper
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  count?: number;
}

export class TankRepository implements ITankRepository {
  private readonly baseUrl = "/tanks";

  // Transform backend data to frontend Tank entity
  private transformTank(backendTank: BackendTank): Tank {
    return {
      id: backendTank.id,
      name: backendTank.name,
      description: backendTank.description,
      deviceId: backendTank.deviceId,
      sensorDeviceId: backendTank.sensorDeviceId || undefined,
      capacity: parseFloat(backendTank.capacity),
      currentLevel: parseFloat(backendTank.currentLevel),
      autoFillEnabled: backendTank.autoFillEnabled,
      autoFillMinLevel: parseFloat(backendTank.autoFillMinLevel),
      autoFillMaxLevel: parseFloat(backendTank.autoFillMaxLevel),
      manualFillMaxLevel: parseFloat(backendTank.manualFillMaxLevel),
      manualFillDuration: backendTank.manualFillDuration || undefined,
      agitatorEnabled: backendTank.agitatorStatus, // Use agitatorStatus from backend as current state
      createdAt: backendTank.createdAt,
      updatedAt: backendTank.updatedAt,
    };
  }

  async getAllTanks(): Promise<Tank[]> {
    try {
      const response = await apiClient.get<ApiResponse<BackendTank[]>>(this.baseUrl);
      
      console.log("📦 API Response:", response.data);
      console.log(`✅ Found ${response.data.count || 0} tanks`);
      
      // Backend returns wrapped response: { success, message, data, count }
      const backendTanks = response.data.data;
      
      if (!Array.isArray(backendTanks)) {
        console.error("❌ Expected array but got:", typeof backendTanks);
        return [];
      }
      
      const tanks = backendTanks.map((tank) => this.transformTank(tank));
      console.log("✅ Transformed tanks:", tanks);
      
      return tanks;
    } catch (error) {
      console.error("❌ Error fetching tanks:", error);
      throw error;
    }
  }

  async getTankById(id: string): Promise<Tank> {
    const response = await apiClient.get<ApiResponse<BackendTank>>(
      `${this.baseUrl}/${id}`
    );
    return this.transformTank(response.data.data);
  }

  async createTank(data: CreateTankDTO): Promise<Tank> {
    const response = await apiClient.post<ApiResponse<BackendTank>>(
      this.baseUrl,
      data
    );
    return this.transformTank(response.data.data);
  }

  async updateTank(id: string, data: UpdateTankConfigDTO): Promise<Tank> {
    const response = await apiClient.put<ApiResponse<BackendTank>>(
      `${this.baseUrl}/${id}`,
      data
    );
    return this.transformTank(response.data.data);
  }

  async deleteTank(id: string): Promise<void> {
    await apiClient.delete(`${this.baseUrl}/${id}`);
  }

  async getWaterStats(id: string): Promise<WaterUsageStats> {
    const response = await apiClient.get<ApiResponse<WaterUsageStats>>(
      `${this.baseUrl}/${id}/stats`
    );
    return response.data.data;
  }

  async controlMixer(id: string, data: ControlMixerDTO): Promise<Tank> {
    console.log("🔄 Controlling agitator:", id, data);
    const endpoint = data.isActive ? 'on' : 'off';
    const response = await apiClient.post<ApiResponse<BackendTank>>(
      `${this.baseUrl}/${id}/agitator/${endpoint}`
    );
    console.log("✅ Agitator controlled:", response.data);
    return this.transformTank(response.data.data);
  }

  async startPump(id: string, data: ControlPumpDTO): Promise<Tank> {
    console.log("▶️ Starting manual fill:", id, data);
    const response = await apiClient.post<ApiResponse<BackendTank>>(
      `${this.baseUrl}/${id}/manual-fill/start`,
      { durationMinutes: data.durationMinutes || null }
    );
    console.log("✅ Manual fill started:", response.data);
    return this.transformTank(response.data.data);
  }

  async stopPump(id: string): Promise<Tank> {
    console.log("⏹️ Stopping manual fill:", id);
    const response = await apiClient.post<ApiResponse<BackendTank>>(
      `${this.baseUrl}/${id}/manual-fill/stop`
    );
    console.log("✅ Manual fill stopped:", response.data);
    return this.transformTank(response.data.data);
  }
}

const tankRepository = new TankRepository();
export default tankRepository;
