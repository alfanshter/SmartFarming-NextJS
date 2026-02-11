import { ITankRepository } from "../../../domain/repositories/ITankRepository";
import { Tank, CreateTankDTO } from "../../../domain/entities/Tank";

export class CreateTank {
  constructor(private tankRepository: ITankRepository) {}

  async execute(data: CreateTankDTO): Promise<Tank> {
    return await this.tankRepository.createTank(data);
  }
}
