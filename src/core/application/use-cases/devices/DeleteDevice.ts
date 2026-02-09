import { IDeviceRepository } from "@/core/domain/repositories/IDeviceRepository";

export class DeleteDevice {
  constructor(private deviceRepository: IDeviceRepository) {}

  async execute(id: string): Promise<void> {
    if (!id || id.trim() === "") {
      throw new Error("Device ID is required");
    }

    await this.deviceRepository.deleteDevice(id);
  }
}
