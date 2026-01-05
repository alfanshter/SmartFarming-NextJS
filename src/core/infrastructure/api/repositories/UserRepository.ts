import { IUserRepository } from "@/src/core/domain/repositories/IUserRepository";
import { User } from "@/src/core/domain/entities/User";
import { apiClient } from "../apiClient";

export class UserRepository implements IUserRepository {
    private readonly endpoint = "/users";

    async getCurrentUser(): Promise<User> {
        const response = await apiClient.get<User>(`${this.endpoint}/me`);
        return response.data; 
    }

    async getUserById(id: string): Promise<User | null> {
        const response = await apiClient.get<User>(`${this.endpoint}/${id}`);
        return response.data;
    }
    async updateUser(id: string, data: Partial<User>): Promise<User> {
        const response = await apiClient.put<User>(`${this.endpoint}/${id}`, data);
        return response.data;
    }
    async deleteUser(id: string): Promise<void> {
        const response = await apiClient.delete<void>(`${this.endpoint}/${id}`);
        return response.data;
    }

    
}