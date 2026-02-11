"use client";

import React, { useState, useEffect } from "react";
import { useTanks } from "@/shared/hooks/useTank";
import { Tank, CreateTankDTO } from "@/core/domain/entities/Tank";
import AddTankModal from "./_components/AddTankModal";
import TankCard from "./_components/TankCard";

export default function KontrolTandonPage() {
  const {
    tanks,
    isLoading,
    error,
    refreshTanks,
    createTank,
    deleteTank,
    toggleAgitator,
    startPump,
    stopPump,
  } = useTanks();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Fetch tanks on mount
  useEffect(() => {
    refreshTanks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  const handleCreate = async (data: CreateTankDTO) => {
    try {
      await createTank(data);
      setIsAddModalOpen(false); // Close modal after success
    } catch (error) {
      console.error("Error creating tank:", error);
      throw error; // Re-throw so modal can handle it
    }
  };

  const handleEdit = (tank: Tank) => {
    // TODO: Open edit modal
    console.log("Edit tank:", tank);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus tandon ini?")) {
      try {
        await deleteTank(id);
      } catch (error) {
        console.error("Error deleting tank:", error);
      }
    }
  };

  const handleToggleAgitator = async (id: string, enabled: boolean) => {
    try {
      await toggleAgitator(id, enabled);
    } catch (error) {
      console.error("Error toggling agitator:", error);
    }
  };

  const handleStartPump = async (id: string, durationMinutes?: number) => {
    try {
      await startPump(id, { durationMinutes });
    } catch (error) {
      console.error("Error starting pump:", error);
    }
  };

  const handleStopPump = async (id: string) => {
    try {
      await stopPump(id);
    } catch (error) {
      console.error("Error stopping pump:", error);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 max-w-md">
          <div className="flex gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-red-600 shrink-0"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
              />
            </svg>
            <div>
              <h3 className="font-semibold text-red-800">Gagal memuat data</h3>
              <p className="text-sm text-red-600 mt-1">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 p-4 sm:p-6 lg:p-10">
      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Kontrol Tandon
            </h1>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">
              Kelola tandon air untuk sistem irigasi
            </p>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all shadow-lg shadow-green-200 hover:shadow-xl hover:scale-105 font-semibold"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Tambah Tandon
          </button>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (!tanks || tanks.length === 0) ? (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Memuat data tandon...</p>
          </div>
        </div>
      ) : !tanks || tanks.length === 0 ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-20">
          <div className="bg-white rounded-3xl p-12 text-center max-w-md">
            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-10 h-10 text-green-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Belum Ada Tandon
            </h3>
            <p className="text-gray-600 mb-6">
              Mulai dengan menambahkan tandon pertama Anda untuk memantau dan
              mengontrol sistem irigasi.
            </p>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all shadow-lg font-semibold"
            >
              Tambah Tandon Pertama
            </button>
          </div>
        </div>
      ) : (
        /* Tanks List - Full Width */
        <div className="space-y-6">
          {tanks && tanks.filter((tank) => tank && tank.id).map((tank) => (
            <TankCard
              key={tank.id}
              tank={tank}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggleAgitator={handleToggleAgitator}
              onStartPump={handleStartPump}
              onStopPump={handleStopPump}
            />
          ))}
        </div>
      )}

      {/* Add Tank Modal */}
      <AddTankModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleCreate}
      />
    </div>
  );
}
