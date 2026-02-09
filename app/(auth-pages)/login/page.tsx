"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/shared/contexts/AuthContext";

export default function LoginPage() {
  const { login, isLoading, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await login({ email, password });
      // Redirect will be handled by AuthContext
    } catch (err) {
      // Error will be handled by AuthContext
      console.error("Login error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-green-700 flex items-center justify-center p-4">
      {/* Main Container */}
      <div className="w-full max-w-md">
        {/* Logo dan Title */}
        <div className="text-center mb-8">
          {/* icon timbangan */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4 shadow-lg">
            <svg
              className="w-12 h-12 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
              />
            </svg>
          </div>
          <h1 className="text-white text-2xl font-bold mb-2">
            Smart Farming Login
          </h1>
          <p className="text-white text-lg">
            Sistem Manajemen Pertanian Modern
          </p>
        </div>

        {/* login card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          {/* login title */}
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Login</h2>
          
          {/* error message */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* email */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@smartfarming.com"
                className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none  transition-all text-black"
                required
                disabled={isLoading}
              />
            </div>
            {/* password input */}

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password Anda"
                className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none  transition-all text-black"
                required
                disabled={isLoading}
              />
            </div>

            {/* rememberme and forgot password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
                  disabled={isLoading}
                />
                <span className="ml-2 text-gray-700 text-sm"> Ingat Saya</span>
              </label>

              <Link
                href="#"
                className="text-green-600 hover:text-green-700 font-medium text-sm"
              >
                Lupa Password?
              </Link>
            </div>

            {/* submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Memproses...
                </span>
              ) : (
                "Masuk"
              )}
            </button>
          </form>

          {/* register link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Belum Punya akun ?{" "}
              <Link
                href="#"
                className="text-green-600 hover:text-green-700 font-semibold"
              >
                Daftar
              </Link>
            </p>
          </div>
        </div>

        <div className="text-center mt-6">
            <p className="text-white text-sm">  © 2026 Smart Farming. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
