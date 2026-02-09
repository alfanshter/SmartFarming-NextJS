import { IScheduleRepository } from "@/core/domain/repositories/IScheduleRepository";
import { Schedule } from "@/core/domain/entities/Schedule";

export class GetAllSchedules {
  constructor(private scheduleRepository: IScheduleRepository) {}

  async execute(): Promise<Schedule[]> {
    return await this.scheduleRepository.getAll();
  }
}
