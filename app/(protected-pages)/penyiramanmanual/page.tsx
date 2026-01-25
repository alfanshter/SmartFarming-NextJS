"use client";

import React from "react";
import { useState } from "react";
import ZonaDrip from "./_components/ZonaDrip";
import ActionButton from "./_components/ActionButton";
export default function PenyiramanManualPage() {
  const zonaList = [
    { id: 1, name: "Zona A" },
    { id: 2, name: "Zona B" },
    { id: 3, name: "Zona C" },
  ];

  const [activeZones, setActiveZones] = useState<number[]>([]);
  
  // State untuk menyimpan sisa detik per zona
  const [zonaSisaDetik, setZonaSisaDetik] = useState<Record<number, number | null>>({});

  // AKTIFKAN SEMUA (semua zona bisa diaktifkan, dengan atau tanpa timer)
  const aktifkanSemua = () => {
    const semuaZonaId = zonaList.map((z)=> z.id)
    setActiveZones(semuaZonaId);
  };

  const stopSemua = () => {
    setActiveZones([]);
  };

  // TOGGLE PER ZONA (tanpa set timer terlebih dahulu)
  const toggleZona = (id: number) => {
    setActiveZones(prev =>
      prev.includes(id)
        ? prev.filter(x => x !== id)
        : [...prev, id]
    );
  };

  // Update sisaDetik dari child component
  const updateZonaSisaDetik = (id: number, sisaDetik: number | null) => {
    setZonaSisaDetik(prev => ({
      ...prev,
      [id]: sisaDetik
    }));
  };



  return (
    <div className="min-h-screen bg-green-50 p-10 y-6">
      {/* tombol penyiraman manual */}
      <div className="flex justify-start gap-4">
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
      {zonaList.map((zona) => (
        <ZonaDrip
          key={zona.id}
          zona={zona}
          active={activeZones.includes(zona.id)}
          onToggle={() => toggleZona(zona.id)}
          sisaDetik={zonaSisaDetik[zona.id] ?? null}
          onSisaDetikChange={(sisaDetik) => updateZonaSisaDetik(zona.id, sisaDetik)}
        />
      ))}
    </div>
  );
}
