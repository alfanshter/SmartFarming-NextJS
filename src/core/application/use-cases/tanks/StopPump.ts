import { ITankRepository } from "../../../domain/repositories/ITankRepository";
import { Tank } from "../../../domain/entities/Tank";

export class StopPump {
  constructor(private tankRepository: ITankRepository) {}

  async execute(id: string): Promise<Tank> {
    return await this.tankRepository.stopPump(id);
  }
}
