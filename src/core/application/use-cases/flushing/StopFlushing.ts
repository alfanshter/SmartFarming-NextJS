import { IFlushingRepository } from "@/core/domain/repositories/IFlushingRepository";
import { FlushingSession, StopFlushingDTO } from "@/core/domain/entities/FlushingSession";

export class StopFlushing {
  constructor(private flushingRepository: IFlushingRepository) {}

  async execute(userId: string, data?: StopFlushingDTO): Promise<FlushingSession> {
    return await this.flushingRepository.stopFlushing(userId, data);
  }
}
