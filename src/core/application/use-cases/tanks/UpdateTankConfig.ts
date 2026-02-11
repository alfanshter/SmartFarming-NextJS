import { ITankRepository } from "../../../domain/repositories/ITankRepository";
import { Tank, UpdateTankConfigDTO } from "../../../domain/entities/Tank";

export class UpdateTank {
  constructor(private tankRepository: ITankRepository) {}

  async execute(id: string, data: UpdateTankConfigDTO): Promise<Tank> {
    return await this.tankRepository.updateTank(id, data);
  }
}
