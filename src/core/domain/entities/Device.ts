export interface Device {
  id: string;
  name: string;
  type: "CONTROLLER" | "SENSOR" | "ACTUATOR";
  mqttTopic: string;
  status: "ONLINE" | "OFFLINE";
  isActive: boolean;
  lastSeen: string | Date;
  // Legacy fields untuk backward compatibility dengan UI
  deviceId?: string;
  ipAddress?: string;
  uptime?: string;
  lastActive?: string;
}

export interface CreateDeviceDTO {
  name: string;
  type: "CONTROLLER" | "SENSOR" | "ACTUATOR";
  mqttTopic: string;
}

export interface UpdateDeviceDTO {
  name?: string;
  type?: "CONTROLLER" | "SENSOR" | "ACTUATOR";
  mqttTopic?: string;
}
