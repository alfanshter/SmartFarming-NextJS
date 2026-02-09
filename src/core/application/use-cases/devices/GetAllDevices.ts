import { IDeviceRepository } from "@/core/domain/repositories/IDeviceRepository";
import { Device } from "@/core/domain/entities/Device";

export class GetAllDevices {
  constructor(private deviceRepository: IDeviceRepository) {}

  async execute(): Promise<Device[]> {
    return await this.deviceRepository.getAllDevices();
  }
}
