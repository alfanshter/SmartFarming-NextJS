// Domain Entity: Schedule (Auto Drip)

export interface TimeSlot {
  startTime: string; // Format: "HH:mm"
  durationMinutes: number;
  durationSeconds: number;
}

export interface Schedule {
  id: string;
  zoneId: string;
  zoneName?: string; // Will be populated from zone data
  isActive: boolean;
  timeSlots: TimeSlot[];
  activeDays: string[]; // Backend format: ["monday", "tuesday", ...]
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
}

// DTOs for API communication
export interface CreateScheduleDTO {
  zoneId: string;
  isActive: boolean;
  timeSlots: TimeSlot[];
  activeDays: string[]; // ["monday", "tuesday", ...]
}

export interface UpdateScheduleDTO {
  isActive?: boolean;
  timeSlots?: TimeSlot[];
  activeDays?: string[];
}

// API Response structure
export interface ScheduleResponse {
  success: boolean;
  message: string;
  data: Schedule[];
  count: number;
}

export interface SingleScheduleResponse {
  success: boolean;
  message: string;
  data: Schedule;
}
