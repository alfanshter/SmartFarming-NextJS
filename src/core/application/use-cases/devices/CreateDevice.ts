import { IDeviceRepository } from "@/core/domain/repositories/IDeviceRepository";
import { Device, CreateDeviceDTO } from "@/core/domain/entities/Device";

export class CreateDevice {
  constructor(private deviceRepository: IDeviceRepository) {}

  async execute(deviceData: CreateDeviceDTO): Promise<Device> {
    // Validation
    if (!deviceData.name || deviceData.name.trim() === "") {
      throw new Error("Device name is required");
    }

    if (!deviceData.type) {
      throw new Error("Device type is required");
    }

    if (!deviceData.mqttTopic || deviceData.mqttTopic.trim() === "") {
      throw new Error("MQTT Topic is required");
    }

    // Validate type
    const validTypes = ["CONTROLLER", "SENSOR", "ACTUATOR"];
    if (!validTypes.includes(deviceData.type)) {
      throw new Error("Invalid device type");
    }

    // Create device
    return await this.deviceRepository.createDevice(deviceData);
  }
}
