import { IGardenWateringRepository } from "../../../domain/repositories/IGardenWateringRepository";
import {
  GardenWateringSession,
  GardenWateringStatistics,
} from "../../../domain/entities/GardenWateringSession";
import {
  StartGardenWateringDTO,
  StopGardenWateringDTO,
  GetHistoryDTO,
} from "../../../application/dtos/GardenWateringDTO";
import { apiClient } from "../apiClient";

export class GardenWateringRepository implements IGardenWateringRepository {
  private readonly basePath = "/garden-watering";

  async startGardenWatering(
    _userId: string,
    data: StartGardenWateringDTO
  ): Promise<GardenWateringSession> {
    const response = await apiClient.post<{
      success: boolean;
      data: GardenWateringSession;
    }>(`${this.basePath}/start`, data);

    return {
      ...response.data.data,
      startedAt: new Date(response.data.data.startedAt),
      createdAt: new Date(response.data.data.createdAt),
      updatedAt: new Date(response.data.data.updatedAt),
    };
  }

  async stopGardenWatering(
    _userId: string,
    data: StopGardenWateringDTO
  ): Promise<GardenWateringSession> {
    const response = await apiClient.post<{
      success: boolean;
      data: GardenWateringSession;
    }>(`${this.basePath}/stop`, data);

    return {
      ...response.data.data,
      startedAt: new Date(response.data.data.startedAt),
      stoppedAt: response.data.data.stoppedAt
        ? new Date(response.data.data.stoppedAt)
        : undefined,
      completedAt: response.data.data.completedAt
        ? new Date(response.data.data.completedAt)
        : undefined,
      createdAt: new Date(response.data.data.createdAt),
      updatedAt: new Date(response.data.data.updatedAt),
    };
  }

  async getCurrentSession(_userId: string): Promise<GardenWateringSession | null> {
    try {
      const response = await apiClient.get<{
        success: boolean;
        data: GardenWateringSession | null;
      }>(`${this.basePath}/current`);

      if (!response.data.data) {
        return null;
      }

      return {
        ...response.data.data,
        startedAt: new Date(response.data.data.startedAt),
        stoppedAt: response.data.data.stoppedAt
          ? new Date(response.data.data.stoppedAt)
          : undefined,
        completedAt: response.data.data.completedAt
          ? new Date(response.data.data.completedAt)
          : undefined,
        createdAt: new Date(response.data.data.createdAt),
        updatedAt: new Date(response.data.data.updatedAt),
      };
    } catch (error) {
      console.error("Error getting current garden watering session:", error);
      return null;
    }
  }

  async getHistory(
    _userId: string,
    params: GetHistoryDTO
  ): Promise<{ data: GardenWateringSession[]; count: number }> {
    const response = await apiClient.get<{
      success: boolean;
      data: GardenWateringSession[];
      count: number;
    }>(`${this.basePath}/history`, {
      params: {
        limit: params.limit || 10,
      },
    });

    const sessions = response.data.data.map((session: GardenWateringSession) => ({
      ...session,
      startedAt: new Date(session.startedAt),
      stoppedAt: session.stoppedAt ? new Date(session.stoppedAt) : undefined,
      completedAt: session.completedAt
        ? new Date(session.completedAt)
        : undefined,
      createdAt: new Date(session.createdAt),
      updatedAt: new Date(session.updatedAt),
    }));

    return {
      data: sessions,
      count: response.data.count,
    };
  }

  async getStatistics(_userId: string): Promise<GardenWateringStatistics> {
    const response = await apiClient.get<{
      success: boolean;
      data: GardenWateringStatistics;
    }>(`${this.basePath}/statistics`);

    return response.data.data;
  }
}
