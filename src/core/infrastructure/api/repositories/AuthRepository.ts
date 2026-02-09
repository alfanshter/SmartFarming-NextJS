"use client";

import { IAuthRepository } from "@/core/domain/repositories/IAuthRepository";
import { LoginDTO, LoginResponse, User } from "@/core/domain/entities/User";
import { apiClient } from "../apiClient";

export class AuthRepository implements IAuthRepository {
  async login(credentials: LoginDTO): Promise<LoginResponse> {
    try {
      console.log("🔐 Logging in with:", credentials.email);
      const response = await apiClient.post<LoginResponse>("/auth/login", credentials);
      
      // Store tokens in localStorage
      if (response.data.tokens) {
        localStorage.setItem("accessToken", response.data.tokens.accessToken);
        localStorage.setItem("refreshToken", response.data.tokens.refreshToken);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
      
      console.log("✅ Login successful:", response.data.user);
      return response.data;
    } catch (error) {
      console.error("❌ Login failed:", error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      console.log("🚪 Logging out...");
      
      // Clear tokens from localStorage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      
      // Optional: call backend logout endpoint if exists
      // await apiClient.post("/auth/logout");
      
      console.log("✅ Logout successful");
    } catch (error) {
      console.error("❌ Logout failed:", error);
      // Still clear local storage even if API call fails
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const userStr = localStorage.getItem("user");
      if (!userStr) return null;
      
      const user = JSON.parse(userStr) as User;
      return user;
    } catch (error) {
      console.error("❌ Get current user failed:", error);
      return null;
    }
  }

  async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
    try {
      console.log("🔄 Refreshing token...");
      const response = await apiClient.post<{ accessToken: string }>("/auth/refresh", {
        refreshToken,
      });
      
      // Update access token in localStorage
      localStorage.setItem("accessToken", response.data.accessToken);
      
      console.log("✅ Token refreshed");
      return response.data;
    } catch (error) {
      console.error("❌ Token refresh failed:", error);
      throw error;
    }
  }
}
