import { IZoneRepository } from "@/core/domain/repositories/IZoneRepository";
import { ZoneControlResponse, ControlZoneDTO } from "@/core/domain/entities/Zone";

export class ControlZone {
  constructor(private zoneRepository: IZoneRepository) {}

  async execute(id: string, data: ControlZoneDTO): Promise<ZoneControlResponse> {
    // Validation
    if (!id) {
      throw new Error("Zone ID is required");
    }

    if (typeof data.isActive !== "boolean") {
      throw new Error("isActive must be a boolean value");
    }

    if (data.isActive) {
      // When activating, require duration
      if (data.durationMinutes === undefined || data.durationMinutes < 0) {
        throw new Error("Duration minutes is required and must be >= 0");
      }
      if (data.durationSeconds === undefined || data.durationSeconds < 0 || data.durationSeconds > 59) {
        throw new Error("Duration seconds must be between 0 and 59");
      }
    }

    return await this.zoneRepository.controlZone(id, data);
  }
}
