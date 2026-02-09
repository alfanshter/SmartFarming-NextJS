import { IScheduleRepository } from "@/core/domain/repositories/IScheduleRepository";
import {
  Schedule,
  UpdateScheduleDTO,
} from "@/core/domain/entities/Schedule";

export class UpdateSchedule {
  constructor(private scheduleRepository: IScheduleRepository) {}

  async execute(id: string, data: UpdateScheduleDTO): Promise<Schedule> {
    if (!id) {
      throw new Error("Schedule ID is required");
    }

    return await this.scheduleRepository.update(id, data);
  }
}
