import { IGardenWateringRepository } from "../../../domain/repositories/IGardenWateringRepository";
import { GardenWateringSession } from "../../../domain/entities/GardenWateringSession";
import { StartGardenWateringDTO } from "../../dtos/GardenWateringDTO";

export class StartGardenWatering {
  constructor(
    private gardenWateringRepository: IGardenWateringRepository
  ) {}

  async execute(
    userId: string,
    data: StartGardenWateringDTO
  ): Promise<GardenWateringSession> {
    // Validasi duration (1-180 menit)
    if (data.durationMinutes < 1 || data.durationMinutes > 180) {
      throw new Error("Duration must be between 1 and 180 minutes");
    }

    return await this.gardenWateringRepository.startGardenWatering(
      userId,
      data
    );
  }
}
