import { apiClient } from "../apiClient";
import {
  Schedule,
  CreateScheduleDTO,
  UpdateScheduleDTO,
  ScheduleResponse,
  SingleScheduleResponse,
} from "@/core/domain/entities/Schedule";
import { IScheduleRepository } from "@/core/domain/repositories/IScheduleRepository";

export class ScheduleRepository implements IScheduleRepository {
  async getAll(): Promise<Schedule[]> {
    console.log("🔍 [ScheduleRepo] Fetching all schedules...");
    const response = await apiClient.get<ScheduleResponse>("/auto-drip");
    console.log("✅ [ScheduleRepo] Schedules fetched:", response.data);
    return response.data.data;
  }

  async getById(id: string): Promise<Schedule> {
    console.log("🔍 [ScheduleRepo] Fetching schedule by ID:", id);
    const response = await apiClient.get<SingleScheduleResponse>(
      `/auto-drip/${id}`
    );
    console.log("✅ [ScheduleRepo] Schedule fetched:", response.data);
    return response.data.data;
  }

  async create(data: CreateScheduleDTO): Promise<Schedule> {
    console.log("➕ [ScheduleRepo] Creating schedule:", data);
    const response = await apiClient.post<SingleScheduleResponse>(
      "/auto-drip",
      data
    );
    console.log("✅ [ScheduleRepo] Schedule created:", response.data);
    return response.data.data;
  }

  async update(id: string, data: UpdateScheduleDTO): Promise<Schedule> {
    console.log("✏️ [ScheduleRepo] Updating schedule:", id, data);
    const response = await apiClient.put<SingleScheduleResponse>(
      `/auto-drip/${id}`,
      data
    );
    console.log("✅ [ScheduleRepo] Schedule updated:", response.data);
    return response.data.data;
  }

  async delete(id: string): Promise<void> {
    console.log("🗑️ [ScheduleRepo] Deleting schedule:", id);
    await apiClient.delete(`/auto-drip/${id}`);
    console.log("✅ [ScheduleRepo] Schedule deleted");
  }

  async toggleActive(id: string): Promise<Schedule> {
    console.log("🔄 [ScheduleRepo] Toggling schedule active:", id);
    const response = await apiClient.patch<SingleScheduleResponse>(
      `/auto-drip/${id}/toggle`
    );
    console.log("✅ [ScheduleRepo] Schedule toggled:", response.data);
    return response.data.data;
  }
}
