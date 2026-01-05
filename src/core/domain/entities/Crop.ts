
export interface Crop {
  id: string;
  name: string;
  type: string;
  variety: string;
  plantedDate: Date;
  expectedHarvest: Date;
  status: 'planted' | 'growing' | 'ready' | 'harvested';
  healthScore: number;
  location: string;
  area: number; // dalam hektar
  notes?: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}