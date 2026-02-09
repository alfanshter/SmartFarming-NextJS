import { IZoneRepository } from "@/core/domain/repositories/IZoneRepository";
import { Zone } from "@/core/domain/entities/Zone";

export class GetAllZones {
  constructor(private zoneRepository: IZoneRepository) {}

  async execute(): Promise<Zone[]> {
    return await this.zoneRepository.getAllZones();
  }
}
