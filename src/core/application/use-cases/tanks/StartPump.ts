import { ITankRepository } from "../../../domain/repositories/ITankRepository";
import { Tank, ControlPumpDTO } from "../../../domain/entities/Tank";

export class StartPump {
  constructor(private tankRepository: ITankRepository) {}

  async execute(id: string, data: ControlPumpDTO): Promise<Tank> {
    return await this.tankRepository.startPump(id, data);
  }
}
