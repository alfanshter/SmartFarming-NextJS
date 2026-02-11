import { ITankRepository } from "../../../domain/repositories/ITankRepository";
import { WaterUsageStats } from "../../../domain/entities/Tank";

export class GetWaterStats {
  constructor(private tankRepository: ITankRepository) {}

  async execute(id: string): Promise<WaterUsageStats> {
    return await this.tankRepository.getWaterStats(id);
  }
}
