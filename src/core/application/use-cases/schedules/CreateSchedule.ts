import { IScheduleRepository } from "@/core/domain/repositories/IScheduleRepository";
import {
  Schedule,
  CreateScheduleDTO,
} from "@/core/domain/entities/Schedule";

export class CreateSchedule {
  constructor(private scheduleRepository: IScheduleRepository) {}

  async execute(data: CreateScheduleDTO): Promise<Schedule> {
    // Validation
    if (!data.zoneId) {
      throw new Error("Zone ID is required");
    }

    if (!data.timeSlots || data.timeSlots.length === 0) {
      throw new Error("At least one time slot is required");
    }

    // Validate each time slot has duration
    const hasValidSlot = data.timeSlots.some(
      (slot) => slot.durationMinutes > 0 || slot.durationSeconds > 0
    );
    if (!hasValidSlot) {
      throw new Error("At least one time slot must have a duration");
    }

    if (!data.activeDays || data.activeDays.length === 0) {
      throw new Error("At least one active day is required");
    }

    return await this.scheduleRepository.create(data);
  }
}
