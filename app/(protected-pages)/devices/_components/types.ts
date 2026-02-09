// Type definition untuk device
export interface Device {
  id: string;
  name: string;
  deviceId: string;
  ipAddress: string;
  uptime: string;
  lastActive: string;
  status: "online" | "offline";
}
