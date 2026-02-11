export interface StartGardenWateringDTO {
  durationMinutes: number;
  notes?: string;
}

export interface StopGardenWateringDTO {
  notes?: string;
}

export interface GetHistoryDTO {
  limit?: number;
}
