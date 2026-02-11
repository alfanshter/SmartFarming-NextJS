import { IFlushingRepository } from "@/core/domain/repositories/IFlushingRepository";
import { FlushingSession, FlushingHistoryQuery } from "@/core/domain/entities/FlushingSession";

export class GetFlushingHistory {
  constructor(private flushingRepository: IFlushingRepository) {}

  async execute(
    userId: string,
    query?: FlushingHistoryQuery
  ): Promise<{ data: FlushingSession[]; count: number }> {
    return await this.flushingRepository.getHistory(userId, query);
  }
}
