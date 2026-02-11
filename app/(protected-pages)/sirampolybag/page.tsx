"use client";

import React, { useState, useEffect, useRef } from "react";
import { useGardenWatering } from "@/shared/hooks/useGardenWatering";

export default function SiramPolybagPage() {
  const {
    currentSession,
    history,
    historyCount,
    statistics,
    isLoading,
    error: apiError,
    startGardenWatering,
    stopGardenWatering,
    getCurrentSession,
    getHistory,
    getStatistics,
  } = useGardenWatering();

  const [duration, setDuration] = useState(30); // Default 30 menit
  const [notes, setNotes] = useState("");
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

  // Countdown timer effect dengan real-time sync dan auto-stop
  useEffect(() => {
    if (isRunning && currentSession) {
      // Fungsi untuk menghitung waktu tersisa berdasarkan server time
      const calculateRemainingTime = () => {
        const startTime = new Date(currentSession.startedAt);
        const now = new Date();
        const elapsedSeconds = Math.floor((now.getTime() - startTime.getTime()) / 1000);
        const totalSeconds = currentSession.durationMinutes * 60;
        const remaining = Math.max(0, totalSeconds - elapsedSeconds);
        return remaining;
      };

      // Update countdown setiap detik berdasarkan waktu nyata
      timerRef.current = setInterval(() => {
        const remaining = calculateRemainingTime();
        setRemainingTime(remaining);
        
        // Auto-stop ketika durasi habis
        if (remaining === 0) {
          stopGardenWatering();
        }
      }, 1000);
    } else if (!isRunning) {
      setRemainingTime(0);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, currentSession, stopGardenWatering]);

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

  // Format duration untuk display
  const formatDuration = (minutes: number): string => {
    if (minutes < 60) {
      return `${minutes} menit`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours} jam ${mins} menit` : `${hours} jam`;
  };

  // Handle start
  const handleStart = async () => {
    try {
      await startGardenWatering({
        durationMinutes: duration,
        notes: notes || undefined,
      });
      setNotes(""); // Clear notes after start
      
      // Refresh data
      await Promise.all([
        getHistory({ limit: 50 }),
        getStatistics(),
      ]);
    } catch (err) {
      console.error("Failed to start garden watering:", err);
    }
  };

  // Handle stop
  const handleStop = async () => {
    try {
      await stopGardenWatering({
        notes: "Dihentikan manual",
      });
      
      // Refresh data
      await Promise.all([
        getHistory({ limit: 50 }),
        getStatistics(),
      ]);
    } catch (err) {
      console.error("Failed to stop garden watering:", err);
    }
  };

  // Calculate progress percentage
  const progressPercentage = currentSession
    ? ((currentSession.durationMinutes * 60 - remainingTime) / (currentSession.durationMinutes * 60)) * 100
    : 0;

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          🌱 Siram Polybag
        </h1>
        <p className="text-gray-600">
          Sistem penyiraman polybag otomatis dengan timer
        </p>
      </div>

      {apiError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {apiError}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Control Card */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Kontrol Penyiraman
            </h2>

            {!isRunning ? (
              <div className="space-y-6">
                {/* Duration Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Durasi Penyiraman (menit)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="180"
                    value={duration}
                    onChange={(e) => setDuration(parseInt(e.target.value) || 1)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
                    placeholder="Masukkan durasi (1-180 menit)"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Range: 1-180 menit
                  </p>
                </div>

                {/* Notes Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Catatan (Opsional)
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
                    placeholder="Contoh: Penyiraman polybag area depan"
                    rows={3}
                  />
                </div>

                {/* Start Button */}
                <button
                  onClick={handleStart}
                  disabled={isLoading || duration < 1 || duration > 180}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      <span>Memulai...</span>
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>Mulai Menyiram</span>
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Status Running */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-lg font-semibold text-green-900">
                        Sedang Menyiram
                      </span>
                    </div>
                    <span className="text-3xl font-bold text-green-600">
                      {formatTime(remainingTime)}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Progress</span>
                      <span>{progressPercentage.toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-green-600 h-full rounded-full transition-all duration-1000 ease-linear"
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Durasi</p>
                      <p className="font-semibold text-gray-900">
                        {currentSession.durationMinutes} menit
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Mulai</p>
                      <p className="font-semibold text-gray-900">
                        {formatDateTime(currentSession.startedAt)}
                      </p>
                    </div>
                  </div>

                  {currentSession.notes && (
                    <div className="mt-4 pt-4 border-t border-green-200">
                      <p className="text-sm text-gray-600">Catatan:</p>
                      <p className="text-gray-900">{currentSession.notes}</p>
                    </div>
                  )}
                </div>

                {/* Stop Button */}
                <button
                  onClick={handleStop}
                  disabled={isLoading}
                  className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      <span>Menghentikan...</span>
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
                        />
                      </svg>
                      <span>Hentikan Penyiraman</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Statistics Card */}
        <div className="space-y-6">
          {statistics && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                📊 Statistik
              </h2>
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-blue-600 mb-1">Total Sesi</p>
                  <p className="text-2xl font-bold text-blue-900">
                    {statistics.totalSessions}
                  </p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-sm text-green-600 mb-1">Selesai</p>
                  <p className="text-2xl font-bold text-green-900">
                    {statistics.completedSessions}
                  </p>
                </div>
                <div className="bg-orange-50 rounded-lg p-4">
                  <p className="text-sm text-orange-600 mb-1">Dihentikan</p>
                  <p className="text-2xl font-bold text-orange-900">
                    {statistics.stoppedSessions}
                  </p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <p className="text-sm text-purple-600 mb-1">Total Durasi</p>
                  <p className="text-2xl font-bold text-purple-900">
                    {formatDuration(statistics.totalDurationMinutes)}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Rata-rata</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {statistics.averageDurationMinutes.toFixed(1)} mnt
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* History Table */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            📜 Riwayat Penyiraman
          </h2>
          <span className="text-sm text-gray-600">
            Total: {historyCount} sesi
          </span>
        </div>

        {history.length === 0 ? (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p className="mt-2 text-gray-500">Belum ada riwayat penyiraman</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Waktu
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Durasi
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Catatan
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {history.map((session) => (
                  <tr key={session.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDateTime(session.startedAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {session.totalDurationMinutes || session.durationMinutes} menit
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          session.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : session.status === "stopped"
                            ? "bg-orange-100 text-orange-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {session.status === "completed"
                          ? "Selesai"
                          : session.status === "stopped"
                          ? "Dihentikan"
                          : "Berjalan"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                      {session.notes || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
