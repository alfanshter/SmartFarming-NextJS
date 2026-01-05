import { ICropRepository } from "@/src/core/domain/repositories/ICropRepository";
import { Crop } from "@/src/core/domain/entities/Crop";
import { apiClient } from "../apiClient";

export class CropRepository implements ICropRepository {
  private readonly endpoint = "/crops";

  async getAllCrops(): Promise<Crop[]> {
    const response = await apiClient.get<Crop[]>(this.endpoint);
    return response.data;
  }

  async getCropById(id: string): Promise<Crop> {
    const response = await apiClient.get<Crop>(`${this.endpoint}/${id}`);
    return response.data;
  }

  async getCropsByStatus(status: Crop["status"]): Promise<Crop[]> {
    const response = await apiClient.get<Crop[]>(
      `${this.endpoint}?status=${status}`
    );
    return response.data;
  }

  async createCrop(
    crop: Omit<Crop, "id" | "createdAt" | "updatedAt">
  ): Promise<Crop> {
    const response = await apiClient.post<Crop>(this.endpoint, crop);
    return response.data;
  }
  async updateCrop(id: string, data: Partial<Crop>): Promise<Crop> {
    const response = await apiClient.put<Crop>(`${this.endpoint}/${id}`, data);
    return response.data;
  }
  async deleteCrop(id: string): Promise<void> {
    const response = await apiClient.delete<void>(`${this.endpoint}/${id}`);
    return response.data;
  }
}
