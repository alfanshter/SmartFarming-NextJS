import { ITankRepository } from "../../../domain/repositories/ITankRepository";
import { Tank } from "../../../domain/entities/Tank";

export class GetAllTanks {
  constructor(private tankRepository: ITankRepository) {}

  async execute(): Promise<Tank[]> {
    return await this.tankRepository.getAllTanks();
  }
}

export class GetTankById {
  constructor(private tankRepository: ITankRepository) {}

  async execute(id: string): Promise<Tank> {
    return await this.tankRepository.getTankById(id);
  }
}
