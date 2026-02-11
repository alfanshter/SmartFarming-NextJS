export interface GardenWateringSession {
  id: string;
  userId: string;
  durationMinutes: number;
  totalDurationMinutes?: number; // Actual duration jika stopped early
  status: "running" | "completed" | "stopped";
  notes?: string;
  startedAt: Date;
  stoppedAt?: Date;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface GardenWateringStatistics {
  totalSessions: number;
  completedSessions: number;
  stoppedSessions: number;
  totalDurationMinutes: number;
  averageDurationMinutes: number;
}
