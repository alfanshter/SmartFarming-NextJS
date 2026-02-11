import { IFlushingRepository } from "@/core/domain/repositories/IFlushingRepository";
import { FlushingStatistics } from "@/core/domain/entities/FlushingSession";

export class GetFlushingStatistics {
  constructor(private flushingRepository: IFlushingRepository) {}

  async execute(userId: string): Promise<FlushingStatistics> {
    return await this.flushingRepository.getStatistics(userId);
  }
}
