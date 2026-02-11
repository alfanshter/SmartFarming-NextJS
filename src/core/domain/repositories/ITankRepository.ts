import {
  Tank,
  WaterUsageStats,
  CreateTankDTO,
  UpdateTankConfigDTO,
  ControlMixerDTO,
  ControlPumpDTO,
} from "../entities/Tank";

export interface ITankRepository {
  getAllTanks(): Promise<Tank[]>;
  getTankById(id: string): Promise<Tank>;
  createTank(data: CreateTankDTO): Promise<Tank>;
  updateTank(id: string, data: UpdateTankConfigDTO): Promise<Tank>;
  deleteTank(id: string): Promise<void>;
  getWaterStats(id: string): Promise<WaterUsageStats>;
  controlMixer(id: string, data: ControlMixerDTO): Promise<Tank>;
  startPump(id: string, data: ControlPumpDTO): Promise<Tank>;
  stopPump(id: string): Promise<Tank>;
}
