"use client";

import React, { useState } from "react";

export default function KontrolTandonPage() {
  // Tank control states
  const [isMixerActive, setIsMixerActive] = useState(false);
  const [isPumpActive, setIsPumpActive] = useState(false);
  const [maxFillLevel, setMaxFillLevel] = useState(95); // Percentage
  const [isAutoFillActive, setIsAutoFillActive] = useState(true);
  const [minLevel, setMinLevel] = useState(65); // Percentage
  const [targetLevel, setTargetLevel] = useState(90); // Percentage
  const [waterStats] = useState({
    today: 245, // Liters
    thisWeek: 1520,
    thisMonth: 6340,
  });

  return (
    <div className="min-h-screen bg-green-50 p-4 sm:p-6 lg:p-10">
      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Kontrol Tandon</h1>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">
          Kelola pengisian tandon, pompa, dan pengaduk secara manual atau otomatis
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Pengaduk Tandon Card */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-gray-100 p-3 rounded-xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-gray-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Pengaduk Tandon</h3>
                  <p className="text-sm text-gray-500">
                    {isMixerActive ? "Aktif" : "Tidak aktif"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsMixerActive(!isMixerActive)}
                className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors ${
                  isMixerActive ? "bg-green-600" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                    isMixerActive ? "translate-x-8" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Pompa Manual Card */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-gray-100 p-3 rounded-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-gray-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 0 6h13.5a3 3 0 1 0 0-6m-16.5-3a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3m-19.5 0a4.5 4.5 0 0 1 .9-2.7L5.737 5.1a3.375 3.375 0 0 1 2.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 0 1 .9 2.7m0 0a3 3 0 0 1-3 3m0 3h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Zm-3 6h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Pompa Manual</h3>
                <p className="text-sm text-gray-500">
                  {isPumpActive ? "Sedang mengisi" : "Siap digunakan"}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setIsPumpActive(true)}
                disabled={isPumpActive}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all ${
                  isPumpActive
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-green-600 text-white hover:bg-green-700 hover:scale-105"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
                  />
                </svg>
                Mulai Isi
              </button>
              <button
                onClick={() => setIsPumpActive(false)}
                disabled={!isPumpActive}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all ${
                  !isPumpActive
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-red-600 text-white hover:bg-red-700 hover:scale-105"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.25 7.5A2.25 2.25 0 0 1 7.5 5.25h9a2.25 2.25 0 0 1 2.25 2.25v9a2.25 2.25 0 0 1-2.25 2.25h-9a2.25 2.25 0 0 1-2.25-2.25v-9Z"
                  />
                </svg>
                Stop
              </button>
            </div>
          </div>

          {/* Batas Maksimum Pengisian Card */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Batas Maksimum Pengisian</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Level Maksimum</span>
                <span className="text-xl font-bold text-green-600">{maxFillLevel}% (950L)</span>
              </div>
              
              {/* Custom Slider */}
              <div className="relative pt-1">
                <input
                  type="range"
                  min="50"
                  max="100"
                  step="1"
                  value={maxFillLevel}
                  onChange={(e) => setMaxFillLevel(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                  style={{
                    background: `linear-gradient(to right, #16a34a 0%, #16a34a ${((maxFillLevel - 50) / 50) * 100}%, #e5e7eb ${((maxFillLevel - 50) / 50) * 100}%, #e5e7eb 100%)`,
                  }}
                />
              </div>
              
              <div className="flex justify-between text-xs text-gray-500">
                <span>50%</span>
                <span>75%</span>
                <span>100%</span>
              </div>
              
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-4">
                <div className="flex gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-amber-600 shrink-0 mt-0.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                    />
                  </svg>
                  <p className="text-xs text-amber-800">
                    Sensor pembatas air akan memicu alarm saat mencapai {maxFillLevel}% untuk mencegah overflow
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Pengisian Otomatis Card */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-3 rounded-xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-green-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Pengisian Otomatis</h3>
                  <p className="text-sm text-gray-500">
                    {isAutoFillActive ? "Aktif" : "Tidak aktif"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsAutoFillActive(!isAutoFillActive)}
                className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors ${
                  isAutoFillActive ? "bg-green-600" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                    isAutoFillActive ? "translate-x-8" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="space-y-6">
              {/* Level Minimum */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Level Minimum</span>
                  <span className="text-lg font-bold text-green-600">{minLevel}%</span>
                </div>
                <div className="relative pt-1">
                  <input
                    type="range"
                    min="50"
                    max="100"
                    step="5"
                    value={minLevel}
                    onChange={(e) => setMinLevel(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #16a34a 0%, #16a34a ${((minLevel - 50) / 50) * 100}%, #e5e7eb ${((minLevel - 50) / 50) * 100}%, #e5e7eb 100%)`,
                    }}
                  />
                </div>
              </div>

              {/* Level Target */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Level Target</span>
                  <span className="text-lg font-bold text-green-600">{targetLevel}%</span>
                </div>
                <div className="relative pt-1">
                  <input
                    type="range"
                    min="50"
                    max="100"
                    step="5"
                    value={targetLevel}
                    onChange={(e) => setTargetLevel(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #16a34a 0%, #16a34a ${((targetLevel - 50) / 50) * 100}%, #e5e7eb ${((targetLevel - 50) / 50) * 100}%, #e5e7eb 100%)`,
                    }}
                  />
                </div>
              </div>

              {/* Info */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-green-600 shrink-0 mt-0.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                    />
                  </svg>
                  <p className="text-xs text-green-800">
                    Tandon akan terisi otomatis saat level mencapai {minLevel}% dan berhenti di {targetLevel}%
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Statistik Penggunaan Air Card */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="font-semibold text-gray-800 mb-6">Statistik Penggunaan Air</h3>
            <div className="grid grid-cols-3 gap-4">
              {/* Hari Ini */}
              <div className="text-center">
                <div className="bg-blue-100 p-4 rounded-full inline-flex items-center justify-center mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-blue-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </div>
                <p className="text-xs text-gray-500 mb-1">Hari Ini</p>
                <p className="text-xl font-bold text-green-600">{waterStats.today}L</p>
              </div>

              {/* Minggu Ini */}
              <div className="text-center">
                <div className="bg-green-100 p-4 rounded-full inline-flex items-center justify-center mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-green-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                    />
                  </svg>
                </div>
                <p className="text-xs text-gray-500 mb-1">Minggu Ini</p>
                <p className="text-xl font-bold text-green-600">{waterStats.thisWeek}L</p>
              </div>

              {/* Bulan Ini */}
              <div className="text-center">
                <div className="bg-purple-100 p-4 rounded-full inline-flex items-center justify-center mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-purple-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
                    />
                  </svg>
                </div>
                <p className="text-xs text-gray-500 mb-1">Bulan Ini</p>
                <p className="text-xl font-bold text-purple-600">{waterStats.thisMonth}L</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
