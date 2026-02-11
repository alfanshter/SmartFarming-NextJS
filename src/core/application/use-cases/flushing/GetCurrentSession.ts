import { IFlushingRepository } from "@/core/domain/repositories/IFlushingRepository";
import { FlushingSession } from "@/core/domain/entities/FlushingSession";

export class GetCurrentSession {
  constructor(private flushingRepository: IFlushingRepository) {}

  async execute(userId: string): Promise<FlushingSession | null> {
    return await this.flushingRepository.getCurrentSession(userId);
  }
}
