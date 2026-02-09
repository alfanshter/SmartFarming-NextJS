"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User, LoginDTO } from "@/core/domain/entities/User";
import { AuthRepository } from "@/core/infrastructure/api/repositories/AuthRepository";
import { Login } from "@/core/application/use-cases/auth/Login";
import { Logout } from "@/core/application/use-cases/auth/Logout";
import { GetCurrentUser } from "@/core/application/use-cases/auth/GetCurrentUser";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginDTO) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Initialize use cases
let authRepository: AuthRepository | null = null;
let loginUseCase: Login | null = null;
let logoutUseCase: Logout | null = null;
let getCurrentUserUseCase: GetCurrentUser | null = null;

const initializeAuthUseCases = () => {
  if (typeof window !== "undefined" && !authRepository) {
    authRepository = new AuthRepository();
    loginUseCase = new Login(authRepository);
    logoutUseCase = new Logout(authRepository);
    getCurrentUserUseCase = new GetCurrentUser(authRepository);
  }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      initializeAuthUseCases();
      
      try {
        if (!getCurrentUserUseCase) {
          throw new Error("Auth use cases not initialized");
        }
        
        const currentUser = await getCurrentUserUseCase.execute();
        setUser(currentUser);
      } catch (err) {
        console.warn("No authenticated user:", err);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials: LoginDTO) => {
    initializeAuthUseCases();
    
    setIsLoading(true);
    setError(null);
    
    try {
      if (!loginUseCase) {
        throw new Error("Auth use cases not initialized");
      }
      
      const response = await loginUseCase.execute(credentials);
      setUser(response.user);
      
      // Redirect to dashboard after successful login
      router.push("/dashboard");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Login failed";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    initializeAuthUseCases();
    
    try {
      if (!logoutUseCase) {
        throw new Error("Auth use cases not initialized");
      }
      
      await logoutUseCase.execute();
      setUser(null);
      
      // Redirect to login page
      router.push("/login");
    } catch (err) {
      console.error("Logout error:", err);
      // Clear user state even if API call fails
      setUser(null);
      router.push("/login");
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
