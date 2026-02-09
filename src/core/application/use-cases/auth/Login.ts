import { IAuthRepository } from "@/core/domain/repositories/IAuthRepository";
import { LoginDTO, LoginResponse } from "@/core/domain/entities/User";

export class Login {
  constructor(private authRepository: IAuthRepository) {}

  async execute(credentials: LoginDTO): Promise<LoginResponse> {
    // Validate credentials
    if (!credentials.email || !credentials.password) {
      throw new Error("Email and password are required");
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(credentials.email)) {
      throw new Error("Invalid email format");
    }

    return await this.authRepository.login(credentials);
  }
}
