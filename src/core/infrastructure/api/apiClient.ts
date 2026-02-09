"use client";

import axios from "axios";

export const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

//request interceptor to add auth token
apiClient.interceptors.request.use((config) => {
    // Only access localStorage on client-side
    if (typeof window !== "undefined") {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    console.log("🌐 API Request:", config.method?.toUpperCase(), config.url);
    return config;
}, (error) => {
    console.warn("⚠️ Request Error:", error);
    return Promise.reject(error);
});

//response interceptor to handle responses globally
apiClient.interceptors.response.use(
    (response) => {
        console.log("✅ API Response:", response.status, response.config.url);
        return response;
    },
    (error) => {
        // Use console.warn instead of console.error to avoid Next.js dev overlay
        console.warn("⚠️ API Error:", {
            status: error.response?.status,
            url: error.config?.url,
            message: error.message,
            data: error.response?.data
        });

        if (error.response?.status === 401) {
            //handle unauthorized errors globally
            if (typeof window !== "undefined") {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("user");
                window.location.href = "/login";
            }
        }

        return Promise.reject(error);
    }
);

