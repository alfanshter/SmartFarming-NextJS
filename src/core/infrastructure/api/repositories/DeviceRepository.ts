import { IDeviceRepository } from "@/core/domain/repositories/IDeviceRepository";
import { Device, CreateDeviceDTO, UpdateDeviceDTO } from "@/core/domain/entities/Device";
import { apiClient } from "../apiClient";

export class DeviceRepository implements IDeviceRepository {
  private readonly endpoint = "/devices";

  async getAllDevices(): Promise<Device[]> {
    const response = await apiClient.get<Device[]>(this.endpoint);
    return response.data;
  }

  async getDeviceById(id: string): Promise<Device> {
    const response = await apiClient.get<Device>(`${this.endpoint}/${id}`);
    return response.data;
  }

  async getDevicesByStatus(status: "online" | "offline"): Promise<Device[]> {
    const response = await apiClient.get<Device[]>(
      `${this.endpoint}?status=${status}`
    );
    return response.data;
  }

  async getDevicesByType(
    type: "CONTROLLER" | "SENSOR" | "ACTUATOR"
  ): Promise<Device[]> {
    const response = await apiClient.get<Device[]>(
      `${this.endpoint}?type=${type}`
    );
    return response.data;
  }

  async createDevice(device: CreateDeviceDTO): Promise<Device> {
    const response = await apiClient.post<Device>(this.endpoint, device);
    return response.data;
  }

  async updateDevice(id: string, data: UpdateDeviceDTO): Promise<Device> {
    const response = await apiClient.put<Device>(
      `${this.endpoint}/${id}`,
      data
    );
    return response.data;
  }

  async deleteDevice(id: string): Promise<void> {
    await apiClient.delete(`${this.endpoint}/${id}`);
  }
}
