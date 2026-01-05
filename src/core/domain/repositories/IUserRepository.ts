import { User } from "../entities/User";

export interface IUserRepository {
    getCurrentUser(): Promise<User>;
    getUserById(id : string) : Promise<User | null>;
    updateUser(id : string, data : Partial<User>) : Promise<User>;
    deleteUser(id : string) : Promise<void>;
}