import React from "react";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-green-700 flex items-center justify-center">
      {/* Main Container */}
      <div className="w-full max-w-md">
        {/* Logo dan Title */}
        <div className="text-center mb-8">
          {/* icon timbangan */}
          <div className="inline-flex items-center justify-center bg-white w-20 h-20 rounded-full shadow-lg mb-4">
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
          {/* title */}
          <h1 className="text-white text-2xl font-bold mb-4">
            Smartfarming Register
          </h1>
          <p className="text-white text-lg">
            Sistem Manajemen Pertanian Modern
          </p>
        </div>

        {/* register card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          {/* teks register */}
          <div className="flex items-center justify-center mb-6">
            <h1 className="text-black font-bold text-2xl">Register</h1>
          </div>
          {/* form */}
          <form className="space-y-4">
            {/* email */}
            <div>
              <label className="block  text-black font-medium"> Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email Anda"
                className="w-full bg-gray-50 rounded-lg px-3 py-4  text-black border-0 focus:ring-2 focus:ring-green-600 focus:outline-none transition-all"
              />
            </div>

            <div>
              <label className="block  text-black font-medium"> Nama</label>
              <input
                type="text"
                name="name"
                placeholder="Nama Anda"
                className="w-full bg-gray-50 rounded-lg px-3 py-4  text-black border-0 focus:ring-2 focus:ring-green-600 focus:outline-none transition-all"
              />
            </div>

            <div>
              <label className="block  text-black font-medium"> Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password Anda"
                className="w-full bg-gray-50 rounded-lg px-3 py-4  text-black border-0 focus:ring-2 focus:ring-green-600 focus:outline-none transition-all"
              />
            </div>

            <div>
              <label className="block  text-black font-medium">
                {" "}
                Konfirmasi Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Konfirmasi Password Anda"
                className="w-full bg-gray-50 rounded-lg px-3 py-4  text-black border-0 focus:ring-2 focus:ring-green-600 focus:outline-none transition-all"
              />
            </div>
            {/* register button */}
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-all"
            >
              Register
            </button>
            
          </form>
        </div>
      </div>
    </div>
  );
}
