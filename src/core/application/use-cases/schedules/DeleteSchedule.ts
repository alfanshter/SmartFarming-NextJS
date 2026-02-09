import { IScheduleRepository } from "@/core/domain/repositories/IScheduleRepository";

export class DeleteSchedule {
  constructor(private scheduleRepository: IScheduleRepository) {}

  async execute(id: string): Promise<void> {
    if (!id) {
      throw new Error("Schedule ID is required");
    }

    await this.scheduleRepository.delete(id);
  }
}
