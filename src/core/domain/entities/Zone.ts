// Zone entity matching backend response
export interface Zone {
  id: string;
  name: string;
  description: string;
  deviceId: string;
  isActive: boolean;
  durationMinutes: number;
  durationSeconds: number;
  startedAt: string | null;
  remainingSeconds: number | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

// Zone control response (when starting/stopping)
export interface ZoneControlResponse {
  zoneId: string;
  name: string;
  isActive: boolean;
  totalDurationSeconds: number;
  remainingSeconds: number;
  elapsedSeconds: number;
  startedAt: string;
  estimatedEndTime: string;
  message: string;
}

// DTO for creating zone
export interface CreateZoneDTO {
  name: string;
  description: string;
  deviceId: string;
  durationMinutes: number;
  durationSeconds: number;
}

// DTO for updating zone
export interface UpdateZoneDTO {
  name?: string;
  description?: string;
  deviceId?: string;
  durationMinutes?: number;
  durationSeconds?: number;
  isActive?: boolean;
}

// DTO for starting/stopping zone (NEW FORMAT)
export interface ControlZoneDTO {
  zoneId: string;
  isActive: boolean;
  durationMinutes?: number;
  durationSeconds?: number;
}
