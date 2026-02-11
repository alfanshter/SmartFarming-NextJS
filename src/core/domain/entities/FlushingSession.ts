// Domain Entity: FlushingSession
export interface FlushingSession {
  id: string;
  userId: string;
  durationMinutes: number;
  notes?: string;
  status: "running" | "completed" | "stopped";
  startedAt: Date;
  endedAt?: Date;
  actualDurationMinutes?: number;
  createdAt: Date;
  updatedAt: Date;
}

// DTOs
export interface StartFlushingDTO {
  durationMinutes: number;
  notes?: string;
}

export interface StopFlushingDTO {
  notes?: string;
}

export interface FlushingHistoryQuery {
  limit?: number;
  offset?: number;
  status?: "running" | "completed" | "stopped";
}

export interface FlushingStatistics {
  totalSessions: number;
  completedSessions: number;
  stoppedSessions: number;
  totalDurationMinutes: number;
  averageDurationMinutes: number;
  lastFlushingDate?: Date;
}
