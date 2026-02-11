"use client";

import React, { useState, useEffect, useRef } from "react";
import { useFlushing } from "@/shared/hooks/useFlushing";

export default function FlushingSystemPage() {
  const {
    currentSession,
    history,
    historyCount,
    statistics,
    isLoading,
    error: apiError,
    startFlushing,
    stopFlushing,
    getCurrentSession,
    getHistory,
    getStatistics,
  } = useFlushing();

  const [duration, setDuration] = useState(15); // Default 15 menit
  const [remainingTime, setRemainingTime] = useState(0); // Waktu tersisa dalam detik
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Derived state
  const isRunning = !!currentSession && currentSession.status === "running";

  // Load data on mount
  useEffect(() => {
    getCurrentSession();
    getHistory({ limit: 50 });
    getStatistics();
  }, [getCurrentSession, getHistory, getStatistics]);

  // Sync countdown dengan current session
  useEffect(() => {
    if (currentSession && isRunning) {
      const startTime = new Date(currentSession.startedAt);
      const now = new Date();
      const elapsedSeconds = Math.floor((now.getTime() - startTime.getTime()) / 1000);
      const totalSeconds = currentSession.durationMinutes * 60;
      const remaining = Math.max(0, totalSeconds - elapsedSeconds);
      setRemainingTime(remaining);
    } else {
      setRemainingTime(0);
    }
  }, [currentSession, isRunning]);

  // Countdown timer effect
  useEffect(() => {
    if (isRunning && remainingTime > 0) {
      timerRef.current = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 1) {
            // Timer selesai - refresh data
            getCurrentSession();
            getHistory({ limit: 50 });
            getStatistics();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, remainingTime, getCurrentSession, getHistory, getStatistics]);

  // Format waktu untuk display (MM:SS)
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Format date untuk display
  const formatDateTime = (date: Date): string => {
    return new Intl.DateTimeFormat("id-ID", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  };

  const handleStart = async () => {
    try {
      await startFlushing({
        durationMinutes: duration,
        notes: `Flushing rutin - ${duration} menit`,
      });
      // Refresh current session
      await getCurrentSession();
    } catch (error) {
      console.error("Failed to start flushing:", error);
    }
  };

  const handleStop = async () => {
    try {
      await stopFlushing({
        notes: "Dihentikan manual oleh user",
      });
      // Refresh data
      await getCurrentSession();
      await getHistory({ limit: 50 });
      await getStatistics();
    } catch (error) {
      console.error("Failed to stop flushing:", error);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 p-4 sm:p-6 lg:p-10">
      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Flushing System
            </h1>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">
              Sistem pembilasan otomatis untuk menjaga kebersihan pipa irigasi
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className={`px-4 py-2 rounded-xl font-semibold ${
              isRunning 
                ? "bg-green-100 text-green-700 border-2 border-green-300" 
                : "bg-gray-100 text-gray-600 border-2 border-gray-300"
            }`}>
              {isRunning ? "● Aktif" : "○ Tidak Aktif"}
            </div>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {apiError && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-red-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
              />
            </svg>
            <div>
              <p className="font-semibold text-red-800">Error</p>
              <p className="text-sm text-red-600">{apiError}</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Control Panel */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-linear-to-r from-blue-500 to-blue-600 px-6 py-4">
            <h3 className="text-xl font-bold text-white">Panel Kontrol</h3>
          </div>

          <div className="p-6 space-y-6">
            {/* Duration Input */}
            {!isRunning && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Durasi Flushing (menit)
                </label>
                <input
                  type="number"
                  min="1"
                  max="120"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 text-lg"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Sistem akan melakukan pembilasan selama {duration} menit
                </p>
              </div>
            )}

            {/* Countdown Display */}
            {isRunning && remainingTime > 0 && (
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-8 h-8 text-blue-600 animate-pulse"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-700">
                        Waktu Tersisa
                      </div>
                      <div className="text-4xl font-bold text-blue-600 font-mono tabular-nums">
                        {formatTime(remainingTime)}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">Progress</div>
                    <div className="text-2xl font-semibold text-blue-600">
                      {currentSession && Math.round(
                        ((currentSession.durationMinutes * 60 - remainingTime) / (currentSession.durationMinutes * 60)) * 100
                      )}
                      %
                    </div>
                  </div>
                </div>
                {/* Progress Bar */}
                <div className="w-full bg-blue-100 rounded-full h-3">
                  <div
                    className="bg-blue-600 h-3 rounded-full transition-all duration-1000 ease-linear"
                    style={{
                      width: currentSession ? `${
                        ((currentSession.durationMinutes * 60 - remainingTime) / (currentSession.durationMinutes * 60)) * 100
                      }%` : '0%',
                    }}
                  ></div>
                </div>
                <p className="text-xs text-gray-600 mt-3 text-center">
                  Sistem sedang melakukan pembilasan pipa irigasi...
                </p>
              </div>
            )}

            {/* Control Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleStart}
                disabled={isRunning || isLoading}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold transition-all ${
                  isRunning || isLoading
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200 hover:scale-105"
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Loading...
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
                      />
                    </svg>
                    Mulai Flushing
                  </>
                )}
              </button>
              <button
                onClick={handleStop}
                disabled={!isRunning || isLoading}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold transition-all ${
                  !isRunning || isLoading
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-200"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6"
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

            {/* Info Card */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-blue-600 shrink-0"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                  />
                </svg>
                <div className="text-sm text-blue-700">
                  <p className="font-semibold mb-1">Tentang Flushing System</p>
                  <p>
                    Sistem ini secara otomatis membersihkan pipa irigasi dengan
                    mengalirkan air bertekanan tinggi untuk menghilangkan
                    kotoran, lumut, dan endapan mineral yang dapat menghambat
                    aliran air.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* History Panel */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-linear-to-r from-purple-500 to-purple-600 px-6 py-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">
                Riwayat Flushing ({historyCount})
              </h3>
            </div>
          </div>

          <div className="p-6">
            {isLoading && history.length === 0 ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Memuat riwayat...</p>
              </div>
            ) : history.length === 0 ? (
              <div className="text-center py-12">
                <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-10 h-10 text-gray-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Belum Ada Riwayat
                </h3>
                <p className="text-gray-600 text-sm">
                  Riwayat flushing akan muncul di sini setelah Anda menjalankan
                  sistem pembilasan.
                </p>
              </div>
            ) : (
              <div className="space-y-3 max-h-150 overflow-y-auto">
                {history.map((item) => {
                  const actualDuration = item.actualDurationMinutes || item.durationMinutes;
                  
                  return (
                    <div
                      key={item.id}
                      className="bg-gray-50 border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <div
                            className={`p-2 rounded-lg ${
                              item.status === "completed"
                                ? "bg-green-100"
                                : "bg-orange-100"
                            }`}
                          >
                            {item.status === "completed" ? (
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
                                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                />
                              </svg>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6 text-orange-600"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                                />
                              </svg>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span
                                className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                                  item.status === "completed"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-orange-100 text-orange-700"
                                }`}
                              >
                                {item.status === "completed"
                                  ? "Selesai"
                                  : "Dihentikan"}
                              </span>
                              <span className="text-sm font-semibold text-gray-700">
                                {actualDuration} menit
                              </span>
                            </div>
                            {item.notes && (
                              <p className="text-xs text-gray-600 mb-1">{item.notes}</p>
                            )}
                            <div className="text-xs text-gray-500 space-y-0.5">
                              <div className="flex items-center gap-1">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-3.5 h-3.5"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
                                  />
                                </svg>
                                Mulai: {formatDateTime(item.startedAt)}
                              </div>
                              {item.endedAt && (
                                <div className="flex items-center gap-1">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-3.5 h-3.5"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M5.25 7.5A2.25 2.25 0 0 1 7.5 5.25h9a2.25 2.25 0 0 1 2.25 2.25v9a2.25 2.25 0 0 1-2.25 2.25h-9a2.25 2.25 0 0 1-2.25-2.25v-9Z"
                                    />
                                  </svg>
                                  Selesai: {formatDateTime(item.endedAt)}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="mt-6 bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          Statistik Flushing
        </h3>
        {isLoading && !statistics ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
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
                    d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </div>
              <div className="text-xs text-gray-500 mb-1">Total Flushing</div>
              <div className="text-2xl font-bold text-blue-600">
                {statistics?.totalSessions || 0}
              </div>
            </div>

            <div className="bg-green-50 rounded-xl p-4 text-center">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
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
                    d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </div>
              <div className="text-xs text-gray-500 mb-1">Selesai Normal</div>
              <div className="text-2xl font-bold text-green-600">
                {statistics?.completedSessions || 0}
              </div>
            </div>

            <div className="bg-purple-50 rounded-xl p-4 text-center">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
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
                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </div>
              <div className="text-xs text-gray-500 mb-1">Total Durasi</div>
              <div className="text-2xl font-bold text-purple-600">
                {statistics?.totalDurationMinutes || 0} min
              </div>
            </div>

            <div className="bg-orange-50 rounded-xl p-4 text-center">
              <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-orange-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
                  />
                </svg>
              </div>
              <div className="text-xs text-gray-500 mb-1">Rata-rata</div>
              <div className="text-2xl font-bold text-orange-600">
                {statistics?.averageDurationMinutes?.toFixed(1) || 0} min
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
