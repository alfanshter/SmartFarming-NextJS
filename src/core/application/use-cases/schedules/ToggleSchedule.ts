import { IScheduleRepository } from "@/core/domain/repositories/IScheduleRepository";
import { Schedule } from "@/core/domain/entities/Schedule";

export class ToggleSchedule {
  constructor(private scheduleRepository: IScheduleRepository) {}

  async execute(id: string): Promise<Schedule> {
    if (!id) {
      throw new Error("Schedule ID is required");
    }

    return await this.scheduleRepository.toggleActive(id);
  }
}
