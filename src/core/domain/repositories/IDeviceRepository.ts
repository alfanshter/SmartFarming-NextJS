import { Device, CreateDeviceDTO, UpdateDeviceDTO } from "../entities/Device";

export interface IDeviceRepository {
  /**
   * Get all devices
   */
  getAllDevices(): Promise<Device[]>;

  /**
   * Get device by ID
   */
  getDeviceById(id: string): Promise<Device>;

  /**
   * Get devices by status
   */
  getDevicesByStatus(status: "online" | "offline"): Promise<Device[]>;

  /**
   * Get devices by type
   */
  getDevicesByType(
    type: "CONTROLLER" | "SENSOR" | "ACTUATOR"
  ): Promise<Device[]>;

  /**
   * Create new device
   */
  createDevice(device: CreateDeviceDTO): Promise<Device>;

  /**
   * Update device
   */
  updateDevice(id: string, data: UpdateDeviceDTO): Promise<Device>;

  /**
   * Delete device
   */
  deleteDevice(id: string): Promise<void>;
}
