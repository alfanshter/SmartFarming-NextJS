import { IDeviceRepository } from "@/core/domain/repositories/IDeviceRepository";
import { Device, UpdateDeviceDTO } from "@/core/domain/entities/Device";

export class UpdateDevice {
  constructor(private deviceRepository: IDeviceRepository) {}

  async execute(id: string, deviceData: UpdateDeviceDTO): Promise<Device> {
    if (!id || id.trim() === "") {
      throw new Error("Device ID is required");
    }

    // Validate type if provided
    if (deviceData.type) {
      const validTypes = ["CONTROLLER", "SENSOR", "ACTUATOR"];
      if (!validTypes.includes(deviceData.type)) {
        throw new Error("Invalid device type");
      }
    }

    return await this.deviceRepository.updateDevice(id, deviceData);
  }
}
