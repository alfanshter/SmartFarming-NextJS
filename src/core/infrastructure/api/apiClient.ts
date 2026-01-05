import axios from "axios";
import { error } from "console";
import { config } from "process";

export const apiClient = axios.create({
    baseURL: process.env.API_BASE_URL || "http://localhost:3000/api",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

//request interceptor to add auth token
apiClient.interceptors.request.use((config) => {
    // You can add authorization headers or other custom logic here
    const token = localStorage.getItem("token");
    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
},(error) => {
    return Promise.reject(error);
})

//response interceptor to handle responses globally
apiClient.interceptors.response.use((response) => response,(error)=>{
    if (error.response?.status === 401) {
        //handle unauthorized errors globally
        localStorage.removeItem("token");
        window.location.href = "/login";
    }

    return Promise.reject(error);
})

