"use client";

import React, { useState, useEffect, useMemo } from "react";
import ScheduleCard from "./_components/ScheduleCard";
import AddScheduleModal from "./_components/AddScheduleModal";
import DeleteConfirmModal from "./_components/DeleteConfirmModal";
import { useSchedules } from "@/shared/hooks/useSchedules";
import { useZones } from "@/shared/hooks/useZones";
import { Schedule as ScheduleType, TimeSlot as TimeSlotType } from "@/core/domain/entities/Schedule";

// UI TimeSlot with id for frontend tracking
interface UITimeSlot extends TimeSlotType {
  id: string;
}

// Extended Schedule with UI format
interface UISchedule extends Omit<ScheduleType, "timeSlots"> {
  zoneName: string;
  timeSlots: UITimeSlot[];
}

export default function OtomatisDripPage() {
  const {
    schedules: rawSchedules,
    loading,
    error,
    fetchSchedules,
    createSchedule,
    updateSchedule,
    deleteSchedule,
    toggleSchedule,
  } = useSchedules();
  const { zones, fetchZones } = useZones();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<UISchedule | null>(null);
  const [deletingSchedule, setDeletingSchedule] = useState<UISchedule | null>(null);

  // Fetch schedules and zones on mount (only once)
  useEffect(() => {
    fetchSchedules();
    fetchZones();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array - only run once on mount

  // Convert backend schedules to UI format with zone names
  const schedules = useMemo(() => {
    return rawSchedules.map((schedule) => {
      const zone = zones.find((z) => z.id === schedule.zoneId);
      return {
        ...schedule,
        zoneName: zone?.name || `Zone ${schedule.zoneId.slice(0, 8)}...`,
        timeSlots: schedule.timeSlots.map((slot, index) => ({
          ...slot,
          id: `${schedule.id}-slot-${index}`,
        })),
      };
    });
  }, [rawSchedules, zones]);

  const activeSchedules = schedules.filter((s) => s.isActive);

  const handleToggleSchedule = async (id: string) => {
    try {
      await toggleSchedule(id);
    } catch (err) {
      console.error("Failed to toggle schedule:", err);
    }
  };

  const handleEditSchedule = (id: string) => {
    const schedule = schedules.find((s) => s.id === id);
    if (schedule) {
      setEditingSchedule(schedule);
      setIsEditModalOpen(true);
    }
  };

  const handleUpdateSchedule = async (updatedData: Omit<UISchedule, "id">) => {
    if (editingSchedule) {
      try {
        // Remove id from timeSlots for backend
        const backendTimeSlots = updatedData.timeSlots.map(({ id: _id, ...rest }) => rest);
        
        await updateSchedule(editingSchedule.id, {
          isActive: updatedData.isActive,
          timeSlots: backendTimeSlots,
          activeDays: updatedData.activeDays,
        });
        setIsEditModalOpen(false);
        setEditingSchedule(null);
      } catch (err) {
        console.error("Failed to update schedule:", err);
      }
    }
  };

  const handleDeleteClick = (id: string) => {
    const schedule = schedules.find((s) => s.id === id);
    if (schedule) {
      setDeletingSchedule(schedule);
      setIsDeleteModalOpen(true);
    }
  };

  const handleConfirmDelete = async () => {
    if (deletingSchedule) {
      try {
        await deleteSchedule(deletingSchedule.id);
        setDeletingSchedule(null);
      } catch (err) {
        console.error("Failed to delete schedule:", err);
      }
    }
  };

  const handleAddSchedule = async (newSchedule: Omit<UISchedule, "id">) => {
    try {
      // Remove id from timeSlots for backend
      const backendTimeSlots = newSchedule.timeSlots.map(({ id: _id, ...rest }) => rest);
      
      await createSchedule({
        zoneId: newSchedule.zoneId,
        isActive: newSchedule.isActive,
        timeSlots: backendTimeSlots,
        activeDays: newSchedule.activeDays,
      });
      setIsAddModalOpen(false);
    } catch (err) {
      console.error("Failed to create schedule:", err);
    }
  };

  // Show loading state
  if (loading && schedules.length === 0) {
    return (
      <div className="min-h-screen bg-green-50 p-10 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading schedules...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error && schedules.length === 0) {
    return (
      <div className="min-h-screen bg-green-50 p-10 flex items-center justify-center">
        <div className="text-center bg-red-50 border-2 border-red-200 rounded-xl p-8 max-w-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-12 h-12 text-red-600 mx-auto mb-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
            />
          </svg>
          <h3 className="text-lg font-bold text-red-800 mb-2">Error Loading Schedules</h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchSchedules}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 p-10">
      {/* Header + Button Tambah */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Penjadwalan Otomatis Drip
          </h1>
          <p className="text-gray-600 mt-1">
            Atur jadwal penyiraman otomatis untuk setiap zona
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors shadow-md"
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
          Tambah Jadwal Baru
        </button>
      </div>

      {/* Active Schedules Count */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-700">
          Jadwal Aktif ({activeSchedules.length})
        </h2>
      </div>

      {/* Schedule Cards or Empty State */}
      {schedules.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-300">
          <div className="bg-green-100 p-6 rounded-full mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-16 h-16 text-green-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            Belum Ada Jadwal
          </h3>
          <p className="text-gray-600 mb-6 text-center max-w-md">
            Anda belum membuat jadwal penyiraman otomatis. Klik tombol di atas untuk menambahkan jadwal pertama Anda.
          </p>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 bg-green-600 text-white px-8 py-4 rounded-xl hover:bg-green-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
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
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Buat Jadwal Pertama
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {schedules.map((schedule) => (
            <ScheduleCard
              key={schedule.id}
              schedule={schedule}
              onToggle={() => handleToggleSchedule(schedule.id)}
              onEdit={() => handleEditSchedule(schedule.id)}
              onDelete={() => handleDeleteClick(schedule.id)}
            />
          ))}
        </div>
      )}

      {/* Add Schedule Modal */}
      <AddScheduleModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddSchedule}
      />

      {/* Edit Schedule Modal */}
      <AddScheduleModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingSchedule(null);
        }}
        onAdd={handleUpdateSchedule}
        editData={editingSchedule}
        isEditMode={true}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeletingSchedule(null);
        }}
        onConfirm={handleConfirmDelete}
        scheduleName={deletingSchedule?.zoneName || ""}
      />
    </div>
  );
}
