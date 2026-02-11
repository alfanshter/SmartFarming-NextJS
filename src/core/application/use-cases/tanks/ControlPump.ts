import { ITankRepository } from "../../../domain/repositories/ITankRepository";
import { Tank, ControlPumpDTO } from "../../../domain/entities/Tank";

export class ControlPump {
  constructor(private tankRepository: ITankRepository) {}

  async execute(id: string, data: ControlPumpDTO): Promise<Tank> {
    return await this.tankRepository.controlPump(id, data);
  }
}
