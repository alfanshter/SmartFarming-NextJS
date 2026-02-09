import { LoginDTO, LoginResponse, User } from "../entities/User";

export interface IAuthRepository {
  login(credentials: LoginDTO): Promise<LoginResponse>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<User | null>;
  refreshToken(refreshToken: string): Promise<{ accessToken: string }>;
}
