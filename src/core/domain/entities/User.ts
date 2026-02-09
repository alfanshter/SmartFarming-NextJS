// User entity matching backend response
export interface User {
    id: string;
    email: string;
    fullName: string;
    role: "admin" | "user";
}

// Login request DTO
export interface LoginDTO {
    email: string;
    password: string;
}

// Auth tokens
export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}

// Login response from API
export interface LoginResponse {
    user: User;
    tokens: AuthTokens;
}

// Current user state (includes token)
export interface AuthUser extends User {
    accessToken?: string;
}