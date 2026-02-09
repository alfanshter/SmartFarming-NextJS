import {
  Schedule,
  CreateScheduleDTO,
  UpdateScheduleDTO,
} from "../entities/Schedule";

export interface IScheduleRepository {
  getAll(): Promise<Schedule[]>;
  getById(id: string): Promise<Schedule>;
  create(data: CreateScheduleDTO): Promise<Schedule>;
  update(id: string, data: UpdateScheduleDTO): Promise<Schedule>;
  delete(id: string): Promise<void>;
  toggleActive(id: string): Promise<Schedule>;
}
