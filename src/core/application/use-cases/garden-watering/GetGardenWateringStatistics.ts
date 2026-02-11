import { IGardenWateringRepository } from "../../../domain/repositories/IGardenWateringRepository";
import { GardenWateringStatistics } from "../../../domain/entities/GardenWateringSession";

export class GetGardenWateringStatistics {
  constructor(
    private gardenWateringRepository: IGardenWateringRepository
  ) {}

  async execute(userId: string): Promise<GardenWateringStatistics> {
    return await this.gardenWateringRepository.getStatistics(userId);
  }
}
