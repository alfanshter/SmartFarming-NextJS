import { Zone, CreateZoneDTO, UpdateZoneDTO, ControlZoneDTO, ZoneControlResponse } from "../entities/Zone";

export interface IZoneRepository {
  getAllZones(): Promise<Zone[]>;
  getZoneById(id: string): Promise<Zone>;
  createZone(data: CreateZoneDTO): Promise<Zone>;
  updateZone(id: string, data: UpdateZoneDTO): Promise<Zone>;
  deleteZone(id: string): Promise<void>;
  controlZone(id: string, data: ControlZoneDTO): Promise<ZoneControlResponse>;
}
