import { IGardenWateringRepository } from "../../../domain/repositories/IGardenWateringRepository";
import { GardenWateringSession } from "../../../domain/entities/GardenWateringSession";

export class GetCurrentGardenWateringSession {
  constructor(
    private gardenWateringRepository: IGardenWateringRepository
  ) {}

  async execute(userId: string): Promise<GardenWateringSession | null> {
    return await this.gardenWateringRepository.getCurrentSession(userId);
  }
}
