import { IGardenWateringRepository } from "../../../domain/repositories/IGardenWateringRepository";
import { GardenWateringSession } from "../../../domain/entities/GardenWateringSession";
import { StopGardenWateringDTO } from "../../dtos/GardenWateringDTO";

export class StopGardenWatering {
  constructor(
    private gardenWateringRepository: IGardenWateringRepository
  ) {}

  async execute(
    userId: string,
    data: StopGardenWateringDTO
  ): Promise<GardenWateringSession> {
    return await this.gardenWateringRepository.stopGardenWatering(userId, data);
  }
}
