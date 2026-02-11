import { ITankRepository } from "../../../domain/repositories/ITankRepository";

export class DeleteTank {
  constructor(private tankRepository: ITankRepository) {}

  async execute(id: string): Promise<void> {
    return await this.tankRepository.deleteTank(id);
  }
}
