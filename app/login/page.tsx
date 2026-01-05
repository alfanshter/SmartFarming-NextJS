"use client";

import React from "react";
import Link from "next/link";
import { error } from "console";

export default function LoginPage() {
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

          <form className="space-y-4">
            {/* email */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email Anda"
                className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none  transition-all text-black"
                required
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
                placeholder="Password Anda"
                className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none  transition-all text-black"
                required
              />
            </div>

            {/* rememberme and forgot password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
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
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Masuk
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
