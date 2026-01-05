import { Crop } from '../entities/Crop';

export interface ICropRepository {
  getAllCrops(): Promise<Crop[]>;
  getCropById(id: string): Promise<Crop>;
  getCropsByStatus(status: Crop['status']): Promise<Crop[]>;
  createCrop(crop: Omit<Crop, 'id' | 'createdAt' | 'updatedAt'>): Promise<Crop>;
  updateCrop(id: string, data: Partial<Crop>): Promise<Crop>;
  deleteCrop(id: string): Promise<void>;
}