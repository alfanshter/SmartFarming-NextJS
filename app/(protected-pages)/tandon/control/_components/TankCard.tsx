"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Tank } from "@/core/domain/entities/Tank";

interface TankCardProps {
  tank: Tank;
  onEdit: (tank: Tank) => void;
  onDelete: (id: string) => void;
  onToggleAgitator: (id: string, enabled: boolean) => void;
  onStartPump?: (id: string, durationMinutes?: number) => void;
  onStopPump?: (id: string) => void;
}

export default function TankCard({
  tank,
  onToggleAgitator,
  onStartPump,
  onStopPump,
}: TankCardProps) {
  const [manualMaxLevel, setManualMaxLevel] = useState(tank.manualFillMaxLevel);
  const [autoMinLevel, setAutoMinLevel] = useState(tank.autoFillMinLevel);
  const [autoMaxLevel, setAutoMaxLevel] = useState(tank.autoFillMaxLevel);
  const [autoFillEnabled, setAutoFillEnabled] = useState(tank.autoFillEnabled);
  const [isPumping, setIsPumping] = useState(false);
  const [pumpDuration, setPumpDuration] = useState(30); // Default 30 menit
  const [remainingTime, setRemainingTime] = useState(0); // Waktu tersisa dalam detik
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  const hasSensor = !!tank.sensorDeviceId;

  // Auto stop ketika timer habis
  const handleAutoStop = useCallback(() => {
    setIsPumping(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    // Call API to stop pump
    if (onStopPump) {
      onStopPump(tank.id);
    }
  }, [onStopPump, tank.id]);

  // Effect untuk countdown timer
  useEffect(() => {
    if (isPumping && remainingTime > 0) {
      timerRef.current = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 1) {
            // Timer selesai - akan ditrigger di effect berikutnya
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (isPumping && remainingTime === 0) {
      // Auto stop ketika countdown selesai
      handleAutoStop();
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPumping, remainingTime, handleAutoStop]);

  // Format waktu untuk display (MM:SS)
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleManualMaxLevelChange = (value: number) => {
    setManualMaxLevel(value);
  };

  const handleAutoMinLevelChange = (value: number) => {
    setAutoMinLevel(value);
  };

  const handleAutoMaxLevelChange = (value: number) => {
    setAutoMaxLevel(value);
  };

  const handleToggleAutoFill = () => {
    setAutoFillEnabled(!autoFillEnabled);
  };

  const handleStartPump = () => {
    setIsPumping(true);
    if (!hasSensor) {
      // Set countdown timer untuk tandon tanpa sensor
      setRemainingTime(pumpDuration * 60); // Convert menit ke detik
    }
    if (onStartPump) {
      onStartPump(tank.id, hasSensor ? undefined : pumpDuration);
    }
  };

  const handleStopPump = () => {
    setIsPumping(false);
    setRemainingTime(0);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (onStopPump) {
      onStopPump(tank.id);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="bg-linear-to-r from-green-500 to-green-600 px-6 py-4">
        <h3 className="text-xl font-bold text-white">{tank.name}</h3>
        {tank.description && (
          <p className="text-green-100 text-sm mt-1">{tank.description}</p>
        )}
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="space-y-6">
            <div className="bg-green-50 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-white p-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-600">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Pengaduk Tandon</div>
                    <div className="text-sm text-gray-500">{tank.agitatorEnabled ? "Aktif" : "Tidak aktif"}</div>
                  </div>
                </div>
                <button onClick={() => onToggleAgitator(tank.id, !tank.agitatorEnabled)} className={"relative inline-flex h-8 w-14 items-center rounded-full transition-colors " + (tank.agitatorEnabled ? "bg-green-600" : "bg-gray-300")}>
                  <span className={"inline-block h-6 w-6 transform rounded-full bg-white transition-transform " + (tank.agitatorEnabled ? "translate-x-7" : "translate-x-1")} />
                </button>
              </div>
            </div>

            {/* Batas Maximum - Hanya jika ada sensor */}
            {hasSensor ? (
              <div className="bg-white border-2 border-gray-200 rounded-xl p-4">
                <div className="mb-3">
                  <div className="font-semibold text-gray-900 mb-1">Batas Maksimum Pengisian</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm text-gray-600">Level Maksimum</span>
                    <span className="text-2xl font-bold text-green-600">{manualMaxLevel}%</span>
                    <span className="text-sm text-gray-500">({Math.round((manualMaxLevel / 100) * tank.capacity)}L)</span>
                  </div>
                </div>
                <input 
                  type="range" 
                  min="50" 
                  max="100" 
                  value={manualMaxLevel} 
                  onChange={(e) => handleManualMaxLevelChange(Number(e.target.value))} 
                  className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer accent-green-600" 
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>50%</span>
                  <span>75%</span>
                  <span>100%</span>
                </div>
                {manualMaxLevel >= 95 && (
                  <div className="mt-3 flex items-start gap-2 bg-orange-50 border border-orange-200 rounded-lg p-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-orange-600 shrink-0 mt-0.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                    </svg>
                    <p className="text-sm text-orange-700">Sensor pembatas air akan memicu alarm saat mencapai {manualMaxLevel}% untuk mencegah overflow</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-amber-600 shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                  </svg>
                  <div>
                    <div className="font-semibold text-amber-900 mb-1">Sensor Tidak Terhubung</div>
                    <p className="text-sm text-amber-700">Tambahkan sensor level air untuk mengaktifkan fitur monitoring level dan batas maksimum otomatis.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-white border-2 border-gray-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="bg-gray-100 p-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-600">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Pompa Manual</div>
                    <div className="text-sm text-gray-500">{isPumping ? "Sedang mengisi" : "Siap digunakan"}</div>
                  </div>
                </div>
              </div>
              
              {/* Durasi waktu untuk tanpa sensor */}
              {!hasSensor && (
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Durasi Pengisian (menit)
                  </label>
                  <input 
                    type="number" 
                    min="1" 
                    max="180" 
                    value={pumpDuration} 
                    onChange={(e) => setPumpDuration(Number(e.target.value))}
                    disabled={isPumping}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Pompa akan berjalan selama {pumpDuration} menit
                  </p>
                </div>
              )}

              {/* Countdown Timer - Tampil saat pompa aktif tanpa sensor */}
              {!hasSensor && isPumping && remainingTime > 0 && (
                <div className="mb-3 bg-green-50 border-2 border-green-200 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-green-100 p-2 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-600 animate-pulse">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-700">Waktu Tersisa</div>
                        <div className="text-3xl font-bold text-green-600 font-mono tabular-nums">
                          {formatTime(remainingTime)}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-500">Progress</div>
                      <div className="text-sm font-semibold text-green-600">
                        {Math.round(((pumpDuration * 60 - remainingTime) / (pumpDuration * 60)) * 100)}%
                      </div>
                    </div>
                  </div>
                  {/* Progress Bar */}
                  <div className="mt-3 w-full bg-green-100 rounded-full h-2.5">
                    <div 
                      className="bg-green-600 h-2.5 rounded-full transition-all duration-1000 ease-linear"
                      style={{ width: `${((pumpDuration * 60 - remainingTime) / (pumpDuration * 60)) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <button 
                  onClick={handleStartPump} 
                  disabled={isPumping} 
                  className={"flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold transition-all " + (isPumping ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-green-600 text-white hover:bg-green-700 shadow-lg shadow-green-200")}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                  </svg>
                  Mulai Isi {!hasSensor && `(${pumpDuration}m)`}
                </button>
                <button 
                  onClick={handleStopPump} 
                  disabled={!isPumping} 
                  className={"flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold transition-all " + (!isPumping ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-gray-600 text-white hover:bg-gray-700")}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 7.5A2.25 2.25 0 0 1 7.5 5.25h9a2.25 2.25 0 0 1 2.25 2.25v9a2.25 2.25 0 0 1-2.25 2.25h-9a2.25 2.25 0 0 1-2.25-2.25v-9Z" />
                  </svg>
                  Stop
                </button>
              </div>
            </div>

            {/* Pengisian Otomatis - Hanya jika ada sensor */}
            {hasSensor ? (
              <div className="bg-white border-2 border-gray-200 rounded-xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={"p-2 rounded-lg " + (autoFillEnabled ? "bg-green-100" : "bg-gray-100")}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={"w-6 h-6 " + (autoFillEnabled ? "text-green-600" : "text-gray-400")}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Pengisian Otomatis</div>
                      <div className={"text-sm " + (autoFillEnabled ? "text-green-600" : "text-gray-500")}>
                        {autoFillEnabled ? "Aktif" : "Tidak aktif"}
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={handleToggleAutoFill} 
                    className={"relative inline-flex h-8 w-14 items-center rounded-full transition-colors " + (autoFillEnabled ? "bg-green-600" : "bg-gray-300")}
                  >
                    <span className={"inline-block h-6 w-6 transform rounded-full bg-white transition-transform " + (autoFillEnabled ? "translate-x-7" : "translate-x-1")} />
                  </button>
                </div>

                <div className={autoFillEnabled ? "opacity-50" : ""}>
                  <div className="mb-4">
                    <div className="flex items-baseline justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Level Minimum</span>
                      <span className="text-xl font-bold text-green-600">{autoMinLevel}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="10" 
                      max="80" 
                      value={autoMinLevel} 
                      onChange={(e) => handleAutoMinLevelChange(Number(e.target.value))} 
                      disabled={autoFillEnabled}
                      className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer accent-green-600 disabled:cursor-not-allowed" 
                    />
                  </div>

                  <div>
                    <div className="flex items-baseline justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Level Target</span>
                      <span className="text-xl font-bold text-green-600">{autoMaxLevel}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="50" 
                      max="100" 
                      value={autoMaxLevel} 
                      onChange={(e) => handleAutoMaxLevelChange(Number(e.target.value))} 
                      disabled={autoFillEnabled}
                      className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer accent-green-600 disabled:cursor-not-allowed" 
                    />
                  </div>

                  {!autoFillEnabled && (
                    <div className="mt-4 flex items-start gap-2 bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-600 shrink-0 mt-0.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                      </svg>
                      <p className="text-sm text-blue-700">Atur level minimum {autoMinLevel}% dan target {autoMaxLevel}%, lalu aktifkan untuk memulai pengisian otomatis</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-400 shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" />
                  </svg>
                  <div>
                    <div className="font-semibold text-gray-700 mb-1">Pengisian Otomatis Tidak Tersedia</div>
                    <p className="text-sm text-gray-600">Fitur ini memerlukan sensor level air. Silakan tambahkan sensor untuk mengaktifkan pengisian otomatis berdasarkan level tandon.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white border-2 border-gray-200 rounded-xl p-4">
          <h4 className="font-semibold text-gray-900 mb-4">Statistik Penggunaan Air</h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </div>
              <div className="text-xs text-gray-500 mb-1">Hari Ini</div>
              <div className="text-2xl font-bold text-blue-600">245L</div>
            </div>

            <div className="text-center">
              <div className="bg-green-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                </svg>
              </div>
              <div className="text-xs text-gray-500 mb-1">Minggu Ini</div>
              <div className="text-2xl font-bold text-green-600">1520L</div>
            </div>

            <div className="text-center">
              <div className="bg-purple-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-purple-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                </svg>
              </div>
              <div className="text-xs text-gray-500 mb-1">Bulan Ini</div>
              <div className="text-2xl font-bold text-purple-600">6340L</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
