// Domain Entity: Tank (Tandon)

export interface Tank {
  id: string;
  name: string;
  description?: string;
  deviceId: string; // Controller device ID
  sensorDeviceId?: string; // Sensor device ID (separate from controller)
  capacity: number; // Liters
  currentLevel: number; // Percentage (0-100)
  autoFillEnabled: boolean;
  autoFillMinLevel: number; // Percentage
  autoFillMaxLevel: number; // Percentage
  manualFillMaxLevel: number; // Percentage
  manualFillDuration?: number; // Duration in minutes for manual fill (tanks without sensor)
  agitatorEnabled: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface WaterUsageStats {
  today: number; // Liters
  thisWeek: number;
  thisMonth: number;
  thisYear: number;
}

// DTOs for API communication
export interface CreateTankDTO {
  name: string;
  description?: string;
  deviceId: string;
  sensorDeviceId?: string;
  capacity: number;
  currentLevel: number;
  autoFillEnabled: boolean;
  autoFillMinLevel: number;
  autoFillMaxLevel: number;
  manualFillMaxLevel: number;
  agitatorEnabled: boolean;
}

export interface UpdateTankConfigDTO {
  name?: string;
  description?: string;
  sensorDeviceId?: string;
  autoFillEnabled?: boolean;
  autoFillMinLevel?: number;
  autoFillMaxLevel?: number;
  manualFillMaxLevel?: number;
  agitatorEnabled?: boolean;
}

export interface ControlMixerDTO {
  isActive: boolean;
}

export interface ControlPumpDTO {
  durationMinutes?: number; // For tanks without sensor - manual pump with duration
}

// API Response structure
export interface TankResponse {
  success: boolean;
  message: string;
  data: Tank;
}

export interface WaterStatsResponse {
  success: boolean;
  message: string;
  data: WaterUsageStats;
}
