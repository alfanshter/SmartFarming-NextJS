"use client";

import React from "react";
import ZonaDrip from "./_components/ZonaDrip";
import ActionButton from "./_components/ActionButton";
import { useZones } from "@/shared/hooks/useZones";

export default function PenyiramanManualPage() {
  const { zones, isLoading, error, startZone, stopZone, fetchZones } = useZones();

  // AKTIFKAN SEMUA (start semua zona dengan durasi masing-masing)
  const aktifkanSemua = async () => {
    try {
      for (const zone of zones) {
        if (!zone.isActive) {
          await startZone(zone.id, zone.durationMinutes, zone.durationSeconds);
        }
      }
      await fetchZones(); // Refresh data
    } catch (err) {
      console.error("Error activating all zones:", err);
    }
  };

  const stopSemua = async () => {
    try {
      for (const zone of zones) {
        if (zone.isActive) {
          await stopZone(zone.id);
        }
      }
      await fetchZones(); // Refresh data
    } catch (err) {
      console.error("Error stopping all zones:", err);
    }
  };

  // TOGGLE PER ZONA
  const toggleZona = async (id: string, isActive: boolean, minutes: number, seconds: number) => {
    try {
      if (isActive) {
        await stopZone(id);
      } else {
        await startZone(id, minutes, seconds);
      }
      await fetchZones(); // Refresh data
    } catch (err) {
      console.error("Error toggling zone:", err);
    }
  };

  if (isLoading && zones.length === 0) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 text-green-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-4 text-gray-600">Memuat zona...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-green-50 p-10">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-red-800 font-semibold mb-2">Error</h3>
          <p className="text-red-600">{error}</p>
          <button 
            onClick={fetchZones}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 p-10 y-6">
      {/* Error Alert (jika ada error saat toggle) */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-300 rounded-lg p-4 flex items-start gap-3">
          <svg className="w-6 h-6 text-red-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="flex-1">
            <h4 className="text-red-800 font-semibold mb-1">Terjadi Kesalahan</h4>
            <p className="text-red-700 text-sm">{error}</p>
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="text-red-600 hover:text-red-800 font-medium text-sm"
          >
            Reload
          </button>
        </div>
      )}
      
      {/* tombol penyiraman manual */}
      <div className="flex justify-start gap-4">\
        <ActionButton
          label="Aktifkan Semua"
          variant="primary"
          onClick={aktifkanSemua}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
              />
            </svg>
          }
        />

        <ActionButton
          label="Stop Semua"
          variant="outline"
          onClick={stopSemua}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 9.563C9 9.252 9.252 9 9.563 9h4.874c.311 0 .563.252.563.563v4.874c0 .311-.252.563-.563.563H9.564A.562.562 0 0 1 9 14.437V9.564Z"
              />
            </svg>
          }
        />
      </div>

      {/* Zona Drip */}
      {zones.map((zone) => (
        <ZonaDrip
          key={zone.id}
          zona={{
            id: zone.id,
            name: zone.name,
            description: zone.description,
            durationMinutes: zone.durationMinutes,
            durationSeconds: zone.durationSeconds,
          }}
          active={zone.isActive}
          onToggle={(minutes, seconds) => toggleZona(zone.id, zone.isActive, minutes, seconds)}
          remainingSeconds={zone.remainingSeconds}
        />
      ))}
    </div>
  );
}
