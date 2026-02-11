import { IGardenWateringRepository } from "../../../domain/repositories/IGardenWateringRepository";
import { GardenWateringSession } from "../../../domain/entities/GardenWateringSession";
import { GetHistoryDTO } from "../../dtos/GardenWateringDTO";

export class GetGardenWateringHistory {
  constructor(
    private gardenWateringRepository: IGardenWateringRepository
  ) {}

  async execute(
    userId: string,
    params: GetHistoryDTO
  ): Promise<{ data: GardenWateringSession[]; count: number }> {
    return await this.gardenWateringRepository.getHistory(userId, params);
  }
}
