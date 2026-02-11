import { ITankRepository } from "../../../domain/repositories/ITankRepository";
import { Tank, ControlMixerDTO } from "../../../domain/entities/Tank";

export class ControlMixer {
  constructor(private tankRepository: ITankRepository) {}

  async execute(id: string, data: ControlMixerDTO): Promise<Tank> {
    return await this.tankRepository.controlMixer(id, data);
  }
}
