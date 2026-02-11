import {
  GardenWateringSession,
  GardenWateringStatistics,
} from "../entities/GardenWateringSession";
import {
  StartGardenWateringDTO,
  StopGardenWateringDTO,
  GetHistoryDTO,
} from "../../application/dtos/GardenWateringDTO";

export interface IGardenWateringRepository {
  startGardenWatering(
    userId: string,
    data: StartGardenWateringDTO
  ): Promise<GardenWateringSession>;

  stopGardenWatering(
    userId: string,
    data: StopGardenWateringDTO
  ): Promise<GardenWateringSession>;

  getCurrentSession(userId: string): Promise<GardenWateringSession | null>;

  getHistory(
    userId: string,
    params: GetHistoryDTO
  ): Promise<{ data: GardenWateringSession[]; count: number }>;

  getStatistics(userId: string): Promise<GardenWateringStatistics>;
}
