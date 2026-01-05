export interface CreateCropDTO {
  name: string;
  type: string;
  variety: string;
  plantedDate: Date;
  expectedHarvest: Date;
  status: "planted" | "growing" | "ready" | "harvested";
  healthScore: number;
  location: string;
  area: number; // dalam hektar
  notes?: string;
  imageUrl?: string;
}

export interface UpdateCropDTO {
  name?: string;
  type?: string;
  variety?: string;
  status?: "planted" | "growing" | "ready" | "harvested";
  healthScore?: number;
  notes?: string;
}
