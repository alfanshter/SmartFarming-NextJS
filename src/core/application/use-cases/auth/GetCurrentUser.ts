import { IAuthRepository } from "@/core/domain/repositories/IAuthRepository";
import { User } from "@/core/domain/entities/User";

export class GetCurrentUser {
  constructor(private authRepository: IAuthRepository) {}

  async execute(): Promise<User | null> {
    return await this.authRepository.getCurrentUser();
  }
}
