import { IAuthRepository } from "@/core/domain/repositories/IAuthRepository";

export class Logout {
  constructor(private authRepository: IAuthRepository) {}

  async execute(): Promise<void> {
    await this.authRepository.logout();
  }
}
