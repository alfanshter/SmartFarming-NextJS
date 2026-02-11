import { IFlushingRepository } from "@/core/domain/repositories/IFlushingRepository";
import { FlushingSession, StartFlushingDTO } from "@/core/domain/entities/FlushingSession";

export class StartFlushing {
  constructor(private flushingRepository: IFlushingRepository) {}

  async execute(userId: string, data: StartFlushingDTO): Promise<FlushingSession> {
    // Validate duration
    if (data.durationMinutes < 1 || data.durationMinutes > 180) {
      throw new Error("Duration must be between 1 and 180 minutes");
    }

    return await this.flushingRepository.startFlushing(userId, data);
  }
}
